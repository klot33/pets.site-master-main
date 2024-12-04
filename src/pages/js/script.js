// Функция для отправки формы
function submitForm() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMessage = document.getElementById('errorMessage');

  // Очистка предыдущих ошибок
  errorMessage.textContent = '';

  // Проверка заполненности полей
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    errorMessage.textContent = 'Все поля должны быть заполнены.';
    return;
  }

  // Проверка совпадения паролей
  if (password !== confirmPassword) {
    errorMessage.textContent = 'Пароли не совпадают.';
    return;
  }

  // Успешная регистрация
  alert(`Регистрация успешна!\nИмя: ${firstName}\nФамилия: ${lastName}\nEmail: ${email}`);
  // Закрытие модального окна после успешной регистрации
  const registrationModal = new bootstrap.Modal(document.getElementById('registrationModal'));
  registrationModal.hide();
}
function sendLoginRecovery() {
  const email = document.getElementById('forgotEmail').value;
  const recoveryMessage = document.getElementById('recoveryMessage');

  if (email) {
    // Имитируем успешное отправление письма
    recoveryMessage.innerText = `Инструкции по восстановлению логина отправлены на ${email}.`;
    recoveryMessage.style.display = 'block';
    setTimeout(() => {
      recoveryMessage.style.display = 'none';
      document.getElementById('forgotLoginForm').reset();
    }, 5000); // Скрытие сообщения через 5 секунд
  }
}

function sendPasswordRecovery() {
  const email = document.getElementById('forgotPasswordEmail').value;
  const recoveryMessage = document.getElementById('passwordRecoveryMessage');

  if (email) {
    // Имитируем успешное отправление письма для восстановления пароля
    recoveryMessage.innerText = `Инструкции по восстановлению пароля отправлены на ${email}.`;
    recoveryMessage.style.display = 'block';

    setTimeout(() => {
      recoveryMessage.style.display = 'none';
      document.getElementById('forgotPasswordForm').reset();
    }, 5000); // Скрытие сообщения через 5 секунд
  }
}

document.getElementById('addPetForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const animalType = document.getElementById('animalType').value.trim();
  const animalDescription = document.getElementById('animalDescription').value.trim();
  const chipNumber = document.getElementById('chipNumber').value.trim();
  const area = document.getElementById('area').value.trim();
  const date = document.getElementById('date').value;

  if (!animalType || !animalDescription || !area || !date) {
    alert('Пожалуйста, заполните все обязательные поля.');
    return;
  }

  // Имитируем успешное добавление объявления
  alert(`Объявление добавлено:\nВид: ${animalType}\nОписание: ${animalDescription}\nРайон: ${area}\nДата: ${date}`);

  document.getElementById('successMessage').style.display = 'block';
  setTimeout(() => {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('addPetForm').reset();
  }, 5000); // Убираем сообщение через 5 секунд
});

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

function submitForms() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMessage = document.getElementById('errorMessage');

  // Очистка предыдущих ошибок
  errorMessage.textContent = '';

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    errorMessage.textContent = 'Все поля должны быть заполнены.';
    return;
  }

  if (password !== confirmPassword) {
    errorMessage.textContent = 'Пароли не совпадают.';
    return;
  }

  // Если все проверки пройдены, можно отправить данные (например, через AJAX)
  alert(`Регистрация успешна!\nИмя: ${firstName}\nФамилия: ${lastName}\nEmail: ${email}`);
  // Здесь можно добавить отправку формы на сервер
}

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем отправку формы

    // Получаем значения полей формы
    const login = document.getElementById('loginInput').value;
    const password = document.getElementById('passwordInput').value;

    // Простая проверка (можно заменить на проверку с сервером)
    if (login === 'admin' && password === '1234') {
      // Перенаправляем на страницу личного кабинета
      window.location.href = 'cabinet.html';
    } else {
      alert('Неверный логин или пароль. Попробуйте снова.');
    }
  });
});


function login(event) {
  event.preventDefault();
  window.location.href = "cabinet.html";
}
