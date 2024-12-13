import React, { useState } from 'react';
import '../pages/css/my.css';

function SubscriptionNews() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasError(false);
    setMessage('');

    try {
      // Отправляем запрос на сервер
      const response = await fetch('https://pets.сделай.site/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Если сервер вернул ошибку, обработаем ее
      if (!response.ok) {
        setMessage('Произошла ошибка при подписке. Попробуйте позже.');
        setHasError(true);
      } else {
        setMessage('Вы успешно подписались на новости!');
      }
    } catch (error) {
      // Ошибка в случае сетевых проблем или других непредвиденных обстоятельств
      setMessage('Произошла ошибка при отправке запроса.');
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-center text-white bg-primary m-2">Подписка на новости</h2>
      {message && (
        <div className={`alert ${hasError ? 'alert-danger' : 'alert-success'} text-center`}>
          {message}
        </div>
      )}
      {!message && (
        <form
          className="w-50 m-auto p-3"
          style={{ minWidth: 300 }}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Введите адрес электронной почты
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <div id="emailHelp" className="form-text">
              Мы никогда не делимся Вашими e-mail ни с кем.
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Загрузка...' : 'Подписаться'}
          </button>
        </form>
      )}
    </div>
  );
}

export default SubscriptionNews;
