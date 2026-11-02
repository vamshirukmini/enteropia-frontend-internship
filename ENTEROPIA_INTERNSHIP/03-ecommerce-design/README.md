# NOIR — Dark Luxury Storefront (Task 3 — Design 1)

> **Enteropia LLP Frontend Development Internship Challenge**  
> **Assignment 3:** Premium E-Commerce Website  
> **Design Version 1:** NOIR (Dark Luxury Aesthetic)

---

## 1. Project Overview & Design Philosophy

**NOIR** is a dark luxury lifestyle, bespoke fashion, and curated architectural design storefront. Conceived around a discipline of restraint (*"Less, but exceptional"*), the experience eschews mass-market clutter in favor of high-contrast obsidian depth, brushed gold metallic accents, and refined serif typography.

Unlike generic e-commerce templates, NOIR features a custom editorial lookbook composition with rich product photography, interactive multi-angle galleries, variant selection, a responsive sliding bag drawer, coupon code calculation, persistent wishlist, and an end-to-end simulated checkout experience with client-side form validation and demo order receipts.

---

## 2. Core Features & User Workflows

### A. Curated Catalog & Dynamic Filtering
- **12 Handcrafted Products:** Spanning three suites: *Sartorial Fashion*, *Home & Living*, and *Leather & Accessories*.
- **Live Search & Instant Filtering:** Debounced client-side search across titles, categories, and descriptions with animated skeleton loader transitions.
- **Sorting Mechanisms:** Curated (Featured), Price: Low-to-High, Price: High-to-Low, and Alphabetical (A–Z).
- **Empty State Recovery:** Dedicated graceful empty state with a 1-click filter reset action.

### B. Interactive Product Details Modal
- **Multi-Angle Gallery:** Primary view updates seamlessly when clicking any thumbnail angle.
- **Variant Swatches & Specifications:** Interactive selection for finishes (e.g. *Obsidian Black*, *Charcoal Slate*, *Deep Midnight*) and sizes/proportions.
- **Quantity Selector:** Interactive increment/decrement controls.
- **Harmonious Accompaniments:** Contextual related pieces recommendations embedded directly in the modal.
- **Wishlist Toggle:** 1-click bookmarking from either the product card or detail modal.

### C. Shopping Bag Drawer & Promo Calculations
- **Slide-out Bag Drawer:** Accessible sliding drawer displaying thumbnail, selected variant/size, and quantity controls.
- **Live Quantity Controls:** Update quantities directly in the bag with automatic price re-calculations.
- **VIP Promo Code Engine:** Test with promo code `NOIR20` or `ENTEROPIA20` to unlock a **20% VIP Private Discount**.
- **Complimentary Delivery Threshold:** Free white-glove courier shipping automatically applied for orders of ₹2,999 or more.

### D. Private Checkout & Order Confirmation
- **End-to-End Validation:** Full Name (min 2 chars), valid Email syntax, 10-digit Phone number, 6-digit PIN code, and detailed Delivery Address (min 10 chars).
- **Demonstration Notice:** Honest notification informing evaluators that banking credentials are not collected.
- **Order Generation:** Upon successful confirmation, generates a unique serialized order ID (e.g., `NOIR-8492019`) and clears the bag.
- **Persistent State:** Cart items, wishlist items, and completed orders are safely persisted in browser `localStorage` under `noir_cart`, `noir_wishlist`, and `noir_orders`.

---

## 3. Technology Stack & Architecture

- **Markup:** Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<dialog>` patterns).
- **Styling:** Vanilla CSS3 with custom CSS Custom Properties (`--bg-dark`, `--accent-gold`, etc.), responsive clamp typography, and smooth CSS cubic-bezier transitions.
- **Interactivity:** Vanilla ECMAScript 6+ with modular state management, DOM event delegation, and `localStorage` synchronization.
- **Typography:** Google Fonts (`Playfair Display` serif for editorial titles + `DM Sans` for legibility).
- **Icons & Symbols:** Clean Unicode typographic glyphs (`✦`, `↗`, `⌕`, `♡`, `♥`, `✕`, `✓`).
- **Dependencies:** **Zero external libraries or frameworks.** Pure vanilla browser-native code.

---

## 4. How to Run Locally

1. Open this project in **VS Code**:
   ```bash
   cd "03-ecommerce-design"
   ```
2. Start the **Live Server** extension on `index.html`.
3. Open in your browser:
   ```
   http://127.0.0.1:5500/03-ecommerce-design/index.html
   ```

---

## 5. Verification & Testing Checklist

- [x] Product search, category filtering, and price sorting work seamlessly.
- [x] Product detail modal opens with multi-angle image switching, variant buttons, and related products.
- [x] Quick add to bag and detail add to bag update badge counts and drawer immediately.
- [x] Promo code `NOIR20` calculates 20% discount correctly.
- [x] Wishlist drawer saves items across browser refreshes via `localStorage`.
- [x] Checkout form enforces strict validation on phone, email, PIN, and address.
- [x] Order confirmation displays generated order receipt and clears the cart.
- [x] Responsive layout verified across mobile (375px), tablet (768px), and ultra-wide desktop (1440px+).
- [x] Accessible modal handling (Escape key closes open dialogs, focus trapping).
