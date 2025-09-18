// ===== main.js =====

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ JavaScript is connected and working!");

  // ===== Mobile Navigation Toggle =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".navbar ul");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => navMenu.classList.toggle("show"));
  }

  // ===== Smooth Scroll for Nav Links =====
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ===== Scroll-to-Top Button =====
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("show", window.scrollY > 300);
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===== Dark Mode Toggle =====
  const darkToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    if (darkToggle) darkToggle.textContent = "☀️";
  } else {
    body.classList.remove("dark-mode");
    if (darkToggle) darkToggle.textContent = "🌙";
  }

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        darkToggle.textContent = "☀️";
      } else {
        localStorage.setItem("darkMode", "disabled");
        darkToggle.textContent = "🌙";
      }
    });
  }

  // ===== Contact Form Validation & Success Message =====
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;

      // Validate fields
      const fields = ["name", "email", "subject", "message"];
      fields.forEach(id => {
        const input = document.getElementById(id);
        const errorEl = document.getElementById(id + "Error");
        errorEl.textContent = "";
        if (!input.value.trim()) {
          errorEl.textContent = `Please enter your ${id}.`;
          valid = false;
        }
      });

      // Email pattern check
      const email = document.getElementById("email");
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
      if (email.value && !emailPattern.test(email.value.trim())) {
        document.getElementById("emailError").textContent = "Please enter a valid email.";
        valid = false;
      }

      if (!valid) return;

      // Show success message
      if (successMessage) {
        successMessage.style.display = "block";
        successMessage.textContent = "✅ Thanks! Your message is ready to be sent.";
      }

      // Reset form fields after delay to allow mailto
      setTimeout(() => form.submit(), 500);
    });
  }
});

// ===== Contact Form Success Message =====
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Prevent immediate page reload
      e.preventDefault();

      // Show success message
      successMessage.style.display = "block";

      // Reset form fields
      contactForm.reset();

      // Allow mailto: link to still open
      setTimeout(() => {
        contactForm.submit();
      }, 500);
    });
  }
});

