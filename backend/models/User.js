// ============================================================
// User Model — JSON-file-backed store (see db/jsonStore.js)
// Swap this file's internals for a real Mongoose/Postgres model
// later without touching callers — the exported function shapes
// are the contract.
// ============================================================

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { readDb, writeDb } = require('../db/jsonStore');

const SALT_ROUNDS = 12;

const toSafeUser = (user) => {
  if (!user) return null;
  const { password: _password, verificationToken: _token, ...safeUser } = user;
  return safeUser;
};

const findByEmail = (email) => {
  const db = readDb();
  return db.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase()) || null;
};

const findById = (id) => {
  const db = readDb();
  return db.users.find((u) => u.id === id) || null;
};

const findByVerificationToken = (token) => {
  const db = readDb();
  return db.users.find((u) => u.verificationToken === token) || null;
};

const createUser = async ({ name, email, password, phone, avatar, provider = 'local', verified = false }) => {
  const db = readDb();
  const id = db.users.length ? Math.max(...db.users.map((u) => u.id)) + 1 : 1;
  const user = {
    id,
    name,
    email: String(email).toLowerCase(),
    password: password ? await bcrypt.hash(password, SALT_ROUNDS) : null,
    phone: phone || '',
    avatar: avatar || `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
    address: { street: '', city: '', state: '', pin: '' },
    role: 'user',
    provider,
    verified,
    verificationToken: verified ? null : crypto.randomBytes(32).toString('hex'),
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  writeDb(db);
  return user;
};

const updateUser = (id, updates) => {
  const db = readDb();
  const index = db.users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  db.users[index] = { ...db.users[index], ...updates };
  writeDb(db);
  return db.users[index];
};

const setVerified = (id) => updateUser(id, { verified: true, verificationToken: null });

const comparePassword = async (user, candidate) => {
  if (!user?.password) return false;
  return bcrypt.compare(candidate, user.password);
};

/** Seeds the store once, only if it's empty. Used for local dev demo accounts. */
const seedIfEmpty = (seedUsers) => {
  const db = readDb();
  if (db.users.length === 0) {
    db.users = seedUsers;
    writeDb(db);
  }
};

module.exports = {
  toSafeUser,
  findByEmail,
  findById,
  findByVerificationToken,
  createUser,
  updateUser,
  setVerified,
  comparePassword,
  seedIfEmpty,
};
