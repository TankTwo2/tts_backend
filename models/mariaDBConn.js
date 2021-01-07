/*** models/mariaDBConn.js ***/
const config = require('../secret_config.json');
const mariadb = require('mariadb');
const envIsDev = process.env.NODE_ENV === 'dev';

const pool = mariadb.createPool(config);
let conn, rows;
connectDB().then((r) => console.log(`connect success ${r}`));

async function connectDB() {
  const db = `${envIsDev ? 'TTS_DATABASE_DEV' : 'TTS_DATABASE'}`;
  conn = await pool.getConnection();
  await conn.query(`USE ${db}`); // 사용할 DB 명시
  return db;
}

async function test() {
  try {
    rows = await conn.query('SELECT * FROM TTS_USER_YEAR_DATA'); // 쿼리 실행
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    return rows;
  }
}

async function saveLog(req) {
  try {
    rows = await conn.query(
      'INSERT INTO TTS_SAVE_LOG (chrome_id, event_key, event_type, event_at) VALUES(?,?,?,?)',
      Object.values(req)
    ); // 쿼리 실행
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    return rows;
  }
}

module.exports = { test, saveLog };
