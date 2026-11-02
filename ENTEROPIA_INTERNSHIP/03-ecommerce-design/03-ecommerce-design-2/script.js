// ATELIER — Minimalist Editorial Living & Fashion Boutique
// Vanilla ES6+ Implementation for Enteropia LLP Internship Challenge

(function () {
  'use strict';

  const PRODUCTS = [
    {
      id: 1,
      name: "Linen Cantilever Lounge Chair",
      category: "living",
      price: 7999,
      old: 8999,
      badge: "Signature",
      images: [
        "https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1580481077111-2098d5757d29?auto=format&fit=crop&w=900&q=85"
      ],
      description: "A relaxed, sculptural lounge chair designed to bring natural warmth and character to living rooms, sunrooms, and quiet reading spaces. Crafted with sustainable solid European white oak and tactile washed Belgian linen.",
      variants: ["Natural Oak & Oatmeal", "Smoked Ash & Charcoal"],
      variantDeltas: { "Natural Oak & Oatmeal": 0, "Smoked Ash & Charcoal": 800 },
      sizes: ["Standard Lounge", "Expanded Silhouette"],
      sizeDeltas: { "Standard Lounge": 0, "Expanded Silhouette": 1200 },
      relatedIds: [3, 5, 11]
    },
    {
      id: 2,
      name: "Relaxed Normandy Linen Shirt",
      category: "fashion",
      price: 1899,
      old: 2299,
      badge: "Bestseller",
      images: [
        "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85"
      ],
      description: "A breathable, airy everyday shirt woven from pure Normandy flax linen. Finished with genuine mother-of-pearl buttons and a comfortable camp collar silhouette.",
      variants: ["Warm Ivory", "Sage Green", "Soft Sand"],
      variantDeltas: { "Warm Ivory": 0, "Sage Green": 0, "Soft Sand": 150 },
      sizes: ["S", "M", "L", "XL"],
      sizeDeltas: { "S": 0, "M": 0, "L": 0, "XL": 150 },
      relatedIds: [6, 9, 12]
    },
    {
      id: 3,
      name: "Soft Form Matte Ceramic Vase",
      category: "living",
      price: 1299,
      old: 1599,
      badge: "New Edit",
      images: [
        "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=85"
      ],
      description: "A gentle sculptural stoneware accent created by independent studio potters. Unglazed exterior with waterproof satin glaze inside, suitable for fresh florals or dry grasses.",
      variants: ["Pale Cream", "Terracotta Blush", "Matte Basalt"],
      variantDeltas: { "Pale Cream": 0, "Terracotta Blush": 150, "Matte Basalt": 250 },
      sizes: ["Small (20cm)", "Medium (28cm)"],
      sizeDeltas: { "Small (20cm)": 0, "Medium (28cm)": 350 },
      relatedIds: [1, 5, 7]
    },
    {
      id: 4,
      name: "Handcrafted Canvas & Leather Tote",
      category: "accessories",
      price: 2199,
      old: 2599,
      badge: "Essential",
      images: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85"
      ],
      description: "A spacious weekend and market tote constructed from 18oz heavy organic cotton duck canvas and vegetable-tanned bridle leather handles that patina gracefully with use.",
      variants: ["Natural Sand", "Olive Drab", "Slate Grey"],
      sizes: ["28L Everyday"],
      relatedIds: [8, 10, 2]
    },
    {
      id: 5,
      name: "Solid Oak Ambient Table Lamp",
      category: "living",
      price: 2799,
      old: 3299,
      badge: "Popular",
      images: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Lathe-turned natural white oak base paired with an unbleached linen drum shade. Emits a warm, diffused 2400K glow with a tactile inline dimmer switch.",
      variants: ["Natural Oak", "Walnut Finish"],
      sizes: ["Desk Lamp (36cm)"],
      relatedIds: [1, 3, 11]
    },
    {
      id: 6,
      name: "Classic Low-Profile Leather Sneakers",
      category: "fashion",
      price: 2999,
      old: 3499,
      badge: "Restocked",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Timeless minimal sneakers crafted with buttery soft full-grain nappa leather, cushioned memory foam insoles, and natural gum rubber outsoles.",
      variants: ["Optic White", "Chalk White / Gum"],
      sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
      relatedIds: [2, 9, 8]
    },
    {
      id: 7,
      name: "Hand-Thrown Stoneware Dining Set",
      category: "living",
      price: 999,
      old: 1299,
      badge: "Artisanal",
      images: [
        "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Earthy speckled stoneware plates and shallow bowls with an organic wavy rim. Microwave, dishwasher, and oven safe for relaxed everyday meals.",
      variants: ["Speckled Oat", "Slate Glaze"],
      sizes: ["Set of 2 Pieces", "Set of 4 Pieces"],
      relatedIds: [3, 5, 11]
    },
    {
      id: 8,
      name: "Slim Bifold Vegetable-Tanned Wallet",
      category: "accessories",
      price: 1499,
      old: 1799,
      badge: "Handmade",
      images: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Ultra-compact wallet with 6 dedicated card slots and a lined currency sleeve. Hand-stitched with waxed linen thread and finished with beeswax burnished edges.",
      variants: ["Warm Tan", "Cognac Brown", "Charcoal"],
      sizes: ["Slim (9mm)"],
      relatedIds: [4, 10, 6]
    },
    {
      id: 9,
      name: "Relaxed Half-Zip Wool Knit Sweater",
      category: "fashion",
      price: 2499,
      old: 2999,
      badge: "Winter Warmth",
      images: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Chunky ribbed pullover knit from 100% cruelty-free lambswool. Features an antique brass collar zip and comfortable raglan sleeves.",
      variants: ["Beige Melange", "Forest Moss", "Oatmeal"],
      sizes: ["S", "M", "L", "XL"],
      relatedIds: [2, 6, 12]
    },
    {
      id: 10,
      name: "Minimalist Brushed Steel Timepiece",
      category: "accessories",
      price: 3999,
      old: 4599,
      badge: "Limited Run",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Japanese quartz movement encased in 316L surgical stainless steel. Finished with an organic Italian calfskin leather strap and scratch-resistant sapphire crystal.",
      variants: ["Brushed Silver / Tan", "Matte Gunmetal / Black"],
      sizes: ["38mm Unisex"],
      relatedIds: [4, 8, 2]
    },
    {
      id: 11,
      name: "Handwoven Seagrass Storage Basket",
      category: "living",
      price: 1199,
      old: 1499,
      badge: "Natural Fiber",
      images: [
        "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Ethically woven by coastal artisan communities using wild-harvested seagrass and jute. Foldable dual-tier construction ideal for throws, books, and plants.",
      variants: ["Natural Blonde", "Two-Tone White Dip"],
      sizes: ["Medium (32cm)", "Large (40cm)"],
      relatedIds: [1, 3, 5]
    },
    {
      id: 12,
      name: "Criss-Cross Soft Leather Slide Sandals",
      category: "fashion",
      price: 2299,
      old: 2699,
      badge: "Summer Easy",
      images: [
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Supple unlined leather cross straps with an anatomical molded cork footbed that shapes to your foot with every wear. Flexible crepe rubber sole.",
      variants: ["Camel Tan", "Warm Espresso", "Bone White"],
      sizes: ["EU 37", "EU 38", "EU 39", "EU 40", "EU 41"],
      relatedIds: [2, 6, 9]
    }
  ];

  // Helper selectors
  const $ = (sel) => document.querySelector(sel);
  const money = (val) => "₹" + Number(val).toLocaleString("en-IN");

  // State Management
  function load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  let cart = load("atelier_cart", []);
  let wishlist = load("atelier_wishlist", []);
  let discountRate = 0; // percentage
  let appliedPromo = "";
  let toastTimer = null;

  function persist() {
    try {
      localStorage.setItem("atelier_cart", JSON.stringify(cart));
      localStorage.setItem("atelier_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
    updateCounts();
  }

  // Toast feedback
  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
  }

  // Overlay management
  function openOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.hidden = false;
    document.body.classList.add("lock");
  }

  function closeOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.hidden = true;
    const hasOpen = Array.from(document.querySelectorAll(".overlay")).some((o) => !o.hidden);
    if (!hasOpen) document.body.classList.remove("lock");
  }

  // Header Counters
  function updateCounts() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCountEl = $("#cartCount");
    const drawerCountEl = $("#drawerCount");
    const wishCountEl = $("#wishCount");
    const drawerWishCountEl = $("#drawerWishCount");

    if (cartCountEl) cartCountEl.textContent = totalQty;
    if (drawerCountEl) drawerCountEl.textContent = `(${totalQty})`;
    if (wishCountEl) wishCountEl.textContent = wishlist.length;
    if (drawerWishCountEl) drawerWishCountEl.textContent = `(${wishlist.length})`;
  }

  // Render Product Catalog
  function renderProducts(showSkeleton = false) {
    const query = $("#searchInput") ? $("#searchInput").value.trim().toLowerCase() : "";
    const category = $("#categoryFilter") ? $("#categoryFilter").value : "all";
    const sort = $("#sortFilter") ? $("#sortFilter").value : "featured";
    const skeleton = $("#skeletonGrid");
    const grid = $("#productGrid");
    const emptyState = $("#emptyState");

    if (!grid) return;

    if (showSkeleton && skeleton) {
      skeleton.hidden = false;
      grid.hidden = true;
      setTimeout(() => {
        skeleton.hidden = true;
        grid.hidden = false;
        doRender();
      }, 160);
      return;
    }

    doRender();

    function doRender() {
      let list = PRODUCTS.filter((p) => {
        const text = (p.name + " " + p.category + " " + p.description).toLowerCase();
        return text.includes(query) && (category === "all" || p.category === category);
      });

      if (sort === "low") list.sort((a, b) => a.price - b.price);
      if (sort === "high") list.sort((a, b) => b.price - a.price);
      if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

      const countLabel = $("#productCount");
      if (countLabel) {
        countLabel.textContent = `${list.length} ${list.length === 1 ? 'product' : 'products'}`;
      }

      if (emptyState) emptyState.hidden = list.length !== 0;

      grid.innerHTML = list.map((p) => {
        const isWish = wishlist.includes(p.id);
        return `
          <article class="product-card" data-id="${p.id}">
            <div class="product-photo" data-action="view" data-id="${p.id}">
              <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
              ${p.badge ? `<span class="tag">${p.badge}</span>` : ""}
              <button class="heart ${isWish ? 'active' : ''}" data-action="wish" data-id="${p.id}" aria-label="Save ${p.name}">
                ${isWish ? '♥' : '♡'}
              </button>
              <button class="quick" data-action="view" data-id="${p.id}">Discover This Piece +</button>
            </div>
            <div class="product-info">
              <small>${p.category.toUpperCase()}</small>
              <h3 data-action="view" data-id="${p.id}">${p.name}</h3>
              <div class="price">${money(p.price)} <del>${money(p.old)}</del></div>
              <div class="product-actions">
                <button data-action="add" data-id="${p.id}">Add to Bag +</button>
                <button data-action="view" data-id="${p.id}">View Details</button>
              </div>
            </div>
          </article>
        `;
      }).join("");
    }
  }

  // Wishlist Logic
  function toggleWish(id) {
    const idx = wishlist.indexOf(id);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      toast("Removed from saved pieces");
    } else {
      wishlist.push(id);
      toast("Saved to your wishlist ♥");
    }
    persist();
    renderProducts(false);
    renderWishlist();
  }

  // Add to Cart
  function addToCart(id, variant, size, qty = 1, unitPrice) {
    const p = PRODUCTS.find((item) => item.id === id);
    if (!p) return;

    const chosenVariant = variant || p.variants[0];
    const chosenSize = size || (p.sizes ? p.sizes[0] : null);
    const finalPrice = typeof unitPrice === "number" 
      ? unitPrice 
      : (p.price + ((p.variantDeltas && p.variantDeltas[chosenVariant]) || 0) + ((p.sizeDeltas && p.sizeDeltas[chosenSize]) || 0));

    const existing = cart.find(
      (item) => item.id === id && item.variant === chosenVariant && item.size === chosenSize
    );

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: id,
        variant: chosenVariant,
        size: chosenSize,
        price: finalPrice,
        qty: qty
      });
    }

    persist();
    renderCart();
    toast(`Added ${p.name} to your bag`);

    // Micro-animation badge bounce
    const badge = $("#cartCount");
    if (badge) {
      badge.classList.remove("bounce");
      void badge.offsetWidth;
      badge.classList.add("bounce");
    }
  }

  // Subtotal Calculation
  function getSubtotal() {
    return cart.reduce((sum, item) => {
      const p = PRODUCTS.find((x) => x.id === item.id);
      const unit = typeof item.price === "number" ? item.price : (p ? p.price : 0);
      return sum + (unit * item.qty);
    }, 0);
  }

  // Render Cart Drawer
  function renderCart() {
    const container = $("#cartItems");
    const summary = $("#cartSummary");
    const subtotalEl = $("#subtotal");
    const shippingEl = $("#shipping");
    const discountRow = $("#discountRow");
    const discountAmtEl = $("#discountAmt");

    if (!container) return;

    if (!cart.length) {
      container.innerHTML = `
        <div class="empty-drawer">
          <h3>Your bag is taking a little rest.</h3>
          <p>Find something lovely in our catalog and it will appear here.</p>
        </div>
      `;
      if (summary) summary.hidden = true;
      return;
    }

    if (summary) summary.hidden = false;

    container.innerHTML = cart.map((item, index) => {
      const p = PRODUCTS.find((prod) => prod.id === item.id);
      if (!p) return "";
      return `
        <div class="drawer-item">
          <img src="${p.images[0]}" alt="${p.name}">
          <div>
            <h3>${p.name}</h3>
            <p>${item.variant}${item.size ? ' · ' + item.size : ''}</p>
            <strong>${money(p.price * item.qty)} <small style="font-weight:normal;color:#797a70">(${money(p.price)} ea)</small></strong>
            <div class="controls">
              <button data-action="cart-minus" data-idx="${index}">−</button>
              <span>${item.qty}</span>
              <button data-action="cart-plus" data-idx="${index}">+</button>
              <button class="remove" data-action="cart-remove" data-idx="${index}">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    const baseSubtotal = getSubtotal();
    const discountValue = Math.round(baseSubtotal * discountRate);
    const shipping = baseSubtotal >= 2999 ? 0 : 99;

    if (subtotalEl) subtotalEl.textContent = money(baseSubtotal);

    if (discountRate > 0 && discountRow && discountAmtEl) {
      discountRow.hidden = false;
      discountAmtEl.textContent = `-${money(discountValue)} (${discountRate * 100}%)`;
    } else if (discountRow) {
      discountRow.hidden = true;
    }

    if (shippingEl) {
      shippingEl.textContent = shipping === 0 ? "Complimentary" : money(shipping);
    }
  }

  // Promo Code Engine
  const promoInput = $("#promoInput");
  const promoBtn = $("#promoBtn");
  const promoMsg = $("#promoMsg");

  if (promoBtn && promoInput) {
    promoBtn.addEventListener("click", () => {
      const code = promoInput.value.trim().toUpperCase();
      if (!code) return;
      if (code === "ATELIER15" || code === "ENTEROPIA15") {
        discountRate = 0.15;
        appliedPromo = code;
        if (promoMsg) {
          promoMsg.textContent = "15% seasonal savings applied successfully!";
          promoMsg.className = "promo-msg success";
        }
        toast("15% code applied!");
      } else {
        discountRate = 0;
        appliedPromo = "";
        if (promoMsg) {
          promoMsg.textContent = "Invalid code. Please try 'ATELIER15'.";
          promoMsg.className = "promo-msg error";
        }
      }
      renderCart();
    });
  }

  // Render Wishlist Drawer
  function renderWishlist() {
    const container = $("#wishlistItems");
    if (!container) return;

    if (!wishlist.length) {
      container.innerHTML = `
        <div class="empty-drawer">
          <h3>No saved pieces yet.</h3>
          <p>Tap the heart icon on any piece to keep it close.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = wishlist.map((id) => {
      const p = PRODUCTS.find((prod) => prod.id === id);
      if (!p) return "";
      return `
        <div class="drawer-item">
          <img src="${p.images[0]}" alt="${p.name}">
          <div>
            <h3>${p.name}</h3>
            <p>${p.category.toUpperCase()}</p>
            <strong>${money(p.price)}</strong>
            <div class="controls">
              <button class="primary-btn" style="padding:6px 10px;font-size:9px" data-action="wish-to-bag" data-id="${p.id}">Add to Bag</button>
              <button class="remove" data-action="wish-remove" data-id="${p.id}">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Show Product Details Modal
  function showDetails(id) {
    const p = PRODUCTS.find((item) => item.id === id);
    if (!p) return;

    let activeImg = p.images[0];
    let chosenVariant = p.variants[0];
    let chosenSize = p.sizes ? p.sizes[0] : null;
    let chosenQty = 1;

    const related = (p.relatedIds || [])
      .map((rid) => PRODUCTS.find((x) => x.id === rid))
      .filter(Boolean);

    function renderModalContent() {
      const container = $("#detailContent");
      if (!container) return;

      const vDelta = (p.variantDeltas && p.variantDeltas[chosenVariant]) || 0;
      const sDelta = (p.sizeDeltas && p.sizeDeltas[chosenSize]) || 0;
      const currentUnit = p.price + vDelta + sDelta;
      const currentTotal = currentUnit * chosenQty;

      container.innerHTML = `
        <div class="detail-layout">
          <div class="detail-photo-wrap">
            <div class="detail-photo">
              <img id="detailMainPhoto" src="${activeImg}" alt="${p.name}">
            </div>
            <div class="detail-thumbs">
              ${p.images.map((img, i) => `
                <button class="${img === activeImg ? 'active' : ''}" data-thumb-idx="${i}">
                  <img src="${img}" alt="${p.name} thumbnail ${i + 1}">
                </button>
              `).join("")}
            </div>
          </div>

          <div class="detail-info">
            <span class="kicker">${p.category.toUpperCase()} / ATELIER SELECTION</span>
            <h2 id="detailTitle">${p.name}</h2>
            <div class="detail-pricing">
              <strong>${money(currentUnit)}</strong>
              ${p.old ? `<del>${money(p.old + vDelta + sDelta)}</del>` : ''}
            </div>
            <p>${p.description}</p>

            <div class="detail-swatches">
              <label>Select Finish / Shade: <strong>${chosenVariant}</strong></label>
              <div class="swatch-group">
                ${p.variants.map((v) => {
                  const d = (p.variantDeltas && p.variantDeltas[v]) || 0;
                  const label = d > 0 ? `${v} (+${money(d)})` : v;
                  return `<button class="swatch-btn ${v === chosenVariant ? 'active' : ''}" data-variant="${v}">${label}</button>`;
                }).join("")}
              </div>
            </div>

            ${p.sizes ? `
              <div class="detail-swatches">
                <label>Choose Specification: <strong>${chosenSize}</strong></label>
                <div class="swatch-group">
                  ${p.sizes.map((s) => {
                    const d = (p.sizeDeltas && p.sizeDeltas[s]) || 0;
                    const label = d > 0 ? `${s} (+${money(d)})` : s;
                    return `<button class="swatch-btn ${s === chosenSize ? 'active' : ''}" data-size="${s}">${label}</button>`;
                  }).join("")}
                </div>
              </div>
            ` : ""}

            <div class="detail-qty-row">
              <div class="qty-stepper">
                <button id="modalQtyMinus">−</button>
                <span id="modalQtyVal">${chosenQty}</span>
                <button id="modalQtyPlus">+</button>
              </div>
              <button class="primary-btn full" id="detailAddBtn">Add to Bag · ${money(currentTotal)} ↗</button>
              <button class="heart square-heart" id="detailWishBtn" style="position:static;width:44px;height:44px;border:1px solid var(--line);border-radius:0;">
                ${wishlist.includes(p.id) ? '♥' : '♡'}
              </button>
            </div>

            ${related.length > 0 ? `
              <div class="related-box">
                <h4>Pieces That Pair Thoughtfully</h4>
                <div class="related-items">
                  ${related.map((rp) => `
                    <div class="related-card" data-action="view" data-id="${rp.id}">
                      <img src="${rp.images[0]}" alt="${rp.name}">
                      <span>${rp.name}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
            ` : ""}
          </div>
        </div>
      `;

      // Wire modal events
      container.querySelectorAll("[data-thumb-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-thumb-idx"), 10);
          activeImg = p.images[idx];
          renderModalContent();
        });
      });

      container.querySelectorAll("[data-variant]").forEach((btn) => {
        btn.addEventListener("click", () => {
          chosenVariant = btn.getAttribute("data-variant");
          renderModalContent();
        });
      });

      container.querySelectorAll("[data-size]").forEach((btn) => {
        btn.addEventListener("click", () => {
          chosenSize = btn.getAttribute("data-size");
          renderModalContent();
        });
      });

      const qMinus = container.querySelector("#modalQtyMinus");
      const qPlus = container.querySelector("#modalQtyPlus");
      if (qMinus) {
        qMinus.addEventListener("click", () => {
          if (chosenQty > 1) {
            chosenQty--;
            renderModalContent();
          }
        });
      }
      if (qPlus) {
        qPlus.addEventListener("click", () => {
          chosenQty++;
          renderModalContent();
        });
      }

      const addBtn = container.querySelector("#detailAddBtn");
      if (addBtn) {
        addBtn.addEventListener("click", () => {
          addToCart(p.id, chosenVariant, chosenSize, chosenQty, currentUnit);
          closeOverlay("detailOverlay");
          openOverlay("cartOverlay");
        });
      }

      const wishBtn = container.querySelector("#detailWishBtn");
      if (wishBtn) {
        wishBtn.addEventListener("click", () => {
          toggleWish(p.id);
          renderModalContent();
        });
      }
    }

    renderModalContent();
    openOverlay("detailOverlay");
  }

  // Checkout Flow & Validation
  function calculateCheckoutTotal() {
    const sub = getSubtotal();
    const disc = Math.round(sub * discountRate);
    const ship = sub >= 2999 ? 0 : 99;
    return Math.max(0, sub - disc + ship);
  }

  const checkoutBtn = $("#checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!cart.length) {
        toast("Your bag is currently empty");
        return;
      }
      const totalEl = $("#checkoutTotal");
      if (totalEl) totalEl.textContent = money(calculateCheckoutTotal());
      closeOverlay("cartOverlay");
      openOverlay("checkoutOverlay");
    });
  }

  const checkoutForm = $("#checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = $("#chkName");
      const email = $("#chkEmail");
      const phone = $("#chkPhone");
      const pin = $("#chkPin");
      const address = $("#chkAddress");

      const nameErr = $("#chkNameErr");
      const emailErr = $("#chkEmailErr");
      const phoneErr = $("#chkPhoneErr");
      const pinErr = $("#chkPinErr");
      const addressErr = $("#chkAddressErr");

      let valid = true;

      // Name
      if (!name.value.trim() || name.value.trim().length < 2) {
        nameErr.textContent = "Please enter your full name.";
        valid = false;
      } else {
        nameErr.textContent = "";
      }

      // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        emailErr.textContent = "Please enter a valid email address.";
        valid = false;
      } else {
        emailErr.textContent = "";
      }

      // Phone (10 digits)
      const phoneDigits = phone.value.replace(/\D/g, "");
      if (phoneDigits.length !== 10) {
        phoneErr.textContent = "Please enter a valid 10-digit mobile number.";
        valid = false;
      } else {
        phoneErr.textContent = "";
      }

      // PIN (6 digits)
      const pinDigits = pin.value.replace(/\D/g, "");
      if (pinDigits.length !== 6) {
        pinErr.textContent = "Enter a 6-digit postal PIN code.";
        valid = false;
      } else {
        pinErr.textContent = "";
      }

      // Address
      if (!address.value.trim() || address.value.trim().length < 10) {
        addressErr.textContent = "Please enter a complete address (minimum 10 characters).";
        valid = false;
      } else {
        addressErr.textContent = "";
      }

      if (!valid) return;

      const orderRef = "ATL-" + Math.floor(1000000 + Math.random() * 9000000);
      const orderNumberEl = $("#orderNumber");
      if (orderNumberEl) orderNumberEl.textContent = "ORDER REFERENCE: " + orderRef;

      // Persist order log
      try {
        const past = load("atelier_orders", []);
        past.unshift({
          orderId: orderRef,
          date: new Date().toISOString(),
          customer: name.value.trim(),
          amount: calculateCheckoutTotal(),
          items: [...cart]
        });
        localStorage.setItem("atelier_orders", JSON.stringify(past));
      } catch (err) {}

      // Reset cart
      cart = [];
      discountRate = 0;
      appliedPromo = "";
      persist();
      renderCart();
      checkoutForm.reset();

      closeOverlay("checkoutOverlay");
      openOverlay("successOverlay");
    });
  }

  // Delegated Actions
  document.addEventListener("click", (e) => {
    // Overlays close button
    const closeBtn = e.target.closest("[data-close]");
    if (closeBtn) {
      closeOverlay(closeBtn.getAttribute("data-close"));
      return;
    }

    // Modal background click
    if (e.target.classList.contains("overlay")) {
      closeOverlay(e.target.id);
      return;
    }

    // Action delegation
    const target = e.target.closest("[data-action]");
    if (!target) return;

    const action = target.getAttribute("data-action");
    const id = parseInt(target.getAttribute("data-id"), 10);
    const idx = parseInt(target.getAttribute("data-idx"), 10);

    if (action === "view" && !isNaN(id)) {
      showDetails(id);
    } else if (action === "add" && !isNaN(id)) {
      addToCart(id);
    } else if (action === "wish" && !isNaN(id)) {
      toggleWish(id);
    } else if (action === "cart-minus" && !isNaN(idx) && cart[idx]) {
      if (cart[idx].qty > 1) {
        cart[idx].qty--;
      } else {
        cart.splice(idx, 1);
      }
      persist();
      renderCart();
    } else if (action === "cart-plus" && !isNaN(idx) && cart[idx]) {
      cart[idx].qty++;
      persist();
      renderCart();
    } else if (action === "cart-remove" && !isNaN(idx) && cart[idx]) {
      cart.splice(idx, 1);
      persist();
      renderCart();
      toast("Item removed from bag");
    } else if (action === "wish-remove" && !isNaN(id)) {
      toggleWish(id);
    } else if (action === "wish-to-bag" && !isNaN(id)) {
      addToCart(id);
      toggleWish(id);
      closeOverlay("wishlistOverlay");
      openOverlay("cartOverlay");
    }
  });

  // Category Banner Clicks
  document.querySelectorAll("[data-category]").forEach((card) => {
    card.addEventListener("click", (e) => {
      const cat = card.getAttribute("data-category");
      const catSelect = $("#categoryFilter");
      if (catSelect) {
        catSelect.value = cat;
        renderProducts(true);
      }
      const shop = $("#shop");
      if (shop) shop.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Filter Listeners
  const searchInput = $("#searchInput");
  const categoryFilter = $("#categoryFilter");
  const sortFilter = $("#sortFilter");
  const resetFilters = $("#resetFilters");

  if (searchInput) searchInput.addEventListener("input", () => renderProducts(false));
  if (categoryFilter) categoryFilter.addEventListener("change", () => renderProducts(true));
  if (sortFilter) sortFilter.addEventListener("change", () => renderProducts(false));

  if (resetFilters) {
    resetFilters.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categoryFilter) categoryFilter.value = "all";
      if (sortFilter) sortFilter.value = "featured";
      renderProducts(true);
    });
  }

  // Header Nav buttons
  const cartOpen = $("#cartOpen");
  const wishlistOpen = $("#wishlistOpen");
  const searchToggle = $("#searchToggle");
  const menuToggle = $("#menuToggle");
  const nav = $("#nav");

  if (cartOpen) cartOpen.addEventListener("click", () => { renderCart(); openOverlay("cartOverlay"); });
  if (wishlistOpen) wishlistOpen.addEventListener("click", () => { renderWishlist(); openOverlay("wishlistOverlay"); });
  if (searchToggle) {
    searchToggle.addEventListener("click", () => {
      const shop = $("#shop");
      if (shop) shop.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { if (searchInput) searchInput.focus(); }, 350);
    });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => nav.classList.toggle("active"));
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("active"));
    });
  }

  const continueShopping = $("#continueShopping");
  if (continueShopping) {
    continueShopping.addEventListener("click", () => {
      closeOverlay("successOverlay");
      const shop = $("#shop");
      if (shop) shop.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Newsletter
  const newsletterForm = $("#newsletterForm");
  const newsletterEmail = $("#newsletterEmail");
  const newsletterStatus = $("#newsletterStatus");

  if (newsletterForm && newsletterEmail && newsletterStatus) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailVal = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        newsletterStatus.textContent = "Please provide a valid email address.";
        newsletterStatus.style.color = "#a45f55";
        return;
      }
      newsletterStatus.textContent = `A gentle welcome! ${emailVal} has been saved for our slow dispatch.`;
      newsletterStatus.style.color = "var(--sage-dark)";
      newsletterEmail.value = "";
    });
  }

  // Escape key handler
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".overlay").forEach((o) => {
        if (!o.hidden) closeOverlay(o.id);
      });
    }
  });

  // Init
  updateCounts();
  renderProducts(false);
  renderCart();
  renderWishlist();
})();
