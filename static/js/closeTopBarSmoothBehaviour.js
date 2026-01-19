// Close Top Bar with Smooth Behavior
document.addEventListener("DOMContentLoaded", function () {
  const topBar = document.getElementById("topBar");
  const closeBtn = document.getElementById("closeTopBar");
  const navbar = document.querySelector(".navbar");
  
  // Check if top bar was previously closed
  const topBarClosed = localStorage.getItem("topBarClosed") === "true";
  
  if (topBarClosed && topBar) {
    topBar.classList.add("hidden");
    if (navbar) {
      navbar.classList.add("topbar-hidden");
      navbar.style.top = "0";
    }
  }

  // Close button functionality
  if (closeBtn && topBar) {
    closeBtn.addEventListener("click", function () {
      topBar.classList.add("hidden");
      
      // Adjust navbar position
      if (navbar) {
        navbar.classList.add("topbar-hidden");
        navbar.style.top = "0";
      }
      
      // Remember user preference
      localStorage.setItem("topBarClosed", "true");
    });
  }

  // Navbar scroll behavior
  let lastScrollTop = 0;
  let scrollThreshold = 100;
  
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow when scrolled
    if (scrollTop > 50 && navbar) {
      navbar.classList.add("navbar-scrolled");
    } else if (navbar) {
      navbar.classList.remove("navbar-scrolled");
    }
    
    lastScrollTop = scrollTop;
  });

  // Pause marquee on focus for accessibility
  const marqueeContent = document.getElementById("marqueeContent");
  if (marqueeContent) {
    marqueeContent.addEventListener("focus", function () {
      this.style.animationPlayState = "paused";
    }, true);

    marqueeContent.addEventListener("blur", function () {
      this.style.animationPlayState = "running";
    }, true);
  }

  // Reset top bar visibility on page reload if needed
  // Uncomment the line below if you want the top bar to show again on page reload
  // localStorage.removeItem("topBarClosed");
});
