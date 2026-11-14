
document.addEventListener("DOMContentLoaded", function () {

  // FOOTER YEAR
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");

      menuToggle.textContent = isOpen ? "✕" : "☰";
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
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

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const category = button.dataset.category;

      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      menuCards.forEach(function (card) {
        const matches =
          category === "all" ||
          card.dataset.category === category;

        card.classList.toggle("hidden", !matches);
      });
    });
  });

  // RESERVATION DATE
  const bookingDate = document.getElementById("bookingDate");

  function setMinimumDate() {
    if (!bookingDate) return;

    const today = new Date();

    const localDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");

    bookingDate.min = localDate;
  }

  setMinimumDate();

  // RESERVATION FORM
  const reservationForm =
    document.getElementById("reservationForm");

  const formMessage =
    document.getElementById("formMessage");

  if (reservationForm && formMessage) {
    reservationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!reservationForm.reportValidity()) return;

      const formData = new FormData(reservationForm);
      const guestName = formData.get("name");

      formMessage.textContent =
        `Thank you, ${guestName}! Your demo reservation request is ready.`;

      reservationForm.reset();
      setMinimumDate();
    });
  }

  console.log("TAVOLA website loaded successfully.");

});
