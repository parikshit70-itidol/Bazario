// cart.js (Cart Logic)

/**
 * Updates the cart count displayed in the navbar.
 */
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = window.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

/**
 * Adds a product to the cart or increments its quantity if already present.
 * @param {number} productId The ID of the product to add.
 */
function addToCart(productId) {
    // Access products array from data.js (assumes data.js is loaded first)
    const productToAdd = window.products.find(p => p.id === productId);
    if (!productToAdd) {
        showToast('Error: Product not found!', 'danger');
        return;
    }

    const existingItemIndex = window.cartItems.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
        window.cartItems[existingItemIndex].quantity += 1;
        showToast(`${productToAdd.name} quantity updated in cart!`);
    } else {
        window.cartItems.push({ ...productToAdd, quantity: 1 });
        showToast(`${productToAdd.name} added to cart!`);
    }
    localStorage.setItem('cartItems', JSON.stringify(window.cartItems));
    updateCartCount();
    // If on cart page, re-render cart
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

/**
 * Renders the items currently in the cart.
 * This function is called on cart.html.
 */
function renderCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    if (!cartContainer || !cartTotalPriceElement) return;

    cartContainer.innerHTML = ''; // Clear existing cart items

    let totalPrice = 0;

    if (window.cartItems.length === 0) {
        cartContainer.innerHTML = '<div class="alert alert-info text-center" role="alert">Your cart is empty. Start adding some products!</div>';
        cartTotalPriceElement.textContent = '₹0';
        return;
    }

    window.cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
        const cartItemHtml = `
            <div class="d-flex align-items-center border-bottom py-3">
                <img src="${item.imageUrl}" alt="${item.name}" class="me-3 rounded-2" style="width: 80px; height: 80px; object-fit: cover;" onerror="this.onerror=null;this.src='https://placehold.co/80x80/E0E0E0/333333?text=No+Image';">
                <div class="flex-grow-1">
                    <h5 class="mb-1">${item.name}</h5>
                    <p class="text-muted mb-1">Price: ₹${item.price.toLocaleString('en-IN')}</p>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-secondary rounded-pill me-2" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <span class="fw-bold me-2">Qty: ${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary rounded-pill" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <span class="fw-bold text-primary fs-5">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
                <button class="btn btn-sm btn-danger rounded-pill ms-3" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        cartContainer.innerHTML += cartItemHtml;
    });
    cartTotalPriceElement.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
    updateCartCount(); // Ensure count is updated after rendering
}

/**
 * Updates the quantity of a product in the cart.
 * @param {number} productId The ID of the product.
 * @param {number} change The amount to change the quantity by (+1 or -1).
 */
function updateCartQuantity(productId, change) {
    const itemIndex = window.cartItems.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        window.cartItems[itemIndex].quantity += change;
        if (window.cartItems[itemIndex].quantity <= 0) {
            removeFromCart(productId); // Remove if quantity drops to 0 or less
        } else {
            localStorage.setItem('cartItems', JSON.stringify(window.cartItems));
            renderCart();
        }
    }
}

/**
 * Removes a product from the cart.
 * @param {number} productId The ID of the product to remove.
 */
function removeFromCart(productId) {
    window.cartItems = window.cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(window.cartItems));
    showToast('Item removed from cart.', 'info');
    renderCart();
    updateCartCount();
}

/**
 * Simulates the checkout process.
 */
function checkout() {
    if (window.cartItems.length === 0) {
        showToast('Your cart is empty. Add items before checking out!', 'danger');
        return;
    }
    // In a real app, this would send data to a backend for order processing
    showToast('Proceeding to checkout! (This is a demo, no actual order placed)', 'success');
    window.cartItems = []; // Clear cart after "checkout"
    localStorage.removeItem('cartItems');
    updateCartCount();
    // Redirect to orders page or a confirmation page
    window.location.href = 'orders.html';
}

// Expose functions to the global scope
window.updateCartCount = updateCartCount;
window.addToCart = addToCart;
window.renderCart = renderCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
