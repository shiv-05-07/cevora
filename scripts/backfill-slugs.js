const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function backfillSlugs() {
  console.log('Starting slug backfill...');
  try {
    const companies = await prisma.company.findMany();
    console.log(`Found ${companies.length} existing companies.`);

    let nullCount = 0;
    let duplicateCount = 0;
    let successCount = 0;

    for (const company of companies) {
      if (!company.slug || company.slug.trim() === '') {
        nullCount++;
        // Generate a safe slug
        let baseSlug = company.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        let finalSlug = baseSlug;
        let counter = 1;
        let isUnique = false;

        // Ensure uniqueness
        while (!isUnique) {
          const existing = await prisma.company.findFirst({
            where: { slug: finalSlug }
          });
          if (existing && existing.id !== company.id) {
            duplicateCount++;
            finalSlug = `${baseSlug}-${counter}`;
            counter++;
          } else {
            isUnique = true;
          }
        }

        // Update the company
        await prisma.company.update({
          where: { id: company.id },
          data: { slug: finalSlug }
        });
        successCount++;
        console.log(`Updated: ${company.name} -> ${finalSlug}`);
      }
    }

    const postCompanies = await prisma.company.findMany();
    const finalNullCount = postCompanies.filter(c => !c.slug || c.slug.trim() === '').length;

    console.log('\n--- Backfill Summary ---');
    console.log(`Companies before: ${companies.length}`);
    console.log(`Companies after: ${postCompanies.length}`);
    console.log(`Initial missing slugs: ${nullCount}`);
    console.log(`Slugs generated and updated: ${successCount}`);
    console.log(`Duplicate collisions resolved: ${duplicateCount}`);
    console.log(`Final records with null slugs: ${finalNullCount}`);
    console.log(`Records lost: ${companies.length - postCompanies.length}`);
    
  } catch (error) {
    console.error('Error during backfill:', error);
  } finally {
    await prisma.$disconnect();
  }
}

backfillSlugs();
