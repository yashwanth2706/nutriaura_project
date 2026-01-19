// Product Interactions - Wishlist and Cart Functionality
document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------------
     Cart Management
  ---------------------------------- */
  
  let cart = JSON.parse(localStorage.getItem("nutriaura_cart")) || [];
  let wishlist = JSON.parse(localStorage.getItem("nutriaura_wishlist")) || [];

  // Update cart badge
  function updateCartBadge() {
    const cartBadge = document.querySelector(".cart-badge");
    if (cartBadge) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = totalItems;
      cartBadge.setAttribute("aria-label", `${totalItems} items in cart`);
      
      // Pulse animation on update
      cartBadge.style.animation = "none";
      setTimeout(() => {
        cartBadge.style.animation = "pulse 2s infinite";
      }, 10);
    }
  }

  // Update wishlist badge
  function updateWishlistBadge() {
    const wishlistIcon = document.getElementById("nav-wishlist");
    if (wishlistIcon) {
      let badge = wishlistIcon.querySelector(".wishlist-badge");
      
      if (wishlist.length > 0) {
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "wishlist-badge";
          wishlistIcon.appendChild(badge);
        }
        badge.textContent = wishlist.length;
        badge.classList.remove("visually-hidden");
      } else if (badge) {
        badge.classList.add("visually-hidden");
      }
    }
  }

  /* ---------------------------------
     Add to Cart Functionality
  ---------------------------------- */
  
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  
  addToCartButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      
      const productId = this.dataset.productId;
      const productName = this.dataset.productName;
      const productPrice = parseFloat(this.dataset.productPrice);
      const productCard = this.closest(".product-card");
      const selectElement = productCard.querySelector("select");
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      const size = selectedOption.text;
      
      // Find if product already in cart
      const existingItem = cart.find(item => 
        item.id === productId && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          size: size,
          quantity: 1
        });
      }

      // Save to localStorage
      localStorage.setItem("nutriaura_cart", JSON.stringify(cart));
      
      // Update badge
      updateCartBadge();
      
      // Visual feedback
      const originalHTML = this.innerHTML;
      this.classList.add("added");
      this.innerHTML = '<i class="bi bi-check-circle me-2"></i>ADDED!';
      this.disabled = true;
      
      // Show success toast
      showToast("success", `${productName} added to cart!`);
      
      // Reset button after delay
      setTimeout(() => {
        this.classList.remove("added");
        this.innerHTML = originalHTML;
        this.disabled = false;
      }, 2000);
    });
  });

  /* ---------------------------------
     Wishlist Functionality
  ---------------------------------- */
  
  const wishlistButtons = document.querySelectorAll(".wishlist-btn");
  
  wishlistButtons.forEach(button => {
    const productId = button.dataset.productId;
    
    // Check if already in wishlist
    if (wishlist.includes(productId)) {
      button.classList.add("active");
    }
    
    button.addEventListener("click", function (e) {
      e.preventDefault();
      
      const productCard = this.closest(".product-card");
      const productName = productCard.querySelector(".card-title").textContent;
      
      if (wishlist.includes(productId)) {
        // Remove from wishlist
        wishlist = wishlist.filter(id => id !== productId);
        this.classList.remove("active");
        showToast("info", `${productName} removed from wishlist`);
      } else {
        // Add to wishlist
        wishlist.push(productId);
        this.classList.add("active");
        showToast("success", `${productName} added to wishlist!`);
      }
      
      // Save to localStorage
      localStorage.setItem("nutriaura_wishlist", JSON.stringify(wishlist));
      
      // Update badge
      updateWishlistBadge();
    });
  });

  /* ---------------------------------
     Product Navigation (Previous/Next)
  ---------------------------------- */
  
  const prevBtn = document.getElementById("prevProductBtn");
  const nextBtn = document.getElementById("nextProductBtn");
  const productContainer = document.getElementById("productContainer");
  
  if (prevBtn && nextBtn && productContainer) {
    let scrollPosition = 0;
    const scrollAmount = 300;
    
    nextBtn.addEventListener("click", function () {
      scrollPosition += scrollAmount;
      productContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    });
    
    prevBtn.addEventListener("click", function () {
      scrollPosition = Math.max(0, scrollPosition - scrollAmount);
      productContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    });
  }

  /* ---------------------------------
     Toast Notification System
  ---------------------------------- */
  
  function showToast(type, message) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll(".custom-toast");
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement("div");
    toast.className = `custom-toast toast-${type}`;
    
    const icon = type === "success" ? "check-circle-fill" : "info-circle-fill";
    const bgColor = type === "success" ? "#28a745" : "#17a2b8";
    
    toast.innerHTML = `
      <i class="bi bi-${icon} me-2"></i>
      <span>${message}</span>
    `;
    
    toast.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      display: flex;
      align-items: center;
      font-weight: 600;
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Add toast animations
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
    
    .custom-toast {
      transition: all 0.3s ease;
    }
    
    .custom-toast:hover {
      transform: scale(1.05);
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  /* ---------------------------------
     Initialize on Page Load
  ---------------------------------- */
  
  updateCartBadge();
  updateWishlistBadge();

  // Log current cart and wishlist (for debugging)
  console.log("Current cart:", cart);
  console.log("Current wishlist:", wishlist);

  /* ---------------------------------
     Clear Cart/Wishlist (Development Helper)
  ---------------------------------- */
  
  // Uncomment these lines to clear data during development
  // localStorage.removeItem("nutriaura_cart");
  // localStorage.removeItem("nutriaura_wishlist");
});
