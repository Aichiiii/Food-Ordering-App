// =====================
// DUMMY DATA
// =====================
const data = [
  { id: 1, name: 'Flat White', price: 140, cat: 'hot', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772' },
  { id: 2, name: 'Cold Brew', price: 165, cat: 'cold', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c' },
  { id: 3, name: 'Pain au Chocolat', price: 110, cat: 'pastries', img: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd' },
  { id: 4, name: 'Signature Mocha', price: 180, cat: 'hot', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d' },
  { id: 5, name: 'Iced Latte', price: 155, cat: 'cold', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735' }
];

// =====================
// CUSTOM INGREDIENTS
// =====================
const ingredients = {
  base: [
    { name: 'Espresso Shot', price: 45 },
    { name: 'Oat Milk', price: 50 },
    { name: 'Fresh Milk', price: 30 },
    { name: 'Cold Brew Base', price: 60 }
  ],
  extras: [
    { name: 'Caramel Syrup', price: 25 },
    { name: 'Vanilla Syrup', price: 25 },
    { name: 'Sea Salt Cream', price: 35 },
    { name: 'Whipped Cream', price: 20 }
  ]
};

// =====================
// STATE
// =====================
let cart = [];
let currentCategory = 'all';

let selectedProduct = null;
let selectedSize = 'M';
let selectedSugar = '100%';

// ⭐ NEW: ICE LEVEL
let selectedIce = '100%';

let selectedIngredients = [];

// =====================
// SIZE PRICE MULTIPLIER
// =====================
const sizeMultiplier = {
  S: 0.9,
  M: 1,
  L: 1.2
};

// =====================
// PRODUCT CLICK
// =====================
function openProduct(id) {
  const p = data.find(x => x.id === id);
  selectedProduct = p;

  if (p.cat === 'pastries') {
    cart.push({
      id: Date.now(),
      name: p.name,
      img: p.img,
      price: p.price,
      qty: 1,
      details: "Pastry Item"
    });

    updateCart();
    showCart();
    return;
  }

  // DRINK RESET
  selectedSize = 'M';
  selectedSugar = '100%';
  selectedIce = '100%';

  document.getElementById('modalTitle').innerText = p.name;
  document.getElementById('modalImg').src = p.img;
  document.getElementById('modalBasePrice').innerText = `₱${p.price}`;

  resetSizeUI();
  resetSugarUI();
  resetIceUI();
  updateModalPrice();

  new bootstrap.Modal(document.getElementById('productModal')).show();
}

// =====================
// SIZE SYSTEM
// =====================
function setSize(size) {
  selectedSize = size;

  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  
  const btn = document.getElementById(`size-${size}`);
  if(btn) btn.classList.add('active');

  updateModalPrice();
}

// =====================
// SUGAR SYSTEM (FIXED)
// =====================
function setSugar(level) {
  selectedSugar = level;

  document.querySelectorAll('.sugar-btn').forEach(b => b.classList.remove('active'));
  
  // FIX: Looks for 'sugar-100%' OR 'sugar-100' just in case the % is missing in HTML ID
  const cleanId = level.toString().replace('%', '');
  const btn = document.getElementById(`sugar-${level}`) || document.getElementById(`sugar-${cleanId}`);
  
  if (btn) btn.classList.add('active');
}

// =====================
// ICE SYSTEM (FIXED)
// =====================
function setIce(level) {
  selectedIce = level;

  document.querySelectorAll('.ice-btn').forEach(b => b.classList.remove('active'));
  
  // FIX: Same safety net as sugar
  const cleanId = level.toString().replace('%', '');
  const btn = document.getElementById(`ice-${level}`) || document.getElementById(`ice-${cleanId}`);
  
  if (btn) btn.classList.add('active');
}

// =====================
// RESET UI (FIXED)
// =====================
function resetSizeUI() {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('size-M');
  if (btn) btn.classList.add('active');
}

function resetSugarUI() {
  document.querySelectorAll('.sugar-btn').forEach(b => b.classList.remove('active'));
  // FIX: Safely try both formats
  const btn = document.getElementById('sugar-100%') || document.getElementById('sugar-100');
  if (btn) btn.classList.add('active');
}

function resetIceUI() {
  document.querySelectorAll('.ice-btn').forEach(b => b.classList.remove('active'));
  // FIX: Safely try both formats
  const btn = document.getElementById('ice-100%') || document.getElementById('ice-100');
  if (btn) btn.classList.add('active');
}

// =====================
// PRICE
// =====================
function updateModalPrice() {
  const final = selectedProduct.price * sizeMultiplier[selectedSize];
  document.getElementById('modalFinalPrice').innerText = `₱${final.toFixed(2)}`;
}

// =====================
// ADD TO CART (DRINK)
// =====================
function addToCartFromModal() {
  const price = selectedProduct.price * sizeMultiplier[selectedSize];

  cart.push({
    id: Date.now(),
    name: selectedProduct.name,
    img: selectedProduct.img,
    price,
    qty: 1,
    details: `Size: ${selectedSize} | Sugar: ${selectedSugar} | Ice: ${selectedIce}`
  });

  updateCart();
  bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
  showCart();
}

// =====================
// CUSTOM BUILDER
// =====================
function loadBuilder() {
  document.getElementById('baseList').innerHTML = ingredients.base.map(ing => `
    <div class="ingredient-row" onclick="toggleIng('${ing.name}', ${ing.price}, this)">
      <span>${ing.name}</span>
      <span>+₱${ing.price}</span>
    </div>
  `).join('');

  document.getElementById('extraList').innerHTML = ingredients.extras.map(ing => `
    <div class="ingredient-row" onclick="toggleIng('${ing.name}', ${ing.price}, this)">
      <span>${ing.name}</span>
      <span>+₱${ing.price}</span>
    </div>
  `).join('');
}

// =====================
// TOGGLE INGREDIENTS
// =====================
function toggleIng(name, price, el) {
  const idx = selectedIngredients.findIndex(i => i.name === name);

  if (idx > -1) {
    selectedIngredients.splice(idx, 1);
    el.classList.remove('selected');
  } else {
    selectedIngredients.push({ name, price });
    el.classList.add('selected');
  }

  const total = selectedIngredients.reduce((s, i) => s + i.price, 0);
  document.getElementById('builderSubtotal').innerText = `₱${total.toFixed(2)}`;
}

// =====================
// ADD CUSTOM DRINK
// =====================
function addBuilderToCart() {
  if (selectedIngredients.length === 0) return alert("Select ingredients!");

  const price = selectedIngredients.reduce((s, i) => s + i.price, 0);
  const details = selectedIngredients.map(i => i.name).join(', ');

  cart.push({
    id: Date.now(),
    name: 'Custom Brew',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100',
    price,
    qty: 1,
    details: `${details} | Size: M | Ice: ${selectedIce}`
  });

  updateCart();

  bootstrap.Modal.getInstance(document.getElementById('builderModal')).hide();

  selectedIngredients = [];
  document.querySelectorAll('.ingredient-row').forEach(r => r.classList.remove('selected'));
  document.getElementById('builderSubtotal').innerText = "₱0.00";
}

// =====================
// CART
// =====================
function updateCart() {
  const list = document.getElementById('cartItems');

  document.getElementById('cartCount').innerText =
    cart.reduce((s, i) => s + i.qty, 0);

  if (cart.length === 0) {
    list.innerHTML = `<div class="text-center mt-5 text-muted small">Cart is empty.</div>`;
  } else {
    list.innerHTML = cart.map(i => `
      <div class="cart-item">
        <img src="${i.img}">
        <div class="flex-grow-1">
          <p class="m-0 fw-bold small">${i.name}</p>
          ${i.details ? `<small class="text-muted d-block">${i.details}</small>` : ''}
          <span class="text-accent fw-bold small">₱${(i.price * i.qty).toFixed(2)}</span>
        </div>
        <div class="qty-box">
          <i class="bi bi-dash" onclick="changeQty(${i.id}, -1)"></i>
          <span>${i.qty}</span>
          <i class="bi bi-plus" onclick="changeQty(${i.id}, 1)"></i>
        </div>
      </div>
    `).join('');
  }

  const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  document.getElementById('subtotal').innerText = `₱${total.toFixed(2)}`;
  document.getElementById('total').innerText = `₱${total.toFixed(2)}`;
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);

  updateCart();
}

// =====================
// RENDER
// =====================
function render() {
  const grid = document.getElementById('grid');
  const search = document.getElementById('searchInput').value.toLowerCase();

  const filtered = data.filter(p =>
    (currentCategory === 'all' || p.cat === currentCategory) &&
    p.name.toLowerCase().includes(search)
  );

  grid.innerHTML = filtered.map(p => `
    <div class="col-xl-4 col-md-6">
      <div class="product-card" onclick="openProduct(${p.id})">
        <img src="${p.img}" class="product-img">
        <p class="fw-bold m-0">${p.name}</p>
        <span class="text-accent fw-bold small">₱${p.price}</span>
      </div>
    </div>
  `).join('');
}

// =====================
// UI
// =====================
function toggleCart() {
  document.getElementById('cartPanel').classList.toggle('hidden');
}

function showCart() {
  document.getElementById('cartPanel').classList.remove('hidden');
}

function setCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  render();
}

// =====================
// INIT
// =====================
document.getElementById('searchInput').oninput = render;

render();
loadBuilder();