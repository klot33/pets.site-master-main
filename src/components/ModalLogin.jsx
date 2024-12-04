import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'bootstrap'; // Импортируем Modal напрямую
import '../pages/css/my.css';

function ModalLogin() {
  const navigate = useNavigate(); // Хук для программной навигации

  // Функция для обработки отправки формы
  const handleLogin = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Выполните здесь вашу логику проверки данных авторизации (например, API-запрос).
    const isAuthenticated = true; // Пример: предполагаем, что пользователь успешно вошел

    if (isAuthenticated) {
      closeCurrentModal('loginModal'); // Закрываем модальное окно
      navigate('/MyAccount'); // Переход на страницу myAccount
    } else {
      // Можно добавить обработку ошибок авторизации здесь
      console.error('Ошибка авторизации');
    }
  };

  // Функция для закрытия текущего модального окна
  const closeCurrentModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };

  // Функция для открытия модального окна
  const openModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    } else {
      console.error(`Модальное окно с ID ${modalId} не найдено`);
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
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form id="loginForm" onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="loginInput" className="form-label">
                    <i className="bi bi-person" /> Логин
                  </label>
                  <input type="text" className="form-control" id="loginInput" placeholder="Введите логин" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordInput" className="form-label">
                    <i className="bi bi-lock" /> Пароль
                  </label>
                  <input type="password" className="form-control" id="passwordInput" placeholder="Введите пароль" required />
                </div>
                <div className="form-check mb-3">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Запомнить меня</label>
                </div>
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
