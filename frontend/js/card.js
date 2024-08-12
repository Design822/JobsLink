document.addEventListener("DOMContentLoaded", function () {
    const scrollWrapper = document.getElementById('manpower-cards');
    const cards = Array.from(scrollWrapper.children);
    const totalCards = cards.length;

    // Clone the cards to create an infinite scroll effect
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        scrollWrapper.appendChild(clone);
    });
});