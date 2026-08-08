// Seeds initial demo accounts and orders into local storage if empty

const bcrypt = require('bcryptjs');
const { readDb, writeDb } = require('./jsonStore');

const seedDemoUsers = async () => {
  const db = readDb();
  if (db.users.length > 0) return;

  const password = await bcrypt.hash('password123', 12);
  db.users = [
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      password,
      phone: '9876543210',
      avatar: 'https://i.pravatar.cc/150?img=47',
      address: { street: '12, Lotus Colony', city: 'Mumbai', state: 'Maharashtra', pin: '400001' },
      role: 'user',
      provider: 'local',
      verified: true,
      verificationToken: null,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Rahul Mehta',
      email: 'rahul@example.com',
      password,
      phone: '9765432109',
      avatar: 'https://i.pravatar.cc/150?img=12',
      address: { street: '45, Green Park', city: 'Delhi', state: 'Delhi', pin: '110001' },
      role: 'user',
      provider: 'local',
      verified: true,
      verificationToken: null,
      createdAt: new Date().toISOString(),
    },
  ];
  writeDb(db);
  console.log('[seed] Local user store seeded with 2 demo accounts');
};

const seedDemoOrders = () => {
  const db = readDb();
  if (db.orders.length > 0) return;

  db.orders = [
    {
      id: 'ORD-2025-001',
      userId: 1,
      date: '2025-04-12',
      status: 'Delivered',
      items: [
        { productId: 1, title: 'NCERT Mathematics Class 10', qty: 2, price: 149 },
        { productId: 6, title: 'Parker Jotter Ballpoint Pen Set', qty: 1, price: 449 },
      ],
      subtotal: 747,
      shipping: 49,
      tax: 67,
      total: 863,
      address: { street: '12, Lotus Colony', city: 'Mumbai', state: 'Maharashtra', pin: '400001' },
      paymentMethod: 'UPI',
    },
    {
      id: 'ORD-2025-002',
      userId: 1,
      date: '2025-05-01',
      status: 'Processing',
      items: [
        { productId: 25, title: 'LEGO Classic Creative Brick Box', qty: 1, price: 3199 },
        { productId: 17, title: 'Milton Thermosteel Flip Lid Bottle', qty: 1, price: 549 },
      ],
      subtotal: 3748,
      shipping: 0,
      tax: 337,
      total: 4085,
      address: { street: '12, Lotus Colony', city: 'Mumbai', state: 'Maharashtra', pin: '400001' },
      paymentMethod: 'Credit Card',
    },
    {
      id: 'ORD-2025-003',
      userId: 1,
      date: '2025-03-20',
      status: 'Cancelled',
      items: [{ productId: 11, title: 'Wildcraft 30L Backpack', qty: 1, price: 1499 }],
      subtotal: 1499,
      shipping: 49,
      tax: 135,
      total: 1683,
      address: { street: '12, Lotus Colony', city: 'Mumbai', state: 'Maharashtra', pin: '400001' },
      paymentMethod: 'Cash on Delivery',
    },
    {
      id: 'ORD-2025-004',
      userId: 1,
      date: '2025-05-18',
      status: 'Shipped',
      items: [
        { productId: 26, title: 'Orboot Earth – AR Globe for Kids', qty: 1, price: 2299 },
        { productId: 20, title: 'Too Yumm! Veggie Sticks', qty: 2, price: 249 },
      ],
      subtotal: 2797,
      shipping: 0,
      tax: 251,
      total: 3048,
      address: { street: '12, Lotus Colony', city: 'Mumbai', state: 'Maharashtra', pin: '400001' },
      paymentMethod: 'UPI',
    },
  ];
  writeDb(db);
  console.log('[seed] Local order store seeded with 4 demo orders');
};

const seedDemoData = async () => {
  await seedDemoUsers();
  seedDemoOrders();
};

module.exports = seedDemoData;
