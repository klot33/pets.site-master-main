import React from 'react';

function UserInfo({ user }) {
  return (
    <div className="row">
      {/* Личная информация */}
      <div className="col-md-6">
        <div className="card mb-4">
          <div className="card-header">
            <h5><i className="bi bi-person-circle" /> Личная информация</h5>
          </div>
          <div className="card-body">
            <p><strong>Имя:</strong> {user.name}</p>
            <p><strong>Дата рождения:</strong> {user.birthDate}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Телефон:</strong> {user.phone}</p>
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
                <select id="emailNotification" className="form-select" defaultValue={user.notifications ? "Включены" : "Отключены"}>
                  <option>Включены</option>
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
  );
}

export default UserInfo;
