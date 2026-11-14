

// ========================================
// TAVOLA — RESTAURANT WEBSITE
// ========================================


// FOOTER YEAR

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}


// MENU CATEGORY FILTERS

const filterButtons = document.querySelectorAll(".filter");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    filterButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    menuCards.forEach(card => {
      const matches =
        category === "all" ||
        card.dataset.category === category;

      card.classList.toggle("hidden", !matches);
    });
  });
});


// RESERVATION DATE — PREVENT PAST DATES

const bookingDate = document.getElementById("bookingDate");

if (bookingDate) {
  const today = new Date();

  const localDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  bookingDate.min = localDate;
}


// RESERVATION FORM — FRONT-END DEMO

const reservationForm =
  document.getElementById("reservationForm");

const formMessage =
  document.getElementById("formMessage");

if (reservationForm && formMessage) {
  reservationForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!reservationForm.reportValidity()) {
      return;
    }

    const formData = new FormData(reservationForm);

    const guestName = formData.get("name");

    formMessage.textContent =
      `Thank you, ${guestName}! Your demo reservation request is ready.`;

    reservationForm.reset();

    if (bookingDate) {
      const today = new Date();

      bookingDate.min = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
      ].join("-");
    }
  });
}


// CONSOLE MESSAGE

console.log("TAVOLA website loaded successfully.");
