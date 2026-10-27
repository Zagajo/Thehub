import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://guvhwswopudwriwonudn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                     process.env.SUPABASE_SECRET_KEY || 
                     process.env.SUPABASE_ANON_KEY || 
                     process.env.SUPABASE_PUBLISHABLE_KEY || 
                     process.env.VITE_SUPABASE_ANON_KEY || 
                     'sb_publishable_yg9_DBFxvCnOFrbt3oU3WA_4KgyjoF3';

let supabaseClient = null;

try {
  if (SUPABASE_URL && SUPABASE_KEY) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    console.log(`[The Hub Supabase] Client initialized for ${SUPABASE_URL}`);
  }
} catch (err) {
  console.warn('[The Hub Supabase] Warning initializing Supabase client:', err.message);
}

export const serverSupabase = supabaseClient;
export const supabaseProjectUrl = SUPABASE_URL;

/**
 * Perform a live health check probe against Supabase
 */
export async function getSupabaseHealth() {
  if (!serverSupabase) {
    return {
      configured: false,
      connected: false,
      schemaReady: false,
      url: SUPABASE_URL,
      status: 'unconfigured',
      message: 'Supabase credentials not configured; in-memory persistence active.',
      tableCounts: {},
    };
  }

  const start = Date.now();
  try {
    const { data, error, count } = await serverSupabase
      .from('courses')
      .select('id', { count: 'exact', head: true });
    
    const latency = Date.now() - start;

    if (error) {
      const isMissingTable = error.code === '42P01' || error.message?.includes('does not exist');
      return {
        configured: true,
        connected: !isMissingTable,
        schemaReady: !isMissingTable,
        url: SUPABASE_URL,
        latencyMs: latency,
        status: isMissingTable ? 'schema_pending' : 'error',
        message: isMissingTable 
          ? 'Connected to Supabase. Tables need to be initialized via supabase-schema.sql.' 
          : error.message,
        tableCounts: {},
      };
    }

    // Probe other tables
    const tableCounts = { courses: count ?? 0 };
    try {
      const pRes = await serverSupabase.from('profiles').select('id', { count: 'exact', head: true });
      if (!pRes.error) tableCounts.profiles = pRes.count ?? 0;
      const cRes = await serverSupabase.from('certificates').select('id', { count: 'exact', head: true });
      if (!cRes.error) tableCounts.certificates = cRes.count ?? 0;
      const eRes = await serverSupabase.from('enrollments').select('id', { count: 'exact', head: true });
      if (!eRes.error) tableCounts.enrollments = eRes.count ?? 0;
    } catch {
      // Ignore count errors on auxiliary tables
    }

    return {
      configured: true,
      connected: true,
      schemaReady: true,
      url: SUPABASE_URL,
      latencyMs: latency,
      status: 'connected',
      message: `Active Supabase connection (${latency}ms latency).`,
      tableCounts,
    };
  } catch (err) {
    return {
      configured: true,
      connected: false,
      schemaReady: false,
      url: SUPABASE_URL,
      latencyMs: Date.now() - start,
      status: 'offline',
      message: err.message || 'Cannot reach Supabase host',
      tableCounts: {},
    };
  }
}

/**
 * Fetch courses from Supabase with fallback
 */
