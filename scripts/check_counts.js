const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkRaw() {
  try {
    const compCols = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'Company';
    `;
    console.log('--- Company DB Columns ---');
    console.table(compCols);

    const oppCols = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'Opportunity';
    `;
    console.log('--- Opportunity DB Columns ---');
    console.table(oppCols);

    const compRows = await prisma.$queryRaw`SELECT id, name FROM "Company" LIMIT 5;`;
    console.log('--- Sample Companies in DB ---');
    console.log(compRows);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

checkRaw();
