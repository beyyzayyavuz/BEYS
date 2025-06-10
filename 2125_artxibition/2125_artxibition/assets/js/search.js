function attachSearchFilter() {
  const searchInput = document.getElementById("eventSearchInput");
  if (!searchInput) {
    console.warn("Search input not found!");
    return;
  }

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    // Owl Carousel içinde tüm owl-item'ları bul
    const owlItems = document.querySelectorAll(
      "#just-for-you-events .owl-item"
    );

    owlItems.forEach((item) => {
      const titleElement = item.querySelector(".venue-item h4");
      if (!titleElement) return;

      const title = titleElement.textContent.toLowerCase();

      item.style.display = title.includes(searchTerm) ? "block" : "none";
    });
  });
}

function waitForOwlItemsAndStartFilter() {
  const container = document.querySelector("#just-for-you-events .owl-stage");
  if (!container) {
    console.warn("Owl stage not found");
    return;
  }

  const observer = new MutationObserver((mutations, obs) => {
    const owlItems = container.querySelectorAll(".owl-item");
    if (owlItems.length > 0) {
      attachSearchFilter();
      obs.disconnect(); // bir kere çalışsın yeter
    }
  });

  observer.observe(container, { childList: true, subtree: true });
}

document.addEventListener("DOMContentLoaded", () => {
  waitForOwlItemsAndStartFilter();
});
