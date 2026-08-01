# 📚 EduMart UI

> A modern, full-featured **educational e-commerce storefront** built with React 19 + Vite. Designed for schools, students, and parents to browse and purchase educational essentials — books, stationery, bags, lunch boxes, toys, and more.

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | ^19.2.8 | UI framework |
| [Vite](https://vite.dev/) | ^8.2.0 | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | ^7.18.2 | Client-side routing |
| [Bootstrap](https://getbootstrap.com/) | ^5.3.8 | Grid & layout utilities |
| [SASS](https://sass-lang.com/) | ^1.102.0 | Custom SCSS styling |
| [React Icons](https://react-icons.github.io/react-icons/) | ^5.7.0 | Icon library |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) | ^1.75.0 | Fast JS/JSX linter |

---

## ⚡ How to Run the Project

### Prerequisites

Make sure you have the following installed:

- **Node.js** ≥ 18 → [Download Node.js](https://nodejs.org/)
- **npm** ≥ 9 (comes bundled with Node.js)

Verify your versions:
```bash
node -v
npm -v
```

---

### Step 1 — Clone / Open the Project

If you have the project locally already, just open a terminal in the project root folder:

```bash
cd "EduMart UI"
```

---

### Step 2 — Install Dependencies

```bash
npm install
```

> This installs all packages listed in `package.json` into the `node_modules/` folder. Only needed once (or when dependencies change).

---

### Step 3 — Start the Development Server

```bash
npm run dev
```

Vite will start a local dev server with **Hot Module Replacement (HMR)**. Open your browser and go to:

```
http://localhost:5173
```

The page auto-refreshes whenever you save a file.

---

### Other Useful Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `http://localhost:5173` |
| `npm run build` | Build optimized production bundle → `/dist` folder |
| `npm run preview` | Serve the production build locally to preview it |
| `npm run lint` | Run Oxlint to check for code issues |

---

### Troubleshooting

| Issue | Fix |
|---|---|
| `npm install` fails | Delete `node_modules/` and `package-lock.json`, then run `npm install` again |
| Port 5173 already in use | Vite will auto-pick the next available port (e.g., 5174) |
| Blank page in browser | Open browser DevTools (F12) → Console tab for errors |
| SCSS not compiling | Ensure `sass` is installed: `npm install sass` |

---

## 🗂️ Project Structure

```
EduMart UI/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
├── .oxlintrc.json              # Oxlint configuration
├── .gitignore
│
└── src/
    ├── main.jsx                # React DOM entry point
    ├── App.jsx                 # Root component — router + all providers
    ├── App.css                 # App-level styles
    ├── index.css               # Base CSS reset & body styles
    │
    ├── assets/                 # Static assets (images, icons, etc.)
    ├── styles/                 # Global SCSS design system
    ├── context/                # React Context providers (global state)
    ├── hooks/                  # Custom React hooks
    ├── utils/                  # Pure utility functions
    ├── data/                   # Static mock data (products, users, etc.)
    ├── components/             # Reusable UI components
    └── pages/                  # Route-level page components
```

---

## 📁 Folder Details

### `src/styles/` — Design System

All SCSS files that define the global visual language of the app.

| File | Purpose |
|---|---|
| `variables.scss` | Design tokens: colors, typography, spacing, shadows, z-index, breakpoints |
| `mixins.scss` | Reusable SCSS mixins (flex, responsive, truncate, etc.) |
| `global.scss` | Global rules, dark mode (`[data-theme=dark]`), utility classes, component overrides |

**Color Palette:**
- **Primary:** `#2563eb` (Blue) — buttons, links, accents
- **Secondary:** `#7c3aed` (Purple) — badges, highlights
- **Accent:** `#f59e0b` (Amber) — ratings, sale badges
- **Success / Danger / Warning / Info** — status colors

**Fonts:** `Inter` (body) + `Poppins` (headings)

---

### `src/context/` — Global State (React Context API)

All state is managed through the Context API with `localStorage` persistence via `useLocalStorage` hook.

| File | Context | Persisted Key | Exported Hook |
|---|---|---|---|
| `CartContext.jsx` | Cart items, quantities, totals | `edumart_cart` | `useCart()` |
| `WishlistContext.jsx` | Wishlist items | `edumart_wishlist` | `useWishlist()` |
| `UserContext.jsx` | Auth, profile, dark mode, recently viewed | `edumart_user`, `edumart_dark`, `edumart_recent` | `useUser()` |
| `ToastContext.jsx` | Toast notification queue | _(in-memory only)_ | `useToast()` |

#### Provider Tree (in `App.jsx`)
```
BrowserRouter
  └── UserProvider
        └── CartProvider
              └── WishlistProvider
                    └── ToastProvider
                          └── AppRoutes (Navbar + Routes + Footer)
```

#### `useCart()` — Exported Actions
| Action | Description |
|---|---|
| `addToCart(product, qty)` | Add to cart; increases qty if already present (capped at stock) |
| `removeFromCart(productId)` | Remove item entirely |
| `increaseQuantity(productId)` | +1 qty (capped at stock) |
| `decreaseQuantity(productId)` | -1 qty (removes if reaches 0) |
| `clearCart()` | Empty the cart |
| `isInCart(productId)` | Returns `true/false` |
| `calculateTotal()` | Returns `{ subtotal, shipping, tax, total }` |
| `cartCount` | Total quantity across all items |

#### `useWishlist()` — Exported Actions
| Action | Description |
|---|---|
| `addToWishlist(product)` | Add to wishlist (no duplicates) |
| `removeFromWishlist(productId)` | Remove from wishlist |
| `toggleWishlist(product)` | Add if absent, remove if present |
| `isInWishlist(productId)` | Returns `true/false` |
| `clearWishlist()` | Empty wishlist |
| `wishlistCount` | Total items in wishlist |

#### `useUser()` — Exported Actions
| Action | Description |
|---|---|
| `login(email, password)` | Validates against dummy users, returns `{success, message}` |
| `register(userData)` | Creates new user session |
| `logout()` | Clears user session |
| `updateProfile(updates)` | Merges updates into current user |
| `toggleDarkMode()` | Toggles dark theme on `<html>` via `data-theme="dark"` |
| `addRecentlyViewed(product)` | Tracks last 10 viewed products |
| `isLoggedIn` | `true` if user session exists |
| `darkMode` | Boolean for current theme state |

#### `useToast()` — Exported Actions
| Action | Description |
|---|---|
| `addToast(message, type, duration)` | Show a toast (`success`, `error`, `warning`, `info`) |
| `removeToast(id)` | Dismiss a toast manually |

---

### `src/hooks/` — Custom Hooks

| File | Description |
|---|---|
| `useLocalStorage.js` | Syncs React state with `localStorage`. Handles JSON parse/stringify with error fallback. Signature: `useLocalStorage(key, initialValue)` → `[value, setValue]` |

---

### `src/utils/` — Utility Functions

#### `currency.js`
| Function | Description |
|---|---|
| `formatCurrency(amount)` | Formats number to INR (₹) using `Intl.NumberFormat` |
| `calcDiscount(original, discounted)` | Returns discount percentage as integer |
| `calcSubtotal(items)` | Sums `discountPrice × quantity` for all cart items |
| `calcShipping(subtotal)` | Free if ≥ ₹999, else ₹49 |
| `calcTax(subtotal)` | 9% GST on subtotal (rounded) |

#### `validation.js`
| Function | Description |
|---|---|
| `validateRequired(value, fieldName)` | Checks if field is non-empty |
| `validateEmail(email)` | Regex-based email format check |
| `validatePassword(password)` | Min 6 characters |
| `validateConfirmPassword(password, confirm)` | Checks both match |
| `validatePhone(phone)` | Indian 10-digit mobile number (starts 6–9) |
| `validatePIN(pin)` | Indian 6-digit PIN code |
| `validateName(name)` | Non-empty, min 2 characters |
| `validateCheckoutForm(formData)` | Runs all validations, returns `errors` object |
| `isFormValid(errors)` | Returns `true` if all error strings are empty |

---

### `src/data/` — Mock Data

| File | Description |
|---|---|
| `products.js` | 50+ products with full schema (id, title, price, discountPrice, images, rating, stock, reviews, specifications, tags, isFeatured, isTrending, isBestSeller, isNewArrival) |
| `categories.js` | 10 product categories with slug, icon, color, and productCount |
| `users.js` | Dummy user accounts for login simulation |
| `orders.js` | Sample past orders for the Orders page |

**Product Categories:**
`Books` · `Stationery` · `School Bags` · `Lunch Boxes` · `Water Bottles` · `Healthy Snacks` · `Educational Toys` · `Notebooks` · `Art Supplies` · `Uniforms`

**Product Flags:**
- `isFeatured` — shown in Featured section on Home
- `isTrending` — shown in Trending section
- `isBestSeller` — shown in Best Sellers section
- `isNewArrival` — shown in New Arrivals section

---

### `src/components/` — Reusable UI Components

Each component lives in its own folder (component file + SCSS module).

| Component | Description |
|---|---|
| `Navbar/` | Sticky top navigation with logo, search, cart badge, wishlist badge, user menu, and dark mode toggle |
| `Footer/` | Site footer with links, categories, and social icons |
| `Hero/` | Full-width homepage hero banner with CTA |
| `SearchBar/` | Debounced search input used in Navbar and Products page |
| `ProductCard/` | Product tile with image, name, price, discount badge, rating, add-to-cart, and wishlist toggle |
| `ProductGrid/` | Responsive grid wrapper for `ProductCard` components |
| `ProductFilter/` | Sidebar/drawer filter panel (category, price range, rating, sort) |
| `CategoryCard/` | Category tile shown on Home page |
| `CartItem/` | Single cart row in the Cart page (image, name, qty selector, remove button) |
| `WishlistCard/` | Wishlist product card with move-to-cart action |
| `QuantitySelector/` | +/- quantity control with min/max enforcement |
| `Rating/` | Star rating display (accepts value + count) |
| `ReviewCard/` | Single product review (user, date, rating, comment) |
| `Pagination/` | Page number controls for paginated product listings |
| `Breadcrumb/` | Path navigation for Product Details and other deep pages |
| `Loader/` | Full-page or inline spinner/skeleton loader |
| `EmptyState/` | Illustrated empty state (empty cart, wishlist, search results) |
| `Toast/` | Floating notification renderer (consumes `ToastContext`) |
| `ProtectedRoute/` | HOC that redirects unauthenticated users to `/login` |

---

### `src/pages/` — Page Components (Routes)

| Route | Page | Access | Description |
|---|---|---|---|
| `/` | `Home` | Public | Hero, Featured Products, Categories, Trending, Best Sellers, New Arrivals |
| `/products` | `Products` | Public | Full catalog with filters, sort, search, and pagination |
| `/products/:id` | `ProductDetails` | Public | Image gallery, specs, reviews, add to cart / wishlist |
| `/cart` | `Cart` | Public | Cart items, quantity management, order summary |
| `/wishlist` | `Wishlist` | Public | Saved products, move to cart |
| `/login` | `Login` | Public | Email + password login form |
| `/register` | `Register` | Public | Registration form with validation |
| `/checkout` | `Checkout` | 🔒 Protected | Shipping form + order summary + place order |
| `/account` | `Account` | 🔒 Protected | Profile info, address, dark mode, recently viewed |
| `/orders` | `Orders` | 🔒 Protected | Past order history with status |
| `*` | `NotFound` | Public | 404 error page |

> 🔒 **Protected Routes** redirect to `/login` if the user is not authenticated (via `ProtectedRoute` component).

---

## 🔄 Application Workflows

### 1. Authentication Flow

```
User visits /login
    → Submits email + password
    → UserContext.login() validates against dummyUsers (src/data/users.js)
    → On success: user saved to localStorage (edumart_user), redirected to previous page or /
    → On failure: error toast shown

User visits /register
    → Fills registration form (validated with src/utils/validation.js)
    → UserContext.register() creates new user, saves to localStorage
    → Automatically logged in, redirected to /

User clicks Logout
    → UserContext.logout() clears edumart_user from localStorage
    → Redirected to /
```

---

### 2. Shopping Cart Flow

```
Browse Products → ProductCard → Click "Add to Cart"
    → CartContext.addToCart(product, qty)
    → If item exists: qty incremented (max = stock)
    → If new: item appended to cart array
    → Cart saved to localStorage (edumart_cart)
    → Cart badge in Navbar updates (cartCount)
    → Toast "Added to cart!" shown

Cart Page (/cart)
    → Display all CartItems
    → QuantitySelector calls increaseQuantity / decreaseQuantity
    → decreaseQuantity at 1 removes the item
    → Order Summary: calcSubtotal + calcShipping + calcTax = total
    → "Proceed to Checkout" → navigates to /checkout (protected)

Checkout (/checkout)
    → Shipping form validated with validateCheckoutForm()
    → "Place Order" → clearCart() → success toast → redirect to /orders
```

---

### 3. Wishlist Flow

```
ProductCard / ProductDetails → Heart icon → toggleWishlist(product)
    → If not in wishlist: added
    → If in wishlist: removed
    → Persisted to localStorage (edumart_wishlist)
    → Wishlist badge in Navbar updates

Wishlist Page (/wishlist)
    → WishlistCard for each item
    → "Move to Cart" → addToCart(product) + removeFromWishlist(productId)
    → "Remove" → removeFromWishlist(productId)
```

---

### 4. Product Discovery Flow

```
Home Page (/)
    → Hero CTA → /products
    → Category cards → /products?category=<slug>
    → Featured / Trending / Best Sellers / New Arrivals sections

Products Page (/products)
    → SearchBar: filters by title/brand/tags (debounced)
    → ProductFilter: category, price range, rating, sort-by
    → Pagination: page-based slicing of filtered results
    → Click ProductCard → /products/:id

Product Details (/products/:id)
    → Image gallery (thumbnail switcher)
    → QuantitySelector
    → Add to Cart / Toggle Wishlist
    → Product specifications table
    → Reviews section (ReviewCard)
    → Breadcrumb navigation
    → Recently viewed tracked via addRecentlyViewed()
```

---

### 5. Dark Mode Flow

```
Navbar → Moon/Sun toggle icon
    → UserContext.toggleDarkMode()
    → darkMode state flipped in localStorage (edumart_dark)
    → document.documentElement gets/removes data-theme="dark"
    → global.scss [data-theme="dark"] rules apply across entire UI
```

---

### 6. Toast Notification Flow

```
Any component calls useToast().addToast(message, type, duration)
    → ToastContext appends toast to queue
    → Toast component (lazy-loaded) renders floating notifications
    → Auto-dismissed after `duration` ms (default 3000ms)
    → Manual dismiss via X button → removeToast(id)
```

---

## 🔐 Demo Login Credentials

The app uses static dummy users from `src/data/users.js`. Open that file to see available emails and passwords to test protected routes:

- `/checkout` — requires login
- `/account` — requires login
- `/orders` — requires login

> Passwords are stripped from `localStorage` on login for security.

---

## 🎨 Dark Mode

Dark mode is fully supported across all pages. Toggle via the **moon/sun icon** in the Navbar. The preference is saved to `localStorage` under the key `edumart_dark` and applied using the CSS attribute selector `[data-theme="dark"]` on `<html>`.

---

## 📦 localStorage Keys

| Key | Data Stored |
|---|---|
| `edumart_cart` | Array of cart items with quantities |
| `edumart_wishlist` | Array of wishlisted products |
| `edumart_user` | Logged-in user profile (no password) |
| `edumart_dark` | Boolean — dark mode preference |
| `edumart_recent` | Array of last 10 viewed products |

---

## 🏗️ Architecture Decisions

- **No backend / API calls** — all data is static mock data from `src/data/`. This is a pure frontend UI project.
- **Context API over Redux** — lightweight global state without extra dependencies.
- **`useLocalStorage` hook** — single custom hook powers all persistence across 4 contexts.
- **`useCallback` everywhere** — all context actions are memoized to prevent unnecessary re-renders.
- **Lazy-loaded Toast** — `Toast.jsx` is dynamically imported in `ToastContext` to prevent circular imports.
- **ProtectedRoute** — wraps protected pages; redirects to `/login` with `state.from` so users return to intended page after login.
- **ScrollToTop** — a side-effect-only component placed inside `BrowserRouter` resets scroll on every route change.
- **Bootstrap grid + SCSS** — Bootstrap handles responsive layout; all custom visual design is pure SCSS with a token-based design system.

---

## 📄 License

This project was built as part of an internship at **Avian**. All product images are sourced from [Unsplash](https://unsplash.com/) and used for demonstration purposes only.
