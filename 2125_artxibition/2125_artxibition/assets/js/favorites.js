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
      title: "Fenerbahçe Beko vs Anadolu Efes",
      desc: "Ülker Sports Arena, İstanbul",
      capacity: 250,
      audience: 500,
    },
    {
      id: "2",
      title: "Beşiktaş Fibabanka vs Galatasaray NEF",
      desc: "Akatlar Spor Kompleksi, İstanbul",
      capacity: 450,
      audience: 650,
    },
    {
      id: "3",
      title: "Eczacıbaşı Dynavit vs VakıfBank",
      desc: "Burhan Felek Vestel Voleybol Salonu",
      capacity: 250,
      audience: 500,
    },
    {
      id: "4",
      title: "Pınar Karşıyaka vs Darüşşafaka",
      desc: "Karşıyaka Spor Salonu, İzmir",
      capacity: 350,
      audience: 420,
    },
    {
      id: "5",
      title: "Ankara DSİ vs İstanbul BŞB",
      desc: "Ankara Spor Kompleksi, Ankara",
      capacity: 280,
      audience: 320,
    },
    {
      id: "6",
      title: "TED Ankara Kolejliler vs Gaziantep Basketbol",
      desc: "TED Koleji Spor Salonu, Ankara",
      capacity: 220,
      audience: 260,
    },
    {
      id: "7",
      title: "Galatasaray A.Ş vs Trabzonspor",
      desc: "RAMS Park, İstanbul",
      capacity: 52000,
      audience: 49000,
    },
    {
      id: "8",
      title: "Fenerbahçe vs Adana Demirspor",
      desc: "Şükrü Saracoğlu Stadyumu, İstanbul",
      capacity: 47000,
      audience: 43000,
    },
    {
      id: "9",
      title: "Ziraat Bankkart vs Halkbank",
      desc: "Başkent Voleybol Salonu, Ankara",
      capacity: 1800,
      audience: 1600,
    },
    {
      id: "10",
      title: "İpek Soylu vs Zeynep Sönmez",
      desc: "TED Spor Kulübü, İstanbul",
      capacity: 500,
      audience: 450,
    },
    {
      id: "11",
      title: "Türkiye vs İtalya (Kadın Voleybol)",
      desc: "Ankara Spor Salonu",
      capacity: 10000,
      audience: 9500,
    },
    {
      id: "12",
      title: "Efes Pilsen vs Pınar Karşıyaka",
      desc: "Sinan Erdem Spor Salonu, İstanbul",
      capacity: 16000,
      audience: 15500,
    },
    {
      id: "13",
      title: "Galatasaray vs Fenerbahçe",
      desc: "Ali Sami Yen Spor Kompleksi, İstanbul",
      capacity: 52000,
      audience: 51500,
    },
    {
      id: "14",
      title: "Türkiye vs Sırbistan (Basketbol)",
      desc: "Ülker Spor ve Etkinlik Salonu, İstanbul",
      capacity: 13000,
      audience: 12750,
    },
    {
      id: "15",
      title: "Beşiktaş vs Trabzonspor",
      desc: "Vodafone Park, İstanbul",
      capacity: 42000,
      audience: 40000,
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
            <a href="event-details-after-logged-in.html" class="purchase-link" data-id="${event.id}">Purchase Tickets</a>
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
      window.location.href = "event-details-after-logged-in.html";
    }
  });
});
