import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../pages/css/cabinet.css';
import AnimalCardAccount from "./AnimalCardAccount";

function Account() {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/");
    } else {
      loadUserData();
    }
  }, []);

  function loadUserData() {
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    });

    fetch('https://pets.сделай.site/api/users', { method: 'GET', headers: myHeaders })
      .then(response => {
        if (!response.ok) {
          throw new Error("Ошибка доступа");
        }
        return response.json();
      })
      .then(result => {
        setUserData({
          ...result,
          daysSinceRegistration: calculateDaysSinceRegistration(result.registrationDate)
        });
      })
      .catch(error => {
        setErrorMessage(error.message);
        navigate("/");
      });
  }

  function calculateDaysSinceRegistration(date) {
    const registrationDate = new Date(date);
    const today = new Date();
    return Math.floor((today - registrationDate) / (1000 * 60 * 60 * 24));
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function updateUserData(field, value) {
    if (!value) {
      setErrorMessage("Поле не может быть пустым");
      return;
    }

    const endpoint = field === 'phone' ? 'phone' : 'email';
    const body = field === 'phone' ? { phone: value } : { email: value };

    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    });

    fetch(`https://pets.сделай.site/api/users/${endpoint}`, {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.error?.message || "Ошибка обновления данных");
          });
        }
        return response.json();
      })
      .then(() => {
        setSuccessMessage("Данные успешно обновлены");
        loadUserData();
      })
      .catch(error => setErrorMessage(error.message));
  }

  if (!userData) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <h1 className="mb-4">
        Добро пожаловать, <span id="userName">{userData.name}</span>!
      </h1>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5>
                <i className="bi bi-person-circle" /> Личная информация
              </h5>
            </div>
            <div className="card-body">
              <p><strong>Имя:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Телефон:</strong> {userData.phone}</p>
              <p><strong>Дата регистрации:</strong> {userData.registrationDate}</p>
              <p><strong>Количество объявлений:</strong> {userData.countOrder}</p>
              <p><strong>Количество найденных питомцев:</strong> {userData.countPets}</p>
              <p><strong>Дней на сайте: </strong>{userData.daysSinceRegistration}</p>

              <button
                onClick={() => {
                  const newPhone = prompt('Введите новый номер телефона');
                  if (newPhone) updateUserData('phone', newPhone);
                }}
                className="btn btn-primary mt-3">Изменить телефон</button>

              <button
                onClick={() => {
                  const newEmail = prompt('Введите новый email');
                  if (newEmail) updateUserData('email', newEmail);
                }}
                className="btn btn-secondary mt-3">Изменить Email</button>
            </div>
          </div>
        </div>

        {/* Настройки */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5><i className="bi bi-gear"></i> Настройки аккаунта</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="emailNotification" className="form-label">Уведомления по электронной почте</label>
                  <select id="emailNotification" className="form-select">
                    <option selected>Включены</option>
                    <option>Отключены</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="changePassword" className="form-label">Изменить пароль</label>
                  <input type="password" className="form-control" id="changePassword" placeholder="Введите новый пароль" />
                </div>
                <button type="submit" className="btn btn-primary">Сохранить изменения</button>
              </form>
            </div>
          </div>
        </div>
      </div>


      <div className="row">
        {/* Уведомления */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5><i className="bi bi-bell"></i> Уведомления</h5>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">Ваш профиль успешно обновлен.</li>
                <li className="list-group-item">Срок действия подписки истекает через 3 дня.</li>
                <li className="list-group-item">Новое сообщение от службы поддержки.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Контакты поддержки */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5><i className="bi bi-envelope"></i> Контакты поддержки</h5>
            </div>
            <div className="card-body">
              <p><strong>Email:</strong> support@example.com</p>
              <p><strong>Телефон:</strong> +7 (800) 555-35-35</p>
              <p><strong>Часы работы:</strong> Пн-Пт, 9:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>

    <div>
  {/* Карточки товаров животных */}
  <h2 className="mt-5 text-center">Потерянные питомцы</h2>
</div>

<div>
  <AnimalCardAccount/>
</div>

      <button onClick={handleLogout} className="btn btn-danger">Выйти</button>
    </div>
  );
}

export default Account;
