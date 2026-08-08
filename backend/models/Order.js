// Order data operations (backed by db/jsonStore.js)

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

// Seed demo order history if empty
const seedIfEmpty = (seedOrders) => {
  const db = readDb();
  if (db.orders.length === 0) {
    db.orders = seedOrders;
    writeDb(db);
  }
};

module.exports = { findByUserId, findById, createOrder, updateStatus, seedIfEmpty };
