import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/logo.jpg';
import ModalRegistration from './ModalRegistration';
import ForgotLogin from './ForgotLogin';
import ForgotPassword from './ForgotPassword';
import ModalLogin from './ModalLogin';
import '../pages/css/my.css'

function Header({ onShowRegistration, onShowLogin }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="w-25 rounded-3" alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Главная</Link>
            </li>
            <li className="nav-item">
              <ModalLogin />
            </li>
            <li className="nav-item">
             <ModalRegistration/>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-pet">Добавить объявление</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">Поиск по объявлениям</Link>
            </li>
          </ul>
          <form className="d-flex">
  <input className="form-control me-2" type="search" list="pets" placeholder="Поиск" aria-label="Search" />
  <button className="btn btn-primary" onclick>Поиск</button>
  <datalist id="pets">
    <option value="Кошка">
    </option><option value="Собака">
    </option><option value="Корова">
    </option><option value="Крокодил">
    </option><option value="Сова">
    </option></datalist>
</form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
