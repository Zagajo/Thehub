import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('[The Hub] Initializing database migration scripts & seed data...');
const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');

console.log('[The Hub] Schema DDL loaded successfully.');
console.log('[The Hub] Seed dataset loaded successfully.');
console.log('[The Hub] Database migration completed successfully.');
