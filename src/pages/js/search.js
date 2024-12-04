const ads = [
    {
      id: 18,
      type: "Коза",
      description: "Потерялась коза, последний раз видели в здании Московского вокзала г. Санкт-Петербург. Коза белая, пуховая.",
      chipNumber: "go-011-spb",
      region: "Центральный",
      date: "14-03-2022",
      image: "img/koza.jpg"
    },
    {
      id: 14,
      type: "Кошка",
      description: "Потерялась кошка, пушистая, серая. Любит играть, ласковая.",
      chipNumber: "ca-001-spb",
      region: "Василиостровский",
      date: "24-03-2020",
      image: "img/scale_1200.jfif"
    },
    {
      id: 42,
      type: "Собака",
      description: "Собака рыжая, была утеряна в красногвардейском районе.",
      chipNumber: "do-123-spb",
      region: "Красногвардейский",
      date: "22-07-2023",
      image: "img/dog.jpg"
    }
  ];
 
  function displayAds(filteredAds) {
    const adsContainer = document.getElementById('adsContainer');
    adsContainer.innerHTML = '';
    if (filteredAds.length === 0) {
      adsContainer.innerHTML = '<p>Объявлений не найдено.</p>';
      return;
    }
    filteredAds.forEach(ad => {
      const adElement = document.createElement('div');
      adElement.className = 'ad';
      adElement.innerHTML = `
        <img src="${ad.image}" alt="${ad.type}">
        <p><strong>ID:</strong> ${ad.id}</p>
        <p><strong>Вид животного:</strong> ${ad.type}</p>
        <p><strong>Описание:</strong> ${ad.description}</p>
        <p><strong>Номер чипа:</strong> ${ad.chipNumber}</p>
        <p><strong>Район:</strong> ${ad.region}</p>
        <p><strong>Дата:</strong> ${ad.date}</p>
      `;
      adsContainer.appendChild(adElement);
    });
  }
 
  function searchAds() {
    const region = document.getElementById('regionInput').value.trim();
    const animalType = document.getElementById('animalTypeInput').value.trim().toLowerCase();
    const filteredAds = ads.filter(ad => {
      const matchesRegion = region ? ad.region === region : true;
      const matchesType = animalType ? ad.type.toLowerCase().includes(animalType) : true;
      return matchesRegion && matchesType;
    });
    displayAds(filteredAds);
  }
 
  displayAds(ads);