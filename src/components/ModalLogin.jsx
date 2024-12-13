import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'bootstrap';
import '../pages/css/my.css';

function ModalLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Обновление данных формы
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Закрытие текущего модального окна
  const closeCurrentModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  // Открытие другого модального окна
  const openModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    } else {
      console.error(`Модальное окно с ID ${modalId} не найдено`);
    }
  };

  // Обработка отправки формы
  const handleLogin = async (e) => {
    e.preventDefault();

    // Проверка корректности данных перед отправкой
    if (!formData.email || !formData.password) {
      setErrorMessage('Все поля обязательны для заполнения.');
      return;
    }

    try {
      // Отправка данных на сервер
      const response = await fetch('https://pets.сделай.site/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Успешная авторизация
        const token = result.data.token;
        setSuccessMessage('Успешная авторизация!');
        setErrorMessage('');
        console.log('Токен:', token);
        localStorage.token=token;
        closeCurrentModal('loginModal');
        navigate('/MyAccount'); // Переход на страницу MyAccount
      } else if (response.status === 422) {
        // Ошибка валидации
        const validationErrors = result.error.errors;
        setErrorMessage(
          Object.keys(validationErrors)
            .map((key) => validationErrors[key].join(', '))
            .join('\n')
        );
      } else if (response.status === 401) {
        // Неверный логин или пароль
        setErrorMessage('Неверный email или пароль.');
      } else {
        setErrorMessage('Произошла ошибка. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setErrorMessage('Произошла ошибка. Проверьте подключение к сети.');
    }
  };

  return (
    <div>
      <a type="button" className="nav-link" onClick={() => openModal('loginModal')}>
        Логин
      </a>
      <div className="modal fade" id="loginModal" tabIndex={-1} aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Вход</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть" />
            </div>
            <div className="modal-body">
              <form id="loginForm" onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="bi bi-envelope" /> Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Введите email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <i className="bi bi-lock" /> Пароль
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Введите пароль"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errorMessage && <p className="error text-danger">{errorMessage}</p>}
                {successMessage && <p className="success text-success">{successMessage}</p>}
                <button type="submit" className="btn btn-primary w-100">Войти</button>
              </form>
            </div>
            <div className="modal-footer">
              <a href="#" onClick={(e) => { e.preventDefault(); closeCurrentModal('loginModal'); openModal('registrationModal'); }}>Регистрация</a>
              <a href="#" onClick={(e) => { e.preventDefault(); closeCurrentModal('loginModal'); openModal('forgotLoginModal'); }}>Забыли логин?</a>
              <a href="#" onClick={(e) => { e.preventDefault(); closeCurrentModal('loginModal'); openModal('forgotPasswordModal'); }}>Забыли пароль?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;
