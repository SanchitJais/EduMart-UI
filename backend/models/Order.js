// ============================================================
// Order Model — JSON-file-backed store (see db/jsonStore.js)
// Swap this file's internals for a real Mongoose/Postgres model
// later without touching callers — the exported function shapes
// are the contract.
//
// NOTE: totals are trusted as sent by the client (no product
// catalog or payment gateway lives on this backend yet) — fine
// for this demo, but re-derive them from a real price source
// before this ever handles real money.
// ============================================================

const { readDb, writeDb } = require('../db/jsonStore');

const findByUserId = (userId) => {
  const db = readDb();
  return db.orders
    .filter((o) => o.userId === userId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

const findById = (id) => {
  const db = readDb();
  return db.orders.find((o) => o.id === id) || null;
};

const createOrder = ({ userId, items, subtotal, shipping, tax, total, address, paymentMethod }) => {
  const db = readDb();
  const order = {
    id: `ORD-${Date.now()}`,
    userId,
    date: new Date().toISOString().slice(0, 10),
    status: 'Processing',
    items,
    subtotal,
    shipping,
    tax,
    total,
    address,
    paymentMethod,
    createdAt: new Date().toISOString(),
  };
  db.orders.push(order);
  writeDb(db);
  return order;
};

const updateStatus = (id, status) => {
  const db = readDb();
  const index = db.orders.findIndex((o) => o.id === id);
  if (index === -1) return null;
  db.orders[index] = { ...db.orders[index], status };
  writeDb(db);
  return db.orders[index];
};

/** Seeds the store once, only if it's empty. Used for local dev demo history. */
const seedIfEmpty = (seedOrders) => {
  const db = readDb();
  if (db.orders.length === 0) {
    db.orders = seedOrders;
    writeDb(db);
  }
};

module.exports = { findByUserId, findById, createOrder, updateStatus, seedIfEmpty };
