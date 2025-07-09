// product.js (Product Logic)

// ... products array and function definitions ...

/**
 * Renders a list of products into the specified container.
 * @param {Array} productsToRender The array of product objects to display.
 * @param {HTMLElement} containerElement The DOM element to render products into.
 */
function renderProducts(productsToRender, containerElement) {
    containerElement.innerHTML = ''; // Clear existing products
    if (productsToRender.length === 0) {
        containerElement.innerHTML = '<div class="col-12 text-center text-muted">No products found matching your criteria.</div>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = `
            <div class="col">
                <div class="card h-100 shadow-sm rounded-3 overflow-hidden" onclick="window.location.href='product-details.html?id=${product.id}'" style="cursor: pointer;">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;" onerror="this.onerror=null;this.src='https://placehold.co/400x250/E0E0E0/333333?text=Image+Not+Found';">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title text-primary fw-bold">${product.name}</h5>
                        <p class="card-text text-muted mb-2">${product.category} | ${product.city}, ${product.state}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                            <span class="fs-4 fw-bold text-success">₹${product.price.toLocaleString('en-IN')}</span>
                            <a href="product-details.html?id=${product.id}" class="btn btn-sm btn-outline-primary rounded-pill">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        containerElement.innerHTML += productCard;
    });
}

/**
 * Displays the details of a specific product.
 * This function is called on product-details.html.
 */
function showProductDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const product = window.products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        // Redirect to products page if product not found
        window.location.href = 'products.html';
        return;
    }

    document.getElementById('detail-product-image').src = product.imageUrl;
    document.getElementById('detail-product-image').alt = product.name;
    document.getElementById('detail-product-name').textContent = product.name;
    document.getElementById('detail-product-category').textContent = product.category;
    document.getElementById('detail-product-location').textContent = `${product.city}, ${product.state}`;
    document.getElementById('detail-product-price').textContent = `₹${product.price.toLocaleString('en-IN')}`;
    document.getElementById('detail-product-description').textContent = product.description;

    // Set seller ID for chat button (defined in script.js)
    const chatBtn = document.getElementById('chat-with-seller-btn');
    if (chatBtn) {
        chatBtn.onclick = () => openChat(product.sellerId);
    }

    // Set Add to Cart button functionality (defined in cart.js)
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.onclick = () => addToCart(product.id);
    }
}

/**
 * Applies filters to the product list and re-renders them.
 * This function is called on products.html.
 */
function filterProducts() {
    const category = document.getElementById('filterCategory')?.value.toLowerCase();
    const priceMin = parseFloat(document.getElementById('filterPriceMin')?.value) || 0;
    const priceMax = parseFloat(document.getElementById('filterPriceMax')?.value) || Infinity;
    const city = document.getElementById('filterCity')?.value.toLowerCase();
    const state = document.getElementById('filterState')?.value.toLowerCase();
    const productName = document.getElementById('filterProductName')?.value.toLowerCase();

    const filtered = window.products.filter(product => {
        const matchesCategory = !category || product.category.toLowerCase() === category;
        const matchesPrice = product.price >= priceMin && product.price <= priceMax;
        const matchesCity = !city || product.city.toLowerCase().includes(city);
        const matchesState = !state || product.state.toLowerCase().includes(state);
        const matchesName = !productName || product.name.toLowerCase().includes(productName);

        return matchesCategory && matchesPrice && matchesCity && matchesState && matchesName;
    });

    const productListElement = document.getElementById('product-list');
    if (productListElement) {
        renderProducts(filtered, productListElement);
    }
}

// Expose functions to the global scope
window.renderProducts = renderProducts;
window.showProductDetailsPage = showProductDetailsPage;
window.filterProducts = filterProducts;

// Page-specific initialization logic
document.addEventListener('DOMContentLoaded', () => {
    // Check current page path and initialize accordingly
    const path = window.location.pathname;

    if (path.includes('index.html') || path === '/') {
        renderProducts(window.products.slice(0, 4), document.getElementById('featured-product-list'));
    } else if (path.includes('products.html')) {
        filterProducts();
    } else if (path.includes('product-details.html')) {
        showProductDetailsPage();
    }
});
