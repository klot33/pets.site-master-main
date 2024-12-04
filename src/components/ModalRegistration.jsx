import React, { useState } from 'react';
import { Modal } from 'bootstrap';
import '../pages/css/my.css';

function ModalRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Функция для закрытия модального окна
  const closeCurrentModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();

        modalElement.addEventListener('hidden.bs.modal', () => {
          // Удаляем backdrop вручную после закрытия модального окна
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
          // Удаляем класс modal-open с body, чтобы страница снова прокручивалась
          document.body.classList.remove('modal-open');

          // Перезагрузка страницы (если необходимо)
          window.location.reload();
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage('Все поля обязательны для заполнения.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Введите корректный адрес электронной почты.');
      return false;
    }

    if (password.length < 6) {
      setErrorMessage('Пароль должен быть не менее 6 символов.');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Пароли не совпадают.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      closeCurrentModal('registrationModal');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      console.log('Регистрация успешна:', formData);
    }
  };

  return (
    <div>
      <a type="button" className="nav-link" data-bs-toggle="modal" data-bs-target="#registrationModal">
        Регистрация
      </a>
      <div className="modal fade" id="registrationModal" tabIndex={-1} aria-labelledby="registrationModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registrationModalLabel">Регистрация</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть" />
            </div>
            <div className="modal-body">
              <form id="registrationForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">Имя</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Введите имя"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Фамилия</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Введите фамилию"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Электронная почта</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Введите электронную почту"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Пароль</label>
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
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Подтвердите пароль</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Повторите пароль"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <p className="error text-danger" id="errorMessage">
                  {errorMessage}
                </p>
                <button type="submit" className="btn btn-primary w-100">Зарегистрироваться</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalRegistration;
