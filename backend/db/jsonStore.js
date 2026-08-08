// ============================================================
// Minimal JSON-file-backed data store
// No external DB service required — swap for MongoDB/Postgres
// later by reimplementing the functions in models/User.js.
// ============================================================

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');
const DEFAULT_DATA = { users: [], orders: [] };

const ensureDbFile = () => {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DATA, null, 2));
  }
};

const readDb = () => {
  ensureDbFile();
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  // Backfill collections added after a db.json already existed on disk.
  return { ...DEFAULT_DATA, ...data };
};

const writeDb = (data) => {
  ensureDbFile();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

module.exports = { readDb, writeDb };
