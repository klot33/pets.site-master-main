import '../pages/css/cabinet.css'
import '../pages/css/my.css'
import cat from '../image/scale_1200.jfif'
import dog from '../image/dog.jpg'
import parrot from '../image/Parrot.jpg'


function MyAccount() {
    return ( 

        <div>
  <div className="container mt-4">
    <h1 className="mb-4">Добро пожаловать, <span id="userName">Иван Иванов</span>!</h1>
    <div className="row">
      {/* Личная информация */}
      <div className="col-md-6">
        <div className="card mb-4">
          <div className="card-header">
            <h5><i className="bi bi-person-circle" /> Личная информация</h5>
          </div>
          <div className="card-body">
            <p><strong>Имя:</strong> Иван Иванов</p>
            <p><strong>Дата рождения:</strong> 15 марта 1990</p>
            <p><strong>Email:</strong> ivan@example.com</p>
            <p><strong>Телефон:</strong> +7 (900) 123-45-67</p>
            <button className="btn btn-primary mt-3">Редактировать профиль</button>
          </div>
        </div>
      </div>
      {/* Настройки */}
      <div className="col-md-6">
        <div className="card mb-4">
          <div className="card-header">
            <h5><i className="bi bi-gear" /> Настройки аккаунта</h5>
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
            <h5><i className="bi bi-bell" /> Уведомления</h5>
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
            <h5><i className="bi bi-envelope" /> Контакты поддержки</h5>
          </div>
          <div className="card-body">
            <p><strong>Email:</strong> support@example.com</p>
            <p><strong>Телефон:</strong> +7 (800) 555-35-35</p>
            <p><strong>Часы работы:</strong> Пн-Пт, 9:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Карточки товаров животных */}
  <h2 className="mt-5 text-center">Потерянные питомцы</h2>
  <div className="row mt-3 justify-content-center d-flex">
    <div className="col-md-2 d-flex justify-content-center">
      <div className="ad ">
        <img src={dog} alt="Собака" />
        <h5>Собака: Дружок</h5>
        <p><strong>Возраст:</strong> 2 года</p>
        <p><strong>Описание:</strong> Дружелюбный и энергичный пес, любит детей и прогулки.</p>
        <button className="btn btn-primary w-100">Подробнее</button>
      </div>
    </div>
    <div className="col-md-2 d-flex justify-content-center">
      <div className="ad">
        <img src={cat} alt="Кот" />
        <h5>Кот: Маркиз</h5>
        <p><strong>Возраст:</strong> 3 года</p>
        <p><strong>Описание:</strong> Спокойный и ласковый кот, отлично подходит для квартиры.</p>
        <button className="btn btn-primary w-100">Подробнее</button>
      </div>
    </div>
    <div className="col-md-2 d-flex justify-content-center">
      <div className="ad">
        <img src={parrot} alt="Попугай" />
        <h5>Попугай: Кеша</h5>
        <p><strong>Возраст:</strong> 1 год</p>
        <p><strong>Описание:</strong> Говорящий попугай, любит играть и изучать новые слова.</p>
        <button className="btn btn-primary w-100">Подробнее</button>
      </div>
    </div>
  </div>
</div>
     );
}

export default MyAccount;