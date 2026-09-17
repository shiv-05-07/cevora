import { getAllRoadmaps } from '../lib/roadmaps/roadmapResolver';

async function main() {
  console.log('--- Testing Difficulty Filtering & Search Combination ---\n');

  const allRoadmaps = getAllRoadmaps();

  // Test 1: Difficulty = 'Beginner'
  const beginners = allRoadmaps.filter(r => r.difficulty === 'Beginner');
  console.log(`Filter [Beginner]: ${beginners.length} roadmaps found`);
  beginners.forEach(r => console.log(`  - ${r.title} (${r.difficulty})`));
  if (beginners.length !== 5) throw new Error(`Expected 5 Beginner roadmaps, got ${beginners.length}`);

  // Test 2: Difficulty = 'Intermediate'
  const intermediates = allRoadmaps.filter(r => r.difficulty === 'Intermediate');
  console.log(`\nFilter [Intermediate]: ${intermediates.length} roadmaps found`);
  intermediates.forEach(r => console.log(`  - ${r.title} (${r.difficulty})`));
  if (intermediates.length !== 10) throw new Error(`Expected 10 Intermediate roadmaps, got ${intermediates.length}`);

  // Test 3: Difficulty = 'Advanced'
  const advanced = allRoadmaps.filter(r => r.difficulty === 'Advanced');
  console.log(`\nFilter [Advanced]: ${advanced.length} roadmaps found`);
  advanced.forEach(r => console.log(`  - ${r.title} (${r.difficulty})`));
  if (advanced.length !== 5) throw new Error(`Expected 5 Advanced roadmaps, got ${advanced.length}`);

  // Test 4: Combined Filter - Advanced + Search "AI"
  const searchAdvancedAI = allRoadmaps.filter(r => {
    if (r.difficulty !== 'Advanced') return false;
    const query = 'ai';
    const matchesTitle = r.title.toLowerCase().includes(query);
    const matchesRole = r.role.toLowerCase().includes(query);
    const matchesDescription = r.description.toLowerCase().includes(query);
    const matchesSkills = r.skills.some(s => s.toLowerCase().includes(query));
    return matchesTitle || matchesRole || matchesDescription || matchesSkills;
  });
  console.log(`\nFilter [Advanced + "AI"]: ${searchAdvancedAI.length} roadmaps found`);
  searchAdvancedAI.forEach(r => console.log(`  - ${r.title} (${r.difficulty})`));
  if (searchAdvancedAI.length === 0) throw new Error('Expected at least 1 Advanced AI roadmap!');

  // Test 5: All roadmaps
  console.log(`\nFilter [All]: ${allRoadmaps.length} roadmaps total`);
  if (allRoadmaps.length !== 20) throw new Error(`Expected 20 total roadmaps, got ${allRoadmaps.length}`);

  console.log('\n✅ ALL FILTERING & SEARCH COMBINATION TESTS PASSED!');
}

main().catch(err => {
  console.error('Filtering test failed:', err);
  process.exit(1);
});
