// ============================================================
// EduMart – Dummy Orders Data
// ============================================================

export const dummyOrders = [
  {
    id: "ORD-2025-001",
    userId: 1,
    date: "2025-04-12",
    status: "Delivered",
    items: [
      { productId: 1, title: "NCERT Mathematics Class 10", qty: 2, price: 149 },
      { productId: 6, title: "Parker Jotter Ballpoint Pen Set", qty: 1, price: 449 },
    ],
    subtotal: 747,
    shipping: 49,
    tax: 67,
    total: 863,
    address: { street: "12, Lotus Colony", city: "Mumbai", state: "Maharashtra", pin: "400001" },
    paymentMethod: "UPI",
  },
  {
    id: "ORD-2025-002",
    userId: 1,
    date: "2025-05-01",
    status: "Processing",
    items: [
      { productId: 25, title: "LEGO Classic Creative Brick Box", qty: 1, price: 3199 },
      { productId: 17, title: "Milton Thermosteel Flip Lid Bottle", qty: 1, price: 549 },
    ],
    subtotal: 3748,
    shipping: 0,
    tax: 337,
    total: 4085,
    address: { street: "12, Lotus Colony", city: "Mumbai", state: "Maharashtra", pin: "400001" },
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-2025-003",
    userId: 1,
    date: "2025-03-20",
    status: "Cancelled",
    items: [
      { productId: 11, title: "Wildcraft 30L Backpack", qty: 1, price: 1499 },
    ],
    subtotal: 1499,
    shipping: 49,
    tax: 135,
    total: 1683,
    address: { street: "12, Lotus Colony", city: "Mumbai", state: "Maharashtra", pin: "400001" },
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "ORD-2025-004",
    userId: 1,
    date: "2025-05-18",
    status: "Shipped",
    items: [
      { productId: 26, title: "Orboot Earth – AR Globe for Kids", qty: 1, price: 2299 },
      { productId: 20, title: "Too Yumm! Veggie Sticks", qty: 2, price: 249 },
    ],
    subtotal: 2797,
    shipping: 0,
    tax: 251,
    total: 3048,
    address: { street: "12, Lotus Colony", city: "Mumbai", state: "Maharashtra", pin: "400001" },
    paymentMethod: "UPI",
  },
];

export default dummyOrders;
