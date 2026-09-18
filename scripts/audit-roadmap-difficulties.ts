import { getAllRoadmaps, getCareerRoadmaps, getSubjectRoadmaps } from '../lib/roadmaps/roadmapResolver';
import { RoadmapDifficulty } from '../types/roadmap';

async function main() {
  console.log('--- Auditing Roadmap Difficulty Distribution ---\n');

  const allRoadmaps = getAllRoadmaps();
  const careerRoadmaps = getCareerRoadmaps();
  const subjectRoadmaps = getSubjectRoadmaps();

  console.log(`Total Roadmaps: ${allRoadmaps.length} (Career: ${careerRoadmaps.length}, Subject: ${subjectRoadmaps.length})\n`);

  const difficultyCounts: Record<RoadmapDifficulty, number> = {
    Beginner: 0,
    Intermediate: 0,
    Advanced: 0,
  };

  const categorized: Record<RoadmapDifficulty, Array<{ id: string; title: string; type: string; prereqs: string[] }>> = {
    Beginner: [],
    Intermediate: [],
    Advanced: [],
  };

  for (const roadmap of allRoadmaps) {
    const isCareer = careerRoadmaps.some(c => c.id === roadmap.id);
    const type = isCareer ? 'Career' : 'Subject';
    difficultyCounts[roadmap.difficulty]++;
    categorized[roadmap.difficulty].push({
      id: roadmap.id,
      title: roadmap.title,
      type,
      prereqs: roadmap.prerequisites,
    });
  }

  console.log('Difficulty Summary:');
  console.log(`  Beginner:     ${difficultyCounts.Beginner}`);
  console.log(`  Intermediate: ${difficultyCounts.Intermediate}`);
  console.log(`  Advanced:     ${difficultyCounts.Advanced}\n`);

  console.log('==================================================');
  console.log('BEGINNER ROADMAPS:');
  console.log('==================================================');
  for (const r of categorized.Beginner) {
    console.log(`- [${r.type}] ${r.title} (${r.id})`);
    console.log(`  Prereqs: ${r.prereqs.join('; ')}`);
  }

  console.log('\n==================================================');
  console.log('INTERMEDIATE ROADMAPS:');
  console.log('==================================================');
  for (const r of categorized.Intermediate) {
    console.log(`- [${r.type}] ${r.title} (${r.id})`);
    console.log(`  Prereqs: ${r.prereqs.join('; ')}`);
  }

  console.log('\n==================================================');
  console.log('ADVANCED ROADMAPS:');
  console.log('==================================================');
  for (const r of categorized.Advanced) {
    console.log(`- [${r.type}] ${r.title} (${r.id})`);
    console.log(`  Prereqs: ${r.prereqs.join('; ')}`);
  }

  // Sanity checks
  if (difficultyCounts.Beginner === 0) throw new Error('No Beginner roadmaps found!');
  if (difficultyCounts.Intermediate === 0) throw new Error('No Intermediate roadmaps found!');
  if (difficultyCounts.Advanced === 0) throw new Error('No Advanced roadmaps found!');
  if (difficultyCounts.Intermediate === allRoadmaps.length) throw new Error('All roadmaps are still Intermediate!');

  console.log('\n✅ DIFFICULTY DISTRIBUTION AUDIT PASSED PERFECTLY!');
}

main().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
