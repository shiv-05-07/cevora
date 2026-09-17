import prisma from '../lib/prisma';

async function inspectDb() {
  console.log('--- INSPECTING CURRENT POSTGRESQL TABLES & COLUMNS ---');

  const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
  `;

  console.log('Tables in DB:', tables.map(t => t.table_name));

  const diagAttemptCols = await prisma.$queryRaw<Array<{ column_name: string; data_type: string; is_nullable: string }>>`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'DiagnosticAttempt'
  `;
  console.log('DiagnosticAttempt Columns:', diagAttemptCols);

  const conceptCols = await prisma.$queryRaw<Array<{ column_name: string; data_type: string; is_nullable: string }>>`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'Concept'
  `;
  console.log('Concept Columns:', conceptCols);

  const ksCols = await prisma.$queryRaw<Array<{ column_name: string; data_type: string; is_nullable: string }>>`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'KnowledgeState'
  `;
  console.log('KnowledgeState Columns:', ksCols);

  const missionCols = await prisma.$queryRaw<Array<{ column_name: string; data_type: string; is_nullable: string }>>`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'Mission'
  `;
  console.log('Mission Columns:', missionCols);

  const attemptRows = await prisma.$queryRaw<Array<{ count: number }>>`
    SELECT COUNT(*)::int as count FROM "DiagnosticAttempt"
  `;
  console.log('DiagnosticAttempt Row Count:', attemptRows[0]?.count);

  const conceptRows = await prisma.$queryRaw<Array<{ count: number }>>`
    SELECT COUNT(*)::int as count FROM "Concept"
  `;
  console.log('Concept Row Count:', conceptRows[0]?.count);

  const ksRows = await prisma.$queryRaw<Array<{ count: number }>>`
    SELECT COUNT(*)::int as count FROM "KnowledgeState"
  `;
  console.log('KnowledgeState Row Count:', ksRows[0]?.count);
}

inspectDb().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
