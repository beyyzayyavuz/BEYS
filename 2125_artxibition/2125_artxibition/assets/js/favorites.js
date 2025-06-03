// favorites.js

document.addEventListener("DOMContentLoaded", () => {
  const favoritesContainer = document.getElementById("favorites-container");
  let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  const events = [
    {
      id: "1",
      title: "Radio City Musical Hall",
      desc: "Amazing show...",
      capacity: 250,
      audience: 500,
    },
    {
      id: "2",
      title: "Madison Square Garden",
      desc: "Live in NY...",
      capacity: 450,
      audience: 650,
    },
    {
      id: "3",
      title: "Radio City Musical Hall",
      desc: "Amazing show...",
      capacity: 250,
      audience: 500,
    },
    {
      id: "4",
      title: "Madison Square Garden",
      desc: "Live in NY...",
      capacity: 450,
      audience: 650,
    },
    {
      id: "5",
      title: "Sunset Beach Party",
      desc: "Beach vibes...",
      capacity: 300,
      audience: 400,
    },
    {
      id: "6",
      title: "Midnight Jazz",
      desc: "Smooth jazz night...",
      capacity: 150,
      audience: 350,
    },
    {
      id: "7",
      title: "VIP Jazz Night",
      desc: "Exclusive show for members only.",
      capacity: 100,
      audience: 120,
    },
    {
      id: "8",
      title: "Classical Vibes",
      desc: "Timeless classics for you.",
      capacity: 150,
      audience: 200,
    },
    {
      id: "9",
      title: "Underground Beats",
      desc: "Feel the rhythm of the night.",
      capacity: 200,
      audience: 180,
    },
  ];

  favoritesContainer.innerHTML = ""; // Temizle

  favorites.forEach((favId, index) => {
    const event = events.find((e) => e.id === favId);
    if (event) {
      const itemHTML = `
        <div class="fav-item" data-index="${index}">
          <h4>${event.title}</h4>
          <p>${event.desc}</p>
          <p>Capacity: ${event.capacity}</p>
          <p>Audience: ${event.audience}</p>
          <div class="fav-buttons">
            <button class="remove-fav-btn">Remove from Favorites</button>
            <a href="event-details.html" class="purchase-link" data-id="${event.id}">Purchase Tickets</a>
          </div>
          <hr>
        </div>
      `;
      favoritesContainer.insertAdjacentHTML("beforeend", itemHTML);
    }
  });

  // Remove butonları
  favoritesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-fav-btn")) {
      const index = parseInt(
        e.target.closest(".fav-item").getAttribute("data-index")
      );
      favorites.splice(index, 1);
      sessionStorage.setItem("favorites", JSON.stringify(favorites));
      location.reload();
    }
  });

  // Purchase Link - Event ID'yi sessionStorage'a kaydet
  favoritesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("purchase-link")) {
      e.preventDefault();
      const eventId = e.target.getAttribute("data-id");
      sessionStorage.setItem("selectedEventId", eventId);
      window.location.href = "event-details.html";
    }
  });
});
