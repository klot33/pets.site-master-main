import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';


function registrationPage() {
    return ( 
        <div className="modal fade" id="registrationModal" tabIndex={-1} aria-labelledby="registrationModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="registrationModalLabel">Регистрация</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть" />
      </div>
      <div className="modal-body">
        <form id="registrationForm">
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Имя</label>
            <input type="text" className="form-control" id="firstName" placeholder="Введите имя" required />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Фамилия</label>
            <input type="text" className="form-control" id="lastName" placeholder="Введите фамилию" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Электронная почта</label>
            <input type="email" className="form-control" id="email" placeholder="Введите электронную почту" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input type="password" className="form-control" id="password" placeholder="Введите пароль" required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Подтвердите пароль</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="Повторите пароль" required />
          </div>
          <p className="error text-danger" id="errorMessage" />
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onclick="submitForm()">Зарегистрироваться</button>
      </div>
    </div>
  </div>
</div>

     );
}

export default registrationPage;