import React, { useState } from 'react';
import { Modal } from 'bootstrap';
import '../pages/css/my.css';

function ModalRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    confirm: 0, 
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const closeCurrentModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();

        modalElement.addEventListener('hidden.bs.modal', () => {
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
          document.body.classList.remove('modal-open');
        });
      }
    }
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    });
  };

  const validateForm = () => {
    const { name, phone, email, password, password_confirmation, confirm } = formData;

    if (!name || !phone || !email || !password || !password_confirmation || confirm === 0) {
      setErrorMessage('Все поля обязательны для заполнения, и необходимо дать согласие на обработку данных.');
      return false;
    }

    if (!/^[А-Яа-яёЁ\s-]+$/.test(name)) {
      setErrorMessage('Имя должно содержать только кириллицу, пробелы или дефисы.');
      return false;
    }

    if (!/^\+?\d+$/.test(phone)) {
      setErrorMessage('Телефон должен содержать только цифры и знак +.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Введите корректный адрес электронной почты.');
      return false;
    }

    if (password.length < 7 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      setErrorMessage('Пароль должен быть не менее 7 символов, содержать строчные, заглавные буквы и цифры.');
      return false;
    }

    if (password !== password_confirmation) {
      setErrorMessage('Пароли не совпадают.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        console.log('Отправляемые данные:', formData);
  
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
  
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(formData),
          redirect: 'follow',
        };
  
        const response = await fetch('https://pets.сделай.site/api/register', requestOptions);
  
        if (!response.ok) {
          const errorData = await response.json();
          
          // Проверка конкретной ошибки на занятый email
          if (response.status === 422 || errorData.errors?.email) {
            setErrorMessage('Такой e-mail уже занят.');
          } else if (errorData.message) {
            setErrorMessage(errorData.message);
          } else {
            setErrorMessage(`Ошибка регистрации: ${response.status}`);
          }
          return;
        }
  
        setSuccessMessage('Регистрация прошла успешно!');
        setErrorMessage('');
        setFormData({
          name: '',
          phone: '',
          email: '',
          password: '',
          password_confirmation: '',
          confirm: 0,
        });
        closeCurrentModal('registrationModal');
      } catch (error) {
        console.error('Ошибка при обработке:', error.message);
        setErrorMessage('Произошла ошибка: ' + error.message);
      }
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
                  <label htmlFor="name" className="form-label">Имя</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Введите имя"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Телефон</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Введите телефон"
                    value={formData.phone}
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
                  <label htmlFor="password_confirmation" className="form-label">Подтвердите пароль</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    placeholder="Повторите пароль"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="confirm"
                    checked={formData.confirm === 1}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="confirm">
                    Я даю согласие на обработку персональных данных
                  </label>
                </div>
                {errorMessage && <p className="error text-danger">{errorMessage}</p>}
                {successMessage && <p className="success text-success">{successMessage}</p>}
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
