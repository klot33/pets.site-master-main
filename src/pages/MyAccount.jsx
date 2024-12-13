import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/css/cabinet.css';
import '../pages/css/my.css';
import AnimalCard from '../components/AnimalCard';
import axios from 'axios';
import Account from '../components/account';
/*
function Loader({ display }) {
  return (
    <div className="justify-content-center align-items-center" style={display}>
      <div className="fs-1 text-success">...Идет загрузка</div>
    </div>
  );
}*/

function MyAccount() {/*
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/ModalLogin'); // Перенаправление на страницу аутентификации
    } else {
      fetchUserData(token);
      fetchAnimalsData();
    }
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('https://pets.сделай.site/api/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserData(response.data.data.user);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/auth'); // Перенаправление на страницу аутентификации
      } else {
        setError('Ошибка при загрузке данных пользователя.');
      }
    }
  };

  const fetchAnimalsData = async () => {
    try {
      const response = await axios.get('https://pets.сделай.site/api/pets/slider');
      setAnimals(response.data.data.pets || []);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const renderNotification = (message, type = 'info') => (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );

  const calculateRegistrationDays = (registrationDate) => {
    const registration = new Date(registrationDate);
    const current = new Date();
    const diffTime = Math.abs(current - registration);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };*/

 /* return (
    <div>
      <div className="container mt-4">
        {error && renderNotification(error, 'danger')}
        {userData && (
          <>
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
                    <p>
                      <strong>Имя:</strong> {userData.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {userData.email}
                    </p>
                    <p>
                      <strong>Телефон:</strong> {userData.phone}
                    </p>
                    <p>
                      <strong>Дата регистрации:</strong> {userData.registrationDate} ({
                        calculateRegistrationDays(userData.registrationDate)
                      } дней назад)
                    </p>
                    <p>
                      <strong>Количество объявлений:</strong> {userData.ordersCount}
                    </p>
                    <p>
                      <strong>Количество найденных питомцев:</strong> {userData.petsCount}
                    </p>
                    <button className="btn btn-primary mt-3">Редактировать профиль</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5>
                      <i className="bi bi-box-arrow-right" /> Выйти из аккаунта
                    </h5>
                  </div>
                  <div className="card-body">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Выйти
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <h2 className="mt-5 text-center">Потерянные питомцы</h2>
        <Loader display={{ display: loading ? 'flex' : 'none' }} />
        {!loading && animals.length > 0 ? (
          <div className="row mt-3 justify-content-center d-flex">
            {animals.map((animal) => (
              <AnimalCard
                key={animal.id}
                image={`https://pets.xn--80ahdri7a.site/${animal.image}`}
                name={animal.kind || 'Неизвестно'}
                age={animal.age || 'Возраст не указан'}
                description={animal.description || 'Описание отсутствует'}
                className="animal-image-small"
              />
            ))}
          </div>
        ) : (
          !loading && <div className="text-center text-danger">Данные не найдены</div>
        )}
      </div>
    </div>
  );*/
return <div>
  <Account/>
</div>

}

export default MyAccount;