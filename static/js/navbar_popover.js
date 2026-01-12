// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Select all navbar elements that should have popovers
  // Targets: product, categories, and about us nav links, account and cart links, and powered-by badge
  const popoverTargets = document.querySelectorAll(
    '.nav-link[href="#products"], ' +
    '.nav-link[href="#categories"], ' +
    '.nav-link[href="#aboutus"], ' +
    'a[href="#account"], ' +
    'a[href="#cart"], ' +
    '.powered-by'
  );

  // Define navbar items with their IDs and corresponding content keys
  const popoverTargets = [
    { id: "nav-products", key: "products" },
    { id: "nav-categories", key: "categories" },
    { id: "nav-aboutus", key: "aboutus" },
    { id: "nav-account", key: "account" },
    { id: "nav-cart", key: "cart" },
    { id: "nav-poweredby", key: "poweredby" },
  ];

  // Process each popover target
  popoverTargets.forEach((item) => {
    // Get the DOM element by ID
    const el = document.getElementById(item.id);
    if (!el) return;

    // Remove default tooltip attribute if present
    el.removeAttribute("title");

    // Initialize Bootstrap popover with hover trigger and dynamic content
    const popover = new bootstrap.Popover(el, {
      trigger: "hover",
      placement: "bottom",
      html: true,
      content: getPopoverContent(item.key),
    });

    // Hide popover when clicking outside the element
    document.addEventListener("click", function (e) {
      if (!el.contains(e.target)) {
        popover.hide();
      }
    });
  });

  /**
   * Get popover content based on the provided key
   * @param {string} key - The key corresponding to a navbar item
   * @returns {string} HTML content to display in the popover
   */
  function getPopoverContent(key) {
    switch (key) {
      // Products navigation
      case "products":
        return `
          <div>
            Browse our full nutrition range
          </div>
        `;
      
      // Categories navigation
      case "categories":
        return `
          <div>
            Diabetes, Protein, Snacks, Kids
          </div>
        `;
      
      // About Us navigation
      case "aboutus":
        return `
          <div>
            Our mission & health science
          </div>
        `;
      
      // Account navigation
      case "account":
        return `
          <div>
            Login, orders & profile
          </div>
        `;
      
      // Shopping cart navigation
      case "cart":
        return `
          <div>
            View your selected items
          </div>
        `;
      
      // Powered by section
      case "poweredby":
        return `
          <div>
            Precision health & science-backed care<br>
            <small>Click to learn more</small>
          </div>
        `;
      
      default:
        return "";
    }
  }
});
