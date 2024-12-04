// Получаем ссылки на элементы
const autoRegisterCheckbox = document.getElementById('autoRegister');
const passwordSection = document.querySelector('.password-section');
const addPetForm = document.getElementById('addPetForm');
const successMessage = document.getElementById('successMessage');

// Показать или скрыть блок с паролем при изменении состояния чекбокса
autoRegisterCheckbox.addEventListener('change', function () {
  if (this.checked) {
    passwordSection.style.display = 'block';
  } else {
    passwordSection.style.display = 'none';
  }
});

// Обработка отправки формы
addPetForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Останавливаем стандартное поведение отправки формы

  // Проверяем, выбран ли чекбокс для автоматической регистрации
  if (autoRegisterCheckbox.checked) {
    // Проверяем корректность пароля
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!validatePassword(password)) {
      alert('Пароль должен содержать не менее 7 символов, одну цифру, одну строчную и одну заглавную букву.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
  }

  // Показываем сообщение об успешной отправке формы
  successMessage.style.display = 'block';
  addPetForm.reset(); // Сбрасываем форму
  passwordSection.style.display = 'none'; // Скрываем блок паролей
});

// Функция для проверки корректности пароля
function validatePassword(password) {
  // Проверяем, содержит ли пароль хотя бы одну цифру, одну строчную и одну заглавную букву, и не менее 7 символов
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
  return passwordRegex.test(password);
}