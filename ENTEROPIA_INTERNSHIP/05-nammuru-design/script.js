"use strict";

const $=s=>document.querySelector(s);
let activeCategory="all";
let toastTimer;

const places=[
 {name:"Gokarna",category:"beach",type:"COASTAL ESCAPE",location:"Uttara Kannada, Karnataka",description:"Golden beaches, peaceful sunsets and beautiful coastal trails.",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85"},
 {name:"Jog Falls",category:"waterfall",type:"NATURE & WATERFALLS",location:"Shivamogga, Karnataka",description:"Experience the spectacular beauty of one of India's famous waterfalls.",image:"https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=85"},
 {name:"Hampi",category:"heritage",type:"HISTORY & HERITAGE",location:"Vijayanagara, Karnataka",description:"Explore ancient architecture and extraordinary stone landscapes.",image:"https://images.unsplash.com/photo-1651073231492-169afcf84f36?auto=format&fit=crop&w=800&q=85"},
 {name:"Coorg",category:"nature",type:"HILL COUNTRY",location:"Kodagu, Karnataka",description:"Coffee plantations, green hills and refreshing mountain air.",image:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=85"},
 {name:"Murudeshwar",category:"beach",type:"COASTAL & HERITAGE",location:"Uttara Kannada, Karnataka",description:"A remarkable seaside destination with a memorable coastal setting.",image:"https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=85"},
 {name:"Mysuru Palace",category:"heritage",type:"ROYAL HERITAGE",location:"Mysuru, Karnataka",description:"Discover the architecture and stories of a historic royal city.",image: "https://images.unsplash.com/photo-1659126574791-13313aa424bd?auto=format&fit=crop&w=800&q=85"}
];

const businesses=[
 {name:"The Local Brew",type:"CAFÉ & COFFEE",location:"Mysuru",description:"A cosy café for coffee, conversations and local flavours.",image:"https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=700&q=85"},
 {name:"Coastal Stay",type:"HOMESTAY",location:"Gokarna",description:"A relaxed stay close to the coast and local experiences.",image:"https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=700&q=85"},
 {name:"Craft & Culture",type:"LOCAL ARTISAN",location:"Bengaluru",description:"Thoughtful handmade objects inspired by local traditions.",image:"https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=700&q=85"}
];

const events=[
 {day:"14",month:"NOV",name:"Local Food Festival",place:"Mysuru",description:"A celebration of regional food and flavours."},
 {day:"21",month:"NOV",name:"Coastal Culture Day",place:"Udupi",description:"Explore coastal art, music and traditions."},
 {day:"05",month:"DEC",name:"Heritage Walk",place:"Hampi",description:"Discover history through a guided heritage experience."}
];

function toast(message){
 const el=$("#toast");el.textContent=message;el.classList.add("show");
 clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2400);
}

function renderPlaces(){
 const query=$("#searchInput").value.trim().toLowerCase();
 const list=places.filter(p=>
  (activeCategory==="all"||p.category===activeCategory)&&
  `${p.name} ${p.location} ${p.description} ${p.type}`.toLowerCase().includes(query)
 );
 $("#placesGrid").innerHTML=list.map(p=>`
  <article class="place-card">
   <div class="place-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="place-tag">${p.type}</span></div>
   <div class="place-info"><small>${p.location.toUpperCase()}</small><h3>${p.name}</h3><p>${p.description}</p><button data-place="${p.name}">Discover this place ↗</button></div>
  </article>`).join("");
 $("#placeEmpty").hidden=list.length>0;
}

function renderBusinesses(){
 $("#businessGrid").innerHTML=businesses.map(b=>`
  <article class="business-card">
   <img src="${b.image}" alt="${b.name}" loading="lazy">
   <div class="business-info"><small>${b.type} · ${b.location.toUpperCase()}</small><h3>${b.name}</h3><p>${b.description}</p><button data-business="${b.name}">Discover business ↗</button></div>
  </article>`).join("");
}

function renderEvents(){
 $("#eventGrid").innerHTML=events.map(e=>`
  <article class="event-card">
   <div class="event-date"><b>${e.day}</b><small>${e.month}</small></div>
   <div><small>${e.place.toUpperCase()}</small><h3>${e.name}</h3><p>${e.description}</p></div>
  </article>`).join("");
}

function openListing(){
 $("#listingModal").classList.add("open");
}

function closeListing(){
 $("#listingModal").classList.remove("open");
}

function setup(){
 renderPlaces();renderBusinesses();renderEvents();

 $("#searchInput").addEventListener("input",renderPlaces);

 $("#heroSearch").addEventListener("submit",event=>{
  event.preventDefault();
  activeCategory="all";
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.category==="all"));
  renderPlaces();
  $("#places").scrollIntoView({behavior:"smooth"});
 });

 document.querySelectorAll(".filter").forEach(button=>{
  button.addEventListener("click",()=>{
   activeCategory=button.dataset.category;
   document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===button));
   renderPlaces();
  });
 });

 document.querySelectorAll("[data-search]").forEach(link=>{
  link.addEventListener("click",()=>{
   const word=link.dataset.search;
   activeCategory=word==="beach"?"beach":word==="waterfall"?"waterfall":"heritage";
   $("#searchInput").value="";
   document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.category===activeCategory));
   renderPlaces();
  });
 });

 $("#placesGrid").addEventListener("click",event=>{
  const button=event.target.closest("[data-place]");
  if(button)toast(`${button.dataset.place} selected — destination details demo`);
 });

 $("#businessGrid").addEventListener("click",event=>{
  const button=event.target.closest("[data-business]");
  if(button)toast(`${button.dataset.business} selected — business details demo`);
 });

 $("#submitOpen").addEventListener("click",openListing);
 $("#contactSubmit").addEventListener("click",openListing);
 document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",closeListing));
 $("#listingModal").addEventListener("click",event=>{
  if(event.target.id==="listingModal")closeListing();
 });

 $("#listingForm").addEventListener("submit",event=>{
  event.preventDefault();
  const form=new FormData(event.currentTarget);
  const title=form.get("title").trim();
  const type=form.get("type");
  const location=form.get("location").trim();
  const description=form.get("description").trim();
  if(type==="Destination"){
   places.unshift({name:title,category:"nature",type:"COMMUNITY SUBMISSION",location,description,image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=85"});
   renderPlaces();
  }else if(type==="Local business"){
   businesses.unshift({name:title,type:"COMMUNITY LISTING",location,description,image:"https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=700&q=85"});
   renderBusinesses();
  }else{
   events.unshift({day:"NEW",month:"EVENT",name:title,place:location,description});
   renderEvents();
  }
  event.currentTarget.reset();
  closeListing();
  toast("Thank you! Your demo listing has been added.");
 });

 $("#newsletter").addEventListener("submit",event=>{
  event.preventDefault();
  const email=$("#email").value.trim();
  $("#newsStatus").textContent=`Thanks! ${email} has been added to this demo signup.`;
  event.currentTarget.reset();
 });

 $("#menu").addEventListener("click",()=>$("#nav").classList.toggle("open"));
 $("#nav").querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));

 document.addEventListener("keydown",event=>{
  if(event.key==="Escape")closeListing();
 });

 // Scroll reveal observer
 if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver((entries, o) => {
   entries.forEach(e => {
    if (e.isIntersecting) {
     e.target.classList.add("visible");
     o.unobserve(e.target);
    }
   });
  }, { threshold: 0.08 });
  document.querySelectorAll(".section, .feature-story, .business-card, .event-card").forEach(el => {
   el.classList.add("reveal");
   obs.observe(el);
  });
 }
}

document.addEventListener("DOMContentLoaded",setup);