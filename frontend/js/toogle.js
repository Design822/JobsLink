document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.querySelector(".toggle-button");
    const navLinks = document.querySelector("nav.nav-links");

    toggleButton.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
});