// Official 15-Question Technical Diagnostic Assessments for The Hub
// Each assessment contains exactly 15 vetted questions tracked step-by-step
// Pass mark is strictly 80% (12 / 15 correct required to pass).

export const PASSING_SCORE_PERCENTAGE = 80;
export const TOTAL_QUESTIONS_PER_ASSESSMENT = 15;
export const MIN_CORRECT_TO_PASS = 12; // 12/15 = 80%

export const technicalAssessments = [
  {
    id: 'as-web',
    courseId: 'c1',
    title: 'Software Engineering & Full-Stack Web Diagnostic',
    category: 'Software Engineering',
    questionsCount: 15,
    duration: '30 mins',
    weight: 'Theory (30%) + Practical (70%)',
    description: '15-question benchmark evaluating API architectures, relational SQL schemas, React state management, and production security.',
    questions: [
      {
        id: 1,
        topic: 'API Architecture',
        prompt: 'Which architectural pattern is recommended for scalable web APIs serving low-bandwidth client applications in Rwanda?',
        options: [
          'Monolithic single-thread desktop script with local filesystem storage',
          'Asynchronous REST API with connection-pooled PostgreSQL, strict validation schemas, and JSON compression',
          'Static uncompiled HTML files without database or session management',
          'Synchronous blocking file queries directly from the client browser'
        ],
        correctIndex: 1,
        explanation: 'Asynchronous REST APIs with connection pooling and strict schema validation provide the lowest latency, memory efficiency, and resilience for web and mobile clients.'
      },
      {
        id: 2,
        topic: 'Relational Database Design',
        prompt: 'In relational database design (PostgreSQL), which normal form eliminates transitive dependencies between non-primary key attributes?',
        options: [
          'First Normal Form (1NF)',
          'Second Normal Form (2NF)',
          'Third Normal Form (3NF)',
          'Boyce-Codd Normal Form only'
        ],
        correctIndex: 2,
        explanation: '3NF requires that all non-key attributes are functionally dependent solely on the primary key, thereby eliminating transitive dependencies.'
      },
      {
        id: 3,
        topic: 'React State Management',
        prompt: 'When updating an array or object in React component state, why must developers use immutable updates instead of mutating state directly?',
        options: [
          'Direct mutations do not change object reference identity, causing React to skip reconciliation re-renders',
          'JavaScript throws a fatal TypeError whenever state is mutated directly',
          'Direct mutations bypass browser CSS rendering pipelines',
          'Immutable updates reduce internet network bandwidth consumption'
        ],
        correctIndex: 0,
        explanation: 'React compares state references using Object.is. Mutating an existing object in-place does not change its memory address, so React cannot detect changes or trigger necessary UI re-renders.'
      },
      {
        id: 4,
        topic: 'HTTP Protocol',
        prompt: 'According to RFC specifications for HTTP methods, which of the following operations is required to be idempotent?',
        options: [
          'POST',
          'PUT',
          'PATCH without headers',
          'CONNECT'
        ],
        correctIndex: 1,
        explanation: 'PUT and DELETE are idempotent methods: making multiple identical requests has the same intended effect on the server resource state as a single request.'
      },
      {
        id: 5,
        topic: 'SQL Performance',
        prompt: 'Which SQL index type is optimal for fast point lookups and range queries on ordered numerical IDs and timestamps in PostgreSQL?',
        options: [
          'B-Tree Index',
          'Hash Index',
          'GIN (Generalized Inverted) Index',
          'Bloom Filter Index'
        ],
        correctIndex: 0,
        explanation: 'B-Tree is the default PostgreSQL index type; it provides O(log n) time complexity for equality, range comparisons (<, <=, =, >=, >), and sorting.'
      },
      {
        id: 6,
        topic: 'Web Security',
        prompt: 'Which mechanism prevents Cross-Site Scripting (XSS) attacks in modern single-page applications?',
        options: [
          'Using Content Security Policy (CSP) headers and auto-escaping template variables',
          'Disabling CORS across all internal endpoints',
          'Storing sensitive authentication secrets in browser localStorage',
          'Using HTTP instead of HTTPS on local networks'
        ],
        correctIndex: 0,
        explanation: 'A strict Content Security Policy (CSP) combined with framework-level contextual HTML sanitization prevents injection and execution of malicious inline scripts.'
      },
      {
        id: 7,
        topic: 'Authentication & Tokens',
        prompt: 'Where should sensitive JWT access tokens ideally be stored in browser clients to resist XSS token theft?',
        options: [
          'In an httpOnly, Secure, SameSite=Strict cookie',
          'In window.localStorage',
          'In window.sessionStorage',
          'Inside an unencrypted URL query parameter'
        ],
        correctIndex: 0,
        explanation: 'httpOnly cookies cannot be accessed or read by JavaScript code running in the browser, safeguarding authentication credentials from client-side script injection.'
      },
      {
        id: 8,
        topic: 'Database Transactions',
        prompt: 'In database ACID properties, what does "Isolation" ensure during concurrent transactions?',
        options: [
          'Transactions survive server restarts and power failures',
          'Intermediate uncommitted states of concurrent transactions are not visible to one another',
          'All database constraints and triggers are disabled during peak traffic',
          'Each database table resides on an independent physical disk'
        ],
        correctIndex: 1,
        explanation: 'Isolation guarantees that concurrently executing transactions execute without interfering with one another, preventing dirty reads and non-repeatable reads.'
      },
      {
        id: 9,
        topic: 'Frontend Routing',
        prompt: 'In a client-side React Router single-page application (SPA), what server configuration is required for deep URLs (e.g. /assessments) on refresh?',
        options: [
          'The server must return index.html for all non-API GET routes (fallback routing)',
          'The server must disable caching on all CSS stylesheets',
          'The client must convert all URLs to hash fragments (#)',
          'A separate HTML file must exist on disk for every application route'
        ],
        correctIndex: 0,
        explanation: 'Because client-side routing happens in the browser, direct page reloads or deep links must return index.html so the client bundle can load and resolve the path.'
      },
      {
        id: 10,
        topic: 'CSS & Responsive Design',
        prompt: 'Which modern CSS layout feature is best suited for two-dimensional grids with both columns and rows?',
        options: [
          'CSS Grid Layout (display: grid)',
          'CSS Flexible Box (display: flex)',
          'Floating blocks with clear: both',
          'Inline-block tables'
        ],
        correctIndex: 0,
        explanation: 'CSS Grid is a 2D layout model designed to control rows and columns simultaneously, whereas Flexbox is primarily a 1D layout model (row or column).'
      },
      {
        id: 11,
        topic: 'Git Version Control',
        prompt: 'In professional software workflows, what is the primary benefit of git rebase over git merge when integrating feature branches?',
        options: [
          'It preserves a clean, linear project commit history without unnecessary merge bubble commits',
          'It automatically fixes compilation syntax errors in source code',
          'It deletes previous commit messages to save disk space',
          'It prevents collaborators from viewing author names'
        ],
        correctIndex: 0,
        explanation: 'Rebasing re-applies feature commits onto the tip of the upstream branch, producing a tidy linear log that is easier to inspect and bisect.'
      },
      {
        id: 12,
        topic: 'REST API Conventions',
        prompt: 'Which HTTP endpoint design follows standard RESTful conventions for updating a learner profile with ID 42?',
        options: [
          'PATCH /api/users/42 with updated profile fields in the request body',
          'GET /api/updateUser?id=42&name=Kezia',
          'POST /api/deleteAndRecreateUser/42',
          'PUT /api/users/all?selected=42'
        ],
        correctIndex: 0,
        explanation: 'REST resources use plural nouns (/api/users) with identifier parameters (/42) and HTTP verbs (PATCH for partial updates, PUT for complete replacements).'
      },
      {
        id: 13,
        topic: 'Backend Optimization',
        prompt: 'Why do production Node.js and Python backend servers use connection pooling rather than opening a new PostgreSQL connection per request?',
        options: [
          'Establishing a TCP connection and SSL/TLS handshake for PostgreSQL incurs heavy CPU and latency overhead',
          'PostgreSQL strictly prohibits more than 5 total connections per database',
          'Connection pools automatically encrypt all database columns with AES-256',
          'Browsers cannot send HTTP requests without a backend connection pool'
        ],
        correctIndex: 0,
        explanation: 'Database connection handshakes involve network roundtrips, process forks, and authentication. Reusing a pool of persistent connections reduces response latency from hundreds of milliseconds to single digits.'
      },
      {
        id: 14,
        topic: 'JavaScript Asynchronous Flow',
        prompt: 'What happens when an unhandled Promise rejection occurs in Node.js 20+ runtime environments?',
        options: [
          'The process emits an unhandledRejection event and terminates with a non-zero exit code by default',
          'The operating system restarts the entire physical computer',
          'The browser window displays a warning modal popup',
          'Node.js automatically retries the rejected promise indefinitely'
        ],
        correctIndex: 0,
        explanation: 'In modern Node.js, unhandled promise rejections trigger process termination to prevent applications from continuing to run in indeterminate, corrupted states.'
      },
      {
        id: 15,
        topic: 'Low-Bandwidth UX in Rwanda',
        prompt: 'To ensure accessibility in rural Rwandan districts with intermittent 3G/4G connectivity, which engineering practice is most vital?',
        options: [
          'Aggressive asset caching with Service Workers, optimistic local UI state, and lightweight SVGs instead of high-res video assets',
          'Requiring high-definition WebRTC video streaming on initial page load',
          'Bundling 20MB of client-side JavaScript analytics libraries',
          'Disabling browser caching headers to force server revalidation'
        ],
        correctIndex: 0,
        explanation: 'Optimistic local UI, Service Worker caching, and lean bundle payloads ensure web applications stay functional and responsive even under low-bandwidth or disconnected conditions.'
      }
    ]
  },
  {
    id: 'as-data',
    courseId: 'c2',
    title: 'Data Analytics, SQL & NISR Labour Statistics Diagnostic',
    category: 'Data Science & Economics',
    questionsCount: 15,
    duration: '45 mins',
    weight: 'Theory (30%) + Practical (70%)',
    description: '15-question evaluation covering Pandas data manipulation, SQL window functions, statistical hypothesis testing, and NISR labour market indices.',
    questions: [
      {
        id: 1,
        topic: 'Pandas Optimization',
        prompt: 'Which Pandas technique is most memory-efficient when reading large national survey CSVs with millions of rows?',
        options: [
          'pd.read_csv() specifying usecols and categorical dtypes for repeated string fields',
          'Loading all columns into default float64 objects then calling df.dropna()',
          'Converting the CSV file into a Python list of strings using readlines()',
          'Using df.copy(deep=True) after loading all 50 columns'
        ],
        correctIndex: 0,
        explanation: 'Specifying usecols loads only necessary features, while categorical dtypes compress memory by encoding high-cardinality repetitive strings into compact integer keys.'
      },
      {
        id: 2,
        topic: 'Data Imputation',
        prompt: 'When analyzing survey wage data that exhibits strong right-skew due to high-income earners, which metric is preferred for central tendency imputation?',
        options: [
          'Median',
          'Arithmetic Mean',
          'Maximum value',
          'Geometric Standard Deviation'
        ],
        correctIndex: 0,
        explanation: 'The median is resistant to extreme positive outliers, preventing artificial inflation of expected baseline wages in skewed distributions.'
      },
      {
        id: 3,
        topic: 'Pandas Filtering',
        prompt: 'In Pandas, what is the correct syntax to filter respondents who are aged 16 to 30 AND currently employed?',
        options: [
          'df[(df["age"] >= 16) & (df["age"] <= 30) & (df["employed"] == 1)]',
          'df[df["age"] >= 16 and df["age"] <= 30 and df["employed"] == 1]',
          'df.filter(age=between(16, 30), employed=1)',
          'df.query("age > 16 or employed == 1")'
        ],
        correctIndex: 0,
        explanation: 'Pandas requires bitwise operators (&, |) and parentheses around each sub-expression to correctly evaluate boolean vector arrays.'
      },
      {
        id: 4,
        topic: 'SQL Window Functions',
        prompt: 'Which SQL window function assigns sequential integers starting at 1 without gaps, even when rows have tied order values?',
        options: [
          'DENSE_RANK()',
          'RANK()',
          'ROW_NUMBER()',
          'NTILE(10)'
        ],
        correctIndex: 0,
        explanation: 'DENSE_RANK() assigns consecutive rank values to tied rows without skipping numbers (e.g., 1, 2, 2, 3), whereas RANK() leaves gaps (e.g., 1, 2, 2, 4).'
      },
      {
        id: 5,
        topic: 'NISR Labour Force Metrics',
        prompt: 'According to NISR Labour Force Survey (LFS) methodology, how is the Youth Labour Force Participation Rate (LFPR) defined?',
        options: [
          '(Total Youth Employed + Total Youth Unemployed) divided by Total Youth Working-Age Population (16-30)',
          'Only youth currently enrolled in full-time university programs',
          'Total youth employed in Kigali divided by total national population',
          'Youth working in government ministries divided by tax revenue'
        ],
        correctIndex: 0,
        explanation: 'The Labour Force Participation Rate measures the economically active population (both employed and unemployed actively looking for work) relative to the total working-age cohort.'
      },
      {
        id: 6,
        topic: 'Statistical Hypothesis Testing',
        prompt: 'In an independent two-sample t-test comparing average wages in Kigali vs Northern Province, what does a p-value of 0.004 indicate?',
        options: [
          'Statistically significant difference at the 1% significance level (p < 0.01)',
          'The null hypothesis that wages are identical is accepted',
          'The sample size was four respondents',
          'Kigali wages are exactly 0.4% higher'
        ],
        correctIndex: 0,
        explanation: 'A p-value of 0.004 is less than the standard α = 0.05 (and α = 0.01) threshold, rejecting the null hypothesis and confirming a statistically significant difference between regional means.'
      },
      {
        id: 7,
        topic: 'Outlier Detection',
        prompt: 'Using the standard Tukey boxplot rule, which formula defines the upper fence for flagging expenditure outliers?',
        options: [
          'Q3 + (1.5 * IQR)',
          'Mean + (2 * Standard Deviation)',
          'Q1 - (1.5 * IQR)',
          'Median * 1.5'
        ],
        correctIndex: 0,
        explanation: 'The upper fence for outlier detection is third quartile (Q3) plus 1.5 times the Interquartile Range (IQR = Q3 - Q1).'
      },
      {
        id: 8,
        topic: 'Data Reshaping',
        prompt: 'Which Pandas function transforms a wide dataset with separate year columns (e.g. 2022, 2023, 2024) into a tidy long dataset?',
        options: [
          'pd.melt()',
          'df.pivot()',
          'df.unstack()',
          'pd.concat(axis=1)'
        ],
        correctIndex: 0,
        explanation: 'pd.melt() unpivots DataFrames from wide format to long format, turning multiple measure columns into tidy variable-value row pairs.'
      },
      {
        id: 9,
        topic: 'Categorical Independence',
        prompt: 'Which statistical test determines whether youth employment status (Employed vs Unemployed) is independent of education tier (TVET vs Secondary vs University)?',
        options: [
          'Chi-Square Test of Independence on a Contingency Table',
          'Pearson Correlation Coefficient',
          'Single-sample t-test',
          'Euclidean Distance Matrix'
        ],
        correctIndex: 0,
        explanation: 'The Chi-Square test of independence examines contingency cross-tabulations between two categorical variables to determine whether observed frequencies differ significantly from expected frequencies.'
      },
      {
        id: 10,
        topic: 'Time-Series Resampling',
        prompt: 'In Pandas, what parameter in df.resample() groups daily agricultural commodity price observations into calendar quarters?',
        options: [
          '"QE" (Quarter End)',
          '"QTR_3M"',
          '"YEAR_DIV_4"',
          '"SEASON"'
        ],
        correctIndex: 0,
        explanation: 'In Pandas, "QE" (or historical "Q") designates quarter-end frequency resampling on datetime indices.'
      },
      {
        id: 11,
        topic: 'Multicollinearity in Regression',
        prompt: 'What Variance Inflation Factor (VIF) score indicates critical multicollinearity between predictor variables in econometric modeling?',
        options: [
          'VIF > 5.0 or 10.0',
          'VIF between 0.0 and 1.0',
          'VIF equal to 0',
          'Negative VIF values'
        ],
        correctIndex: 0,
        explanation: 'A VIF exceeding 5 to 10 indicates severe multicollinearity, inflating the variance of regression coefficients and rendering individual significance tests unreliable.'
      },
      {
        id: 12,
        topic: 'SQL Aggregations',
        prompt: 'In SQL, what is the key difference between the WHERE clause and the HAVING clause?',
        options: [
          'WHERE filters individual rows prior to grouping; HAVING filters aggregated groups created by GROUP BY',
          'HAVING can only be used on string columns',
          'WHERE runs after table indexing is disabled',
          'There is no semantic difference in standard SQL'
        ],
        correctIndex: 0,
        explanation: 'WHERE filters rows before any aggregate functions or GROUP BY are executed; HAVING filters the resultant group summary rows after aggregation.'
      },
      {
        id: 13,
        topic: 'Normalcy Verification',
        prompt: 'Which test is widely used in scientific workflows to evaluate whether regression residuals follow a Gaussian normal distribution?',
        options: [
          'Shapiro-Wilk Test',
          'K-Means Clustering',
          'Cosine Similarity Test',
          'Gini Impurity Index'
        ],
        correctIndex: 0,
        explanation: 'The Shapiro-Wilk test is a standard statistical test for sample normality, evaluating whether data deviates significantly from a Gaussian distribution.'
      },
      {
        id: 14,
        topic: 'Vectorized Operations',
        prompt: 'Why are vectorized NumPy computations orders of magnitude faster than standard Python for-loops for survey statistics?',
        options: [
          'NumPy arrays use contiguous memory buffers and compiled C SIMD vector instructions, eliminating Python interpreter boxing overhead',
          'NumPy sends all mathematical operations to remote cloud GPUs',
          'Python loops always sleep for 10 milliseconds between iterations',
          'NumPy automatically deletes missing values without verification'
        ],
        correctIndex: 0,
        explanation: 'Contiguous C-array memory layout and hardware-level vector instructions enable NumPy to execute operations across entire memory arrays in compiled native machine code.'
      },
      {
        id: 15,
        topic: 'NISR Underutilization (LU)',
        prompt: 'In NISR macroeconomic monitoring, what does the Labour Underutilization Indicator LU4 capture?',
        options: [
          'Composite measure combining unemployment, time-related underemployment, and the potential labour force',
          'Only individuals working more than 60 hours per week',
          'Total civil servants employed in district offices',
          'The national inflation rate of agricultural food staples'
        ],
        correctIndex: 0,
        explanation: 'LU4 is the most comprehensive ILO/NISR labour underutilization measure, integrating the unemployed, underemployed workers wanting more hours, and discouraged workers in the potential labour force.'
      }
    ]
  },
  {
    id: 'as-cloud',
    courseId: 'c3',
    title: 'Cloud Infrastructure, Security & API Architecture Diagnostic',
    category: 'Cloud & DevOps',
    questionsCount: 15,
    duration: '35 mins',
    weight: 'Theory (30%) + Practical (70%)',
    description: '15-question evaluation covering Docker containerization, CI/CD automated deployment, reverse proxies, and cloud security compliance.',
    questions: [
      {
        id: 1,
        topic: 'Docker Image Optimization',
        prompt: 'What is the primary benefit of multi-stage Docker builds in production deployment pipelines?',
        options: [
          'Separating compile-time build dependencies from the final lightweight runtime container image',
          'Running multiple Linux operating systems simultaneously on a single CPU core',
          'Enabling automatic hot-module reloading in production clusters',
          'Bypassing Docker daemon authentication'
        ],
        correctIndex: 0,
        explanation: 'Multi-stage builds leave compiler toolchains, dev dependencies, and temporary files in build stages, resulting in lean, secure production images containing only runtime artifacts.'
      },
      {
        id: 2,
        topic: 'Kubernetes Architecture',
        prompt: 'In container orchestration, what is the difference between a Liveness Probe and a Readiness Probe?',
        options: [
          'Liveness probes check if a pod needs restarting; readiness probes determine if the pod is ready to accept incoming user network traffic',
          'Readiness probes delete corrupted database tables automatically',
          'Liveness probes only run during initial node hardware boot',
          'They are identical and cannot be configured independently'
        ],
        correctIndex: 0,
        explanation: 'If a liveness probe fails, the orchestrator terminates and restarts the container. If a readiness probe fails, the pod is temporarily removed from service load balancing until it recovers.'
      },
      {
        id: 3,
        topic: 'Zero-Trust Security',
        prompt: 'Under Zero-Trust architecture principles, which rule governs user and service account access permissions?',
        options: [
          'Least Privilege: grant only the minimum permissions necessary for the specific task and verify every request explicitly',
          'Grant full administrator privileges to all developers on staging and production',
          'Trust any request originating from an internal office subnet without token verification',
          'Disable password authentication in favor of unverified IP whitelists'
        ],
        correctIndex: 0,
        explanation: 'Zero-Trust dictates "never trust, always verify" with strict Least Privilege role-based access control (RBAC) enforced continuously across all network perimeters.'
      },
      {
        id: 4,
        topic: 'Reverse Proxies',
        prompt: 'Which role does a reverse proxy like Nginx or Envoy fulfill in front of backend application servers?',
        options: [
          'SSL/TLS termination, request routing, rate limiting, and gzip/brotli compression',
          'Executing database schema migrations on client devices',
          'Compiling frontend TypeScript code on the fly',
          'Providing battery backup to server racks'
        ],
        correctIndex: 0,
        explanation: 'Reverse proxies sit between the public internet and private backend instances, offloading cryptography, load balancing, compression, and request sanitation.'
      },
      {
        id: 5,
        topic: 'Secret Management',
        prompt: 'What is the recommended practice for managing sensitive production API keys and database credentials?',
        options: [
          'Inject secrets securely via container environment variables or dedicated secret managers (e.g. HashiCorp Vault), never committing them to source code',
          'Hardcode secrets in public GitHub repository README files for quick onboarding',
          'Save secrets in plaintext client-side JavaScript assets',
          'Email passwords in unencrypted spreadsheet attachments'
        ],
        correctIndex: 0,
        explanation: 'Secrets should never be committed into source repositories. They must be injected into containers at runtime through secure KMS systems or encrypted environment managers.'
      },
      {
        id: 6,
        topic: 'Database Reliability',
        prompt: 'What does Point-In-Time Recovery (PITR) enable when maintaining mission-critical relational databases?',
        options: [
          'Restoring database state to any specific microsecond by replaying Write-Ahead Logs (WAL) on top of a baseline snapshot',
          'Automatically repairing broken client CSS styles',
          'Speeding up SQL query execution by 10x without indexes',
          'Eliminating the need for database backups'
        ],
        correctIndex: 0,
        explanation: 'PITR combines periodic base physical backups with continuous Write-Ahead Log archiving, enabling recovery to the exact second prior to an accidental corruption or drop.'
      },
      {
        id: 7,
        topic: 'CI/CD Pipelines',
        prompt: 'In a modern GitOps CI/CD pipeline, what prevents broken code from reaching production users?',
        options: [
          'Automated linting, unit testing, and integration gates that block deployment if any test fails',
          'Manually FTPing modified files to the live server on Friday evenings',
          'Disabling automated tests to accelerate build velocity',
          'Relying solely on user complaints to detect production errors'
        ],
        correctIndex: 0,
        explanation: 'Automated test suites in CI pipelines execute deterministic verification steps on every commit, preventing flawed builds from ever deploying to staging or production.'
      },
      {
        id: 8,
        topic: 'Rate Limiting',
        prompt: 'Which algorithm is widely implemented in API gateways to mitigate brute-force and DDoS attacks while accommodating brief traffic bursts?',
        options: [
          'Token Bucket Algorithm',
          'Binary Search Algorithm',
          'Bubble Sort Algorithm',
          'Dijkstra Shortest Path Algorithm'
        ],
        correctIndex: 0,
        explanation: 'The Token Bucket algorithm accumulates tokens at a steady refill rate, allowing bursts of requests up to the bucket capacity while maintaining an enforceable average rate limit.'
      },
      {
        id: 9,
        topic: 'Distributed Systems',
        prompt: 'What is the primary function of a Circuit Breaker pattern in distributed microservice architectures?',
        options: [
          'Preventing cascading system failures by failing fast when a downstream dependency is unresponsive or degraded',
          'Encrypting hard drives with BitLocker',
          'Terminating idle developer SSH sessions',
          'Rerouting internet traffic during regional power outages'
        ],
        correctIndex: 0,
        explanation: 'When a downstream service fails repeatedly, the circuit breaker opens, immediately returning cached or fallback responses rather than tying up server worker threads waiting on timeouts.'
      },
      {
        id: 10,
        topic: 'Infrastructure as Code (IaC)',
        prompt: 'What guarantees that Infrastructure as Code tools (like Terraform) make only the exact intended modifications to cloud resources?',
        options: [
          'A declarative state file comparing existing real-world resources against desired configuration code',
          'Recompiling the Linux kernel prior to every cloud deployment',
          'Manually clicking buttons in cloud web consoles',
          'Randomly generating resource identifiers on each deploy'
        ],
        correctIndex: 0,
        explanation: 'Declarative IaC tracks the current infrastructure topology in a state file, generating a preview plan that computes only the net additions, modifications, or deletions needed.'
      },
      {
        id: 11,
        topic: 'Observability & Telemetry',
        prompt: 'Which combination of signals constitutes the three core pillars of modern cloud observability?',
        options: [
          'Metrics, Structured Logs, and Distributed Traces',
          'Source code lines, commit count, and author avatars',
          'Screen recordings, mouse clicks, and audio transcripts',
          'Keyboard strokes, ping latency, and monitor refresh rate'
        ],
        correctIndex: 0,
        explanation: 'Metrics (time-series counters), structured logs (contextual event records), and distributed traces (request flow across microservice boundaries) provide comprehensive observability.'
      },
      {
        id: 12,
        topic: 'Edge Caching & CDNs',
        prompt: 'Which HTTP header instructs Content Delivery Networks (CDNs) to cache a static asset for 30 days while revalidating stale items in the background?',
        options: [
          'Cache-Control: public, max-age=2592000, stale-while-revalidate=86400',
          'Cache-Control: no-store, private',
          'Pragma: no-cache',
          'Set-Cookie: session=active; Path=/'
        ],
        correctIndex: 0,
        explanation: 'max-age dictates the fresh TTL in seconds (2,592,000s = 30 days), and stale-while-revalidate serves cached assets instantly to clients while updating the edge cache asynchronously.'
      },
      {
        id: 13,
        topic: 'High Availability',
        prompt: 'What architectural design eliminates Single Points of Failure (SPOF) for cloud web applications?',
        options: [
          'Multi-availability zone redundant instances with health-checked load balancing and automated failover',
          'Deploying all backend services onto a single physical server in one building',
          'Disabling database replication to prevent data sync delays',
          'Running only one application thread per core'
        ],
        correctIndex: 0,
        explanation: 'Deploying across multiple isolated availability zones with automatic load balancing guarantees that if a single data center suffers an outage, healthy replicas seamlessly serve traffic.'
      },
      {
        id: 14,
        topic: 'Cloud Scalability',
        prompt: 'What is the key difference between Horizontal Scaling (Scale Out) and Vertical Scaling (Scale Up)?',
        options: [
          'Horizontal scaling adds more machine nodes to a cluster; vertical scaling increases the RAM/CPU specs of an existing single machine',
          'Horizontal scaling is only used for hard disk drives',
          'Vertical scaling requires rewiring electrical lines to the building',
          'Horizontal scaling can only run Python code'
        ],
        correctIndex: 0,
        explanation: 'Horizontal scaling achieves elastic capacity and redundancy by adding independent compute nodes, whereas vertical scaling is bounded by the physical limits of a single machine.'
      },
      {
        id: 15,
        topic: 'National Data Governance',
        prompt: 'Under national data protection and privacy standards in Rwanda, which obligation applies when collecting and processing citizen data?',
        options: [
          'Ensuring explicit lawful consent, data minimization, cryptographic storage protection, and auditability',
          'Publishing all citizen survey responses on public unencrypted FTP servers',
          'Selling demographic identifiers to commercial advertising exchanges without consent',
          'Disabling data retention logs to prevent regulatory audits'
        ],
        correctIndex: 0,
        explanation: 'Rwanda’s Law on Personal Data Protection and Privacy mandates clear lawful grounds for processing, encryption of sensitive personal indicators, and accountability throughout the data lifecycle.'
      }
    ]
  },
  {
    id: 'as-eng-beg',
    courseId: 'c4',
    title: 'Professional English Workplace Diagnostic (Beginner)',
    category: 'Languages & Communication',
    questionsCount: 15,
    duration: '30 mins',
    weight: 'Speaking & Grammar (30%) + Practical Dialogue (70%)',
    description: '15-question diagnostic covering workplace greetings, polite modal inquiries, email conventions, scheduling, and everyday office communication.',
    questions: [
      {
        id: 1,
        topic: 'Professional Greetings',
        prompt: 'Which greeting is most professional when meeting a new business partner for the first time in Kigali?',
        options: [
          '"Good morning, it is a pleasure to meet you."',
          '"Hey what is up?"',
          '"Why are you here today?"',
          '"Tell me what you want."'
        ],
        correctIndex: 0,
        explanation: '"Good morning, it is a pleasure to meet you." is polished, respectful, and standard for professional commercial engagements.'
      },
      {
        id: 2,
        topic: 'Polite Requests',
        prompt: 'How can you convert the direct command "Give me the invoice" into a courteous workplace request?',
        options: [
          '"Could you please share the invoice with me when you have a moment?"',
          '"Give invoice now or else."',
          '"I need invoice right away."',
          '"Invoice must be given."'
        ],
        correctIndex: 0,
        explanation: 'Using "Could you please..." with "when you have a moment" maintains professionalism and shows mutual workplace respect.'
      },
      {
        id: 3,
        topic: 'Clarification Techniques',
        prompt: 'What is the most polite phrasing to ask a speaker to repeat a deadline you did not hear clearly?',
        options: [
          '"Pardon me, could you please repeat the submission deadline?"',
          '"What?"',
          '"Speak louder, you are quiet."',
          '"I missed that completely, say it again."'
        ],
        correctIndex: 0,
        explanation: '"Pardon me, could you please repeat..." is universally accepted as courteous in international and bilingual business contexts.'
      },
      {
        id: 4,
        topic: 'Prepositions of Time',
        prompt: 'Which preposition pair correctly completes: "The training workshop commences _____ 09:00 AM _____ Monday"?',
        options: [
          '"at", "on"',
          '"in", "at"',
          '"on", "in"',
          '"by", "for"'
        ],
        correctIndex: 0,
        explanation: 'Clock times use the preposition "at" (at 09:00 AM) and days of the week use "on" (on Monday).'
      },
      {
        id: 5,
        topic: 'Present Continuous Tense',
        prompt: 'Which sentence correctly describes a task you are actively working on at this exact moment?',
        options: [
          '"I am currently updating the client database."',
          '"I update client database yesterday."',
          '"I was update client database tomorrow."',
          '"I will updating client database already."'
        ],
        correctIndex: 0,
        explanation: 'Present continuous ("am/is/are + verb-ing") describes ongoing actions occurring in the present moment.'
      },
      {
        id: 6,
        topic: 'Email Conventions',
        prompt: 'What does the acronym "ASAP" stand for in business messages?',
        options: [
          '"As Soon As Possible"',
          '"All Staff Are Present"',
          '"Always Send All Pages"',
          '"Ask Someone And Proceed"'
        ],
        correctIndex: 0,
        explanation: '"ASAP" is standard business shorthand for "As Soon As Possible".'
      },
      {
        id: 7,
        topic: 'Formal Email Sign-offs',
        prompt: 'Which closing phrase is appropriate for a formal letter or email to an executive partner?',
        options: [
          '"Sincerely," or "Best regards,"',
          '"Later on,"',
          '"Bye bye,"',
          '"Peace out,"'
        ],
        correctIndex: 0,
        explanation: '"Sincerely," and "Best regards," are standard formal closings for professional written communications.'
      },
      {
        id: 8,
        topic: 'Introducing Colleagues',
        prompt: 'How should you introduce your supervisor to an international visiting delegation?',
        options: [
          '"Allow me to introduce my director, Dr. Alice Mukamana."',
          '"This is Alice over there."',
          '"She works here too."',
          '"Meet the boss right now."'
        ],
        correctIndex: 0,
        explanation: '"Allow me to introduce [Title + Name]" reflects international business protocol and respectful deference.'
      },
      {
        id: 9,
        topic: 'Digital Attachments',
        prompt: 'What does the phrase "Please find attached the quarterly financial ledger" indicate to the recipient?',
        options: [
          '"The ledger is attached as a digital document with this email."',
          '"The ledger was deleted from the computer."',
          '"You must write the ledger by hand."',
          '"The ledger will arrive by postal mail next week."'
        ],
        correctIndex: 0,
        explanation: '"Please find attached..." tells the recipient that a file or document has been uploaded along with the email.'
      },
      {
        id: 10,
        topic: 'Modal Verbs of Ability',
        prompt: 'Which sentence correctly uses "can" to express technical capability?',
        options: [
          '"She can analyze survey data using Microsoft Excel."',
          '"She cans analyze data."',
          '"She can to analyzing data."',
          '"She coulded analyze data."'
        ],
        correctIndex: 0,
        explanation: 'Modal verbs like "can" take the bare infinitive without "to" or third-person "s" endings.'
      },
      {
        id: 11,
        topic: 'Telephone Etiquette',
        prompt: 'When answering an office phone call, which opening phrase is most professional?',
        options: [
          '"Good morning, The Hub Rwanda. This is Patrick speaking, how may I assist you?"',
          '"Hello, who is calling me?"',
          '"Yes, what do you want?"',
          '"Hold on, I am busy."'
        ],
        correctIndex: 0,
        explanation: 'Stating the organization name, your own name, and offering assistance ("How may I assist you?") is the gold standard for office telephone protocol.'
      },
      {
        id: 12,
        topic: 'Past Simple Tense',
        prompt: 'Which sentence correctly reports an action completed yesterday?',
        options: [
          '"We submitted the quarterly tax declarations yesterday afternoon."',
          '"We submit the declarations yesterday."',
          '"We are submit declarations yesterday."',
          '"We will submit declarations yesterday."'
        ],
        correctIndex: 0,
        explanation: 'Past simple ("submitted") is used for events that occurred and concluded at a specific time in the past.'
      },
      {
        id: 13,
        topic: 'Confirming Schedules',
        prompt: 'If a client asks "Is Thursday at 14:00 CAT convenient for you?", how can you confirm politely?',
        options: [
          '"Yes, Thursday at 14:00 CAT suits me perfectly. I will send a calendar invite."',
          '"No problem, whatever."',
          '"Maybe, maybe not."',
          '"I don’t care about the time."'
        ],
        correctIndex: 0,
        explanation: '"Thursday at 14:00 CAT suits me perfectly..." provides clear confirmation and proactive follow-through.'
      },
      {
        id: 14,
        topic: 'Expressing Apologies',
        prompt: 'How should you professionally apologize for an unforeseen delay in sending a requested file?',
        options: [
          '"I apologize for the delay. Thank you for your patience; please find the file attached."',
          '"My internet is always terrible so deal with it."',
          '"You should have reminded me."',
          '"It’s not my fault."'
        ],
        correctIndex: 0,
        explanation: 'Acknowledging the delay politely and thanking the client for their patience maintains positive stakeholder relations.'
      },
      {
        id: 15,
        topic: 'Asking for Assistance',
        prompt: 'What is the most collaborative way to ask a senior colleague for guidance on a task?',
        options: [
          '"Could you spare 10 minutes to review this draft with me? I would appreciate your guidance."',
          '"Do my work for me."',
          '"Why didn’t you teach me this?"',
          '"Fix this right now."'
        ],
        correctIndex: 0,
        explanation: '"Could you spare 10 minutes to review this draft..." respects their schedule while expressing genuine appreciation for mentorship.'
      }
    ]
  },
  {
    id: 'as-eng-int',
    courseId: 'c5',
    title: 'English for Business & Technology Diagnostic (Intermediate)',
    category: 'Languages & Communication',
    questionsCount: 15,
    duration: '35 mins',
    weight: 'Executive Writing (30%) + Agile Presentations (70%)',
    description: '15-question diagnostic evaluating agile standup communication, objective technical bug documentation, executive summaries, diplomatic debate, and client correspondence.',
    questions: [
      {
        id: 1,
        topic: 'Agile Standup Structure',
        prompt: 'In daily agile engineering standups, what three core questions must team members concisely address?',
        options: [
          '"What did you complete yesterday, what are you working on today, and what blockers impede your progress?"',
          '"How many lines of code did you write, who helped you, and what time did you arrive?"',
          '"What hardware did you purchase, what bugs were introduced, and who is to blame?"',
          '"When will the project launch, how much profit was made, and who is on leave?"'
        ],
        correctIndex: 0,
        explanation: 'Agile scrum standups strictly focus on past progress, present commitments, and impediments/blockers.'
      },
      {
        id: 2,
        topic: 'Objective Bug Documentation',
        prompt: 'Which sentence best demonstrates objective, professional tone in technical defect tracking?',
        options: [
          '"The API throws a 504 Gateway Timeout when processing concurrent batch uploads exceeding 500 records."',
          '"The backend is completely broken and badly designed."',
          '"Someone pushed terrible code that destroyed the server."',
          '"Users are crying because the upload button failed."'
        ],
        correctIndex: 0,
        explanation: 'Objective documentation states measurable telemetry, exact HTTP status codes, and precise conditions causing the defect.'
      },
      {
        id: 3,
        topic: 'Diplomatic Disagreement',
        prompt: 'Which phrasing best expresses professional disagreement during an architectural design review?',
        options: [
          '"While that framework offers rapid prototyping, we should also evaluate its long-term bundle size and maintenance overhead."',
          '"You have no idea what you are doing with that framework."',
          '"That idea is obsolete and nobody uses it."',
          '"I refuse to listen to this proposal."'
        ],
        correctIndex: 0,
        explanation: 'Acknowledging the merit of an alternative while introducing trade-offs ("While... we should also evaluate...") fosters constructive engineering debate.'
      },
      {
        id: 4,
        topic: 'First Conditional in Strategy',
        prompt: 'Which sentence correctly applies the first conditional to forecast a business outcome?',
        options: [
          '"If we migrate our databases to Cloud SQL, system latency will decrease by an estimated 25%."',
          '"If we migrate databases, latency decreased yesterday."',
          '"If we will migrate databases, latency will decreasing."',
          '"If we migrated databases, latency will have decreased."'
        ],
        correctIndex: 0,
        explanation: 'First conditional uses "If + Present Simple, will + base verb" to express realistic cause-and-effect projections.'
      },
      {
        id: 5,
        topic: 'Active Voice in Technical Writing',
        prompt: 'Why do international technical style guides (e.g., Google Developer Documentation) mandate the active voice?',
        options: [
          'Active voice identifies the acting subject clearly and reduces cognitive ambiguity for the reader',
          'Passive voice is grammatically illegal in technical papers',
          'Active voice is only allowed for Python code snippets',
          'Passive voice takes up more database storage'
        ],
        correctIndex: 0,
        explanation: 'Active voice creates direct, crisp documentation where the component performing the action is immediately obvious.'
      },
      {
        id: 6,
        topic: 'Executive Summaries',
        prompt: 'Where should the strategic bottom-line recommendation be placed in an executive summary?',
        options: [
          'In the opening paragraph, so busy decision-makers immediately grasp the core proposal',
          'Hidden in the appendix footnote on page 40',
          'Only revealed during in-person oral interviews',
          'Omitted entirely to build suspense'
        ],
        correctIndex: 0,
        explanation: 'Executive summaries follow an inverted pyramid structure, presenting the recommendation and business impact upfront.'
      },
      {
        id: 7,
        topic: 'Workplace Phrasal Verbs',
        prompt: 'What does the phrasal verb "to call off a meeting" mean in corporate communication?',
        options: [
          'To cancel the meeting completely',
          'To move the meeting to an earlier hour',
          'To record the meeting audio',
          'To invite additional participants'
        ],
        correctIndex: 0,
        explanation: '"To call off" means to cancel. In contrast, "to push back" means to postpone, and "to bring forward" means to reschedule earlier.'
      },
      {
        id: 8,
        topic: 'Technical Idioms',
        prompt: 'What does the industry concept "technical debt" signify?',
        options: [
          'The implied future cost of rework caused by choosing an expedited shortcut now instead of a scalable long-term approach',
          'Overdue invoices owed to cloud hosting providers',
          'A financial loan taken out to purchase developer laptops',
          'Taxes paid on software licenses'
        ],
        correctIndex: 0,
        explanation: 'Technical debt reflects engineering trade-offs that sacrifice code maintainability for short-term speed, accruing future refactoring costs.'
      },
      {
        id: 9,
        topic: 'Diplomatic Scope Management',
        prompt: 'How can an engineering team leader professionally inform a client that a newly requested feature cannot be added without shifting the launch date?',
        options: [
          '"We would be delighted to include this feature; however, doing so will require extending our delivery timeline by two weeks or deprioritizing module 3."',
          '"No, we cannot do that because you didn’t ask earlier."',
          '"Stop changing your mind every week."',
          '"That feature is impossible to build."'
        ],
        correctIndex: 0,
        explanation: 'Presenting clear trade-offs between scope, timeline, and resources allows the client to make an informed executive choice diplomatically.'
      },
      {
        id: 10,
        topic: 'Modal Verbs of Deduction',
        prompt: 'Which sentence correctly expresses logical certainty based on technical evidence?',
        options: [
          '"The test suite is passing all 120 assertions; the deployment build must be stable."',
          '"The build must to be stable."',
          '"The build should to have be stable."',
          '"The build musting be stable."'
        ],
        correctIndex: 0,
        explanation: '"Must + base verb" indicates strong logical deduction based on empirical evidence.'
      },
      {
        id: 11,
        topic: 'Synthesizing Action Items',
        prompt: 'When compiling meeting minutes, how should action items be formatted for maximum accountability?',
        options: [
          'With an imperative action verb, an assigned owner, and a specific deadline (e.g. "[Action] Eric M. to finalize SQL schema by Thursday 17:00 CAT")',
          'As a general paragraph without names or dates',
          'By transcribing every word spoken during the call',
          'By listing only the snacks provided at the meeting'
        ],
        correctIndex: 0,
        explanation: 'Action items require clear ownership (who), specific task boundaries (what), and firm deadlines (when).'
      },
      {
        id: 12,
        topic: 'Second Conditional in Risk Assessment',
        prompt: 'Which sentence correctly uses the second conditional to assess a hypothetical architectural risk?',
        options: [
          '"If our primary data center went offline, our secondary replica would assume traffic within 30 seconds."',
          '"If our data center go offline, replica assumed traffic."',
          '"If our data center will go offline, replica will assume traffic."',
          '"If our data center goes offline, replica would assumed traffic."'
        ],
        correctIndex: 0,
        explanation: 'Second conditional ("If + Past Simple, would + base verb") assesses hypothetical scenarios and risk mitigation plans.'
      },
      {
        id: 13,
        topic: 'Technical Presentation Transitions',
        prompt: 'Which transition phrase effectively guides an executive audience from system architecture to financial cost analysis?',
        options: [
          '"Now that we have reviewed system architecture, let us turn our attention to the projected cost and infrastructure savings."',
          '"Forget about architecture, here is the money part."',
          '"I am done talking about servers now."',
          '"Next slide please, nothing else matters."'
        ],
        correctIndex: 0,
        explanation: 'Smooth signposting ("Now that we have reviewed X, let us turn our attention to Y") maintains audience orientation and narrative cohesion.'
      },
      {
        id: 14,
        topic: 'Nuanced Email Inquiries',
        prompt: 'How can you ask an external partner for an update on a pending contract without sounding aggressive?',
        options: [
          '"I am writing to politely follow up on the status of the partnership agreement sent last Tuesday. Please let us know if any further clarification is required."',
          '"Why haven’t you signed the contract yet?"',
          '"Send the signed agreement right now."',
          '"You are holding up our entire launch schedule."'
        ],
        correctIndex: 0,
        explanation: 'Polite follow-ups reference the previous communication date and offer assistance, maintaining professional momentum.'
      },
      {
        id: 15,
        topic: 'Handling Challenging Q&A',
        prompt: 'If an investor or stakeholder asks a technical question during a presentation that you do not know the answer to, what is the best response?',
        options: [
          '"That is an insightful question. I do not have the exact benchmark figures with me right now, but I will verify with our engineering team and follow up by end of day."',
          '"Make up an answer on the spot and hope they don’t notice."',
          '"That question is irrelevant to this presentation."',
          '"Why don’t you answer it yourself?"'
        ],
        correctIndex: 0,
        explanation: 'Transparently acknowledging that you will confirm and follow up demonstrates honesty, composure, and professional accountability.'
      }
    ]
  }
];
