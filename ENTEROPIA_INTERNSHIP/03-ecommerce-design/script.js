// NOIR — Dark Luxury Storefront Controller
// Vanilla ES6+ Implementation for Enteropia LLP Internship Challenge

(function () {
  'use strict';

  // 12 Curated Luxury Products Data
  const PRODUCTS = [
    {
      id: 1,
      title: "Obsidian Tailored Wool Blazer",
      category: "fashion",
      price: 18500,
      badge: "Signature",
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Sculpted from 100% superfine Australian Merino wool with a structured shoulder line, horn buttons, and silk-cupro interior lining. Designed for discerning evenings.",
      variants: ["Obsidian Black", "Charcoal Slate", "Deep Midnight"],
      variantDeltas: { "Obsidian Black": 0, "Charcoal Slate": 0, "Deep Midnight": 1500 },
      sizes: ["38R", "40R", "42R", "44R"],
      sizeDeltas: { "38R": 0, "40R": 0, "42R": 0, "44R": 800 },
      rating: "4.9 / 5.0 (42 reviews)",
      relatedIds: [2, 5, 8]
    },
    {
      id: 2,
      title: "Full-Grain Saddle Leather Weekender",
      category: "accessories",
      price: 24900,
      badge: "Bespoke",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Vegetable-tanned Tuscan bridle leather featuring brushed brass hardware, waterproof military-grade canvas lining, and a detachable padded shoulder strap.",
      variants: ["Espresso Brown", "Noir Jet Black"],
      variantDeltas: { "Espresso Brown": 0, "Noir Jet Black": 1200 },
      sizes: ["45L Cabin Approved", "55L Extended Voyager"],
      sizeDeltas: { "45L Cabin Approved": 0, "55L Extended Voyager": 3600 },
      rating: "5.0 / 5.0 (38 reviews)",
      relatedIds: [1, 3, 11]
    },
    {
      id: 3,
      title: "Chrono-Architect Minimalist Timepiece",
      category: "accessories",
      price: 32000,
      badge: "Limited (50 pcs)",
      images: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Grade 5 titanium casing with a matte black ceramic dial, sapphire crystal glass with anti-reflective coating, and automatic Swiss mechanical movement.",
      variants: ["Titanium Grey", "Obsidian PVD"],
      variantDeltas: { "Titanium Grey": 0, "Obsidian PVD": 2500 },
      sizes: ["40mm Case", "44mm Statement"],
      sizeDeltas: { "40mm Case": 0, "44mm Statement": 2000 },
      rating: "4.8 / 5.0 (19 reviews)",
      relatedIds: [2, 8, 11]
    },
    {
      id: 4,
      title: "Monolithic Matte Black Ceramic Vessel",
      category: "living",
      price: 8400,
      badge: "Artisanal",
      images: [
        "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Hand-thrown stoneware finished with an unglazed volcanic ash texture. Watertight interior suitable for architectural dry foliage or solitary florals.",
      variants: ["Volcanic Black", "Raw Basalt"],
      variantDeltas: { "Volcanic Black": 0, "Raw Basalt": 600 },
      sizes: ["32cm Height", "45cm Statement"],
      sizeDeltas: { "32cm Height": 0, "45cm Statement": 2800 },
      rating: "4.9 / 5.0 (54 reviews)",
      relatedIds: [7, 10, 12]
    },
    {
      id: 5,
      title: "Heavyweight Ribbed Cashmere Sweater",
      category: "fashion",
      price: 14200,
      badge: "New Arrival",
      images: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Four-ply Mongolian cashmere woven into an architectural half-fisherman knit. Features dropped shoulders and extended double-rib cuffs for cold climate luxury.",
      variants: ["Charcoal Heather", "Midnight Navy", "Oatmeal Melange"],
      sizes: ["S", "M", "L", "XL"],
      rating: "4.7 / 5.0 (29 reviews)",
      relatedIds: [1, 9, 8]
    },
    {
      id: 6,
      title: "Monochrome Architectural Leather Sneakers",
      category: "fashion",
      price: 16800,
      badge: "Restocked",
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Italian calfskin leather low-top sneakers with Margom vulcanized rubber cup-soles, waxed cotton laces, and gold foil serial stamping at the heel counter.",
      variants: ["Triple Noir", "Bone White"],
      sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
      rating: "4.9 / 5.0 (66 reviews)",
      relatedIds: [1, 5, 2]
    },
    {
      id: 7,
      title: "Brushed Brass & Smoked Glass Lamp",
      category: "living",
      price: 19500,
      badge: "Award Winner",
      images: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Machined solid brass base with hand-blown tinted amber glass globe. Emits 2200K warm incandescent glow via touch-capacitive three-stage dimming.",
      variants: ["Brushed Brass", "Anodized Black"],
      sizes: ["Standard Table (38cm)"],
      rating: "5.0 / 5.0 (22 reviews)",
      relatedIds: [4, 10, 12]
    },
    {
      id: 8,
      title: "Titanium Aviator Silhouette Sunglasses",
      category: "accessories",
      price: 12500,
      badge: "Signature",
      images: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Laser-cut Japanese beta-titanium wire frame weighing only 18 grams. Equipped with Carl Zeiss polarized anti-glare lenses with Category 3 UV protection.",
      variants: ["Matte Black / Smoke", "Brushed Gold / Green"],
      sizes: ["Universal Fit"],
      rating: "4.8 / 5.0 (31 reviews)",
      relatedIds: [1, 3, 2]
    },
    {
      id: 9,
      title: "Relaxed French Linen Camp Collar Shirt",
      category: "fashion",
      price: 7800,
      badge: "Seasonal",
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85"
      ],
      description: "100% Normandy flax linen garment-washed for an effortless soft drape. Features mother-of-pearl buttons and a boxy, airy cuban collar profile.",
      variants: ["Ink Black", "Sand Linen", "Sage Gray"],
      sizes: ["S", "M", "L", "XL"],
      rating: "4.6 / 5.0 (17 reviews)",
      relatedIds: [1, 5, 6]
    },
    {
      id: 10,
      title: "Santal 26 & Amber Resin Candle Set",
      category: "living",
      price: 4900,
      badge: "Curated",
      images: [
        "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Pair of hand-poured soy wax candles infused with wild cardamom, smoked cedar, and dark amber. 65-hour clean burn time in heavy ceramic vessels.",
      variants: ["Ceramic Trio", "Noir Duo"],
      sizes: ["300g Each"],
      rating: "4.9 / 5.0 (82 reviews)",
      relatedIds: [4, 7, 12]
    },
    {
      id: 11,
      title: "Minimalist Bifold Cordovan Leather Wallet",
      category: "accessories",
      price: 6900,
      badge: "Essential",
      images: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Ultra-slim 6-pocket cardholder crafted from Horween Shell Cordovan leather. Hand-stitched with waxed linen thread and burnished with beeswax.",
      variants: ["Color #8 Burgundy", "Obsidian Black"],
      sizes: ["Slim Profile (8mm)"],
      rating: "4.8 / 5.0 (40 reviews)",
      relatedIds: [2, 3, 8]
    },
    {
      id: 12,
      title: "Sculptural Ashwood Lounge Armchair",
      category: "living",
      price: 48500,
      badge: "Masterpiece",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85"
      ],
      description: "Solid ebonized European ash timber frame paired with tactile bouclé upholstery. Ergonomically reclined cantilever silhouette for refined reading spaces.",
      variants: ["Ebonized Ash / Bouclé", "Smoked Oak / Leather"],
      sizes: ["82 x 78 x 72 cm"],
      rating: "5.0 / 5.0 (14 reviews)",
      relatedIds: [4, 7, 10]
    }
  ];

  // State Management (with LocalStorage)
  let cart = [];
  let wishlist = [];
  let appliedDiscount = 0; // percentage
  let appliedPromoCode = "";
  let activeModalProductId = null;

  try {
    const savedCart = localStorage.getItem("noir_cart");
    if (savedCart) cart = JSON.parse(savedCart);
    const savedWish = localStorage.getItem("noir_wishlist");
    if (savedWish) wishlist = JSON.parse(savedWish);
  } catch (e) {
    console.warn("Storage access restricted:", e);
  }

  function saveCart() {
    try {
      localStorage.setItem("noir_cart", JSON.stringify(cart));
    } catch (e) {}
    updateHeaderCounts();
    renderCart();
  }

  function saveWishlist() {
    try {
      localStorage.setItem("noir_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
    updateHeaderCounts();
    renderWishlist();
  }

  // Toast Notification helper
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("visible");
    }, 3200);
  }

  // Currency Formatter
  function formatINR(num) {
    return "₹" + Number(num).toLocaleString("en-IN");
  }

  // Header Counters
  function updateHeaderCounts() {
    const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);
    const cartCountEl = document.getElementById("cartCount");
    const drawerCartCountEl = document.getElementById("drawerCartCount");
    const wishlistCountEl = document.getElementById("wishlistCount");
    const drawerWishCountEl = document.getElementById("drawerWishCount");

    if (cartCountEl) cartCountEl.textContent = totalCartCount;
    if (drawerCartCountEl) drawerCartCountEl.textContent = `(${totalCartCount})`;
    if (wishlistCountEl) wishlistCountEl.textContent = wishlist.length;
    if (drawerWishCountEl) drawerWishCountEl.textContent = `(${wishlist.length})`;
  }

  // Render Product Catalog Cards
  const productGrid = document.getElementById("productGrid");
  const emptyProducts = document.getElementById("emptyProducts");
  const productCountLabel = document.getElementById("productCount");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortProducts = document.getElementById("sortProducts");
  const productSearch = document.getElementById("productSearch");
  const skeletonGrid = document.getElementById("skeletonGrid");

  function getFilteredProducts() {
    const cat = categoryFilter ? categoryFilter.value : "all";
    const query = productSearch ? productSearch.value.trim().toLowerCase() : "";
    const sort = sortProducts ? sortProducts.value : "featured";

    let list = PRODUCTS.filter((item) => {
      const matchCat = cat === "all" || item.category === cat;
      const matchQuery = !query || 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    if (sort === "low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }

  function renderCatalog(showSkeleton = false) {
    if (!productGrid) return;

    if (showSkeleton && skeletonGrid) {
      skeletonGrid.hidden = false;
      productGrid.hidden = true;
      setTimeout(() => {
        skeletonGrid.hidden = true;
        productGrid.hidden = false;
        doRender();
      }, 180);
      return;
    }

    doRender();

    function doRender() {
      const list = getFilteredProducts();
      if (productCountLabel) {
        productCountLabel.textContent = `${list.length} ${list.length === 1 ? 'piece' : 'pieces'}`;
      }

      if (list.length === 0) {
        productGrid.innerHTML = "";
        if (emptyProducts) emptyProducts.hidden = false;
        return;
      }

      if (emptyProducts) emptyProducts.hidden = true;

      productGrid.innerHTML = list.map((item) => {
        const isWish = wishlist.some((w) => w.id === item.id);
        return `
          <article class="product-card" data-id="${item.id}">
            <div class="card-media">
              <img src="${item.images[0]}" alt="${item.title}" loading="lazy">
              ${item.badge ? `<span class="product-badge">${item.badge}</span>` : ""}
              <button class="wish-toggle-btn ${isWish ? 'active' : ''}" data-action="toggle-wishlist" data-id="${item.id}" aria-label="Toggle wishlist for ${item.title}">
                ${isWish ? '♥' : '♡'}
              </button>
              <div class="card-quick-overlay">
                <button class="gold-button card-quick-btn" data-action="open-detail" data-id="${item.id}">Inspect Piece ↗</button>
              </div>
            </div>
            <div class="card-info">
              <span class="card-cat">${item.category.toUpperCase()}</span>
              <h3 class="card-title" data-action="open-detail" data-id="${item.id}">${item.title}</h3>
              <div class="card-price-row">
                <span class="card-price">${formatINR(item.price)}</span>
                <button class="card-add-btn" data-action="quick-add" data-id="${item.id}" aria-label="Quick add to bag">+ Bag</button>
              </div>
            </div>
          </article>
        `;
      }).join("");
    }
  }

  // Suite Cards in Hero/Intro to trigger filtering
  document.querySelectorAll("[data-category-filter]").forEach((el) => {
    el.addEventListener("click", () => {
      const cat = el.getAttribute("data-category-filter");
      if (categoryFilter) {
        categoryFilter.value = cat;
        renderCatalog(true);
      }
      const shopSec = document.getElementById("shop");
      if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Filter Listeners
  if (categoryFilter) categoryFilter.addEventListener("change", () => renderCatalog(true));
  if (sortProducts) sortProducts.addEventListener("change", () => renderCatalog(false));
  if (productSearch) {
    productSearch.addEventListener("input", () => renderCatalog(false));
  }

  const clearFiltersBtn = document.getElementById("clearFilters");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      if (categoryFilter) categoryFilter.value = "all";
      if (sortProducts) sortProducts.value = "featured";
      if (productSearch) productSearch.value = "";
      renderCatalog(true);
    });
  }

  // Product Grid Action Delegations
  if (productGrid) {
    productGrid.addEventListener("click", (e) => {
      const target = e.target.closest("[data-action]");
      if (!target) return;

      const action = target.getAttribute("data-action");
      const id = parseInt(target.getAttribute("data-id"), 10);
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) return;

      if (action === "toggle-wishlist") {
        toggleWishlist(product);
      } else if (action === "open-detail") {
        openProductModal(product);
      } else if (action === "quick-add") {
        addToCart(product, 1, product.variants[0], product.sizes ? product.sizes[0] : null);
        showToast(`Added ${product.title} to your bag.`);
      }
    });
  }

  // Wishlist Actions
  function toggleWishlist(product) {
    const idx = wishlist.findIndex((w) => w.id === product.id);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast(`Removed from your wishlist.`);
    } else {
      wishlist.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        category: product.category
      });
      showToast(`Saved to your wishlist.`);
    }
    saveWishlist();
    renderCatalog(false);
  }

  // Product Detail Modal
  const productOverlay = document.getElementById("productOverlay");
  const productDetailContent = document.getElementById("productDetailContent");
  const closeProductModalBtn = document.getElementById("closeProductModal");

  function openProductModal(product) {
    if (!productOverlay || !productDetailContent) return;
    activeModalProductId = product.id;

    let selectedVariant = product.variants[0];
    let selectedSize = product.sizes ? product.sizes[0] : null;
    let selectedQty = 1;
    let currentImg = product.images[0];

    const relatedProducts = (product.relatedIds || [])
      .map((rid) => PRODUCTS.find((p) => p.id === rid))
      .filter(Boolean);

    function renderModalBody() {
      // Calculate dynamic variant price
      const vDelta = (product.variantDeltas && product.variantDeltas[selectedVariant]) || 0;
      const sDelta = (product.sizeDeltas && product.sizeDeltas[selectedSize]) || 0;
      const currentUnitPrice = product.price + vDelta + sDelta;
      const currentTotalPrice = currentUnitPrice * selectedQty;

      productDetailContent.innerHTML = `
        <div class="product-modal-grid">
          <div class="gallery-column">
            <div class="main-gallery-view">
              <img id="modalMainImg" class="detail-main-img" src="${currentImg}" alt="${product.title}">
            </div>
            <div class="gallery-thumbs">
              ${product.images.map((img, i) => `
                <button class="thumb-btn ${img === currentImg ? 'active' : ''}" data-thumb-idx="${i}">
                  <img src="${img}" alt="Thumbnail angle ${i + 1}">
                </button>
              `).join("")}
            </div>
          </div>

          <div class="detail-column">
            <span class="eyebrow">${product.category.toUpperCase()} · SERIAL ARCHIVE</span>
            <h2 id="modalProductTitle">${product.title}</h2>
            <div class="detail-meta">
              <span class="detail-price" id="modalActivePrice">${formatINR(currentUnitPrice)}</span>
              <span class="detail-rating">${product.rating}</span>
            </div>
            <p class="detail-desc">${product.description}</p>

            <!-- VARIANT SELECTION -->
            <div class="detail-section">
              <label class="variant-label">Finish / Shade: <strong>${selectedVariant}</strong></label>
              <div class="variant-swatches">
                ${product.variants.map((v) => {
                  const d = (product.variantDeltas && product.variantDeltas[v]) || 0;
                  const label = d > 0 ? `${v} (+${formatINR(d)})` : v;
                  return `<button class="swatch-btn ${v === selectedVariant ? 'active' : ''}" data-variant="${v}">${label}</button>`;
                }).join("")}
              </div>
            </div>

            <!-- SIZE SELECTION -->
            ${product.sizes ? `
              <div class="detail-section">
                <label class="variant-label">Proportion / Specification: <strong>${selectedSize}</strong></label>
                <div class="size-pill-row">
                  ${product.sizes.map((s) => {
                    const d = (product.sizeDeltas && product.sizeDeltas[s]) || 0;
                    const label = d > 0 ? `${s} (+${formatINR(d)})` : s;
                    return `<button class="size-pill ${s === selectedSize ? 'active' : ''}" data-size="${s}">${label}</button>`;
                  }).join("")}
                </div>
              </div>
            ` : ""}

            <!-- QUANTITY AND ACTIONS -->
            <div class="modal-cta-row">
              <div class="qty-control">
                <button id="modalQtyMinus" aria-label="Decrease quantity">−</button>
                <span id="modalQtyVal">${selectedQty}</span>
                <button id="modalQtyPlus" aria-label="Increase quantity">+</button>
              </div>
              <button class="gold-button full-button" id="modalAddToCartBtn">Add to Bag · ${formatINR(currentTotalPrice)}</button>
              <button class="wish-toggle-btn square-wish-btn" id="modalWishBtn" aria-label="Wishlist">
                ${wishlist.some((w) => w.id === product.id) ? '♥' : '♡'}
              </button>
            </div>

            <div class="delivery-perks">
              <div><span>✦</span> Complimentary white-glove courier delivery on orders ₹2,999+</div>
              <div><span>✦</span> Serialized Certificate of Authenticity included</div>
              <div><span>✦</span> 14-day archival return privileges</div>
            </div>

            <!-- RELATED PIECES -->
            ${relatedProducts.length > 0 ? `
              <div class="related-section">
                <h4>Harmonious Accompaniments</h4>
                <div class="related-row">
                  ${relatedProducts.map((rp) => `
                    <div class="related-card" data-action="open-detail" data-id="${rp.id}">
                      <img src="${rp.images[0]}" alt="${rp.title}">
                      <div>
                        <strong>${rp.title}</strong>
                        <small>${formatINR(rp.price)}</small>
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>
            ` : ""}
          </div>
        </div>
      `;

      // Wire modal events
      productDetailContent.querySelectorAll("[data-thumb-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-thumb-idx"), 10);
          currentImg = product.images[idx];
          renderModalBody();
        });
      });

      productDetailContent.querySelectorAll("[data-variant]").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedVariant = btn.getAttribute("data-variant");
          renderModalBody();
        });
      });

      productDetailContent.querySelectorAll("[data-size]").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedSize = btn.getAttribute("data-size");
          renderModalBody();
        });
      });

      const qMinus = productDetailContent.querySelector("#modalQtyMinus");
      const qPlus = productDetailContent.querySelector("#modalQtyPlus");
      if (qMinus) {
        qMinus.addEventListener("click", () => {
          if (selectedQty > 1) {
            selectedQty--;
            renderModalBody();
          }
        });
      }
      if (qPlus) {
        qPlus.addEventListener("click", () => {
          selectedQty++;
          renderModalBody();
        });
      }

      const addBtn = productDetailContent.querySelector("#modalAddToCartBtn");
      if (addBtn) {
        addBtn.addEventListener("click", () => {
          addToCart(product, selectedQty, selectedVariant, selectedSize, currentUnitPrice);
          closeProductModal();
          openCartDrawer();
          showToast(`Added ${selectedQty} × ${product.title} to bag.`);
        });
      }

      const wishBtn = productDetailContent.querySelector("#modalWishBtn");
      if (wishBtn) {
        wishBtn.addEventListener("click", () => {
          toggleWishlist(product);
          renderModalBody();
        });
      }
    }

    renderModalBody();
    productOverlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeProductModal() {
    if (!productOverlay) return;
    productOverlay.hidden = true;
    document.body.style.overflow = "";
    activeModalProductId = null;
  }

  if (closeProductModalBtn) closeProductModalBtn.addEventListener("click", closeProductModal);
  if (productOverlay) {
    productOverlay.addEventListener("click", (e) => {
      if (e.target === productOverlay) closeProductModal();
    });
  }

  // Cart Management
  function addToCart(product, qty, variant, size, unitPrice) {
    const finalPrice = typeof unitPrice === "number" ? unitPrice : product.price;
    const existing = cart.find(
      (c) => c.id === product.id && c.variant === variant && c.size === size
    );
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: finalPrice,
        image: product.images[0],
        variant: variant || "Default",
        size: size || null,
        qty: qty
      });
    }
    saveCart();

    // Micro-animation badge bounce
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
      cartCountEl.classList.remove("bounce");
      void cartCountEl.offsetWidth;
      cartCountEl.classList.add("bounce");
    }
  }

  const cartOverlay = document.getElementById("cartOverlay");
  const cartItemsEl = document.getElementById("cartItems");
  const cartOpenBtn = document.getElementById("cartOpen");
  const closeCartDrawerBtn = document.getElementById("closeCartDrawer");
  const continueShoppingBtn = document.getElementById("continueShoppingFromCart");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartDiscountEl = document.getElementById("cartDiscount");
  const discountLine = document.getElementById("discountLine");
  const shippingCostEl = document.getElementById("shippingCost");
  const checkoutButton = document.getElementById("checkoutButton");
  const promoCodeInput = document.getElementById("promoCodeInput");
  const applyPromoBtn = document.getElementById("applyPromoBtn");
  const promoMessage = document.getElementById("promoMessage");

  function openCartDrawer() {
    if (!cartOverlay) return;
    renderCart();
    cartOverlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeCartDrawer() {
    if (!cartOverlay) return;
    cartOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  if (cartOpenBtn) cartOpenBtn.addEventListener("click", openCartDrawer);
  if (closeCartDrawerBtn) closeCartDrawerBtn.addEventListener("click", closeCartDrawer);
  if (continueShoppingBtn) continueShoppingBtn.addEventListener("click", closeCartDrawer);
  if (cartOverlay) {
    cartOverlay.addEventListener("click", (e) => {
      if (e.target === cartOverlay) closeCartDrawer();
    });
  }

  // Promo Code Support
  if (applyPromoBtn && promoCodeInput) {
    applyPromoBtn.addEventListener("click", () => {
      const code = promoCodeInput.value.trim().toUpperCase();
      if (!code) return;
      if (code === "NOIR20" || code === "ENTEROPIA20") {
        appliedDiscount = 0.20;
        appliedPromoCode = code;
        if (promoMessage) {
          promoMessage.textContent = "VIP Privilege Applied: 20% savings calculated.";
          promoMessage.className = "promo-message success";
        }
        showToast("20% VIP code applied successfully!");
      } else {
        appliedDiscount = 0;
        appliedPromoCode = "";
        if (promoMessage) {
          promoMessage.textContent = "Invalid code. Please try 'NOIR20'.";
          promoMessage.className = "promo-message error";
        }
      }
      renderCart();
    });
  }

  function renderCart() {
    if (!cartItemsEl) return;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = `
        <div class="empty-drawer">
          <p>Your shopping bag is presently unoccupied.</p>
          <button class="gold-button" id="exploreNowFromEmptyBag">Explore Collection ↗</button>
        </div>
      `;
      const exploreBtn = document.getElementById("exploreNowFromEmptyBag");
      if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
          closeCartDrawer();
          const shop = document.getElementById("shop");
          if (shop) shop.scrollIntoView({ behavior: "smooth" });
        });
      }
      if (cartSubtotalEl) cartSubtotalEl.textContent = "₹0";
      if (discountLine) discountLine.hidden = true;
      if (shippingCostEl) shippingCostEl.textContent = "Calculated at checkout";
      if (checkoutButton) checkoutButton.disabled = true;
      return;
    }

    if (checkoutButton) checkoutButton.disabled = false;

    cartItemsEl.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-info">
          <h4>${item.title}</h4>
          <span class="cart-variant">${item.variant}${item.size ? ' · ' + item.size : ''}</span>
          <div class="cart-item-pricing">
            <strong>${formatINR(item.price * item.qty)}</strong>
            <small>(${formatINR(item.price)} each)</small>
          </div>
          <div class="cart-row-actions">
            <div class="qty-control compact">
              <button class="cart-qty-btn" data-action="cart-minus" data-idx="${index}">−</button>
              <span>${item.qty}</span>
              <button class="cart-qty-btn" data-action="cart-plus" data-idx="${index}">+</button>
            </div>
            <button class="remove-btn" data-action="cart-remove" data-idx="${index}">Remove</button>
          </div>
        </div>
      </div>
    `).join("");

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const discountAmt = Math.round(subtotal * appliedDiscount);
    const shipping = subtotal >= 2999 ? 0 : 250;

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatINR(subtotal);

    if (appliedDiscount > 0 && discountLine && cartDiscountEl) {
      discountLine.hidden = false;
      cartDiscountEl.textContent = `-${formatINR(discountAmt)} (${appliedDiscount * 100}%)`;
    } else if (discountLine) {
      discountLine.hidden = true;
    }

    if (shippingCostEl) {
      shippingCostEl.textContent = shipping === 0 ? "Complimentary" : formatINR(shipping);
    }
  }

  // Cart item events
  if (cartItemsEl) {
    cartItemsEl.addEventListener("click", (e) => {
      const target = e.target.closest("[data-action]");
      if (!target) return;

      const action = target.getAttribute("data-action");
      const idx = parseInt(target.getAttribute("data-idx"), 10);
      if (isNaN(idx) || !cart[idx]) return;

      if (action === "cart-minus") {
        if (cart[idx].qty > 1) {
          cart[idx].qty--;
        } else {
          cart.splice(idx, 1);
        }
      } else if (action === "cart-plus") {
        cart[idx].qty++;
      } else if (action === "cart-remove") {
        cart.splice(idx, 1);
      }
      saveCart();
    });
  }

  // Wishlist Drawer
  const wishlistOverlay = document.getElementById("wishlistOverlay");
  const wishlistItemsEl = document.getElementById("wishlistItems");
  const wishlistOpenBtn = document.getElementById("wishlistOpen");
  const closeWishlistDrawerBtn = document.getElementById("closeWishlistDrawer");

  function openWishlistDrawer() {
    if (!wishlistOverlay) return;
    renderWishlist();
    wishlistOverlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeWishlistDrawer() {
    if (!wishlistOverlay) return;
    wishlistOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  if (wishlistOpenBtn) wishlistOpenBtn.addEventListener("click", openWishlistDrawer);
  if (closeWishlistDrawerBtn) closeWishlistDrawerBtn.addEventListener("click", closeWishlistDrawer);
  if (wishlistOverlay) {
    wishlistOverlay.addEventListener("click", (e) => {
      if (e.target === wishlistOverlay) closeWishlistDrawer();
    });
  }

  function renderWishlist() {
    if (!wishlistItemsEl) return;

    if (wishlist.length === 0) {
      wishlistItemsEl.innerHTML = `
        <div class="empty-drawer">
          <p>No curated items saved yet.</p>
        </div>
      `;
      return;
    }

    wishlistItemsEl.innerHTML = wishlist.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-info">
          <h4>${item.title}</h4>
          <span class="cart-variant">${item.category.toUpperCase()}</span>
          <div class="cart-item-pricing">
            <strong>${formatINR(item.price)}</strong>
          </div>
          <div class="cart-row-actions">
            <button class="gold-button card-quick-btn" data-action="wish-to-bag" data-id="${item.id}" data-idx="${idx}">+ Move to Bag</button>
            <button class="remove-btn" data-action="wish-remove" data-idx="${idx}">Remove</button>
          </div>
        </div>
      </div>
    `).join("");
  }

  if (wishlistItemsEl) {
    wishlistItemsEl.addEventListener("click", (e) => {
      const target = e.target.closest("[data-action]");
      if (!target) return;

      const action = target.getAttribute("data-action");
      const idx = parseInt(target.getAttribute("data-idx"), 10);
      if (isNaN(idx) || !wishlist[idx]) return;

      if (action === "wish-remove") {
        wishlist.splice(idx, 1);
        saveWishlist();
        renderCatalog(false);
      } else if (action === "wish-to-bag") {
        const item = wishlist[idx];
        const fullProd = PRODUCTS.find((p) => p.id === item.id);
        if (fullProd) {
          addToCart(fullProd, 1, fullProd.variants[0], fullProd.sizes ? fullProd.sizes[0] : null);
          wishlist.splice(idx, 1);
          saveWishlist();
          saveCart();
          renderCatalog(false);
          closeWishlistDrawer();
          openCartDrawer();
          showToast(`Transferred ${item.title} to your bag.`);
        }
      }
    });
  }

  // Checkout Flow
  const checkoutOverlay = document.getElementById("checkoutOverlay");
  const closeCheckoutModalBtn = document.getElementById("closeCheckoutModal");
  const checkoutTotalEl = document.getElementById("checkoutTotal");
  const checkoutForm = document.getElementById("checkoutForm");

  function getCalculatedTotal() {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const discountAmt = Math.round(subtotal * appliedDiscount);
    const shipping = subtotal >= 2999 ? 0 : 250;
    return Math.max(0, subtotal - discountAmt + shipping);
  }

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      if (cart.length === 0) return;
      closeCartDrawer();
      if (checkoutTotalEl) checkoutTotalEl.textContent = formatINR(getCalculatedTotal());
      if (checkoutOverlay) {
        checkoutOverlay.hidden = false;
        document.body.style.overflow = "hidden";
      }
    });
  }

  function closeCheckoutModal() {
    if (!checkoutOverlay) return;
    checkoutOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  if (closeCheckoutModalBtn) closeCheckoutModalBtn.addEventListener("click", closeCheckoutModal);
  if (checkoutOverlay) {
    checkoutOverlay.addEventListener("click", (e) => {
      if (e.target === checkoutOverlay) closeCheckoutModal();
    });
  }

  // Checkout Validation & Order Placement
  const successOverlay = document.getElementById("successOverlay");
  const closeSuccessModalBtn = document.getElementById("closeSuccessModal");
  const continueAfterOrderBtn = document.getElementById("continueAfterOrder");
  const orderNumberEl = document.getElementById("orderNumber");

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("chkName");
      const emailInput = document.getElementById("chkEmail");
      const phoneInput = document.getElementById("chkPhone");
      const pinInput = document.getElementById("chkPin");
      const addressInput = document.getElementById("chkAddress");

      const nameErr = document.getElementById("nameError");
      const emailErr = document.getElementById("emailError");
      const phoneErr = document.getElementById("phoneError");
      const pinErr = document.getElementById("pinError");
      const addressErr = document.getElementById("addressError");

      let valid = true;

      // Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameErr.textContent = "Please provide your full legal name.";
        valid = false;
      } else {
        nameErr.textContent = "";
      }

      // Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailErr.textContent = "Please enter a valid email address.";
        valid = false;
      } else {
        emailErr.textContent = "";
      }

      // Phone (10 digits)
      const phoneClean = phoneInput.value.replace(/\D/g, "");
      if (phoneClean.length !== 10) {
        phoneErr.textContent = "Please provide a valid 10-digit mobile number.";
        valid = false;
      } else {
        phoneErr.textContent = "";
      }

      // PIN (6 digits)
      const pinClean = pinInput.value.replace(/\D/g, "");
      if (pinClean.length !== 6) {
        pinErr.textContent = "Enter a valid 6-digit postal code.";
        valid = false;
      } else {
        pinErr.textContent = "";
      }

      // Address
      if (!addressInput.value.trim() || addressInput.value.trim().length < 10) {
        addressErr.textContent = "Please provide complete street address (minimum 10 characters).";
        valid = false;
      } else {
        addressErr.textContent = "";
      }

      if (!valid) return;

      // Generate demo order ID
      const orderId = "NOIR-" + Math.floor(1000000 + Math.random() * 9000000);
      if (orderNumberEl) orderNumberEl.textContent = orderId;

      // Save order to localStorage demonstration history
      try {
        const existingOrders = JSON.parse(localStorage.getItem("noir_orders") || "[]");
        existingOrders.unshift({
          orderId: orderId,
          date: new Date().toISOString(),
          customer: nameInput.value.trim(),
          total: getCalculatedTotal(),
          items: [...cart]
        });
        localStorage.setItem("noir_orders", JSON.stringify(existingOrders));
      } catch (e) {}

      // Clear cart
      cart = [];
      saveCart();
      appliedDiscount = 0;
      appliedPromoCode = "";
      checkoutForm.reset();

      // Switch modals
      closeCheckoutModal();
      if (successOverlay) {
        successOverlay.hidden = false;
        document.body.style.overflow = "hidden";
      }
    });
  }

  function closeSuccessModal() {
    if (!successOverlay) return;
    successOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  if (closeSuccessModalBtn) closeSuccessModalBtn.addEventListener("click", closeSuccessModal);
  if (continueAfterOrderBtn) continueAfterOrderBtn.addEventListener("click", closeSuccessModal);
  if (successOverlay) {
    successOverlay.addEventListener("click", (e) => {
      if (e.target === successOverlay) closeSuccessModal();
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmail = document.getElementById("newsletterEmail");
  const newsletterStatus = document.getElementById("newsletterStatus");

  if (newsletterForm && newsletterEmail && newsletterStatus) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = newsletterEmail.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(val)) {
        newsletterStatus.textContent = "Please provide an authentic email address.";
        newsletterStatus.style.color = "#ef4444";
        return;
      }
      newsletterStatus.textContent = `Privileged allocation confirmed for ${val}. Welcome to the Archive.`;
      newsletterStatus.style.color = "#c5a059";
      newsletterEmail.value = "";
    });
  }

  // Mobile Menu Toggle & Smooth Navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Search Toggle (Scrolls to search and focuses input)
  const searchToggle = document.getElementById("searchToggle");
  if (searchToggle && productSearch) {
    searchToggle.addEventListener("click", () => {
      const shop = document.getElementById("shop");
      if (shop) shop.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => productSearch.focus(), 400);
    });
  }

  // Keyboard accessibility (Escape key closes open overlays)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProductModal();
      closeCartDrawer();
      closeWishlistDrawer();
      closeCheckoutModal();
      closeSuccessModal();
    }
  });

  // Dynamic Year in footer
  const currentYearEl = document.getElementById("currentYear");
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

  // Scroll reveal observer
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          ent.target.classList.add("visible");
          obs.unobserve(ent.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => obs.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // Initialize
  updateHeaderCounts();
  renderCatalog(false);
})();
