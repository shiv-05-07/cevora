const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inspect() {
  const companies = await prisma.company.findMany({
    include: {
      opportunities: true
    }
  });

  console.log(`Total Companies: ${companies.length}`);
  let totalOpportunities = 0;
  companies.forEach(c => {
    console.log(`- ${c.name} (${c.slug}): ${c.opportunities.length} opportunities`);
    c.opportunities.forEach(o => {
      console.log(`    * [${o.id}] "${o.title}" (${o.type}) isMock=${o.isMock}`);
    });
    totalOpportunities += c.opportunities.length;
  });
  console.log(`Total Opportunities: ${totalOpportunities}`);

  await prisma.$disconnect();
}

inspect();
