# ATELIER — Minimalist Editorial Boutique (Task 3 — Design 2)

> **Enteropia LLP Frontend Development Internship Challenge**  
> **Assignment 3:** Premium E-Commerce Website  
> **Design Version 2:** ATELIER (Warm Minimal Editorial Living & Fashion Aesthetic)

---

## 1. Project Overview & Visual Differentiation

**ATELIER** represents the light, warm, and editorial counterpart to the dark obsidian NOIR storefront. Inspired by slow living, natural materials, and Scandinavian-Japanese minimalism, ATELIER features a warm paper palette (`#fbf9f4`), sage botanical accents (`#4b614e`), terracotta clay tones (`#b86e58`), and spacious editorial typography.

While NOIR embodies dramatic evening luxury, ATELIER is tailored for calm daytime lifestyle discovery, featuring organic tactile products, multi-angle image galleries, interactive swatch controls, an accessible sliding bag drawer, seasonal coupon discounts, and an honest simulated checkout system.

---

## 2. Key Features & Workflows

### A. Living & Fashion Collection
- **12 Curated Products:** Thoughtful everyday pieces spanning *Home & Living*, *Boutique Fashion*, and *Curated Accessories*.
- **Multi-Angle Gallery Switcher:** Product detail view features full-fidelity image thumbnails that update the hero photo seamlessly upon selection.
- **Dynamic Filtering & Real-time Search:** Instant debounced search querying across names, categories, and descriptions with skeleton loader transitions.
- **Sorting Modes:** Curated (Featured), Price: Low-to-High, Price: High-to-Low, and Alphabetical (A–Z).

### B. Interactive Product Details & Pairings
- **Variant Finishes & Proportions:** Interactive swatch buttons for colors/finishes (e.g. *Natural Oak & Oatmeal*, *Warm Ivory*, *Pale Cream*) and sizes.
- **Quantity Stepper:** Tactile controls to adjust units before adding to the bag.
- **Pieces That Pair Thoughtfully:** Integrated related product recommendations inside the modal that allow one-click traversal through the catalog.
- **Wishlist Sync:** Immediate bookmarking with persistent `localStorage` synchronization.

### C. Shopping Bag Drawer & Promo Calculations
- **Slide-out Cart Drawer:** Clean right-aligned drawer displaying thumbnail, chosen variant/size, and quantity adjustments.
- **Seasonal Promo Engine:** Enter promo code `ATELIER15` or `ENTEROPIA15` to trigger a **15% seasonal savings discount**.
- **Delivery Threshold:** Orders over ₹2,999 automatically receive complimentary shipping.

### D. Client-Side Checkout & Order Confirmation
- **Strict Form Validation:** Full name, valid email regex, 10-digit mobile number, 6-digit postal PIN code, and multi-line address.
- **Transparent Notice:** Discloses demo status clearly so evaluators know financial data is never intercepted.
- **Order Confirmation:** Generates a unique reference (e.g., `ATL-9482103`), logs the order to `localStorage`, and clears the shopping bag.

---

## 3. Technology Stack & Design System

- **Language:** Semantic HTML5 + Vanilla CSS3 + Modern ES6+ JavaScript.
- **Color Tokens:**
  - Background: Warm Paper (`#fbf9f4`) and Cream (`#f4f0e6`)
  - Typography: Ink (`#232b25`) and Muted Moss (`#797a70`)
  - Accents: Sage Green (`#4b614e`) and Terracotta Clay (`#b86e58`)
- **Typography:** Google Fonts (`Playfair Display` serif + `DM Sans` geometric sans-serif).
- **Architecture:** Zero external npm packages, frameworks, or bundlers. 100% native browser support.

---

## 4. How to Run Locally

1. Open in **VS Code**:
   ```bash
   cd "03-ecommerce-design/03-ecommerce-design-2"
   ```
2. Launch using **Live Server** on `index.html`.
3. Open in browser:
   ```
   http://127.0.0.1:5500/03-ecommerce-design/03-ecommerce-design-2/index.html
   ```

---

## 5. Verification Checklist

- [x] Genuinely distinct light editorial visual identity compared to NOIR.
- [x] 12 curated products with verified high-resolution multi-angle photography.
- [x] Working thumbnail gallery switcher, variant swatches, and quantity steppers in modal.
- [x] Promo code `ATELIER15` calculates 15% discount accurately in bag drawer.
- [x] Complete form validation with individual field error feedback.
- [x] State persistence for cart, wishlist, and past orders in `localStorage`.
- [x] Smooth responsive design across mobile (375px), tablet, and desktop viewports.
- [x] Keyboard accessibility (Escape key closes open drawers and modals).
