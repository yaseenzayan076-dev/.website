/* --- APPLICATION STATE & LOCALSTORAGE PERSISTENCE --- */
let currentLang = 'en'; // 'en' or 'ml'

// Updated Official Menu from Makhan Restaurant Menu Card (Taliparamba)
const defaultMenu = [
    { id: 1, name: 'Normal Alfaham Mandhi', category: 'Mandis', price: 240, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹240 | Half ₹480 | Full ₹960', inStock: true, bestseller: true },
    { id: 2, name: 'Peri Peri Alfaham Mandhi', category: 'Mandis', price: 250, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹250 | Half ₹500 | Full ₹1000', inStock: true, bestseller: true },
    { id: 3, name: 'Honey Chilli Alfaham Mandhi', category: 'Mandis', price: 260, image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹260 | Half ₹520 | Full ₹1040', inStock: true, bestseller: false },
    { id: 4, name: 'Kanthari Alfaham Mandhi', category: 'Mandis', price: 260, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹260 | Half ₹520 | Full ₹1040', inStock: true, bestseller: true },
    { id: 5, name: 'Afghani Alfaham Mandhi', category: 'Mandis', price: 270, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹270 | Half ₹540 | Full ₹1080', inStock: true, bestseller: false },
    { id: 6, name: 'Creamy Alfaham Mandhi', category: 'Mandis', price: 280, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹280 | Half ₹560 | Full ₹1120', inStock: true, bestseller: false },
    { id: 7, name: 'Shawaya Mandhi', category: 'Mandis', price: 240, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹240 | Half ₹480 | Full ₹960', inStock: true, bestseller: false },
    { id: 8, name: 'Beef Mandhi', category: 'Mandis', price: 260, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹260 | Half ₹520 | Full ₹1040', inStock: true, bestseller: true },
    { id: 9, name: 'Pre Mutton Mandhi (Booking)', category: 'Mandis', price: 350, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹350 | Half ₹700 | Full ₹1400', inStock: true, bestseller: true },
    { id: 10, name: 'Normal Alfaham', category: 'Alfaham', price: 140, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹140 | Half ₹280 | Full ₹560', inStock: true, bestseller: false },
    { id: 11, name: 'Peri Peri Alfaham', category: 'Alfaham', price: 150, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹150 | Half ₹300 | Full ₹600', inStock: true, bestseller: false },
    { id: 12, name: 'Honey Chilli Alfaham', category: 'Alfaham', price: 160, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹160 | Half ₹320 | Full ₹640', inStock: true, bestseller: false },
    { id: 13, name: 'Kanthari Alfaham', category: 'Alfaham', price: 160, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹160 | Half ₹320 | Full ₹640', inStock: true, bestseller: false },
    { id: 14, name: 'Afghani Alfaham', category: 'Alfaham', price: 170, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹170 | Half ₹340 | Full ₹680', inStock: true, bestseller: false },
    { id: 15, name: 'Creamy Alfaham', category: 'Alfaham', price: 180, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹180 | Half ₹360 | Full ₹720', inStock: true, bestseller: false },
    { id: 16, name: 'Masala Shawaya', category: 'Barbeque', price: 140, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80', desc: 'Quarter ₹140 | Half ₹280 | Full ₹560', inStock: true, bestseller: false },
    { id: 17, name: 'Appam Pollichathu', category: 'Starters', price: 180, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80', desc: 'Normal ₹180 | PeriPeri ₹190', inStock: true, bestseller: true },
    { id: 18, name: 'Porotta Pollichathu', category: 'Starters', price: 190, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', desc: 'Special wrapped and spiced porotta dish.', inStock: true, bestseller: true },
    { id: 19, name: 'Neychor (Ghee Rice)', category: 'Starters', price: 220, image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80', desc: 'Aromatic traditional ghee rice.', inStock: true, bestseller: false },
    { id: 20, name: 'Beef Add-on', category: 'Starters', price: 150, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', desc: 'Extra delicious beef gravy / portion.', inStock: true, bestseller: false },
    { id: 21, name: 'Mandhi Rice Add-on', category: 'Starters', price: 100, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', desc: 'Extra portion of flavorful mandhi rice.', inStock: true, bestseller: false },
    { id: 22, name: 'Rumal Rotti', category: 'Starters', price: 20, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80', desc: 'Soft thin rumal rotti.', inStock: true, bestseller: false },
    { id: 23, name: 'Kuboos', category: 'Starters', price: 10, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80', desc: 'Fresh Arabian kuboos bread.', inStock: true, bestseller: false }
];

const defaultReviews = [
    { id: 1, name: 'Muhammed Fayis', rating: 5, text: 'A great overall experience! Special mention to the speedy delivery and service. The Beef Mandi was extremely flavorful and fresh.', date: '2 days ago' },
    { id: 2, name: 'Abhijith Nair', rating: 5, text: 'The portion size was generous and the whole meal felt fresh and filling. Alfaham chicken is perfectly cooked and juicy.', date: '1 week ago' },
    { id: 3, name: 'Fathima Zahra', rating: 4, text: 'Amazing ambience at Syed Nagar branch. Friendly staff and authentic Arabian taste in Taliparamba.', date: '2 weeks ago' }
];

let menuItems = JSON.parse(localStorage.getItem('makhan_menu')) || defaultMenu;
let cart = JSON.parse(localStorage.getItem('makhan_cart')) || [];
let orders = JSON.parse(localStorage.getItem('makhan_orders')) || [
    { id: 'MK-1092', name: 'Rahul V.', phone: '9876543210', items: '1x Beef Mandi (Special)', total: 420, type: 'Delivery', payment: 'Cash on Delivery', status: 'Out for Delivery', date: 'Today, 1:45 PM' },
    { id: 'MK-1091', name: 'Anshad K.', phone: '9123456789', items: '2x Alfaham Chicken (Full)', total: 840, type: 'Takeaway', payment: 'UPI / Online', status: 'Completed', date: 'Today, 12:30 PM' }
];
let reservations = JSON.parse(localStorage.getItem('makhan_reservations')) || [
    { name: 'Sreeraj P.', phone: '9944332211', date: '2026-06-15', time: '07:00 PM', guests: '4 People', status: 'Confirmed' }
];
let reviews = JSON.parse(localStorage.getItem('makhan_reviews')) || defaultReviews;
let appliedDiscount = 0;

/* --- INITIALIZATION --- */
window.onload = function() {
    renderHomeBestsellers();
    renderHomeFullMenu();
    renderMenuGrid();
    renderReviews();
    updateCartBadge();
};

/* --- NAVIGATION TABS --- */
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${tabId}`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

/* --- TOAST NOTIFICATIONS --- */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    toast.className = `p-4 rounded-2xl shadow-2xl text-sm font-bold flex items-center space-x-3 transition-all duration-300 transform translate-y-2 opacity-0 ${type === 'success' ? 'bg-gold text-black border border-gold-light' : 'bg-red-600 text-white'}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle text-lg' : 'fa-exclamation-circle text-lg'}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.remove('translate-y-2', 'opacity-0'); }, 50);
    setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => { toast.remove(); }, 300);
    }, 3000);
}

/* --- LANGUAGE TOGGLE --- */
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ml' : 'en';
    const langBtn = document.getElementById('lang-btn-text');
    if(langBtn) langBtn.innerText = currentLang === 'en' ? 'മലയാളം' : 'English';
    showToast(currentLang === 'ml' ? 'മലയാളത്തിലേക്ക് മാറ്റി' : 'Switched to English');
}

/* --- HOME BESTSELLERS & FULL MENU --- */
function renderHomeBestsellers() {
    const grid = document.getElementById('home-bestsellers-grid');
    if(!grid) return;
    const bestsellers = menuItems.filter(item => item.bestseller).slice(0, 3);
    grid.innerHTML = bestsellers.map(item => `
        <div class="glass-card rounded-3xl overflow-hidden shadow-xl hover:border-gold transition-all group flex flex-col justify-between">
            <div class="relative h-56 overflow-hidden">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.src='https://placehold.co/600x400/1a1a1a/d4af37?text=Makhan+Mandi'">
                <div class="absolute top-4 left-4 bg-gold text-black text-xs font-black px-3 py-1 rounded-full shadow-lg">Bestseller</div>
                <div class="absolute bottom-4 right-4 bg-darkbg/95 text-gold font-black px-4 py-1.5 rounded-full text-base border border-gold/40">₹${item.price}</div>
            </div>
            <div class="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                    <h4 class="text-xl font-bold text-white mb-1">${item.name}</h4>
                    <p class="text-xs text-gray-400 line-clamp-2">${item.desc}</p>
                </div>
                <button onclick="addToCart(${item.id})" class="w-full gold-gradient text-black font-extrabold py-3 rounded-xl shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 text-sm">
                    <i class="fas fa-cart-plus"></i><span>Add to Cart</span>
                </button>
            </div>
        </div>
    `).join('');
}

function renderHomeFullMenu() {
    const container = document.getElementById('home-full-menu-grid');
    if(!container) return;
    container.innerHTML = menuItems.map(item => `
        <div class="glass-card p-5 rounded-2xl flex items-center justify-between border border-gold/20 hover:border-gold transition-all">
            <div class="flex items-center space-x-4">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover border border-gold/30" onerror="this.src='https://placehold.co/100x100/1a1a1a/d4af37?text=Food'">
                <div>
                    <span class="text-[10px] font-bold uppercase text-gold tracking-widest">${item.category}</span>
                    <h4 class="text-base font-bold text-white">${item.name}</h4>
                    <p class="text-xs text-gray-400">${item.desc}</p>
                </div>
            </div>
            <div class="text-right space-y-2">
                <span class="text-base font-black text-gold block">₹${item.price}</span>
                <button onclick="addToCart(${item.id})" class="gold-gradient text-black text-xs font-extrabold px-3 py-1.5 rounded-lg shadow hover:scale-105 transition-all">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
        </div>
    `).join('');
}

/* --- MENU & ORDERING --- */
let activeCategory = 'All';

function filterCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.category-btn').forEach(btn => {
        if(btn.innerText.includes(cat) || (cat === 'All' && btn.innerText.includes('All'))) {
            btn.className = 'category-btn px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all bg-gold text-black shadow-lg';
        } else {
            btn.className = 'category-btn px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all bg-darkcard border border-gold/30 text-gray-300 hover:border-gold';
        }
    });
    renderMenuGrid();
}

function filterMenu() {
    renderMenuGrid();
}

function renderMenuGrid() {
    const queryEl = document.getElementById('menu-search');
    const query = queryEl ? queryEl.value.toLowerCase() : '';
    const grid = document.getElementById('menu-grid');
    if(!grid) return;
    
    let filtered = menuItems.filter(item => {
        const matchesCat = activeCategory === 'All' || item.category === activeCategory;
        const matchesQuery = item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
        return matchesCat && matchesQuery;
    });

    if(filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-16 text-gray-400">No dishes found matching your search.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(item => `
        <div class="glass-card rounded-3xl overflow-hidden shadow-xl hover:border-gold transition-all group flex flex-col justify-between">
            <div class="relative h-48 overflow-hidden">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.src='https://placehold.co/600x400/1a1a1a/d4af37?text=Makhan+Dish'">
                <div class="absolute bottom-4 right-4 bg-darkbg/95 text-gold font-black px-3 py-1 rounded-full text-sm border border-gold/40">₹${item.price}</div>
                ${!item.inStock ? '<div class="absolute inset-0 bg-black/70 flex items-center justify-center text-red-500 font-extrabold text-lg uppercase">Sold Out</div>' : ''}
            </div>
            <div class="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                    <span class="text-[10px] font-bold uppercase text-gold tracking-widest">${item.category}</span>
                    <h4 class="text-lg font-bold text-white">${item.name}</h4>
                    <p class="text-xs text-gray-400 line-clamp-2">${item.desc}</p>
                </div>
                <button onclick="addToCart(${item.id})" ${!item.inStock ? 'disabled' : ''} class="w-full ${item.inStock ? 'gold-gradient text-black hover:scale-[1.02]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'} font-bold py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 text-sm">
                    <i class="fas fa-cart-plus"></i><span>${item.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
            </div>
        </div>
    `).join('');
}

/* --- CART MANAGEMENT --- */
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if(!item || !item.inStock) return;
    const existing = cart.find(c => c.id === itemId);
    if(existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    saveCart();
    updateCartBadge();
    showToast(`Added ${item.name} to cart!`);
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if(!badge) return;
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    badge.innerText = totalQty;
    localStorage.setItem('makhan_cart', JSON.stringify(cart));
}

function saveCart() {
    localStorage.setItem('makhan_cart', JSON.stringify(cart));
}

function openCartModal() {
    renderCartItems();
    updateCartTotals();
    document.getElementById('cart-modal').classList.remove('hidden');
}

function closeCartModal() {
    document.getElementById('cart-modal').classList.add('hidden');
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    if(!container) return;
    if(cart.length === 0) {
        container.innerHTML = `<div class="text-center py-8 text-gray-400 text-sm">Your cart is empty. Add delicious mandis & alfahams!</div>`;
        return;
    }
    container.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between bg-darkbg p-3 rounded-2xl border border-darkborder">
            <div class="flex items-center space-x-3">
                <img src="${item.image}" class="w-12 h-12 rounded-xl object-cover" onerror="this.src='https://placehold.co/100x100/1a1a1a/d4af37?text=Food'">
                <div>
                    <h5 class="text-sm font-bold text-white">${item.name}</h5>
                    <p class="text-xs text-gold">₹${item.price} each</p>
                </div>
            </div>
            <div class="flex items-center space-x-3">
                <div class="flex items-center space-x-2 bg-darkcard border border-gold/30 rounded-lg px-2 py-1">
                    <button onclick="changeQty(${item.id}, -1)" class="text-gray-400 hover:text-gold text-xs px-1"><i class="fas fa-minus"></i></button>
                    <span class="text-xs font-bold text-white">${item.qty}</span>
                    <button onclick="changeQty(${item.id}, 1)" class="text-gray-400 hover:text-gold text-xs px-1"><i class="fas fa-plus"></i></button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-400 hover:text-red-300 text-sm"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
    `).join('');
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if(item) {
        item.qty += delta;
        if(item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart();
        updateCartBadge();
        renderCartItems();
        updateCartTotals();
    }
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartBadge();
    renderCartItems();
    updateCartTotals();
    showToast('Item removed from cart', 'error');
}

function applyCoupon() {
    const codeInput = document.getElementById('coupon-input');
    if(!codeInput) return;
    const code = codeInput.value.trim().toUpperCase();
    if(code === 'MAKHAN10') {
        appliedDiscount = 0.10; // 10%
        document.getElementById('discount-row').classList.remove('hidden');
        showToast('Promo Code MAKHAN10 applied (10% OFF)!');
        updateCartTotals();
    } else if(code === 'TALI20') {
        appliedDiscount = 0.20; // 20%
        document.getElementById('discount-row').classList.remove('hidden');
        showToast('Promo Code TALI20 applied (20% OFF)!');
        updateCartTotals();
    } else {
        showToast('Invalid coupon code', 'error');
    }
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const orderTypeEl = document.querySelector('input[name="order-type"]:checked');
    const orderType = orderTypeEl ? orderTypeEl.value : 'Delivery';
    const deliveryFee = orderType === 'Delivery' ? 40 : 0;
    const discountAmt = subtotal * appliedDiscount;
    const total = Math.max(0, subtotal + deliveryFee - discountAmt);

    const subTotalEl = document.getElementById('cart-subtotal');
    const deliveryEl = document.getElementById('cart-delivery');
    const discountEl = document.getElementById('cart-discount');
    const totalEl = document.getElementById('cart-total');
    const addressBox = document.getElementById('address-box');

    if(subTotalEl) subTotalEl.innerText = `₹${subtotal}`;
    if(deliveryEl) deliveryEl.innerText = `₹${deliveryFee}`;
    if(discountEl) discountEl.innerText = `-₹${discountAmt.toFixed(0)}`;
    if(totalEl) totalEl.innerText = `₹${total.toFixed(0)}`;
    if(addressBox) addressBox.style.display = orderType === 'Delivery' ? 'block' : 'none';
}

/* --- WHATSAPP ORDER INTEGRATION (NAME, LOCATION, PAYMENT, BILL) --- */
function checkoutWhatsApp() {
    if(cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    const orderTypeEl = document.querySelector('input[name="order-type"]:checked');
    const orderType = orderTypeEl ? orderTypeEl.value : 'Delivery';
    const addressInput = document.getElementById('checkout-address');
    const address = orderType === 'Delivery' && addressInput ? addressInput.value.trim() : 'Takeaway at Restaurant (Syed Nagar, Taliparamba)';
    const paymentMethodEl = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethod = paymentMethodEl ? paymentMethodEl.value : 'Cash on Delivery';
    
    if(orderType === 'Delivery' && !address) {
        showToast('Please enter your delivery address in Taliparamba', 'error');
        return;
    }

    const customerNamePrompt = prompt("Enter your Name for the order / delivery:", "Valued Customer");
    if(!customerNamePrompt) return;

    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const deliveryFee = orderType === 'Delivery' ? 40 : 0;
    const discountAmt = subtotal * appliedDiscount;
    const total = Math.max(0, subtotal + deliveryFee - discountAmt);
    const orderId = 'MK-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
        id: orderId,
        name: customerNamePrompt,
        phone: '09292020244',
        items: cart.map(i => `${i.qty}x ${i.name}`).join(', '),
        total: total,
        type: orderType,
        payment: paymentMethod,
        address: address,
        status: 'Pending',
        date: 'Just now'
    };
    orders.unshift(newOrder);
    localStorage.setItem('makhan_orders', JSON.stringify(orders));

    let waText = `*🍽️ NEW ORDER - MAKHAN RESTAURANT*%0A`;
    waText += `--------------------------------%0A`;
    waText += `*Order ID:* ${orderId}%0A`;
    waText += `*Customer Name:* ${customerNamePrompt}%0A`;
    waText += `*Order Type:* ${orderType}%0A`;
    waText += `*Delivery Location / Address:* ${address}%0A`;
    waText += `*Payment Method:* ${paymentMethod}%0A`;
    waText += `--------------------------------%0A`;
    waText += `*📦 BILL BREAKDOWN:*%0A`;
    cart.forEach(i => {
        waText += `• ${i.qty}x ${i.name} - ₹${i.price * i.qty} (₹${i.price} ea)%0A`;
    });
    waText += `--------------------------------%0A`;
    waText += `Subtotal: ₹${subtotal}%0A`;
    if(deliveryFee > 0) waText += `Delivery Charge: ₹${deliveryFee}%0A`;
    if(discountAmt > 0) waText += `Discount: -₹${discountAmt.toFixed(0)}%0A`;
    waText += `*Total Amount: ₹${total.toFixed(0)}*%0A`;
    waText += `--------------------------------%0A`;
    waText += `_Generated from Makhan Restaurant Official Website_`;

    cart = [];
    saveCart();
    updateCartBadge();
    closeCartModal();

    const waUrl = `https://wa.me/919292020244?text=${waText}`;
    window.open(waUrl, '_blank');
    showToast('Order confirmed! Redirecting to WhatsApp with complete bill...');
}

/* --- TABLE BOOKING --- */
function handleTableBooking(event) {
    event.preventDefault();
    const name = document.getElementById('book-name').value;
    const phone = document.getElementById('book-phone').value;
    const date = document.getElementById('book-date').value;
    const time = document.getElementById('book-time').value;
    const guests = document.getElementById('book-guests').value;
    const notes = document.getElementById('book-notes').value;

    const newRes = { name, phone, date, time, guests, notes, status: 'Confirmed' };
    reservations.unshift(newRes);
    localStorage.setItem('makhan_reservations', JSON.stringify(reservations));

    showToast(`Table successfully reserved for ${guests} on ${date}!`);
    document.getElementById('booking-form').reset();
}

/* --- REVIEWS --- */
function renderReviews() {
    const grid = document.getElementById('reviews-grid');
    if(!grid) return;
    grid.innerHTML = reviews.map(r => `
        <div class="glass-card p-6 rounded-3xl shadow-xl space-y-4 border border-gold/20 flex flex-col justify-between">
            <div class="space-y-2">
                <div class="flex justify-between items-center">
                    <h4 class="text-base font-bold text-white">${r.name}</h4>
                    <span class="text-xs text-gray-400">${r.date}</span>
                </div>
                <div class="text-yellow-500 text-sm">
                    ${Array(r.rating).fill('<i class="fas fa-star"></i>').join('')}
                </div>
                <p class="text-xs text-gray-300 leading-relaxed">"${r.text}"</p>
            </div>
            <div class="flex items-center space-x-2 pt-2 border-t border-darkborder text-[10px] text-gold font-bold">
                <i class="fab fa-google text-xs"></i><span>Verified Google Review</span>
            </div>
        </div>
    `).join('');
}

function openAddReviewModal() {
    document.getElementById('review-modal').classList.remove('hidden');
}

function closeAddReviewModal() {
    document.getElementById('review-modal').classList.add('hidden');
}

function submitReview(event) {
    event.preventDefault();
    const name = document.getElementById('rev-name').value;
    const rating = parseInt(document.getElementById('rev-rating').value);
    const text = document.getElementById('rev-text').value;

    reviews.unshift({ id: Date.now(), name, rating, text, date: 'Just now' });
    localStorage.setItem('makhan_reviews', JSON.stringify(reviews));
    renderReviews();
    closeAddReviewModal();
    showToast('Thank you for your review!');
    event.target.reset();
}

/* --- QR MODAL --- */
function openQrModal() {
    document.getElementById('qr-modal').classList.remove('hidden');
}

function closeQrModal() {
    document.getElementById('qr-modal').classList.add('hidden');
}

/* ==================== ADMIN DASHBOARD LOGIC (PIN: 2121) ==================== */
function openAdminLoginModal() {
    document.getElementById('admin-passcode').value = '';
    document.getElementById('admin-login-modal').classList.remove('hidden');
}

function closeAdminLoginModal() {
    document.getElementById('admin-login-modal').classList.add('hidden');
}

function handleAdminLogin(event) {
    event.preventDefault();
    const pin = document.getElementById('admin-passcode').value.trim();
    if(pin === '2121') {
        closeAdminLoginModal();
        document.getElementById('admin-dashboard-modal').classList.remove('hidden');
        renderAdminDashboard();
        showToast('Admin Dashboard unlocked successfully!');
    } else {
        showToast('Incorrect Admin PIN (hint: 2121)', 'error');
        document.getElementById('admin-passcode').value = '';
    }
}

function closeAdminDashboard() {
    document.getElementById('admin-dashboard-modal').classList.add('hidden');
}

function switchAdminTab(tab) {
    if(tab === 'orders') {
        document.getElementById('adm-tab-orders').classList.remove('hidden');
        document.getElementById('adm-tab-menu').classList.add('hidden');
        document.getElementById('adm-tab-orders-btn').className = 'adm-tab-btn px-6 py-2.5 rounded-xl font-bold text-sm bg-gold text-black transition-all';
        document.getElementById('adm-tab-menu-btn').className = 'adm-tab-btn px-6 py-2.5 rounded-xl font-bold text-sm bg-darkcard border border-gold/30 text-gray-300 hover:border-gold transition-all';
    } else {
        document.getElementById('adm-tab-orders').classList.add('hidden');
        document.getElementById('adm-tab-menu').classList.remove('hidden');
        document.getElementById('adm-tab-menu-btn').className = 'adm-tab-btn px-6 py-2.5 rounded-xl font-bold text-sm bg-gold text-black transition-all';
        document.getElementById('adm-tab-orders-btn').className = 'adm-tab-btn px-6 py-2.5 rounded-xl font-bold text-sm bg-darkcard border border-gold/30 text-gray-300 hover:border-gold transition-all';
        renderAdminMenuTable();
    }
}

function renderAdminDashboard() {
    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
    document.getElementById('admin-stat-sales').innerText = `₹${totalSales}`;
    document.getElementById('admin-stat-orders').innerText = orders.length;
    document.getElementById('admin-stat-customers').innerText = 120 + orders.length;
    document.getElementById('admin-stat-pending').innerText = orders.filter(o => o.status === 'Pending').length;
    document.getElementById('admin-stat-completed').innerText = orders.filter(o => o.status === 'Completed').length;

    renderAdminOrdersTable();
    renderAdminReservationsTable();
}

function renderAdminOrdersTable() {
    const tbody = document.getElementById('admin-orders-table');
    if(!tbody) return;
    tbody.innerHTML = orders.map(o => `
        <tr class="hover:bg-darkbg/50">
            <td class="p-3 font-bold text-gold">${o.id}</td>
            <td class="p-3">${o.name}<br><span class="text-xs text-gray-400">${o.phone}</span></td>
            <td class="p-3 text-xs text-gray-300">${o.items}</td>
            <td class="p-3 font-bold">₹${o.total}</td>
            <td class="p-3 text-xs"><span class="bg-darkbg px-2.5 py-1 rounded-full border border-gold/20 text-gold">${o.type}</span><br>${o.payment}</td>
            <td class="p-3"><span class="px-2.5 py-1 rounded-full text-xs font-bold ${o.status === 'Completed' ? 'bg-green-900/50 text-green-300 border border-green-500/30' : 'bg-amber-900/50 text-amber-300 border border-amber-500/30'}">${o.status}</span></td>
            <td class="p-3">
                <select onchange="updateOrderStatus('${o.id}', this.value)" class="bg-darkbg border border-gold/30 rounded-lg p-1 text-xs text-white">
                    <option value="Pending" ${o.status==='Pending'?'selected':''}>Pending</option>
                    <option value="Preparing" ${o.status==='Preparing'?'selected':''}>Preparing</option>
                    <option value="Out for Delivery" ${o.status==='Out for Delivery'?'selected':''}>Out for Delivery</option>
                    <option value="Completed" ${o.status==='Completed'?'selected':''}>Completed</option>
                </select>
            </td>
        </tr>
    `).join('');
}

function updateOrderStatus(id, newStatus) {
    const ord = orders.find(o => o.id === id);
    if(ord) {
        ord.status = newStatus;
        localStorage.setItem('makhan_orders', JSON.stringify(orders));
        renderAdminDashboard();
        showToast(`Order ${id} status updated to ${newStatus}`);
    }
}

function renderAdminReservationsTable() {
    const tbody = document.getElementById('admin-reservations-table');
    if(!tbody) return;
    tbody.innerHTML = reservations.map((r, idx) => `
        <tr class="hover:bg-darkbg/50">
            <td class="p-3 font-bold text-white">${r.name}</td>
            <td class="p-3 text-gray-400">${r.phone}</td>
            <td class="p-3">${r.date}</td>
            <td class="p-3 text-gold">${r.time}</td>
            <td class="p-3">${r.guests}</td>
            <td class="p-3"><span class="text-green-400 text-xs font-bold bg-green-900/40 px-2 py-1 rounded border border-green-500/30">${r.status}</span></td>
        </tr>
    `).join('');
}

function renderAdminMenuTable() {
    const tbody = document.getElementById('admin-menu-table');
    if(!tbody) return;
    tbody.innerHTML = menuItems.map(item => `
        <tr class="hover:bg-darkbg/50">
            <td class="p-3"><img src="${item.image}" class="w-12 h-12 rounded-xl object-cover" onerror="this.src='https://placehold.co/100x100/1a1a1a/d4af37?text=Food'"></td>
            <td class="p-3 font-bold text-white">${item.name}</td>
            <td class="p-3 text-xs text-gold">${item.category}</td>
            <td class="p-3 font-bold">₹${item.price}</td>
            <td class="p-3">
                <button onclick="toggleFoodStock(${item.id})" class="px-3 py-1 rounded-full text-xs font-bold ${item.inStock ? 'bg-green-900/40 text-green-300 border border-green-500/30' : 'bg-red-900/40 text-red-300 border border-red-500/30'}">
                    ${item.inStock ? 'In Stock' : 'Sold Out'}
                </button>
            </td>
            <td class="p-3 space-x-2">
                <button onclick="openEditFoodModal(${item.id})" class="text-gold hover:underline text-xs"><i class="fas fa-edit"></i> Edit</button>
                <button onclick="deleteFoodItem(${item.id})" class="text-red-400 hover:underline text-xs"><i class="fas fa-trash"></i> Delete</button>
            </td>
        </tr>
    `).join('');
}

function toggleFoodStock(id) {
    const item = menuItems.find(i => i.id === id);
    if(item) {
        item.inStock = !item.inStock;
        localStorage.setItem('makhan_menu', JSON.stringify(menuItems));
        renderAdminMenuTable();
        renderMenuGrid();
        renderHomeBestsellers();
        showToast(`Updated availability for ${item.name}`);
    }
}

function deleteFoodItem(id) {
    menuItems = menuItems.filter(i => i.id !== id);
    localStorage.setItem('makhan_menu', JSON.stringify(menuItems));
    renderAdminMenuTable();
    renderMenuGrid();
    renderHomeBestsellers();
    showToast('Food item deleted successfully', 'error');
}

function openAddFoodModal() {
    document.getElementById('food-modal-title').innerText = 'Add Food Item';
    document.getElementById('edit-food-id').value = '';
    document.getElementById('food-name').value = '';
    document.getElementById('food-price').value = '';
    document.getElementById('food-image').value = '';
    document.getElementById('food-desc').value = '';
    document.getElementById('food-stock').checked = true;
    document.getElementById('food-item-modal').classList.remove('hidden');
}

function openEditFoodModal(id) {
    const item = menuItems.find(i => i.id === id);
    if(item) {
        document.getElementById('food-modal-title').innerText = 'Edit Food Item';
        document.getElementById('edit-food-id').value = item.id;
        document.getElementById('food-name').value = item.name;
        document.getElementById('food-category').value = item.category;
        document.getElementById('food-price').value = item.price;
        document.getElementById('food-image').value = item.image;
        document.getElementById('food-desc').value = item.desc;
        document.getElementById('food-stock').checked = item.inStock;
        document.getElementById('food-item-modal').classList.remove('hidden');
    }
}

function closeAddFoodModal() {
    document.getElementById('food-item-modal').classList.add('hidden');
}

function saveFoodItem(event) {
    event.preventDefault();
    const editId = document.getElementById('edit-food-id').value;
    const name = document.getElementById('food-name').value;
    const category = document.getElementById('food-category').value;
    const price = parseFloat(document.getElementById('food-price').value);
    const image = document.getElementById('food-image').value;
    const desc = document.getElementById('food-desc').value;
    const inStock = document.getElementById('food-stock').checked;

    if(editId) {
        const item = menuItems.find(i => i.id == editId);
        if(item) {
            item.name = name;
            item.category = category;
            item.price = price;
            item.image = image;
            item.desc = desc;
            item.inStock = inStock;
        }
        showToast('Food item updated successfully!');
    } else {
        const newItem = {
            id: Date.now(),
            name, category, price, image, desc, inStock, bestseller: false
        };
        menuItems.push(newItem);
        showToast('New food item added successfully!');
    }

    localStorage.setItem('makhan_menu', JSON.stringify(menuItems));
    closeAddFoodModal();
    renderAdminMenuTable();
    renderMenuGrid();
    renderHomeBestsellers();
    renderHomeFullMenu();
}