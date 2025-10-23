
document.addEventListener("DOMContentLoaded", () => {
  /* NAV TOGGLE */
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  }

  /* TOAST helper */
  function showToast(message, type = "success", duration = 3500) {
  
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("hide");
      
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /* CONTACT FORM */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const res = await fetch(contactForm.action, {
          method: contactForm.method || "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          showToast("✅ Message sent. Thank you!", "success");
          contactForm.reset(); 
        } else {
          let errText = "❌ Something went wrong. Please try again.";
          try {
            const json = await res.json();
            if (json && json.error) errText = `❌ ${json.error}`;
          } catch (_) {}
          showToast(errText, "error");
        }
      } catch (err) {
        console.error("Form submit error:", err);
        showToast("❌ Network error. Check your connection and try again.", "error");
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});
