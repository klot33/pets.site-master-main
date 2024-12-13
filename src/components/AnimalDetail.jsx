import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BASE_URL = "https://pets.сделай.site";

const AnimalDetailCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const animal = location.state?.animal;
  const from = location.state?.from || '/';

  if (!animal) {
    return (
      <div className="container text-center py-5">
        <h2 className="text-danger">Животное не найдено</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  const goBack = () => navigate(from);

  return (
    <div className="container d-flex align-items-center
justify-content-center" style={{ minHeight: '70vh' }}>
      <div className="card shadow-lg" style={{ maxWidth: '900px',
width: '100%' }}>
        <div className="row g-0">
          {/* Левая часть с изображением */}
          <div className="col-md-5">
            <div
              className="overflow-hidden rounded-start"
              style={{
                height: '100%',
                width: '100%',
              }}
            >
              <img
                src={
                  animal.photos.startsWith('http')
                    ? animal.photos
                    : `${BASE_URL}${animal.photos}`
                }
                alt={animal.kind}
                className="img-fluid"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>

          {/* Правая часть с текстовой информацией */}
          <div className="col-md-7">
            <div className="card-body">
              <h2 className="card-title text-primary">{animal.name}</h2>
              <h5 className="text-muted mb-4">
                {animal.kind.charAt(0).toUpperCase() + animal.kind.slice(1)}
              </h5>
              <p className="lead mb-4">{animal.description}</p>

              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Клеймо:</strong>{' '}
                  <span className="badge bg-info text-dark">{animal.mark}</span>
                </li>
                <li className="mb-2">
                  <strong>Район:</strong> {animal.district}
                </li>
                <li className="mb-2">
                  <strong>Дата:</strong> {animal.date}
                </li>
                <li>
                  <strong>Телефон:</strong>{' '}
                  <a href={`tel:${animal.phone}`} className="link-primary">
                    {animal.phone}
                  </a>
                </li>
              </ul>

              <button onClick={goBack} className="btn btn-secondary mt-4">
                Назад
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailCard;