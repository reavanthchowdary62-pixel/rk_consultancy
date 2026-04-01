const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://reavanthchowdary4_db_user:rDGViHw76sw5RGLN@rk-consultancy.juko84o.mongodb.net/rk_data?appName=rk-consultancy';
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });
async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Connected successfully!');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  } finally {
    await client.close();
  }
}
run();
