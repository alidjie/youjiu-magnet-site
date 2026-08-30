const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const PROJECT_REF = 'hliwcbkskermdmntisvm';
const PASSWORD = 'L3CLo7^HAXFVy^EgL91z';

// Try multiple host formats
const hosts = [
  { host: `db.${PROJECT_REF}.supabase.co`, port: 5432, user: 'postgres', label: 'direct' },
  { host: `aws-0-ap-southeast-1.pooler.supabase.com`, port: 5432, user: `postgres.${PROJECT_REF}`, label: 'pooler-ap-southeast-1' },
  { host: `aws-0-us-east-1.pooler.supabase.com`, port: 5432, user: `postgres.${PROJECT_REF}`, label: 'pooler-us-east-1' },
];

const schemaSQL = fs.readFileSync(path.join(__dirname, '..', 'supabase', 'schema.sql'), 'utf8');

async function tryConnect() {
  for (const cfg of hosts) {
    console.log(`Trying ${cfg.label}: ${cfg.host}:${cfg.port} user=${cfg.user}`);
    const client = new Client({
      host: cfg.host,
      port: cfg.port,
      database: 'postgres',
      user: cfg.user,
      password: PASSWORD,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
    });
    try {
      await client.connect();
      console.log(`Connected via ${cfg.label}!`);

      // Execute schema
      console.log('Executing schema.sql...');
      await client.query(schemaSQL);
      console.log('Schema executed successfully!');

      // Verify tables
      const res = await client.query("SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename");
      console.log('Tables created:', res.rows.map(r => r.tablename));

      const prodCount = await client.query('SELECT count(*) FROM products');
      console.log('Product count:', prodCount.rows[0].count);

      // Check storage bucket
      const bucketRes = await client.query("SELECT id, name, public FROM storage.buckets WHERE id='product-images'");
      console.log('Storage bucket:', bucketRes.rows);

      await client.end();
      console.log('Done!');
      return cfg;
    } catch (err) {
      console.log(`Failed (${cfg.label}): ${err.message}`);
      try { await client.end(); } catch(e) {}
    }
  }
  throw new Error('Could not connect to database with any host');
}

tryConnect().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
