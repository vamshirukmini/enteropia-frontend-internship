const places = [
  {
    name: "Gokarna",
    location: "UTTARA KANNADA, KARNATAKA",
    category: "beach",
    label: "COASTAL ESCAPE",
    description: "Golden beaches, peaceful sunsets and coastal adventures.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Jog Falls",
    location: "SHIVAMOGGA, KARNATAKA",
    category: "nature",
    label: "NATURE & WATERFALLS",
    description: "Experience the spectacular beauty of India's famous waterfall.",
    image:"https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Hampi",
    location: "VIJAYANAGARA, KARNATAKA",
    category: "heritage",
    label: "HISTORY & HERITAGE",
    description: "Explore ancient architecture and extraordinary stone landscapes.",
    image: "https://images.unsplash.com/photo-1651073231492-169afcf84f36?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Coorg",
    location: "KODAGU, KARNATAKA",
    category: "nature",
    label: "GREEN GETAWAY",
    description: "Misty hills, coffee estates and beautiful natural scenery.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Mysuru Palace",
    location: "MYSURU, KARNATAKA",
    category: "heritage",
    label: "ROYAL HERITAGE",
    description: "Discover the royal history and architecture of Mysuru.",
    image: "https://images.unsplash.com/photo-1659126574791-13313aa424bd?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Nandi Hills",
    location: "CHIKKABALLAPUR, KARNATAKA",
    category: "adventure",
    label: "HILL ADVENTURE",
    description: "Enjoy scenic viewpoints, fresh air and beautiful hill views.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=85"
  }
];

const placeGrid = document.getElementById("placeGrid");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const toast = document.getElementById("toast");

let selectedCategory = "all";
let searchTerm = "";

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function renderPlaces() {
  const filtered = places.filter(place => {
    const matchesCategory = selectedCategory === "all" || place.category === selectedCategory;
    const searchable = `${place.name} ${place.location} ${place.description} ${place.category}`.toLowerCase();
    return matchesCategory && searchable.includes(searchTerm.toLowerCase());
  });

  resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "place" : "places"} to explore`;

  if (!filtered.length) {
    placeGrid.innerHTML = `<div class="empty-state"><h3>No places found</h3><p>Try another search or choose a different category.</p></div>`;
    return;
  }

  placeGrid.innerHTML = filtered.map(place => `
    <article class="place-card">
      <div class="place-photo">
        <img src="${place.image}" alt="${place.name}" loading="lazy">
        <span class="place-category">${place.label}</span>
      </div>
      <div class="place-content">
        <span class="place-location">${place.location}</span>
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <div class="place-bottom">
          <a href="#listing" class="discover-place" data-place="${place.name}">Discover this place ↗</a>
          <span>Explore OORU</span>
        </div>
      </div>
    </article>
  `).join("");
  observeRevealElements();
}

document.getElementById("categoryList").addEventListener("click", event => {
  const button = event.target.closest(".category");
  if (!button) return;

  document.querySelectorAll(".category").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  selectedCategory = button.dataset.category;
  renderPlaces();
});

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  searchTerm = searchInput.value.trim();
  renderPlaces();
  document.getElementById("places").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".quick-search").forEach(button => {
  button.addEventListener("click", () => {
    searchInput.value = button.dataset.search;
    searchTerm = button.dataset.search;
    selectedCategory = "all";
    document.querySelectorAll(".category").forEach(item => item.classList.remove("active"));
    document.querySelector('[data-category="all"]').classList.add("active");
    renderPlaces();
    document.getElementById("places").scrollIntoView({ behavior: "smooth" });
  });
});

placeGrid.addEventListener("click", event => {
  const link = event.target.closest(".discover-place");
  if (!link) return;
  showToast(`Discover ${link.dataset.place} — destination details coming soon!`);
});

document.querySelectorAll(".map-marker").forEach(marker => {
  marker.addEventListener("click", () => {
    const name = marker.dataset.map;
    searchInput.value = name;
    searchTerm = name;
    selectedCategory = "all";
    document.querySelectorAll(".category").forEach(item => item.classList.remove("active"));
    document.querySelector('[data-category="all"]').classList.add("active");
    renderPlaces();
    document.getElementById("places").scrollIntoView({ behavior: "smooth" });
  });
});

const modal = document.getElementById("listingModal");

function openModal() {
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
  document.getElementById("listingName").focus();
}

function closeModal() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

document.getElementById("openListing").addEventListener("click", openModal);
document.getElementById("communityListing").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

document.getElementById("listingForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("listingName").value.trim();
  const type = document.getElementById("listingType").value;
  const location = document.getElementById("listingLocation").value.trim();

  if (!name || !type || !location) {
    showToast("Please complete the required fields.");
    return;
  }

  showToast(`Thanks! "${name}" has been added to this demo session.`);
  event.target.reset();
  closeModal();
});

document.getElementById("locationButton").addEventListener("click", () => {
  showToast("Currently exploring Karnataka.");
});

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navigation.classList.remove("open"));
});

// Scroll reveal observer
function observeRevealElements() {
  if (!("IntersectionObserver" in window)) return;
  const ooruObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".section, .category-section, .business-section, .events-section, .community-section, .place-card, .business-card, .event-card").forEach(el => {
    if (!el.classList.contains("visible")) {
      el.classList.add("reveal");
      ooruObserver.observe(el);
    }
  });
}

renderPlaces();