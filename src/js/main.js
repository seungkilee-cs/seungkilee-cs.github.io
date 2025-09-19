class PortfolioApp {
  constructor() {
    this.currentScreen = "landing";
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupClickableZones();
  }

  setupEventListeners() {
    // Get Started button
    const getStartedBtn = document.querySelector(".get-started-btn");
    if (getStartedBtn) {
      getStartedBtn.addEventListener("click", () => {
        this.showBookshelf();
      });
    }
  }

  setupClickableZones() {
    // Bookshelf clickable zone
    const bookshelfZone = document.querySelector('[data-target="bookshelf"]');
    if (bookshelfZone) {
      bookshelfZone.addEventListener("click", () => {
        this.showBookshelf();
      });

      // Add visual feedback
      bookshelfZone.addEventListener("mouseenter", () => {
        bookshelfZone.style.transform = "scale(1.1)";
      });

      bookshelfZone.addEventListener("mouseleave", () => {
        bookshelfZone.style.transform = "scale(1.05)";
      });
    }
  }

  showBookshelf() {
    console.log("Transitioning to bookshelf...");

    const landingScreen = document.getElementById("landing-screen");
    const bookshelfScreen = document.getElementById("bookshelf-screen");

    // Fade out landing
    landingScreen.classList.remove("active");

    // After transition, show bookshelf
    setTimeout(() => {
      bookshelfScreen.classList.add("active");
      this.currentScreen = "bookshelf";
      this.initializeBookshelf();
    }, 800);
  }

  initializeBookshelf() {
    // Initialize the perspective bookshelf
    // We'll implement this in the next step
    console.log("Initializing perspective bookshelf...");
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
});
