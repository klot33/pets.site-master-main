import React, { useState } from 'react';
import '../pages/css/add_pet.css';

function AddPets() {
  // Состояния для управления формой
  const [autoRegister, setAutoRegister] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  // Функция для проверки корректности пароля
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
    return passwordRegex.test(password);
  };

  // Обработка изменения состояния чекбокса
  const handleCheckboxChange = () => {
    setAutoRegister(!autoRegister);
  };

  // Обработка отправки формы
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Останавливаем стандартное поведение отправки формы

    if (autoRegister) {
      // Проверяем корректность пароля
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
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000); // Скрываем сообщение через 3 секунды
    event.target.reset(); // Сбрасываем форму
    setAutoRegister(false); // Сбрасываем чекбокс
    setPassword(''); // Очищаем поле пароля
    setConfirmPassword(''); // Очищаем поле подтверждения пароля
  };

  return (
    <main className="container mt-5">
      <h2 className="text-center mb-4">Добавить объявление о животном</h2>
      <form id="addPetForm" onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="animalType" className="form-label">Вид животного</label>
          <input type="text" className="form-control" id="animalType" placeholder="Введите вид животного (например, кошка, собака)" required />
        </div>
        <div className="mb-3">
          <label htmlFor="animalDescription" className="form-label">Описание</label>
          <textarea className="form-control" id="animalDescription" rows={3} placeholder="Введите описание животного" required />
        </div>
        <div className="mb-3">
          <label htmlFor="chipNumber" className="form-label">Номер чипа (если есть)</label>
          <input type="text" className="form-control" id="chipNumber" placeholder="Введите номер чипа" />
        </div>
        <div className="mb-3">
          <label htmlFor="area" className="form-label">Район</label>
          <input type="text" className="form-control" id="area" placeholder="Введите район, где найдено или потеряно животное" required />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Дата</label>
          <input type="date" className="form-control" id="date" required />
        </div>
        <div className="mb-3">
          <label htmlFor="petImage" className="form-label">Изображение животного</label>
          <input type="file" className="form-control" id="petImage" accept="image/*" />
        </div>

        {/* Чекбокс для автоматической регистрации */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="autoRegister"
            checked={autoRegister}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="autoRegister">Зарегистрировать меня автоматически</label>
        </div>

        {/* Блок для паролей, который показывается при выборе автоматической регистрации */}
        {autoRegister && (
          <div className="password-section">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Пароль</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}"
                placeholder="Введите пароль"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Подтверждение пароля</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}"
                placeholder="Повторите пароль"
                required
              />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">Добавить объявление</button>
      </form>

      {/* Сообщение об успешном добавлении */}
      {successMessage && (
        <div id="successMessage" className="alert alert-success mt-4">
          Объявление успешно добавлено!
        </div>
      )}
    </main>
  );
}

export default AddPets;
