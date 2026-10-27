// Comprehensive Courses, Subtopics with Explanatory Notes, and 10-Question Module Quizzes
// Designed for The Hub Enterprise Learning Platform with IBM Design System standards.

export const coursesData = [
  {
    id: 'c1',
    slug: 'fullstack-python-react',
    title: 'Full-Stack Web Engineering (Python & React)',
    category: 'Software Engineering',
    difficulty: 'Intermediate',
    duration: '8 Weeks',
    enrolled: 1420,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'Master modern full-stack web development with asynchronous Python FastAPI backends and high-performance React frontends. Aligned with Rwanda’s national digital acceleration and services sector targets.',
    modules: [
      {
        id: 'c1-m1',
        title: 'Module 1: Advanced Python & FastAPI Fundamentals',
        duration: '2 Weeks',
        notes: 'In-depth mastery of async/await paradigms in Python 3.12, strict data validation with Pydantic v2, dependency injection, and RESTful routing architecture.',
        videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
        subtopics: [
          {
            id: 'c1-m1-s1',
            title: '1. Asynchronous I/O & The Python Event Loop',
            duration: '25 mins',
            type: 'reading',
            notes: {
              overview: 'Understand how Python handles concurrent I/O operations through the asyncio event loop without spawning heavy operating system threads.',
              coreConcepts: [
                'Non-blocking concurrency vs CPU-bound parallel execution in CPython.',
                'Coroutines: functions defined with async def and awaited with await keyword.',
                'Event loop mechanics: scheduling tasks, cooperative multitasking, and avoiding blocking calls like time.sleep().'
              ],
              practicalExample: `import asyncio\nimport httpx\n\nasync def fetch_nisr_indicator(indicator_id: str) -> dict:\n    async with httpx.AsyncClient() as client:\n        response = await client.get(f"https://api.thehub.rw/nisr/{indicator_id}")\n        return response.json()\n\nasync def main():\n    results = await asyncio.gather(\n        fetch_nisr_indicator("LFS-EMP-SRV"),\n        fetch_nisr_indicator("ICT-ACCESS")\n    )\n    print("Fetched Indicators:", results)`,
              rwandanContext: 'High-concurrency async endpoints are essential for fintech and mobile money reconciliation services operating across Rwandan telecom APIs (MTN MoMo and Airtel Money).',
              keyTakeaways: [
                'Always use non-blocking async libraries (httpx, asyncpg) inside async route handlers.',
                'Cpu-heavy calculations should be offloaded to worker processes or background tasks to prevent freezing the event loop.'
              ]
            }
          },
          {
            id: 'c1-m1-s2',
            title: '2. Pydantic v2 Schema Modeling & Data Validation',
            duration: '35 mins',
            type: 'code',
            notes: {
              overview: 'Leverage Pydantic v2 (Rust-backed core) to enforce strict schema types, automatic JSON parsing, serialization, and field-level validation at the API boundary.',
              coreConcepts: [
                'BaseModel inheritance and type annotations (str, int, EmailStr, HttpUrl).',
                'Field constraints with Field(..., ge=0, le=100, description="...").',
                'Custom field validators using @field_validator and model validators with @model_validator.',
                'ConfigDict configurations for immutable schemas and ORM mode serialization.'
              ],
              practicalExample: `from pydantic import BaseModel, EmailStr, Field, field_validator\n\nclass LearnerEnrollmentSchema(BaseModel):\n    learner_id: str\n    email: EmailStr\n    district: str = Field(..., min_length=2)\n    benchmark_score: int = Field(ge=0, le=100)\n\n    @field_validator("district")\n    def validate_rwanda_district(cls, v: str) -> str:\n        if not v.strip():\n            raise ValueError("District name cannot be blank")\n        return v.title()`,
              rwandanContext: 'Validating district, national ID formats, and mobile numbers upfront prevents corrupted records in decentralized Rwandan cooperative registries.',
              keyTakeaways: [
                'Separate inbound request schemas from outbound response schemas to protect sensitive fields like password hashes.',
                'Pydantic v2 provides up to 10x faster serialization performance over v1.'
              ]
            }
          },
          {
            id: 'c1-m1-s3',
            title: '3. FastAPI Dependency Injection & Route Architecture',
            duration: '30 mins',
            type: 'practice',
            notes: {
              overview: 'Harness FastAPI’s built-in Depends() system for database session management, role-based authorization, rate limiting, and centralized error handling.',
              coreConcepts: [
                'Dependency trees and yields: setting up database sessions and ensuring clean teardown.',
                'Security dependencies using OAuth2PasswordBearer and JWT token decoders.',
                'Modular APIRouter structuring for maintainable enterprise application trees.'
              ],
              practicalExample: `from fastapi import Depends, HTTPException, status, APIRouter\nfrom typing import Annotated\n\nrouter = APIRouter(prefix="/api/v1/courses", tags=["Courses"])\n\nasync def verify_auth_token(token: str = Depends(oauth2_scheme)):\n    user = decode_jwt_token(token)\n    if not user:\n        raise HTTPException(status_code=401, detail="Invalid credential")\n    return user\n\n@router.get("/")\nasync def list_courses(current_user: Annotated[dict, Depends(verify_auth_token)]):\n    return {"user": current_user["email"], "courses": []}`,
              rwandanContext: 'Role-based route dependencies enable strict separation between Kigali administrative reviewers and national learners.',
              keyTakeaways: [
                'Dependencies can be nested infinitely and FastAPI resolves sub-dependencies automatically.',
                'Yield dependencies guarantee that resource release code runs even if exceptions occur.'
              ]
            }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the primary architectural advantage of Python’s asyncio event loop over multi-threading for I/O operations?',
            options: [
              'It eliminates the need for Python byte-code compilation',
              'It enables high concurrency with minimal memory overhead by avoiding thread context switching',
              'It bypasses the Python Global Interpreter Lock (GIL) for CPU-bound computations',
              'It automatically converts all synchronous database queries into compiled C extensions'
            ],
            correctAnswer: 1,
            explanation: 'Asyncio uses cooperative multitasking where a single thread switches between I/O bound tasks when awaiting data, drastically reducing memory overhead compared to OS threads.'
          },
          {
            id: 'q2',
            question: 'What happens if a developer executes time.sleep(5) inside an async def FastAPI route handler?',
            options: [
              'FastAPI automatically moves the function into an isolated background thread',
              'The entire event loop is blocked for 5 seconds, delaying all concurrent requests',
              'An asynchronous runtime exception is immediately raised',
              'FastAPI converts time.sleep into asyncio.sleep transparently'
            ],
            correctAnswer: 1,
            explanation: 'time.sleep() is a synchronous blocking call that halts the thread running the event loop. In async code, asyncio.sleep() must always be awaited.'
          },
          {
            id: 'q3',
            question: 'Which Pydantic component in v2 is used to validate that an integer field remains between 0 and 100?',
            options: [
              'Field(..., ge=0, le=100)',
              'Constraint(range=[0, 100])',
              'ValueCheck(min=0, max=100)',
              'Rule(bounds=(0, 100))'
            ],
            correctAnswer: 0,
            explanation: 'Pydantic uses Field(..., ge=0, le=100) where ge means "greater than or equal" and le means "less than or equal".'
          },
          {
            id: 'q4',
            question: 'In FastAPI, what is the role of the Depends() function in route parameters?',
            options: [
              'It creates an external database migration script',
              'It specifies required npm client packages',
              'It declares a dependency callable that FastAPI executes before running the route logic',
              'It enforces TypeScript compilation on the client side'
            ],
            correctAnswer: 2,
            explanation: 'FastAPI resolves dependencies declared with Depends(), executing authentication checks, database session creation, or parameter parsing before invoking the route handler.'
          },
          {
            id: 'q5',
            question: 'How do yield dependencies in FastAPI ensure that database connections are properly returned to a connection pool?',
            options: [
              'They kill the database process after every HTTP request',
              'Code following the yield statement runs during response cleanup even if errors occurred',
              'FastAPI relies on Linux kernel garbage collection',
              'Yield dependencies write connections to disk storage'
            ],
            correctAnswer: 1,
            explanation: 'In a generator dependency using yield, the code before yield executes before the endpoint, and the code after yield (e.g., db.close()) executes when the request finishes.'
          },
          {
            id: 'q6',
            question: 'What is the correct HTTP status code to return when a client provides invalid or malformed payload data?',
            options: [
              '401 Unauthorized',
              '422 Unprocessable Entity (or 400 Bad Request)',
              '500 Internal Server Error',
              '301 Moved Permanently'
            ],
            correctAnswer: 1,
            explanation: 'FastAPI returns 422 Unprocessable Entity by default when incoming request payloads fail Pydantic schema validation.'
          },
          {
            id: 'q7',
            question: 'Which decorator is used in Pydantic v2 to define a custom validator on a specific model field?',
            options: [
              '@validator_field',
              '@field_validator',
              '@check_attribute',
              '@verify_column'
            ],
            correctAnswer: 1,
            explanation: 'Pydantic v2 introduced @field_validator to replace the deprecated @validator decorator from v1.'
          },
          {
            id: 'q8',
            question: 'Why should sensitive fields like password_hash be excluded from outbound Pydantic response models?',
            options: [
              'Because JSON cannot serialize hashed string characters',
              'To prevent accidental credential leaks in client API responses',
              'Because hashing consumes too much client memory bandwidth',
              'FastAPI will reject responses containing strings longer than 32 characters'
            ],
            correctAnswer: 1,
            explanation: 'Excluding password hashes and private keys from response schemas prevents accidental exposure of sensitive security credentials to API clients.'
          },
          {
            id: 'q9',
            question: 'How does APIRouter assist in large-scale FastAPI codebase organization?',
            options: [
              'It allows splitting routes into modular files grouped by resource domain or version',
              'It compiles Python code into native WebAssembly binaries',
              'It replaces the need for a web server like Uvicorn',
              'It forces all database operations into SQLite format'
            ],
            correctAnswer: 0,
            explanation: 'APIRouter modularizes route definitions into distinct domain-specific files (e.g., auth_router, courses_router) that are mounted onto the main FastAPI app.'
          },
          {
            id: 'q10',
            question: 'What is the minimum score required on this 10-question module quiz to unlock Module 2?',
            options: [
              '5 out of 10 (50%)',
              '6 out of 10 (60%)',
              '8 out of 10 (80%)',
              '10 out of 10 (100% only)'
            ],
            correctAnswer: 2,
            explanation: 'The Hub strict enterprise policy mandates scoring at least 8 out of 10 (80%) to ensure verified mastery before advancing to subsequent modules.'
          }
        ]
      },
      {
        id: 'c1-m2',
        title: 'Module 2: Relational Databases & PostgreSQL Optimization',
        duration: '2 Weeks',
        notes: 'Relational data modeling, ACID transactions, index optimization (B-tree, GIN), connection pooling, and asynchronous SQLAlchemy 2.0 ORM patterns.',
        videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
        subtopics: [
          {
            id: 'c1-m2-s1',
            title: '1. Relational Schema Normalization & Constraint Design',
            duration: '30 mins',
            type: 'reading',
            notes: {
              overview: 'Design 3rd Normal Form (3NF) relational schemas with foreign keys, cascading constraints, composite primary keys, and audit timestamps.',
              coreConcepts: [
                'Primary keys, foreign keys, unique constraints, and check constraints.',
                'Normal forms: removing repeating groups (1NF), partial dependencies (2NF), and transitive dependencies (3NF).',
                'UUID vs auto-incrementing BIGSERIAL primary keys in distributed systems.'
              ],
              practicalExample: `CREATE TABLE learners (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    national_id VARCHAR(16) UNIQUE NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    district VARCHAR(64) NOT NULL,\n    created_at TIMESTAMPTZ DEFAULT NOW()\n);\n\nCREATE TABLE course_progress (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    learner_id UUID NOT NULL REFERENCES learners(id) ON DELETE CASCADE,\n    course_id VARCHAR(64) NOT NULL,\n    module_index INT NOT NULL CHECK (module_index >= 0),\n    score INT NOT NULL CHECK (score >= 0 AND score <= 10),\n    passed BOOLEAN NOT NULL DEFAULT FALSE,\n    updated_at TIMESTAMPTZ DEFAULT NOW(),\n    UNIQUE(learner_id, course_id, module_index)\n);`,
              rwandanContext: 'Storing Rwandan National ID (16 digits) with unique constraints prevents duplicate subsidy disbursements or multiple certificate claims.',
              keyTakeaways: [
                'Always enforce integrity constraints at the database level rather than relying solely on client validation.',
                'Use TIMESTAMPTZ for all dates to maintain unambiguous UTC timestamps across regional timezones.'
              ]
            }
          },
          {
            id: 'c1-m2-s2',
            title: '2. Indexing Strategies & Query Execution Plans',
            duration: '35 mins',
            type: 'code',
            notes: {
              overview: 'Optimize query throughput using PostgreSQL EXPLAIN ANALYZE, B-tree indexes, composite indexes, and partial indexes for high-frequency queries.',
              coreConcepts: [
                'Sequential scans vs Index scans vs Bitmap index scans.',
                'B-Tree indexes for equality (=) and range (<, >, BETWEEN) lookups.',
                'Partial indexes (CREATE INDEX ON ... WHERE passed = true) to minimize index memory usage.'
              ],
              practicalExample: `-- Create index on frequently queried foreign key & filtering column\nCREATE INDEX idx_progress_learner ON course_progress (learner_id, passed);\n\n-- Inspect query execution plan and buffer cache hits\nEXPLAIN (ANALYZE, BUFFERS)\nSELECT course_id, score, passed \nFROM course_progress \nWHERE learner_id = '550e8400-e29b-41d4-a716-446655440000'\n  AND passed = true;`,
              rwandanContext: 'Optimized indexes enable national registries with hundreds of thousands of learners across 30 districts to return instant results on low-bandwidth connections.',
              keyTakeaways: [
                'Do not over-index: every index adds overhead to INSERT, UPDATE, and DELETE operations.',
                'Examine the cost metric in EXPLAIN plans to confirm the database engine is utilizing indexes effectively.'
              ]
            }
          },
          {
            id: 'c1-m2-s3',
            title: '3. Connection Pooling & Async SQLAlchemy 2.0',
            duration: '35 mins',
            type: 'practice',
            notes: {
              overview: 'Configure async database engines with connection pooling (e.g. asyncpg + PgBouncer) and type-safe SQLAlchemy 2.0 select statements.',
              coreConcepts: [
                'Connection pool parameters: pool_size, max_overflow, and pool_recycle.',
                'DeclarativeBase mapping with mapped_column and Mapped[type] typing.',
                'Executing atomic transactions with session.begin() context blocks.'
              ],
              practicalExample: `from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession\nfrom sqlalchemy import select\n\nDATABASE_URL = "postgresql+asyncpg://postgres:secret@localhost:5432/thehub"\n\nengine = create_async_engine(DATABASE_URL, pool_size=10, max_overflow=20)\nAsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)\n\nasync def get_learner_progress(session: AsyncSession, learner_id: str):\n    stmt = select(CourseProgress).where(CourseProgress.learner_id == learner_id)\n    result = await session.execute(stmt)\n    return result.scalars().all()`,
              rwandanContext: 'Connection pooling prevents backend services from crashing during national examination and certificate issuance surges.',
              keyTakeaways: [
                'Never create a new database connection per HTTP request; always reuse pooled connections.',
                'Always use parameter binding in ORM queries to prevent SQL injection vulnerabilities.'
              ]
            }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the primary role of a FOREIGN KEY constraint with ON DELETE CASCADE?',
            options: [
              'It encrypts child records on deletion',
              'It automatically deletes corresponding child rows when a referenced parent row is deleted',
              'It prevents any deletion of the parent row under all circumstances',
              'It duplicates child rows into an archive database'
            ],
            correctAnswer: 1,
            explanation: 'ON DELETE CASCADE instructs the relational engine to automatically delete associated child rows when the parent entity is removed, preserving referential integrity.'
          },
          {
            id: 'q2',
            question: 'When should a B-Tree index typically be preferred in PostgreSQL?',
            options: [
              'Only for full-text document searches in natural language',
              'For equality (=) and range (<, >, BETWEEN) comparisons on sortable data types',
              'Exclusively for geospatial geometric polygons',
              'Only for tables containing fewer than 10 rows'
            ],
            correctAnswer: 1,
            explanation: 'B-Tree is the default PostgreSQL index structure, ideal for equality lookups, range filters, and ORDER BY queries.'
          },
          {
            id: 'q3',
            question: 'What command in PostgreSQL provides actual execution timings and buffer usage for a query?',
            options: [
              'PROFILE QUERY',
              'SHOW QUERY TIME',
              'EXPLAIN ANALYZE',
              'DEBUG SQL'
            ],
            correctAnswer: 2,
            explanation: 'EXPLAIN ANALYZE actually executes the statement, returning precise node runtimes, row counts, and plan details.'
          },
          {
            id: 'q4',
            question: 'Why is connection pooling critical in an enterprise application server running behind high concurrency?',
            options: [
              'Opening a new PostgreSQL TCP connection and TLS handshake for every HTTP request is slow and resource-intensive',
              'PostgreSQL only allows a maximum of 3 concurrent connections globally',
              'Connection pools permanently cache query results on the hard disk',
              'Connection pools bypass the need for SQL authentication credentials'
            ],
            correctAnswer: 0,
            explanation: 'Opening physical database connections involves process spawning, authentication, and memory allocation. Connection pools maintain warm connections to reuse instantly.'
          },
          {
            id: 'q5',
            question: 'What database property guarantees that a transaction either commits completely or rolls back entirely with no partial state?',
            options: [
              'Durability',
              'Atomicity',
              'Consistency',
              'Isolation'
            ],
            correctAnswer: 1,
            explanation: 'Atomicity (the "A" in ACID) ensures all statements in a transaction succeed together, or the entire transaction is rolled back if any statement fails.'
          },
          {
            id: 'q6',
            question: 'What is the advantage of using TIMESTAMPTZ instead of TIMESTAMP in PostgreSQL?',
            options: [
              'TIMESTAMPTZ converts timestamps to UTC internally and respects client timezone offsets',
              'TIMESTAMPTZ uses half the disk space of TIMESTAMP',
              'TIMESTAMPTZ prevents any future dates from being recorded',
              'TIMESTAMPTZ stores dates only as Unix epoch integers'
            ],
            correctAnswer: 0,
            explanation: 'TIMESTAMPTZ stores time with timezone awareness normalized to UTC, preventing ambiguous time calculations across different geographic regions.'
          },
          {
            id: 'q7',
            question: 'What is a "partial index" in PostgreSQL?',
            options: [
              'An index that covers only the first 3 characters of a string',
              'An index constructed over a subset of rows defined by a WHERE clause',
              'An index that functions only when the database server is running in read-only mode',
              'An index created on only half of the database tables'
            ],
            correctAnswer: 1,
            explanation: 'A partial index includes only rows matching a specific condition (e.g. WHERE active = true), saving storage space and speeding up targeted queries.'
          },
          {
            id: 'q8',
            question: 'In 3rd Normal Form (3NF), what type of dependency must be eliminated?',
            options: [
              'Dependencies on the primary key',
              'Transitive dependencies where a non-key attribute depends on another non-key attribute',
              'Foreign key relationships to external lookup tables',
              'Unique constraints on email columns'
            ],
            correctAnswer: 1,
            explanation: '3NF requires that every non-key column depends directly on the primary key, eliminating transitive dependencies between non-key columns.'
          },
          {
            id: 'q9',
            question: 'How does parameterized SQL query execution protect applications against SQL injection attacks?',
            options: [
              'It scrambles the SQL query using ROT13 encryption',
              'It treats user input strictly as literal values rather than executable code tokens',
              'It limits user input length to 10 characters',
              'It deletes any input containing punctuation marks'
            ],
            correctAnswer: 1,
            explanation: 'Parameterized queries transmit SQL structure and user input separately, ensuring user data is never parsed or executed as SQL commands.'
          },
          {
            id: 'q10',
            question: 'What is the required passing score on this quiz to unlock Module 3?',
            options: [
              '6 / 10',
              '7 / 10',
              '8 / 10 (80%)',
              '10 / 10 only'
            ],
            correctAnswer: 2,
            explanation: 'All modules in The Hub require scoring at least 8 out of 10 (80%) on the 10-question evaluation quiz to advance.'
          }
        ]
      },
      {
        id: 'c1-m3',
        title: 'Module 3: React UI Architecture & Tailwind CSS',
        duration: '2 Weeks',
        notes: 'Component decomposition, custom hooks, unidirectional data flow, responsive layout grids, and enterprise accessibility (WCAG AA).',
        videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
        subtopics: [
          {
            id: 'c1-m3-s1',
            title: '1. Modular Component Hierarchy & Custom Hooks',
            duration: '25 mins',
            type: 'reading',
            notes: {
              overview: 'Decompose complex enterprise interfaces into decoupled presentation components and reusable custom hooks that encapsulate stateful business logic.',
              coreConcepts: [
                'Separation of concerns: smart container components vs dumb presentation components.',
                'Encapsulating async data fetching, error handling, and cancellation in custom hooks (e.g., useCourseProgress).',
                'Proper dependency arrays in useEffect to prevent infinite render loops.'
              ],
              practicalExample: `import { useState, useEffect } from 'react';\n\nexport function useCourseProgress(userId, courseId) {\n  const [progress, setProgress] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    let isMounted = true;\n    async function load() {\n      try {\n        const res = await fetch(\`/api/courses/quiz-progress?userId=\${userId}&courseId=\${courseId}\`);\n        const data = await res.json();\n        if (isMounted) setProgress(data);\n      } finally {\n        if (isMounted) setLoading(false);\n      }\n    }\n    if (userId && courseId) load();\n    return () => { isMounted = false; };\n  }, [userId, courseId]);\n\n  return { progress, loading };\n}`,
              rwandanContext: 'Clean custom hooks allow offline fallback state logic to be shared across courses, assessments, and passport verification components.',
              keyTakeaways: [
                'Keep presentation components purely functional; derive values during render rather than syncing redundant state.',
                'Always provide cleanup functions in effects to avoid memory leaks when components unmount.'
              ]
            }
          },
          {
            id: 'c1-m3-s2',
            title: '2. Tailwind CSS Enterprise Grid & Design Tokens',
            duration: '30 mins',
            type: 'code',
            notes: {
              overview: 'Implement scalable layout architecture with Tailwind CSS utility classes, adhering to the IBM Carbon design tokens, crisp 1px borders, and responsive 12-column grids.',
              coreConcepts: [
                'Responsive breakpoints: mobile-first design (sm, md, lg, xl).',
                'Design token discipline: high contrast, neutral canvases (#F4F4F4 / #0F172A), and interactive blue accents (#0F62FE).',
                'Zero-pill discipline: unboxed metadata with typographic separators rather than generic rounded badges.'
              ],
              practicalExample: `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">\n  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4">\n    <div>\n      <span className="text-xs font-mono uppercase tracking-wider text-blue-700">Enterprise Curriculum</span>\n      <h1 className="text-2xl font-bold text-slate-900">Module Verification Dashboard</h1>\n    </div>\n    <div className="mt-3 md:mt-0 flex items-center space-x-2">\n      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition-colors">\n        Export Report\n      </button>\n    </div>\n  </div>\n</div>`,
              rwandanContext: 'Mobile-responsive enterprise grids ensure that students accessing The Hub from smartphones in secondary school labs experience the exact same structured layout as desktop users.',
              keyTakeaways: [
                'Use container queries and responsive flex/grid wrappers to prevent content clipping.',
                'Prioritize semantic color usage: green for verified states, blue for active actions, amber for pending reviews.'
              ]
            }
          },
          {
            id: 'c1-m3-s3',
            title: '3. Web Accessibility (WCAG 2.1 AA) & Keyboard Navigation',
            duration: '30 mins',
            type: 'practice',
            notes: {
              overview: 'Guarantee inclusive access for all learners by implementing visible focus indicators, ARIA roles, semantic HTML, and full keyboard navigational support.',
              coreConcepts: [
                'Visible focus rings: focus-visible:ring-2 focus-visible:ring-blue-600 focus:outline-none.',
                'Color contrast ratio: minimum 4.5:1 for body text and 3:1 for large display headlines.',
                'Accessible forms: explicit <label htmlFor="..."> associations and aria-describedby for errors.'
              ],
              practicalExample: `<button\n  type="button"\n  onClick={handleStartQuiz}\n  aria-label="Start Module 1 Multiple Choice Quiz"\n  className="focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 outline-none px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs uppercase tracking-wider transition-colors"\n>\n  Start Assessment Quiz\n</button>`,
              rwandanContext: 'Adhering to accessibility standards ensures platform compliance with Rwanda National Council of Persons with Disabilities guidelines.',
              keyTakeaways: [
                'Never suppress outline with outline-none without providing an equivalent focus-visible ring.',
                'Every interactive element must be reachable and operable via the Tab and Enter/Space keys.'
              ]
            }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the primary motivation for creating a custom React hook?',
            options: [
              'To speed up CSS animations in WebGL canvases',
              'To extract and reuse stateful logic across multiple components without duplicating code',
              'To compile React components into native iOS Swift code',
              'To bypass the browser’s single-threaded JavaScript engine'
            ],
            correctAnswer: 1,
            explanation: 'Custom hooks let developers extract component state and side-effects into reusable functions that can be shared across multiple components.'
          },
          {
            id: 'q2',
            question: 'What occurs if an empty dependency array [] is passed to useEffect in React?',
            options: [
              'The effect runs on every single component re-render',
              'The effect runs only once after the initial mount',
              'React throws an unhandled render error',
              'The effect is queued to run only when the user clicks a button'
            ],
            correctAnswer: 1,
            explanation: 'An empty dependency array [] indicates the effect does not depend on any state or props, so React executes it once when the component mounts.'
          },
          {
            id: 'q3',
            question: 'In the IBM Carbon design system, how should interactive buttons and state selectors be styled?',
            options: [
              'With multi-colored rainbow neon gradients and floating drop shadows',
              'With crisp geometric borders, high contrast, clean typography, and purposeful hover/focus feedback',
              'With 3D puffy spherical shapes and cartoon icons',
              'As unclickable static paragraphs'
            ],
            correctAnswer: 1,
            explanation: 'IBM Carbon emphasizes architectural clarity, high visual contrast, crisp geometric edges, and subtle functional feedback over decorative fluff.'
          },
          {
            id: 'q4',
            question: 'What minimum contrast ratio is mandated by WCAG 2.1 AA for regular body text against its background?',
            options: [
              '1.5 : 1',
              '3.0 : 1',
              '4.5 : 1',
              '10.0 : 1'
            ],
            correctAnswer: 2,
            explanation: 'WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text (under 18pt regular or 14pt bold).'
          },
          {
            id: 'q5',
            question: 'Why is it considered bad practice to remove focus indicators with "outline-none" without adding focus-visible styles?',
            options: [
              'It breaks browser spell-checking features',
              'It prevents keyboard-only users from seeing which interactive element currently has focus',
              'It causes React Router to lose navigation history',
              'It increases server memory usage'
            ],
            correctAnswer: 1,
            explanation: 'Keyboard users navigate via Tab key. Stripping outlines leaves them unable to see where focus is situated on the page.'
          },
          {
            id: 'q6',
            question: 'What is the purpose of tabular numerals (font-variant-numeric: tabular-nums or font-mono) in data tables and scores?',
            options: [
              'To make numbers change color automatically',
              'To ensure every number character has an identical width, aligning columns vertically without jitter',
              'To convert decimal numbers into Roman numerals',
              'To translate numbers into local currency symbols'
            ],
            correctAnswer: 1,
            explanation: 'Tabular numerals give every digit equal horizontal space, preventing numerical values from shifting or misaligning when numbers change.'
          },
          {
            id: 'q7',
            question: 'What Tailwind CSS class implements mobile-first responsive styling on larger viewports?',
            options: [
              'desktop:p-4',
              'md:p-4 or lg:p-4',
              'max-screen:p-4',
              'auto-flex:p-4'
            ],
            correctAnswer: 1,
            explanation: 'Tailwind is mobile-first: un-prefixed classes apply to all screens, and breakpoint prefixes like md: or lg: apply at min-width thresholds.'
          },
          {
            id: 'q8',
            question: 'How should a React cleanup function be registered in useEffect?',
            options: [
              'By calling document.cleanup()',
              'By returning a function from the effect callback',
              'By exporting a componentWillUnmount class method',
              'By adding window.addEventListener("exit")'
            ],
            correctAnswer: 1,
            explanation: 'React executes any function returned by the useEffect callback when the component unmounts or before re-running the effect.'
          },
          {
            id: 'q9',
            question: 'What is the consequence of updating React state inside the body of a component without an event handler or useEffect?',
            options: [
              'It produces an infinite re-render loop that crashes the browser tab',
              'React automatically pauses the computer CPU',
              'The update is silently ignored with no consequences',
              'The page refreshes itself immediately'
            ],
            correctAnswer: 0,
            explanation: 'Updating state directly during render triggers another render, immediately causing an infinite loop (Maximum update depth exceeded error).'
          },
          {
            id: 'q10',
            question: 'What score is required on this module quiz to unlock the official Verified Certificate request?',
            options: [
              'At least 5 / 10',
              'At least 7 / 10',
              'At least 8 / 10 (80%)',
              'Only 10 / 10'
            ],
            correctAnswer: 2,
            explanation: 'Learners must score at least 8 out of 10 (80%) on every module quiz to prove competency and unlock their verified cryptographic credential.'
          }
        ]
      }
    ]
  },
  {
    id: 'c2',
    slug: 'data-analytics-nisr',
    title: 'Data Analytics & Labour Market Intelligence',
    category: 'Data Science',
    difficulty: 'Beginner to Intermediate',
    duration: '6 Weeks',
    enrolled: 2150,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Learn data analysis, statistical indicators, and data storytelling utilizing official National Institute of Statistics of Rwanda (NISR) Labour Force Survey datasets.',
    modules: [
      {
        id: 'c2-m1',
        title: 'Module 1: Introduction to Statistics & NISR Data Sources',
        duration: '2 Weeks',
        notes: 'Explore official NISR survey methodologies, sampling frameworks, Labour Force Survey (LFS) indicators, and macroeconomic datasets.',
        videoUrl: 'https://www.youtube.com/embed/r-uOVwlIdYA',
        subtopics: [
          {
            id: 'c2-m1-s1',
            title: '1. National Institute of Statistics of Rwanda (NISR) Mandate & Methodologies',
            duration: '25 mins',
            type: 'reading',
            notes: {
              overview: 'Understand the legal mandate and statistical standards of NISR in collecting, analyzing, and publishing official statistics in Rwanda.',
              coreConcepts: [
                'The National Strategy for the Development of Statistics (NSDS).',
                'Representative multi-stage stratified cluster sampling across all 30 districts.',
                'The Labour Force Survey (LFS) conducted quarterly to measure employment, unemployment, and youth participation.'
              ],
              practicalExample: `// Sample NISR indicator schema\n{\n  "indicator_code": "NISR-LFS-EMP-SRV",\n  "label": "Services Sector Employment Share",\n  "value": 38.6,\n  "unit": "Percentage",\n  "reference_period": "2023 Q4",\n  "provenance": "NISR Labour Force Survey Annual Report"\n}`,
              rwandanContext: 'Policymakers and employers rely on NISR quarterly figures to allocate TVET vocational training resources to high-growth sectors.',
              keyTakeaways: [
                'Always verify the sample size and margin of error when interpreting national statistical indicators.',
                'Labour force participation differs from employment-to-population ratio.'
              ]
            }
          },
          {
            id: 'c2-m1-s2',
            title: '2. Labour Force Participation Rate & Unemployment Metrics',
            duration: '30 mins',
            type: 'code',
            notes: {
              overview: 'Master standard International Labour Organization (ILO) definitions applied by NISR for calculating labour force metrics.',
              coreConcepts: [
                'Working-age population (ages 16 and above in Rwanda).',
                'Labour Force = Employed Persons + Unemployed Persons seeking work.',
                'Youth Labour Force Participation Rate (Y-LFPR): 52.4% in current survey benchmarks.',
                'LU1 (Unemployment Rate) vs LU2, LU3, and LU4 extended labour underutilization metrics.'
              ],
              practicalExample: `def calculate_labour_metrics(working_age_pop, employed, unemployed_seeking):\n    labour_force = employed + unemployed_seeking\n    lfpr = (labour_force / working_age_pop) * 100\n    unemployment_rate = (unemployed_seeking / labour_force) * 100\n    return {\n        "labour_force_total": labour_force,\n        "participation_rate": round(lfpr, 2),\n        "unemployment_rate": round(unemployment_rate, 2)\n    }`,
              rwandanContext: 'Understanding the distinction between informal agricultural work and formal service sector employment is central to analyzing Rwandan labour trends.',
              keyTakeaways: [
                'Persons engaged solely in subsistence food production are not classified as employed in standard ILO LFS framework.',
                'Extended measures of labour underutilization capture discouraged jobseekers.'
              ]
            }
          },
          {
            id: 'c2-m1-s3',
            title: '3. Data Formats, Metadata Standards & CSV Ingestion',
            duration: '25 mins',
            type: 'practice',
            notes: {
              overview: 'Ingest and sanitize raw statistical CSVs and microdata tables from the NISR Open Data Portal into computational pipelines.',
              coreConcepts: [
                'Variable dictionary mapping and codebook interpretation.',
                'Handling missing values (NaN) vs zero counts in survey weights.',
                'Encoding district codes into canonical administrative names (Province / District / Sector).'
              ],
              practicalExample: `import pandas as pd\n\ndef load_nisr_survey(csv_path: str) -> pd.DataFrame:\n    df = pd.read_csv(csv_path, dtype={"district_code": str})\n    df["weight"] = pd.to_numeric(df["weight"], errors="coerce")\n    df.dropna(subset=["weight"], inplace=True)\n    return df`,
              rwandanContext: 'Clean ingestion ensures accurate district-by-district comparisons between Kigali City and Northern, Southern, Eastern, and Western Provinces.',
              keyTakeaways: [
                'Always verify data types during ingestion; codes like district ID should remain strings.',
                'Survey weights must be applied when computing national aggregates.'
              ]
            }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What institution is officially mandated to produce national statistics and labour surveys in Rwanda?',
            options: [
              'National Bank of Rwanda (BNR)',
              'National Institute of Statistics of Rwanda (NISR)',
              'Rwanda Development Board (RDB)',
              'Ministry of ICT and Innovation (MINICT)'
            ],
            correctAnswer: 1,
            explanation: 'The National Institute of Statistics of Rwanda (NISR) is the government agency responsible for collecting, compiling, and disseminating official statistics.'
          },
          {
            id: 'q2',
            question: 'What is the legal working-age population threshold adopted in Rwanda’s Labour Force Survey?',
            options: [
              'Ages 12 and above',
              'Ages 16 and above',
              'Ages 21 and above',
              'Ages 25 to 55 exclusively'
            ],
            correctAnswer: 1,
            explanation: 'Under Rwandan labour market law and ILO standards, the working-age population comprises all individuals aged 16 years and older.'
          },
          {
            id: 'q3',
            question: 'How is the Labour Force Participation Rate (LFPR) mathematically defined?',
            options: [
              '(Employed / Unemployed) * 100',
              '[(Employed + Unemployed Seeking Work) / Working-Age Population] * 100',
              '(Total Population / Total Employed) * 100',
              '(Youth Employed / Total Youth) * 100'
            ],
            correctAnswer: 1,
            explanation: 'LFPR is the proportion of the working-age population that is economically active (either currently employed or actively seeking employment).'
          },
          {
            id: 'q4',
            question: 'Under international statistical standards, how are subsistence food producers treated in the core employment metric?',
            options: [
              'They are counted as full-time civil servants',
              'They are classified as outside the labor force if they do not produce primarily for market sale',
              'They are automatically classified as corporate executives',
              'They are excluded from the working-age population entirely'
            ],
            correctAnswer: 1,
            explanation: 'Under 19th ICLS resolution standards used by NISR, persons engaged solely in subsistence agriculture are classified as own-use producers rather than employed in the labour force.'
          },
          {
            id: 'q5',
            question: 'What is the purpose of applying "survey weights" when analyzing NISR sample datasets?',
            options: [
              'To encrypt data so it cannot be downloaded',
              'To scale up sample responses so each respondent accurately represents their corresponding segment of the national population',
              'To ensure all respondents have identical scores',
              'To delete rural responses from final charts'
            ],
            correctAnswer: 1,
            explanation: 'Sampling weights account for unequal probabilities of selection and non-response, ensuring sample estimates accurately reflect the full population.'
          },
          {
            id: 'q6',
            question: 'What is the recent verified NISR indicator value for Services Sector Employment Share in Rwanda?',
            options: [
              '12.4%',
              '22.1%',
              '38.6%',
              '85.0%'
            ],
            correctAnswer: 2,
            explanation: 'NISR LFS benchmarks indicate the Services Sector accounts for approximately 38.6% of employment, reflecting steady economic diversification.'
          },
          {
            id: 'q7',
            question: 'Why should administrative codes (such as Rwandan District Codes) be stored as string data types rather than integers?',
            options: [
              'Because integers cannot be printed in charts',
              'To preserve leading zeros and avoid unintended mathematical operations like averaging or summing IDs',
              'Because databases only support string storage',
              'To comply with IEEE floating-point standards'
            ],
            correctAnswer: 1,
            explanation: 'Identifiers are nominal keys, not quantities. Storing them as strings preserves formatting like leading zeros and prevents accidental arithmetic.'
          },
          {
            id: 'q8',
            question: 'What does the extended labour underutilization measure LU4 capture?',
            options: [
              'Only workers in formal banking careers',
              'Unemployed jobseekers, time-related underemployed workers, and the potential labour force (discouraged jobseekers)',
              'Only retired civil servants',
              'Foreign workers on temporary tourist visas'
            ],
            correctAnswer: 1,
            explanation: 'LU4 is the most comprehensive measure, combining unemployment, underemployment (working fewer hours than desired), and discouraged workers.'
          },
          {
            id: 'q9',
            question: 'Which Python data science library is universally utilized for dataframe manipulation and tabular analysis?',
            options: [
              'Pandas',
              'Flask',
              'Pygame',
              'Celery'
            ],
            correctAnswer: 0,
            explanation: 'Pandas is the industry-standard Python library for structured tabular data manipulation, filtering, and aggregation.'
          },
          {
            id: 'q10',
            question: 'What minimum score out of 10 must a learner achieve to pass this module and proceed?',
            options: [
              '5 / 10',
              '6 / 10',
              '8 / 10 (80%)',
              '10 / 10 only'
            ],
            correctAnswer: 2,
            explanation: 'The Hub requires scoring at least 8 out of 10 (80%) on every module assessment quiz to verify comprehension before progressing.'
          }
        ]
      },
      {
        id: 'c2-m2',
        title: 'Module 2: Data Wrangling with Python & Pandas',
        duration: '2 Weeks',
        notes: 'Cleaning messy datasets, groupby aggregations, pivot tables, time-series analysis, and visualizing policy trends with Matplotlib and Plotly.',
        videoUrl: 'https://www.youtube.com/embed/r-uOVwlIdYA',
        subtopics: [
          {
            id: 'c2-m2-s1',
            title: '1. Data Cleaning & Handling Missing Indicators',
            duration: '30 mins',
            type: 'reading',
            notes: {
              overview: 'Detect and resolve data anomalies, missing responses, outliers, and type mismatches in national survey microdata.',
              coreConcepts: [
                'Distinguishing MCAR (Missing Completely at Random) vs MAR (Missing at Random).',
                'Imputation strategies: mean, median, forward-fill, and domain-informed defaults.',
                'Detecting anomalous outliers using Interquartile Range (IQR) and Z-score tests.'
              ],
              practicalExample: `import pandas as pd\nimport numpy as np\n\ndef clean_salary_data(df: pd.DataFrame) -> pd.DataFrame:\n    # Replace negative or zero salaries with median of that occupation\n    df['monthly_wage'] = df['monthly_wage'].replace([0, np.inf, -np.inf], np.nan)\n    df['monthly_wage'] = df.groupby('occupation')['monthly_wage'].transform(\n        lambda x: x.fillna(x.median())\n    )\n    return df`,
              rwandanContext: 'Cleaning wage and income survey responses requires distinguishing between zero formal wage and in-kind agricultural compensation common in rural districts.',
              keyTakeaways: [
                'Never drop missing rows indiscriminately; dropping rows can introduce severe demographic bias into national estimates.',
                'Always document imputation methodologies in statistical metadata.'
              ]
            }
          },
          {
            id: 'c2-m2-s2',
            title: '2. GroupBy Aggregations & Pivot Tables',
            duration: '35 mins',
            type: 'code',
            notes: {
              overview: 'Perform multi-dimensional aggregations to examine labour trends across education levels, genders, and geographic districts.',
              coreConcepts: [
                'The Split-Apply-Combine pattern in Pandas.',
                'Custom aggregate functions: weighted averages using survey sample weights.',
                'Pivot tables for multi-index hierarchical reporting.'
              ],
              practicalExample: `def analyze_by_district(df: pd.DataFrame):\n    summary = df.groupby(['province', 'district']).agg(\n        total_respondents=('weight', 'count'),\n        employed_share=('is_employed', lambda x: (x * df.loc[x.index, 'weight']).sum() / df.loc[x.index, 'weight'].sum() * 100)\n    ).reset_index()\n    return summary`,
              rwandanContext: 'Disaggregating employment data by province (Kigali, North, South, East, West) highlights spatial disparities and infrastructure priorities.',
              keyTakeaways: [
                'Weighted averages are required for unbiased population summaries from stratified samples.',
                'Pivot tables allow fast generation of matrix reports comparing youth vs adult participation.'
              ]
            }
          },
          {
            id: 'c2-m2-s3',
            title: '3. Data Visualization & Storytelling for Policy',
            duration: '30 mins',
            type: 'practice',
            notes: {
              overview: 'Design publication-grade visualizations that convey statistical findings clearly to government stakeholders, private employers, and learners.',
              coreConcepts: [
                'Choosing appropriate chart types: bar charts for comparisons, line charts for YoY trends, choropleth maps for district metrics.',
                'Minimizing chart junk and maximizing data-ink ratio (Edward Tufte principles).',
                'Annotating key inflection points (e.g. policy launch, post-pandemic recovery).'
              ],
              practicalExample: `import matplotlib.pyplot as plt\n\ndef plot_sector_trends(years, services_share, agri_share):\n    fig, ax = plt.subplots(figsize=(10, 6))\n    ax.plot(years, services_share, label="Services & Digital (NISR)", color="#0F62FE", lw=2.5)\n    ax.plot(years, agri_share, label="Agriculture Share", color="#16A34A", lw=2.5, ls="--")\n    ax.set_title("Rwanda Sector Employment Transition (2018-2024)", fontsize=14, fontweight="bold")\n    ax.set_ylabel("Percentage of Total Employed (%)")\n    ax.legend(frameon=False)\n    plt.tight_layout()\n    return fig`,
              rwandanContext: 'Visualizing the transition from traditional agriculture (44.8%) to digital services (38.6%) supports national skills transformation agendas.',
              keyTakeaways: [
                'Always include clear source attributions (e.g., Source: NISR LFS 2023) on every chart.',
                'Ensure color palettes are accessible to color-blind stakeholders.'
              ]
            }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the risk of using df.dropna() without inspecting missing data patterns?',
            options: [
              'It accelerates server CPU performance',
              'It may introduce severe demographic bias if data was not missing completely at random',
              'It converts numerical columns into binary boolean values',
              'It permanently deletes files from the operating system'
            ],
            correctAnswer: 1,
            explanation: 'If missingness correlates with a demographic group (e.g., lower reporting in specific rural districts), dropping those rows skews national averages.'
          },
          {
            id: 'q2',
            question: 'Which method in Pandas computes aggregations across grouped categories (the Split-Apply-Combine pattern)?',
            options: [
              'df.groupby()',
              'df.partition()',
              'df.split()',
              'df.categorize()'
            ],
            correctAnswer: 0,
            explanation: 'df.groupby() splits the dataframe by keys, applies aggregation functions (mean, sum, count), and combines the results.'
          },
          {
            id: 'q3',
            question: 'Why is median wage typically preferred over mean wage in national labour compensation reporting?',
            options: [
              'The mean is impossible to calculate in Python',
              'The mean is heavily distorted by extreme high-earner outliers, while the median reflects the typical earner',
              'The median ignores low-income earners',
              'International law bans the use of arithmetic means'
            ],
            correctAnswer: 1,
            explanation: 'Wage distributions are right-skewed. Extreme high earners inflate the mean, making the median a much more accurate reflection of the typical worker.'
          },
          {
            id: 'q4',
            question: 'What pandas function converts columns from wide format into a normalized long key-value format?',
            options: [
              'pd.melt()',
              'pd.flatten()',
              'pd.unpivot_all()',
              'pd.expand()'
            ],
            correctAnswer: 0,
            explanation: 'pd.melt() transforms wide tables with multiple column indicators into long format tidy data suitable for plotting and regression.'
          },
          {
            id: 'q5',
            question: 'When visualizing longitudinal changes in Rwandan unemployment over 5 consecutive years, which chart type is most appropriate?',
            options: [
              'Pie Chart',
              'Line Chart with temporal axis',
              '3D Donut Chart',
              'Word Cloud'
            ],
            correctAnswer: 1,
            explanation: 'Continuous temporal trends are most accurately conveyed by line charts showing rate movement over time.'
          },
          {
            id: 'q6',
            question: 'What statistical measure identifies the spread between the 75th percentile and the 25th percentile of a dataset?',
            options: [
              'Standard Deviation',
              'Variance',
              'Interquartile Range (IQR)',
              'Standard Error'
            ],
            correctAnswer: 2,
            explanation: 'IQR = Q3 - Q1, capturing the spread of the middle 50% of values and used in box plots and outlier detection.'
          },
          {
            id: 'q7',
            question: 'How do you check for missing values count per column in a Pandas DataFrame df?',
            options: [
              'df.isnull().sum()',
              'df.check_empty()',
              'df.find_nulls()',
              'df.count_empty_cells()'
            ],
            correctAnswer: 0,
            explanation: 'df.isnull().sum() (or df.isna().sum()) returns a boolean mask summed vertically, giving the exact count of missing values per column.'
          },
          {
            id: 'q8',
            question: 'What principle from Edward Tufte emphasizes maximizing information while removing decorative elements?',
            options: [
              'High Data-Ink Ratio',
              'Maximalist Gradient Theorem',
              'Chromatic Density Law',
              'The Symmetrical Grid Formula'
            ],
            correctAnswer: 0,
            explanation: 'Tufte’s Data-Ink ratio states that visual ink should be dedicated to displaying data rather than decorative borders, 3D effects, or background patterns.'
          },
          {
            id: 'q9',
            question: 'What does the transform() method in a Pandas groupby pipeline return?',
            options: [
              'A scalar integer value',
              'An object indexed identically to the original DataFrame, allowing row-level broadcasts',
              'A new SQLite database file',
              'A markdown formatted document'
            ],
            correctAnswer: 1,
            explanation: 'Unlike agg() which collapses rows, transform() produces an output with the same shape as the input, ideal for calculating group-relative percentages or filling nulls.'
          },
          {
            id: 'q10',
            question: 'What score is required on this module quiz to unlock the Verified Course Certificate?',
            options: [
              '5 / 10',
              '6 / 10',
              '8 / 10 (80%)',
              '10 / 10 only'
            ],
            correctAnswer: 2,
            explanation: 'Scoring at least 8 out of 10 (80%) demonstrates verified analytical competency and unlocks the cryptographic credential.'
          }
        ]
      }
    ]
  },
  {
    id: 'c3',
    slug: 'ai-machine-learning-foundations',
    title: 'AI & Machine Learning Foundations',
    category: 'AI & Machine Learning',
    difficulty: 'Advanced',
    duration: '10 Weeks',
    enrolled: 980,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
    description: 'Build predictive regression models, neural networks, and computer vision classifiers using modern ML pipelines and verified mathematical foundations.',
    modules: [
      {
        id: 'c3-m1',
        title: 'Module 1: Mathematical Foundations & NumPy Operations',
        duration: '2 Weeks',
        notes: 'Linear algebra, matrix factorizations, vector spaces, gradient descent calculus, and vectorized tensor computations using NumPy.',
        videoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg',
        subtopics: [
          {
            id: 'c3-m1-s1',
            title: '1. Matrix Multiplication & Linear Transformations',
            duration: '30 mins',
            type: 'reading',
            notes: {
              overview: 'Review essential linear algebra operations that form the backbone of neural network forward passes and feature embeddings.',
              coreConcepts: [
                'Vectors, matrices, and dot products as linear projections.',
                'Matrix dimensional compatibility: (M x K) @ (K x N) = (M x N).',
                'Eigenvalues and Eigenvectors in Principal Component Analysis (PCA).'
              ],
              practicalExample: `import numpy as np\n\n# Neural network layer forward pass using vector dot product\ninputs = np.array([[0.5, 0.8, -0.2]])  # (1, 3)\nweights = np.random.randn(3, 4)        # (3, 4)\nbiases = np.zeros((1, 4))              # (1, 4)\n\noutput = np.dot(inputs, weights) + biases\nprint("Layer Output Shape:", output.shape)  # (1, 4)`,
              rwandanContext: 'Feature embeddings power recommendation engines matching Rwandan job applicants to employer specifications based on semantic vectors.',
              keyTakeaways: [
                'Always verify tensor shapes before performing matrix multiplication.',
                'Vectorized operations in NumPy use compiled BLAS routines, running orders of magnitude faster than Python loops.'
              ]
            }
          },
          {
            id: 'c3-m1-s2',
            title: '2. Gradient Descent & Loss Functions',
            duration: '35 mins',
            type: 'code',
            notes: {
              overview: 'Understand how optimization algorithms calculate partial derivatives of loss functions to iteratively adjust model weights.',
              coreConcepts: [
                'Mean Squared Error (MSE) for regression and Cross-Entropy for classification.',
                'The chain rule of calculus and backpropagation.',
                'Learning rate tuning, momentum, and Adam optimizer dynamics.'
              ],
              practicalExample: `def gradient_descent_step(X, y, weights, learning_rate=0.01):\n    m = len(y)\n    predictions = X.dot(weights)\n    errors = predictions - y\n    gradient = (2/m) * X.T.dot(errors)\n    weights -= learning_rate * gradient\n    loss = (1/m) * np.sum(errors ** 2)\n    return weights, loss`,
              rwandanContext: 'Predictive models for agricultural yield forecasting rely on gradient descent to optimize parameter weights against historic rainfall datasets.',
              keyTakeaways: [
                'Too high a learning rate causes divergence; too low causes sluggish convergence.',
                'Feature scaling (standardization) accelerates gradient descent convergence.'
              ]
            }
          },
          {
            id: 'c3-m1-s3',
            title: '3. Data Preprocessing & Train/Test Stratification',
            duration: '25 mins',
            type: 'practice',
            notes: {
              overview: 'Prevent data leakage by splitting datasets properly and applying scaling transformers fitted exclusively on training splits.',
              coreConcepts: [
                'Train, validation, and test split ratios (70/15/15 or 80/20).',
                'Stratified splitting to preserve rare class proportions in imbalanced datasets.',
                'StandardScaler and MinMaxScaler implementation without data leakage.'
              ],
              practicalExample: `from sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)\n\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)  # Note: transform only!`,
              rwandanContext: 'Stratification ensures models evaluated on Rwandan health or census microdata maintain equal provincial representation in testing sets.',
              keyTakeaways: [
                'Never fit scalers or imputers on the full dataset before splitting.',
                'Stratification is mandatory for classification tasks with class imbalances.'
              ]
            }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is the resulting matrix dimension when multiplying a (5, 3) matrix by a (3, 8) matrix?',
            options: [
              '(5, 8)',
              '(3, 3)',
              '(8, 5)',
              '(15, 24)'
            ],
            correctAnswer: 0,
            explanation: 'In matrix multiplication (M x K) @ (K x N), the inner dimensions match and the output shape is (M x N) = (5, 8).'
          },
          {
            id: 'q2',
            question: 'What is the role of the loss function in supervised machine learning?',
            options: [
              'To speed up internet transmission rates',
              'To quantify the difference between the model predictions and the ground-truth targets',
              'To encrypt training datasets against unauthorized downloads',
              'To delete inaccurate records from the database'
            ],
            correctAnswer: 1,
            explanation: 'The loss function calculates a scalar score measuring model prediction error, guiding optimization algorithms to adjust model weights.'
          },
          {
            id: 'q3',
            question: 'What happens if the learning rate in gradient descent is configured to an excessively large value?',
            options: [
              'The algorithm achieves instant convergence in 1 step',
              'The model parameters may oscillate wildy and diverge, causing loss to explode',
              'The model automatically switches to unsupervised clustering',
              'NumPy crashes with an out-of-memory error'
            ],
            correctAnswer: 1,
            explanation: 'Excessive learning rates cause parameter updates to overshoot the loss minimum, leading to divergence or numerical overflow.'
          },
          {
            id: 'q4',
            question: 'Why must feature scaling transformers be fitted only on the training set and not on the entire dataset?',
            options: [
              'To save disk storage space on the GPU',
              'To avoid data leakage, ensuring test set statistics do not artificially influence the model during training',
              'Because scikit-learn prohibits fitting on datasets larger than 100 rows',
              'To prevent negative numbers from being calculated'
            ],
            correctAnswer: 1,
            explanation: 'Fitting scalers on test data introduces data leakage, giving the model unrealistic prior knowledge about the test distribution.'
          },
          {
            id: 'q5',
            question: 'Which loss function is universally used for multi-class classification tasks with softmax outputs?',
            options: [
              'Mean Squared Error (MSE)',
              'Categorical Cross-Entropy',
              'Mean Absolute Percentage Error (MAPE)',
              'Hinge Loss'
            ],
            correctAnswer: 1,
            explanation: 'Categorical Cross-Entropy measures the distance between predicted probability distributions and true one-hot encoded classes.'
          },
          {
            id: 'q6',
            question: 'What is the primary objective of Principal Component Analysis (PCA)?',
            options: [
              'Dimensionality reduction while preserving maximum variance in the data',
              'Translating Python code to C++',
              'Encrypting database connection passwords',
              'Doubling the number of training samples'
            ],
            correctAnswer: 0,
            explanation: 'PCA projects high-dimensional data onto orthogonal axes of maximum variance, reducing dimensionality while retaining core patterns.'
          },
          {
            id: 'q7',
            question: 'What mathematical property prevents a neural network with only linear activation functions from learning non-linear patterns?',
            options: [
              'A composition of multiple linear transformations is mathematically identical to a single linear transformation',
              'Linear functions cannot be differentiated',
              'Linear functions consume too much memory',
              'Computers cannot calculate negative numbers in linear mode'
            ],
            correctAnswer: 0,
            explanation: 'Without non-linear activations (ReLU, Sigmoid), stacking multiple linear layers collapses mathematically into a single linear model (W2 * W1 = W3).'
          },
          {
            id: 'q8',
            question: 'What is "overfitting" in machine learning?',
            options: [
              'When a model runs out of RAM during training',
              'When a model memorizes noise and idiosyncrasies in the training data, performing poorly on unseen test data',
              'When a model makes zero predictions',
              'When a dataset has more columns than rows'
            ],
            correctAnswer: 1,
            explanation: 'Overfitting occurs when high-capacity models achieve near-zero training error but fail to generalize to new, unseen test data.'
          },
          {
            id: 'q9',
            question: 'What technique helps mitigate overfitting by penalizing large weight values in linear and logistic regression?',
            options: [
              'Regularization (L1 Lasso or L2 Ridge)',
              'Adding random noise to target variables',
              'Deleting half the training columns at random',
              'Running training for 100,000 extra epochs'
            ],
            correctAnswer: 0,
            explanation: 'L1 and L2 regularization add penalty terms to the loss function proportional to weight magnitudes, discouraging overly complex models.'
          },
          {
            id: 'q10',
            question: 'What score is required on this module quiz to unlock Module 2?',
            options: [
              '5 / 10',
              '7 / 10',
              '8 / 10 (80%)',
              '10 / 10 only'
            ],
            correctAnswer: 2,
            explanation: 'Learners must score at least 8 out of 10 (80%) to verify foundational mastery before advancing.'
          }
        ]
      }
    ]
  },
  {
    id: 'c4',
    slug: 'english-workplace-beginner',
    title: 'Professional English for Workplace Communication (Beginner)',
    category: 'Languages & Communication',
    difficulty: 'Beginner',
    duration: '6 Weeks',
    enrolled: 1840,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    description: 'Build confident English conversational fluency, core workplace vocabulary, clear professional pronunciation, and everyday business dialogue skills tailored for Rwandan service, hospitality, and tech sectors.',
    modules: [
      {
        id: 'c4-m1',
        title: 'Module 1: Workplace Introductions, Greetings & Polite Requests',
        duration: '2 Weeks',
        notes: 'Foundations of formal and informal greetings, professional introductions, asking for clarification politely, and expressing workplace needs in English.',
        videoUrl: 'https://www.youtube.com/embed/juKd26qkNAw',
        subtopics: [
          {
            id: 'c4-m1-s1',
            title: '1. Professional Introductions & Introducing Others',
            duration: '20 mins',
            type: 'reading',
            notes: {
              overview: 'Master professional verbal introductions when meeting colleagues, clients, and partners in Rwandan workplace settings.',
              coreConcepts: [
                'Formal vs informal introductions: "Pleased to meet you", "It is a pleasure to meet you", "Good morning, my name is..."',
                'Stating your role and district: "I am a junior software engineer based in Gasabo district."',
                'Introducing teammates: "Allow me to introduce my colleague, Eric Mugabo, who leads our data team."'
              ],
              practicalExample: 'Dialogue:\n"Good morning, Ms. Kezia. Welcome to The Hub Rwanda. I am Patrick Shyaka, your project coordinator."\n"Good morning, Mr. Shyaka. It is a pleasure to meet you. Thank you for having me."',
              rwandanContext: 'Respectful greetings and formal titles (Mr., Ms., Dr., Engineer) are highly valued in Rwandan government, banking, and commercial institutions.',
              keyTakeaways: [
                'Always state your name clearly, followed by your organizational role.',
                'Use "Pleased to meet you" or "Nice to meet you" with a firm handshake or respectful nod.'
              ]
            }
          },
          {
            id: 'c4-m1-s2',
            title: '2. Making Polite Inquiries & Modal Requests (Could, Would, May)',
            duration: '25 mins',
            type: 'practice',
            notes: {
              overview: 'Learn how to transform direct commands into polite, professional requests using modal auxiliary verbs.',
              coreConcepts: [
                'Replacing imperative commands ("Give me the file") with polite modal requests ("Could you please share the document?").',
                'Asking for permission: "May I ask a quick question regarding the deadline?"',
                'Expressing availability and scheduling: "Would 14:00 CAT suit your schedule?"'
              ],
              practicalExample: 'Direct: "Send me the report now."\nPolite Professional: "Could you please email me the quarterly report when you have a moment? Thank you."',
              rwandanContext: 'Polite indirect phrasing prevents perceived friction when collaborating across multicultural teams in Kigali and regional branches.',
              keyTakeaways: [
                'Use "Could you please..." for requests and "May I..." for asking permission.',
                'Always acknowledge completed requests with "Thank you very much" or "I appreciate your help."'
              ]
            }
          },
          {
            id: 'c4-m1-s3',
            title: '3. Active Listening, Clarifications & Confirming Understanding',
            duration: '25 mins',
            type: 'code',
            notes: {
              overview: 'Techniques for politely confirming instructions, clarifying ambiguities, and verifying technical details without feeling self-conscious.',
              coreConcepts: [
                'Clarification formulas: "Could you please repeat that last point?", "If I understand correctly, we should submit by Friday?"',
                'Paraphrasing to confirm: "Just to clarify, you would like me to compile the Excel table first?"',
                'Spelling and numeric confirmation: "Could you spell the client name, please?"'
              ],
              practicalExample: 'Colleague: "Please draft the onboarding memo for the Musanze cohort by Tuesday afternoon."\nLearner: "Understood. Just to confirm, you need the memo completed by 15:00 on Tuesday?"\nColleague: "Exactly, thank you."',
              rwandanContext: 'Ensuring absolute clarity eliminates rework when translating instructions between Kinyarwanda and English in fast-paced workplaces.',
              keyTakeaways: [
                'Never hesitate to ask for clarification; it demonstrates thoroughness and care.',
                'Repeat key numbers, deadlines, and dates back to the speaker to avoid errors.'
              ]
            }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Which greeting is most appropriate when entering a morning client meeting in Kigali?',
            options: [
              '"Hey what is up guys"',
              '"Good morning, everyone. It is a pleasure to meet you."',
              '"Tell me the agenda immediately"',
              '"What time do we finish?"'
            ],
            correctAnswer: 1,
            explanation: '"Good morning, everyone. It is a pleasure to meet you." is polished, respectful, and standard for professional business settings.'
          },
          {
            id: 'q2',
            question: 'How can you politely ask a colleague for a copy of a report?',
            options: [
              '"Give report now."',
              '"Could you please send me a copy of the report when you have a moment?"',
              '"Why didn’t you give me the report?"',
              '"I demand the report."'
            ],
            correctAnswer: 1,
            explanation: '"Could you please..." with "when you have a moment" softens the request while maintaining clear professional urgency.'
          },
          {
            id: 'q3',
            question: 'What is the most polite way to ask someone to repeat what they just said?',
            options: [
              '"What?"',
              '"Speak louder."',
              '"Pardon me, could you please repeat that last sentence?"',
              '"You are not clear."'
            ],
            correctAnswer: 2,
            explanation: '"Pardon me, could you please repeat that..." is the standard courteous phrasing in international business.'
          },
          {
            id: 'q4',
            question: 'Which preposition is correct: "The team meeting will take place _____ 10:00 AM _____ Friday"?',
            options: [
              '"at", "on"',
              '"in", "at"',
              '"on", "in"',
              '"for", "by"'
            ],
            correctAnswer: 0,
            explanation: 'In English, specific clock times use "at" (at 10:00 AM) and specific days of the week use "on" (on Friday).'
          },
          {
            id: 'q5',
            question: 'Which sentence correctly describes a current ongoing activity in the present continuous tense?',
            options: [
              '"I prepare the report yesterday."',
              '"I am currently preparing the quarterly financial summary."',
              '"I prepare always tomorrow."',
              '"I have prepare the summary."'
            ],
            correctAnswer: 1,
            explanation: 'Present continuous is formed with "am/is/are + verb-ing" to describe actions happening at the current moment.'
          },
          {
            id: 'q6',
            question: 'What does the abbreviation "FYI" commonly stand for in workplace emails?',
            options: [
              '"For Your Information"',
              '"Finish Your Invoice"',
              '"Fix Your Issues"',
              '"Follow Your Instincts"'
            ],
            correctAnswer: 0,
            explanation: '"FYI" is standard business shorthand for "For Your Information", used to share context without requiring immediate action.'
          },
          {
            id: 'q7',
            question: 'How should you sign off on a formal business email to a government official or new partner?',
            options: [
              '"Cheers mate"',
              '"Sincerely," or "Best regards,"',
              '"Later,"',
              '"Sent from my phone"'
            ],
            correctAnswer: 1,
            explanation: '"Sincerely," and "Best regards," are universally accepted formal closings for professional correspondence.'
          },
          {
            id: 'q8',
            question: 'What is the correct phrasing to introduce a colleague named Aline to an external guest?',
            options: [
              '"Look at Aline here."',
              '"I would like to introduce my colleague, Aline Umutesi, our lead analyst."',
              '"She is Aline."',
              '"Aline is the person."'
            ],
            correctAnswer: 1,
            explanation: '"I would like to introduce my colleague, [Name], [Title]" is the standard courteous business formula.'
          },
          {
            id: 'q9',
            question: 'What is the meaning of "Please find attached the invoice"?',
            options: [
              '"The invoice has been lost in the mail."',
              '"The invoice document is included as a digital file attached to this email."',
              '"Please create a new invoice today."',
              '"Do not open any documents."'
            ],
            correctAnswer: 1,
            explanation: '"Please find attached..." informs the recipient that a digital file has been clipped or uploaded with the message.'
          },
          {
            id: 'q10',
            question: 'What passing score is required on this module quiz to unlock Module 2?',
            options: [
              '5 / 10',
              '6 / 10',
              '8 / 10 (80%)',
              '10 / 10 only'
            ],
            correctAnswer: 2,
            explanation: 'Per The Hub mastery framework, scoring at least 8/10 (80%) is required to advance to the next module.'
          }
        ]
      }
    ]
  },
  {
    id: 'c5',
    slug: 'english-business-technology-intermediate',
    title: 'English for Business & Technology (Intermediate)',
    category: 'Languages & Communication',
    difficulty: 'Intermediate',
    duration: '8 Weeks',
    enrolled: 1510,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    description: 'Elevate your technical vocabulary, lead agile standups, draft persuasive project proposals, deliver executive presentations, and negotiate effectively in global tech and business ecosystems.',
    modules: [
      {
        id: 'c5-m1',
        title: 'Module 1: Technical Writing, Agile Standups & Executive Briefings',
        duration: '2 Weeks',
        notes: 'Structuring executive summaries, concise bug reports, leading daily sprint standups in English, and delivering clear technical project updates.',
        videoUrl: 'https://www.youtube.com/embed/juKd26qkNAw',
        subtopics: [
          {
            id: 'c5-m1-s1',
            title: '1. Leading Daily Agile Standups & Sprint Reporting',
            duration: '30 mins',
            type: 'reading',
            notes: {
              overview: 'Master the 3-question agile standup format in fluent, concise English: what was accomplished, what is planned today, and what blockers exist.',
              coreConcepts: [
                'The 3-point standup structure: "Yesterday, I completed...", "Today, I am focusing on...", "My primary blocker is..."',
                'Action-oriented verbs: implemented, refactored, resolved, deployed, benchmarked.',
                'Expressing impediments diplomatically: "I am currently blocked by waiting on API credentials from the payment provider."'
              ],
              practicalExample: '"Yesterday, I finalized the PostgreSQL database indexing for the student registry. Today, I am integrating the FastAPI authentication endpoints. No blockers on my end; I anticipate opening the pull request by 16:00."',
              rwandanContext: 'International tech firms and venture-backed startups operating in Kigali (e.g., Norrsken Kigali, KLab) conduct all sprint ceremonies in English.',
              keyTakeaways: [
                'Keep standup updates under 90 seconds per person; focus on progress and blockers.',
                'Use past tense for finished tasks and present continuous for today’s active focus.'
              ]
            }
          },
          {
            id: 'c5-m1-s2',
            title: '2. Professional Technical Documentation & Bug Reports',
            duration: '35 mins',
            type: 'code',
            notes: {
              overview: 'Draft reproducible, objective bug reports and architectural notes that engineering leads and stakeholders can understand without ambiguity.',
              coreConcepts: [
                'Standard bug report anatomy: Summary, Steps to Reproduce, Expected Behavior, Actual Behavior, Environment & Logs.',
                'Objective technical tone: avoid emotional language ("this code is terrible"); use factual observations ("an unhandled NullPointer occurs under concurrent load").',
                'Active voice for instructions: "Click Submit", "Select option 2", "Observe timeout error."'
              ],
              practicalExample: 'Title: [Bug] 401 Unauthorized returned on valid JWT refresh token\nSteps to Reproduce:\n1. Authenticate user via POST /api/auth/login.\n2. Await 15-minute token expiry.\n3. Send POST /api/auth/refresh with valid refresh cookie.\nExpected: 200 OK with refreshed access token.\nActual: 401 Unauthorized with error "token_expired".',
              rwandanContext: 'High-quality bug documentation enables seamless handover between remote international clients and Rwandan software engineering teams.',
              keyTakeaways: [
                'Provide exact steps to reproduce so any engineer can replicate the issue.',
                'State expected behavior clearly alongside the actual observed result.'
              ]
            }
          },
          {
            id: 'c5-m1-s3',
            title: '3. Formulating Persuasive Proposals & Executive Summaries',
            duration: '35 mins',
            type: 'practice',
            notes: {
              overview: 'Write compelling, data-grounded business proposals that connect technical solutions directly to business ROI and Rwandan national development metrics.',
              coreConcepts: [
                'The Executive Summary framework: Context, Problem Statement, Proposed Solution, Quantifiable Impact, Investment Required.',
                'Signposting language: "Furthermore", "Consequently", "In summary", "The data indicates that..."',
                'Hypothetical conditional phrasing: "If we adopt automated testing, regression defects will decrease by an estimated 35%."'
              ],
              practicalExample: 'Executive Summary:\n"To address inventory delays across rural coffee cooperatives, we propose deploying an offline-first mobile web portal. Aligned with NISR agricultural digitisation priorities, this solution will reduce manual reconciliation time from 5 days to 2 hours while preserving audit compliance."',
              rwandanContext: 'Connecting technical proposals to NISR metrics or national NST2 priorities drastically increases executive buy-in and funding success.',
              keyTakeaways: [
                'Place the bottom-line recommendation in the first two sentences.',
                'Quantify impact with concrete percentages, time saved, or revenue generated.'
              ]
            }
          }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'During an agile daily standup, what are the three essential questions each developer answers?',
            options: [
              '"What time did you wake up, what did you eat, when do you leave?"',
              '"What did you accomplish yesterday, what will you work on today, and what blockers exist?"',
              '"Who wrote the best code, who made a mistake, how much does the project cost?"',
              '"Which programming language is fastest, why, and how many lines did you write?"'
            ],
            correctAnswer: 1,
            explanation: 'The standard agile scrum standup answers: 1) Yesterday’s progress, 2) Today’s plan, and 3) Any impediments/blockers.'
          },
          {
            id: 'q2',
            question: 'Which sentence best demonstrates objective, professional tone in a technical incident report?',
            options: [
              '"The server crashed because someone wrote sloppy code again."',
              '"A memory leak in the image caching service caused an out-of-memory exception at 14:22 CAT, resulting in a 4-minute service interruption."',
              '"Everything broke and users are furious with us."',
              '"I told everyone this database was bad."'
            ],
            correctAnswer: 1,
            explanation: 'Professional incident documentation specifies exact root causes, timestamps, impact duration, and objective telemetry without emotional blame.'
          },
          {
            id: 'q3',
            question: 'Which transition phrase is most effective when introducing a counter-argument diplomatically during a technical debate?',
            options: [
              '"You are completely wrong about this."',
              '"While that approach offers lower initial complexity, we must also consider the long-term maintenance and scaling costs."',
              '"Nobody uses that technology anymore."',
              '"Stop talking and listen to my solution."'
            ],
            correctAnswer: 1,
            explanation: '"While [acknowledging validity], we must also consider [alternative factor]" acknowledges the colleague respectfully before presenting the counter-point.'
          },
          {
            id: 'q4',
            question: 'Which conditional sentence correctly expresses a realistic future business outcome (First Conditional)?',
            options: [
              '"If we implement automated testing, our release defect rate will decrease significantly."',
              '"If we implemented testing, our defects will have decrease."',
              '"If we implement testing, our defects decreased yesterday."',
              '"If we will implement testing, our defects decrease."'
            ],
            correctAnswer: 0,
            explanation: 'First conditional uses "If + Present Simple, will + base verb" to discuss realistic conditions and their future consequences.'
          },
          {
            id: 'q5',
            question: 'In technical writing, why is the active voice ("The server processes incoming tokens") generally preferred over passive voice ("Incoming tokens are processed by the server")?',
            options: [
              'Active voice is strictly mandatory in all spoken English',
              'Active voice is clearer, more direct, and clearly establishes which component performs the action',
              'Passive voice causes database syntax errors',
              'Active voice uses more words per sentence'
            ],
            correctAnswer: 1,
            explanation: 'Active voice creates concise, punchy sentences that clearly identify the subject performing the action, reducing ambiguity in technical specifications.'
          },
          {
            id: 'q6',
            question: 'What is the purpose of an "Executive Summary" in a commercial project proposal?',
            options: [
              'To list every single line of code in the project',
              'To provide busy decision-makers with a concise overview of the problem, proposed solution, and projected return on investment',
              'To list the employee salaries and personal bank accounts',
              'To provide an unedited transcript of previous team chats'
            ],
            correctAnswer: 1,
            explanation: 'An executive summary synthesizes the strategic business case so senior executives can grasp key value propositions and approve investments quickly.'
          },
          {
            id: 'q7',
            question: 'Which phrasal verb means to delay or postpone a scheduled meeting until a later date?',
            options: [
              '"Call off"',
              '"Push back" or "Put off"',
              '"Bring forward"',
              '"Break down"'
            ],
            correctAnswer: 1,
            explanation: '"Push back" or "put off" means to reschedule an event to a later time or date. ("Bring forward" means earlier; "Call off" means cancel).'
          },
          {
            id: 'q8',
            question: 'How should you professionally address an email when you do not know the recipient’s specific name, but you know their team?',
            options: [
              '"Hey there people"',
              '"Dear Hiring Committee," or "Dear Engineering Team,"',
              '"To whoever is reading this,"',
              '"Yo team,"'
            ],
            correctAnswer: 1,
            explanation: '"Dear [Team/Committee Name]," is professional, respectful, and appropriately addresses the intended functional group.'
          },
          {
            id: 'q9',
            question: 'What is the meaning of the technical idiom "technical debt"?',
            options: [
              'Money owed to a bank for server hardware loans',
              'The future implied cost of rework caused by choosing an easy or expedited solution now instead of a better long-term approach',
              'The monthly internet bill for the office',
              'A penalty fee paid to the tax authority'
            ],
            correctAnswer: 1,
            explanation: 'Technical debt refers to shortcuts taken in software engineering that yield quick immediate delivery but require refactoring later.'
          },
          {
            id: 'q10',
            question: 'What minimum score is required on this module quiz to unlock Module 2?',
            options: [
              '6 / 10',
              '7 / 10',
              '8 / 10 (80%)',
              '10 / 10'
            ],
            correctAnswer: 2,
            explanation: 'Scoring at least 8 out of 10 (80%) is required to advance under The Hub mastery progression standards.'
          }
        ]
      }
    ]
  }
];
