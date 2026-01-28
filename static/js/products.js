import { products } from "./products.data.js";

class ProductCarousel {
    constructor() {
        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        this.selectedCategory = null;
        this.filteredProducts = [...products];
        this.init();
    }

    getItemsPerView() {
        const width = window.innerWidth;
        if (width < 576) return 1;      // Mobile
        if (width < 992) return 2;      // Tablet
        return 4;                       // Desktop
    }

    init() {
        this.populateCategoryDropdown();
        this.attachCategoryEventListeners();
        this.attachBreadcrumbResetListener();
        this.renderProducts();
        this.attachEventListeners();
        window.addEventListener('resize', () => {
            this.itemsPerView = this.getItemsPerView();
            this.currentIndex = 0;
            this.renderProducts();
        });
    }

    populateCategoryDropdown() {
        const categoriesDropdown = document.getElementById('categories-dropdown');
        if (!categoriesDropdown) {
            console.error('Categories dropdown element not found');
            return;
        }

        console.log('Found categories dropdown, populating with categories...');

        // Get unique categories from products
        const uniqueCategories = [...new Set(products.map(p => p.category))].sort();
        console.log('Unique categories:', uniqueCategories);

        // Populate dropdown
        categoriesDropdown.innerHTML = uniqueCategories.map(category => `
            <li>
                <a class="dropdown-item category-filter" href="#" data-category="${category}">
                    ${category}
                </a>
            </li>
        `).join('');

        // Add "All Products" option at the top
        const allProductsOption = document.createElement('li');
        allProductsOption.innerHTML = `
            <a class="dropdown-item category-filter" href="#" data-category="all">
                All Products
            </a>
        `;
        categoriesDropdown.insertBefore(allProductsOption, categoriesDropdown.firstChild);

        // Add divider after "All Products"
        const divider = document.createElement('li');
        divider.innerHTML = '<hr class="dropdown-divider">';
        categoriesDropdown.insertBefore(divider, categoriesDropdown.children[1]);
    }

    attachCategoryEventListeners() {
        document.addEventListener('click', (e) => {
            const categoryFilter = e.target.closest('.category-filter');
            if (!categoryFilter) return;

            e.preventDefault();
            const category = categoryFilter.getAttribute('data-category');
            this.selectCategory(category);
        });
    }

    attachBreadcrumbResetListener() {
        document.addEventListener('resetCategory', () => {
            this.selectCategory('all');
        });
    }

    selectCategory(category) {
        this.selectedCategory = category === 'all' ? null : category;
        this.currentIndex = 0;

        // Filter products based on selected category
        if (this.selectedCategory) {
            this.filteredProducts = products.filter(p => p.category === this.selectedCategory);
        } else {
            this.filteredProducts = [...products];
        }

        // Update UI
        this.toggleBreadcrumb();
        this.renderProducts();
    }

    toggleBreadcrumb() {
        const breadcrumbContainer = document.getElementById('breadcrumb-container');
        const carousel = document.getElementById('carouselExampleIndicators');
        const productSection = document.querySelector('section.container.my-5');
        const breadcrumbCurrent = document.getElementById('breadcrumb-current');
        const productCount = document.getElementById('product-count');

        if (this.selectedCategory) {
            // Show breadcrumb, hide carousel
            breadcrumbContainer.style.display = 'block';
            if (carousel) carousel.style.display = 'none';
            if (productSection) productSection.style.display = 'block';
            breadcrumbCurrent.textContent = this.selectedCategory;
            productCount.textContent = `${this.filteredProducts.length} products`;
        } else {
            // Hide breadcrumb, show carousel
            breadcrumbContainer.style.display = 'none';
            if (carousel) carousel.style.display = 'block';
            if (productSection) productSection.style.display = 'block';
        }
    }

    renderProducts() {
        const container = document.querySelector('.row.g-4');
        if (!container) return;

        container.innerHTML = this.filteredProducts.map(product => `
            <div class="col-12 col-sm-6 col-lg-3">
                <div class="card h-100 shadow-sm border-0 product-card" style="cursor: pointer;" data-product-id="${product.id}">
                    <div class="position-relative">
                        <span class="badge position-absolute top-0 start-0 m-3 px-3 py-2"
                            style="background-color: ${product.badgeColor}; z-index: 5;">
                            ${product.badge}
                        </span>
                        <button class="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle p-2 favorite-btn"
                            style="width: 36px; height: 36px; z-index: 5;">
                            <i class="bi bi-heart"></i>
                        </button>
                        <img src="/static/images/${product.image}" alt="${product.name}"
                            class="card-img-top" style="height: 350px; object-fit: cover;">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-semibold mb-2">${product.name}</h5>
                        <p class="text-muted small mb-2">${product.category}</p>
                        <div class="d-flex align-items-center mb-3">
                            <span class="text-warning me-1">★★★★★</span>
                            <span class="fw-semibold me-1">${product.rating}</span>
                            <span class="text-muted small">${product.reviews}</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h4 class="mb-0 fw-bold">₹${product.price}</h4>
                        </div>
                        <select class="form-select mb-3">
                            ${product.sizes.map(size => `<option selected>${size}</option>`).join('')}
                        </select>
                        <button class="btn text-white fw-semibold py-2 mt-auto" style="background-color: #2d5f2e;" onclick="event.stopPropagation();">
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.updateButtonStates();
        this.attachFavoriteButtons();
        this.attachProductCardClickHandlers();
    }

    attachProductCardClickHandlers() {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const productId = parseInt(card.getAttribute('data-product-id'));
                const product = products.find(p => p.id === productId);
                if (product) {
                    // Dispatch custom event with product data
                    const event = new CustomEvent('productSelected', { detail: product });
                    document.dispatchEvent(event);
                }
            });
        });
    }

    attachEventListeners() {
        const buttons = document.querySelectorAll('.btn-light.position-absolute');
        const prevBtn = Array.from(buttons).find(btn => btn.style.left === '-20px');
        const nextBtn = Array.from(buttons).find(btn => btn.style.right === '-20px');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.scroll('prev'));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.scroll('next'));
        }
    }

    scroll(direction) {
        const maxIndex = Math.max(0, this.filteredProducts.length - this.itemsPerView);

        if (direction === 'next') {
            this.currentIndex = Math.min(this.currentIndex + 1, maxIndex);
        } else {
            this.currentIndex = Math.max(this.currentIndex - 1, 0);
        }

        this.updateCarousel();
    }

    updateCarousel() {
        const container = document.querySelector('.row.g-4');
        if (!container) return;

        const scrollAmount = (this.currentIndex * 100) / this.itemsPerView;
        container.style.transform = `translateX(-${scrollAmount}%)`;

        this.updateButtonStates();
    }

    updateButtonStates() {
        const buttons = document.querySelectorAll('.btn-light.position-absolute');
        const prevBtn = Array.from(buttons).find(btn => btn.style.left === '-20px');
        const nextBtn = Array.from(buttons).find(btn => btn.style.right === '-20px');
        const maxIndex = Math.max(0, this.filteredProducts.length - this.itemsPerView);

        if (prevBtn) {
            prevBtn.disabled = this.currentIndex === 0;
            prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        }

        if (nextBtn) {
            nextBtn.disabled = this.currentIndex >= maxIndex;
            nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.5' : '1';
        }
    }

    attachFavoriteButtons() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const icon = this.querySelector('i');
                icon.classList.toggle('bi-heart');
                icon.classList.toggle('bi-heart-fill');
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ProductCarousel();
});