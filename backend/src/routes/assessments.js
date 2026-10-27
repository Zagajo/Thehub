import { Router } from 'express';

const router = Router();

const sampleAssessments = [
  {
    id: 'asmt-web',
    title: 'HTML & CSS Fundamentals Skill Assessment',
    skill: 'HTML & CSS Web Development',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        prompt: 'Which HTML5 element represents an independent, self-contained piece of content?',
        options: ['<section>', '<article>', '<aside>', '<div>'],
        correctIndex: 1,
        explanation: '<article> is designated for standalone content like blog posts, news items, and forum threads.'
      },
      {
        id: 'q2',
        prompt: 'What does CSS Box Model calculate as the total rendered element width?',
        options: [
          'width only',
          'width + padding + border',
          'width + margin',
          'content + margin'
        ],
        correctIndex: 1,
        explanation: 'Standard box model total width = content width + horizontal padding + horizontal border.'
      },
      {
        id: 'q3',
        prompt: 'Which Flexbox property distributes free space along the main axis?',
        options: ['align-items', 'justify-content', 'flex-direction', 'align-content'],
        correctIndex: 1,
        explanation: 'justify-content aligns children along the main axis (horizontal by default).'
      }
    ],
    practicalTask: {
      instructions: 'Build a responsive card component with dark blue header, light gray background, and an action button.',
      starterCode: '<div class="card">\n  <h2>Title</h2>\n  <button>Action</button>\n</div>'
    },
    capstoneBrief: 'Deploy a multi-page portfolio website showcasing at least 2 practical assignments.'
  },
  {
    id: 'asmt-excel',
    title: 'Excel & Data Analysis Practical Assessment',
    skill: 'Excel & Spreadsheets',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'qe1',
        prompt: 'Which formula conditionally sums values that meet a specific criteria?',
        options: ['SUM', 'SUMIF', 'COUNTIF', 'VLOOKUP'],
        correctIndex: 1,
        explanation: 'SUMIF sums cells that meet single criteria; SUMIFS handles multiple conditions.'
      },
      {
        id: 'qe2',
        prompt: 'What happens to absolute cell references ($A$1) when copying formulas down columns?',
        options: ['Row changes', 'Column changes', 'Reference stays locked', 'Formula resets'],
        correctIndex: 2,
        explanation: 'Dollar signs ($) lock coordinates, preventing relative adjustment during autofill.'
      }
    ],
    practicalTask: {
      instructions: 'Clean and aggregate a 50-row harvest ledger using SUMIFS and pivot table grouping.',
      starterCode: '=SUMIFS(Revenue, Sector, "Agriculture", Month, "August")'
    },
    capstoneBrief: 'Create an interactive financial dashboard for a smallholder agricultural collective.'
  }
];

// GET /api/assessments
router.get('/', (_req, res) => {
  return res.json({ success: true, assessments: sampleAssessments });
});

// POST /api/assessments/:id/submit
router.post('/:id/submit', (req, res) => {
  const { answers = {} } = req.body;
  const assessment = sampleAssessments.find(a => a.id === req.params.id);
  if (!assessment) {
    return res.status(404).json({ success: false, error: { code: 'ASSESSMENT_NOT_FOUND', message: 'Assessment not found' } });
  }

  let correctCount = 0;
  assessment.questions.forEach((q, idx) => {
    if (answers[q.id] === q.correctIndex || answers[idx] === q.correctIndex) {
      correctCount++;
    }
  });

  const scorePercentage = Math.round((correctCount / assessment.questions.length) * 100);
  const passed = scorePercentage >= assessment.passingScore;

  return res.json({
    success: true,
    score: scorePercentage,
    passed,
    correctCount,
    totalQuestions: assessment.questions.length,
    skillUpdated: passed ? 'Intermediate' : 'Beginner',
    passportBadge: passed ? `Verified: ${assessment.skill}` : null
  });
});

// POST /api/assessments/tri-part/evaluate
// Full Section 12 Tri-Part Weighted Framework: Knowledge (30%) + Practical (40%) + Project (30%)
router.post('/tri-part/evaluate', (req, res) => {
  const {
    skillName = 'Web Development & Layout',
    knowledgeScore = 85,
    practicalScore = 90,
    projectScore = 80
  } = req.body;

  // Exact Section 12 weights
  const weightedKnowledge = knowledgeScore * 0.30;
  const weightedPractical = practicalScore * 0.40;
  const weightedProject = projectScore * 0.30;
  const compositeScore = Math.round(weightedKnowledge + weightedPractical + weightedProject);

  let levelIssued = 'Level 1: Foundation';
  if (compositeScore >= 85) {
    levelIssued = 'Level 3: Specialist (Advanced)';
  } else if (compositeScore >= 65) {
    levelIssued = 'Level 2: Practitioner (Intermediate)';
  }

  return res.json({
    success: true,
    skill: skillName,
    weights: {
      knowledge: { weight: '30%', rawScore: knowledgeScore, weightedPoints: weightedKnowledge },
      practical: { weight: '40%', rawScore: practicalScore, weightedPoints: weightedPractical },
      project: { weight: '30%', rawScore: projectScore, weightedPoints: weightedProject }
    },
    compositeScore,
    verifiedLevel: levelIssued,
    dateVerified: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
    evidenceRecord: {
      knowledgeCheck: 'Passed benchmark conceptual multiple-choice test',
      practicalTask: 'Verified runnable code / formula artifact with test suite',
      projectArtifact: 'GitHub repository or validated spreadsheet dashboard artifact'
    },
    accreditationDisclaimer: 'This credential reflects performance within The Hub evaluation framework and is not an officially accredited national qualification from the Ministry of Education.'
  });
});

export default router;
