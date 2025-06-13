// Sayfa tamamen yüklendikten sonra çalışacak işlemleri başlatır
document.addEventListener("DOMContentLoaded", () => {
  // Favoriler bölümünün yerleştirileceği HTML alanını seçiyoruz
  const favoritesContainer = document.getElementById("favorites-container");
  // Kullanıcının favori etkinliklerini sessionStorage'tan alıyoruz
  let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  // Eğer hiç favori yoksa kullanıcıya bilgi verilir ve işlem sonlandırılır
  if (favorites.length === 0) {
    // Sayfaya yeni içerik eklemeden önce favoriler kutusunu temizleriz
    favoritesContainer.innerHTML = "<p>No favorites yet.</p>";
    return;
  }
  // Tüm etkinliklerin bilgileri burada tutulur (title, date, desc)
  const events = [
    {
      id: "1",
      title: "Fenerbahçe Beko vs Anadolu Efes",
      desc: "Ülker Sports Arena, İstanbul",
      date: "Thursday 18:00 - 22:00",
    },
    {
      id: "2",
      title: "Beşiktaş Fibabanka vs Galatasaray NEF",
      desc: "Akatlar Spor Kompleksi, İstanbul",
      date: "Friday 19:00 - 21:30",
    },
    {
      id: "3",
      title: "Eczacıbaşı Dynavit vs VakıfBank",
      desc: "Burhan Felek Vestel Voleybol Salonu",
      date: "Saturday 17:00 - 19:00",
    },
    {
      id: "4",
      title: "Pınar Karşıyaka vs Darüşşafaka",
      desc: "Karşıyaka Spor Salonu, İzmir",
      date: "Sunday 16:00 - 18:00",
    },
    {
      id: "5",
      title: "Ankara DSİ vs İstanbul BŞB",
      desc: "Ankara Spor Kompleksi, Ankara",
      date: "Monday 20:00 - 22:00",
    },
    {
      id: "6",
      title: "TED Ankara Kolejliler vs Gaziantep Basketbol",
      desc: "TED Koleji Spor Salonu, Ankara",
      date: "Wednesday 18:00 - 20:00",
    },
    {
      id: "7",
      title: "Galatasaray A.Ş vs Trabzonspor",
      desc: "RAMS Park, İstanbul",
      date: "Sunday 21:00 - 23:00",
    },
    {
      id: "8",
      title: "Fenerbahçe vs Adana Demirspor",
      desc: "Şükrü Saracoğlu Stadyumu, İstanbul",
      date: "Saturday 20:00 - 22:30",
    },
    {
      id: "9",
      title: "Ziraat Bankkart vs Halkbank",
      desc: "Başkent Voleybol Salonu, Ankara",
      date: "Friday 17:30 - 19:30",
    },
    {
      id: "10",
      title: "İpek Soylu vs Zeynep Sönmez",
      desc: "TED Spor Kulübü, İstanbul",
      date: "Tuesday 15:00 - 17:00",
    },
    {
      id: "11",
      title: "Türkiye vs İtalya (Kadın Voleybol)",
      desc: "Ankara Spor Salonu",
      date: "Thursday 19:00 - 21:00",
    },
    {
      id: "12",
      title: "Efes Pilsen vs Pınar Karşıyaka",
      desc: "Sinan Erdem Spor Salonu, İstanbul",
      date: "Monday 18:00 - 20:30",
    },
    {
      id: "13",
      title: "Galatasaray vs Fenerbahçe",
      desc: "Ali Sami Yen Spor Kompleksi, İstanbul",
      date: "Sunday 21:45 - 00:00",
    },
    {
      id: "14",
      title: "Türkiye vs Sırbistan (Basketbol)",
      desc: "Ülker Spor ve Etkinlik Salonu, İstanbul",
      date: "Saturday 20:30 - 23:00",
    },
    {
      id: "15",
      title: "Beşiktaş vs Trabzonspor",
      desc: "Vodafone Park, İstanbul",
      date: "Friday 21:00 - 23:15",
    },
  ];

  favoritesContainer.innerHTML = ""; // Temizle
  // Her favori ID'si için ilgili etkinliği bulup kart oluşturmaya başlıyoruz
  favorites.forEach((favId, index) => {
    const event = events.find((e) => e.id === favId);
    // Etkinlik bulunduysa HTML kartı hazırlanır ve sayfaya eklenir
    if (event) {
      const itemHTML = `
        <div class="fav-item" data-index="${index}">
          <h4>${event.title}</h4>
          <p><i class="fa fa-map-marker"></i> ${event.desc}</p>
          <p><i class="fa fa-calendar"></i> ${event.date}</p>
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

  // Kullanıcı bir favoriyi silmek istediğinde çalışacak olay
  // Remove button işlemi
  favoritesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-fav-btn")) {
      // Kart üzerindeki index numarasına göre favoriden silinir
      const index = parseInt(
        e.target.closest(".fav-item").getAttribute("data-index")
      );
      // Favoriler listesinden ilgili ID çıkarılır ve sessionStorage güncellenir
      favorites.splice(index, 1);
      sessionStorage.setItem("favorites", JSON.stringify(favorites));
      // Sayfa yenilenir, değişiklik yansıtılır
      location.reload();
    }
  });

  // Purchase Tickets (Bilet Satın Al) butonuna basıldığında yapılacak işlemler
  favoritesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("purchase-link")) {
      e.preventDefault(); // Linkin varsayılan davranışı engellenir
      // Seçilen etkinliğin ID’si sessionStorage’a kaydedilir
      const eventId = e.target.getAttribute("data-id");
      sessionStorage.setItem("selectedEventId", eventId);
      // Kullanıcı detay sayfasına yönlendirilir işlem bitti artık
      window.location.href = "event-details-after-logged-in.html";
    }
  });
});
