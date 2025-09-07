// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 15, 0.98)";
  } else {
    navbar.style.background = "rgba(10, 10, 15, 0.95)";
  }
});

// Animate statistics circles on scroll
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCircularProgress();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe stats section
const statsSection = document.querySelector(".stats-grid");
if (statsSection) {
  observer.observe(statsSection);
}

function animateCircularProgress() {
  const circles = document.querySelectorAll(".circle-progress");

  circles.forEach((circle) => {
    const percent = parseInt(circle.getAttribute("data-percent"));
    const degrees = (percent / 100) * 360;

    // Animate the progress
    let currentDegree = 0;
    const interval = setInterval(() => {
      currentDegree += 3;
      if (currentDegree >= degrees) {
        currentDegree = degrees;
        clearInterval(interval);
      }
      circle.style.setProperty("--progress", `${currentDegree}deg`);
    }, 20);
  });
}

// Project filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (
        filterValue === "all" ||
        card.getAttribute("data-category") === filterValue
      ) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.8)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// Contact form handling
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name =
      formData.get("name") ||
      contactForm.querySelector('input[type="text"]').value;
    const email =
      formData.get("email") ||
      contactForm.querySelector('input[type="email"]').value;
    const subject =
      formData.get("subject") ||
      contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message =
      formData.get("message") || contactForm.querySelector("textarea").value;

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Show success message (in real project, you'd send to server)
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
  });
}

// Add floating animation to hero elements
function createFloatingElements() {
  const hero = document.querySelector(".hero");
  const floatingContainer = document.querySelector(".floating-elements");

  // Create additional floating elements
  for (let i = 0; i < 10; i++) {
    const element = document.createElement("div");
    element.className = "floating-dot";
    element.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 212, 255, 0.6);
            border-radius: 50%;
            animation: float ${6 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * -6}s;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;

    if (floatingContainer) {
      floatingContainer.appendChild(element);
    }
  }
}

// Initialize floating elements when page loads
window.addEventListener("load", () => {
  createFloatingElements();
});

// Add scroll-based animations
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-elements");

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Typewriter effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typewriter effect on page load
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
  }
});

// Add intersection observer for scroll animations
const fadeElements = document.querySelectorAll(
  ".service-card, .project-card, .testimonial-card"
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Initialize fade animations
fadeElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(30px)";
  element.style.transition = "all 0.6s ease-out";
  fadeObserver.observe(element);
});

// Add cursor trail effect (optional enhancement)
let mouseX = 0;
let mouseY = 0;
let trailElements = [];

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function createTrail() {
  const trail = document.createElement("div");
  trail.className = "cursor-trail";
  trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: rgba(0, 212, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${mouseX}px;
        top: ${mouseY}px;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease-out;
    `;

  document.body.appendChild(trail);
  trailElements.push(trail);

  setTimeout(() => {
    trail.style.opacity = "0";
    trail.style.transform = "translate(-50%, -50%) scale(0)";
    setTimeout(() => {
      if (trail.parentNode) {
        trail.parentNode.removeChild(trail);
      }
      trailElements = trailElements.filter((el) => el !== trail);
    }, 300);
  }, 100);
}

// Create trail effect every 50ms
setInterval(createTrail, 50);
