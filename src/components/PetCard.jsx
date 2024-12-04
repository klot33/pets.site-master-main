import React from 'react';

function PetCard({ image, type, id, description, chipNumber, region, date }) {
  return (
    <div className="card m-3" style={{ width: '18rem', borderRadius: 10, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <img src={image} className="card-img-top rounded-3" alt={`Изображение ${type}`} style={{ height: 200, objectFit: 'cover' }} />
      <div className="card-body">
        <h5 className="card-title">{type}</h5>
        <p className="card-text"><strong>ID:</strong> {id}</p>
        <p className="card-text"><strong>Описание:</strong> {description}</p>
        <p className="card-text"><strong>Номер чипа:</strong> {chipNumber}</p>
        <p className="card-text"><strong>Район:</strong> {region}</p>
        <p className="card-text"><strong>Дата:</strong> {date}</p>
      </div>
    </div>
  );
}

export default PetCard;
