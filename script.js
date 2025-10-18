const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});


// Handle contact form submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault(); 
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        alert("✅ Thank you! Your message has been sent successfully.");
        contactForm.reset(); 
      } else {
        alert("❌ Oops! Something went wrong. Please try again later.");
      }
    });
  }
});
