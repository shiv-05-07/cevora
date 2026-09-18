const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const opportunities = await prisma.opportunity.findMany({
    include: {
      company: true,
      criteria: true
    }
  });

  console.log(`Found ${opportunities.length} opportunities`);
  for (const opp of opportunities) {
    console.log(`- ${opp.title} at ${opp.company?.name}`);
    console.log(`  Type: ${opp.type}`);
    console.log(`  Status: ${opp.status}`);
    console.log(`  Minimum CGPA: ${opp.minimumCgpa}`);
    console.log(`  Eligible Branches: ${opp.eligibleBranches}`);
    console.log(`  Eligible Grad Years: ${opp.eligibleGraduationYears}`);
    console.log(`  Criteria count: ${opp.criteria.length}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
