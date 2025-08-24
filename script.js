// Three.js 3D Background
function init3DBackground() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  document.querySelector(".hero-bg").appendChild(renderer.domElement);

  // Create floating particles
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const particles = [];

  for (let i = 0; i < 50; i++) {
    const material = new THREE.MeshBasicMaterial({
      color: Math.random() > 0.5 ? 0x667eea : 0x764ba2,
      transparent: true,
      opacity: 0.6,
    });

    const particle = new THREE.Mesh(geometry, material);
    particle.position.x = (Math.random() - 0.5) * 50;
    particle.position.y = (Math.random() - 0.5) * 50;
    particle.position.z = (Math.random() - 0.5) * 50;

    particle.rotation.x = Math.random() * Math.PI;
    particle.rotation.y = Math.random() * Math.PI;

    particle.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
    };

    scene.add(particle);
    particles.push(particle);
  }

  camera.position.z = 30;

  function animate() {
    requestAnimationFrame(animate);

    particles.forEach((particle) => {
      particle.rotation.x += 0.01;
      particle.rotation.y += 0.01;

      particle.position.add(particle.userData.velocity);

      // Boundary check
      if (Math.abs(particle.position.x) > 25)
        particle.userData.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 25)
        particle.userData.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 25)
        particle.userData.velocity.z *= -1;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Handle resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Mobile Navigation
function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Intersection Observer for animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right"
  );
  animatedElements.forEach((el) => observer.observe(el));
}

// GSAP Hero Animations
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.5 });

  tl.to(".hero h1", {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power2.out",
  })
    .to(
      ".hero .subtitle",
      {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .to(
      ".hero .description",
      {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .to(
      ".cta-button",
      {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: "power2.out",
      },
      "-=0.3"
    );
}

// Contact form handling
function initContactForm() {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Simulate form submission
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert(`Thank you, ${name}! Your message has been sent successfully.`);
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Parallax effect for hero section
function initParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero-content");

    if (hero && heroContent) {
      const rate = scrolled * -0.5;
      heroContent.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Add hover effects to skill cards
function initSkillCardEffects() {
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        duration: 0.3,
        scale: 1.05,
        rotationY: 5,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        duration: 0.3,
        scale: 1,
        rotationY: 0,
        ease: "power2.out",
      });
    });
  });
}

// Add stagger animations to project cards
function initProjectAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".project-card",
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#projects",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

// Performance optimization - debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize all functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize 3D background with performance check
  if (
    window.innerWidth > 768 &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    init3DBackground();
  }

  initMobileNav();
  initNavbarScroll();
  initSmoothScroll();
  initScrollAnimations();
  initHeroAnimations();
  initContactForm();
  initLazyLoading();

  // Add performance-optimized parallax
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const debouncedParallax = debounce(initParallaxEffect, 10);
    debouncedParallax();
  }

  // Initialize GSAP effects if available
  if (typeof gsap !== "undefined") {
    initSkillCardEffects();

    // Check if ScrollTrigger is available
    if (gsap.plugins.ScrollTrigger) {
      initProjectAnimations();
    }
  }
});

// Add loading screen
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Optional: Add a loading screen fade out effect
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 500);
  }
});

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (mobileMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  }
});

// Add focus management for accessibility
const focusableElements =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
  const focusables = element.querySelectorAll(focusableElements);
  const firstFocusable = focusables[0];
  const lastFocusable = focusables[focusables.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// Apply focus trap to mobile menu
const mobileMenu = document.querySelector(".mobile-menu");
if (mobileMenu) {
  trapFocus(mobileMenu);
}

const track = document.getElementById("carouselTrack");
const slides = Array.from(track.children);
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let slideWidth = slides[0].getBoundingClientRect().width + 32; // card width + margin

// Clone first and last slide for infinite effect
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const allSlides = Array.from(track.children);
let currentIndex = 1; // Start at first real slide

// Initial position
track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

function moveToSlide() {
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

nextBtn.addEventListener("click", () => {
  if (currentIndex >= allSlides.length - 1) return;
  currentIndex++;
  moveToSlide();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  moveToSlide();
});

// Reset when at clone
track.addEventListener("transitionend", () => {
  const currentSlide = allSlides[currentIndex];
  if (currentSlide.id === "first-clone") {
    track.style.transition = "none";
    currentIndex = 1;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }
  if (currentSlide.id === "last-clone") {
    track.style.transition = "none";
    currentIndex = allSlides.length - 2;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }
});

// Handle resizing
window.addEventListener("resize", () => {
  slideWidth = slides[0].getBoundingClientRect().width + 32;
  track.style.transition = "none";
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
});
