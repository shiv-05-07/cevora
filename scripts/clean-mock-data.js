const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clean() {
  console.log('--- Cleaning Up Duplicate & Legacy Mock Data ---');

  // 1. Delete all legacy test opportunities
  const deletedOpps = await prisma.opportunity.deleteMany({});
  console.log(`Deleted ${deletedOpps.count} legacy opportunities.`);

  // 2. Delete non-target companies (e.g. larsen-toubro, texas-instruments, juspay, tata-consultancy-services)
  const targetSlugs = [
    'amazon', 'google', 'microsoft', 'adobe', 'atlassian',
    'oracle', 'cisco', 'flipkart', 'phonepe', 'paytm',
    'goldman-sachs', 'morgan-stanley', 'vispe', 'sprinklr', 'ibm',
    'deloitte', 'qualcomm', 'intel', 'accenture', 'tcs-digital'
  ];

  const deletedCompanies = await prisma.company.deleteMany({
    where: {
      slug: { notIn: targetSlugs }
    }
  });
  console.log(`Deleted ${deletedCompanies.count} non-target companies.`);

  await prisma.$disconnect();
}

clean().catch(err => {
  console.error(err);
  process.exit(1);
});
