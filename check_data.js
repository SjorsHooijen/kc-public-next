const { neon } = require('@neondatabase/serverless');

async function check() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Check what races have results for 2025
    const races = await sql`
      SELECT DISTINCT r.name, r.date, COUNT(*) as result_count
      FROM results res
      LEFT JOIN races r ON r.id = res.race_id
      WHERE res.season = 2025
      GROUP BY r.name, r.date
      ORDER BY r.date
    `;
    
    console.log('Races with results for 2025:');
    races.forEach(r => {
      console.log(`- ${r.name} (${r.date}): ${r.result_count} results`);
    });
  } catch (e) {
    console.error('Error:', e.message);
  }
}

check();
