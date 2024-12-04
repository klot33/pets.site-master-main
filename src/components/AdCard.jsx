import React from 'react';

function AdCard({ ad }) {
  return (
    <div className="ad card mb-3">
      <img src={ad.image} alt={ad.type} className="card-img-top" />
      <div className="card-body">
        <p><strong>ID:</strong> {ad.id}</p>
        <p><strong>Вид животного:</strong> {ad.type}</p>
        <p><strong>Описание:</strong> {ad.description}</p>
        <p><strong>Номер чипа:</strong> {ad.chipNumber}</p>
        <p><strong>Район:</strong> {ad.region}</p>
        <p><strong>Дата:</strong> {ad.date}</p>
      </div>
    </div>
  );
}

export default AdCard;