export async function fetchCoursesFromSupabase() {
  if (!serverSupabase) return null;
  try {
    const { data, error } = await serverSupabase.from('courses').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * Upsert certificate into Supabase
 */
export async function persistCertificateToSupabase(cert) {
  if (!serverSupabase) return null;
  try {
    const record = {
      id: cert.id,
      user_id: cert.userId,
      user_name: cert.userName,
      course_title: cert.courseTitle,
      issued_date: cert.issuedDate,
      credential_hash: cert.credentialHash,
    };
    const { data, error } = await serverSupabase.from('certificates').upsert(record);
    if (error) {
      console.warn('[The Hub Supabase] Notice persisting certificate:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('[The Hub Supabase] Exception persisting certificate:', err.message);
    return null;
  }
}

/**
 * Fetch certificates from Supabase
 */
export async function fetchCertificatesFromSupabase(userId) {
  if (!serverSupabase) return null;
  try {
    let query = serverSupabase.from('certificates').select('*');
    if (userId) {
      query = query.eq('user_id', userId);
    }
    const { data, error } = await query;
    if (error || !data) return null;
    return data.map(c => ({
      id: c.id,
      userId: c.user_id,
      userName: c.user_name,
      courseTitle: c.course_title,
      issuedDate: c.issued_date,
      credentialHash: c.credential_hash,
    }));
  } catch {
    return null;
  }
}

/**
 * Upsert user profile to Supabase
 */
export async function persistUserToSupabase(user) {
  if (!serverSupabase) return null;
  try {
    const record = {
      id: user.id,
      name: user.name || user.fullName,
      email: user.email,
      role: user.role || 'learner',
      district: user.district || user.location || 'Kigali City',
      location: user.location || user.district || 'Kigali City',
      avatar_url: user.avatar || user.avatarUrl,
      passport_id: user.passportId,
      bio: user.bio || '',
      learning_streak: user.learningStreak || 1,
    };
    await serverSupabase.from('profiles').upsert(record);
  } catch (err) {
    console.warn('[The Hub Supabase] User sync notice:', err.message);
  }
}

/**
 * Upsert enrollment to Supabase
 */
export async function persistEnrollmentToSupabase(enrollment) {
  if (!serverSupabase) return null;
  try {
    const record = {
      id: enrollment.id,
      user_id: enrollment.userId,
      course_id: enrollment.courseId,
      course_title: enrollment.courseTitle,
      completed: Boolean(enrollment.completed),
      certificate_requested: Boolean(enrollment.certificateRequested),
      progress_percentage: enrollment.progressPercentage || 0,
    };
    await serverSupabase.from('enrollments').upsert(record);
  } catch (err) {
    console.warn('[The Hub Supabase] Enrollment sync notice:', err.message);
  }
}

/**
 * Sync entire dataset from in-memory into Supabase
 */
export async function syncAllToSupabase({ courses = [], users = [], certificates = [], nisrIndicators = [], enrollments = [] }) {
  if (!serverSupabase) {
    return { success: false, message: 'Supabase client not initialized' };
  }

  const results = { courses: 0, profiles: 0, certificates: 0, indicators: 0, enrollments: 0, errors: [] };

  try {
    // 1. Sync Profiles (Adaptive format)
    if (users.length > 0) {
      try {
        const profileRecords = users.map(u => ({
          id: u.id,
          full_name: u.name || u.fullName,
          location: u.district || u.location || 'Kigali City',
          avatar_url: u.avatar || u.avatarUrl,
          learning_streak: u.learningStreak || 1
        }));
        const { error: pErr } = await serverSupabase.from('profiles').upsert(profileRecords);
        if (pErr) results.errors.push(`Profiles: ${pErr.message}`);
        else results.profiles = profileRecords.length;
      } catch (e) {
        results.errors.push(`Profiles: ${e.message}`);
      }
    }

    // 2. Sync Courses (Adaptive format)
    if (courses.length > 0) {
      try {
        const courseRecords = courses.map(c => ({
          id: c.id,
          slug: c.slug || c.id,
          title: c.title,
          category: c.category,
          difficulty: c.difficulty || 'Beginner',
          estimated_hours: 10,
          instructor_name: c.instructor || 'The Hub Faculty',
          description: c.description || c.title,
          short_description: (c.description || c.title).slice(0, 120),
          thumbnail_url: c.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
          is_published: true
        }));
        const { error: cErr } = await serverSupabase.from('courses').upsert(courseRecords);
        if (cErr) results.errors.push(`Courses: ${cErr.message}`);
        else results.courses = courseRecords.length;
      } catch (e) {
        results.errors.push(`Courses: ${e.message}`);
      }
    }

    // 3. Sync Certificates (If table exists)
    if (certificates.length > 0) {
      try {
        const certRecords = certificates.map(c => ({
          id: c.id,
          user_id: c.userId,
          user_name: c.userName,
          course_title: c.courseTitle,
          issued_date: c.issuedDate,
          credential_hash: c.credentialHash
        }));
        const { error: certErr } = await serverSupabase.from('certificates').upsert(certRecords);
        if (certErr && !certErr.message?.includes('does not exist')) {
          results.errors.push(`Certificates: ${certErr.message}`);
        } else if (!certErr) {
          results.certificates = certRecords.length;
        }
      } catch (e) {
        // Table may be pending execution of schema script
      }
    }

    // 4. Sync NISR Indicators (Adaptive format)
    if (nisrIndicators.length > 0) {
      try {
        const indRecords = nisrIndicators.map((i, idx) => ({
          id: i.id,
          source: i.source || 'NISR Rwanda',
          dataset: 'Labour Force Survey (LFS)',
          indicator: i.indicator,
          indicator_code: `NISR-LFS-IND-${idx + 1}`,
          year: 2023,
          period: 'Annual',
          geography: 'Rwanda - National',
          unit: '%',
          value: parseFloat(i.value) || 38.6
        }));
        const { error: indErr } = await serverSupabase.from('nisr_indicators').upsert(indRecords);
        if (indErr) results.errors.push(`NISR Indicators: ${indErr.message}`);
        else results.indicators = indRecords.length;
      } catch (e) {
        results.errors.push(`NISR Indicators: ${e.message}`);
      }
    }

    // 5. Sync Enrollments (Adaptive format)
    if (enrollments.length > 0) {
      try {
        const enRecords = enrollments.map(e => ({
          id: e.id,
          user_id: e.userId,
          course_id: e.courseId,
          status: e.completed ? 'completed' : 'in_progress',
          progress_percentage: e.progressPercentage || (e.completed ? 100 : 0)
        }));
        const { error: enErr } = await serverSupabase.from('enrollments').upsert(enRecords);
        if (enErr) results.errors.push(`Enrollments: ${enErr.message}`);
        else results.enrollments = enRecords.length;
      } catch (e) {
        results.errors.push(`Enrollments: ${e.message}`);
      }
    }

    const hasWarnings = results.errors.length > 0;
    return {
      success: true,
      summary: results,
      message: hasWarnings
        ? `Synced ${results.courses} courses, ${results.profiles} profiles, ${results.indicators} indicators to Supabase (${results.errors.length} table warnings).`
        : `Successfully synchronized ${results.courses} courses, ${results.profiles} profiles, ${results.indicators} indicators, and ${results.enrollments} enrollments to Supabase!`
    };
  } catch (err) {
    return { success: false, message: err.message, summary: results };
  }
}
