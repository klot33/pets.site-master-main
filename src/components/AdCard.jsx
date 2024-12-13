import React from 'react';

function AdCard({ ad }) {
  // Если URL изображения относительный, добавляем базовый URL
  const imageUrl = ad.photos.startsWith('http')
    ? ad.photos
    : `https://pets.сделай.site${ad.photos}`;

  return (
    <div className="card mb-3">
      <img
        src={imageUrl}
        alt={`Изображение ${ad.kind}`}
        className="card-img-top"
        onError={(e) => { e.target.src = '/placeholder.jpg'; }} // Если изображение не загружается
      />
      <div className="card-body">
        <h5 className="card-title">{ad.kind}</h5>
        <p className="card-text">{ad.description}</p>
        <p className="card-text">
          <small className="text-muted">Район: {ad.district}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">Дата: {ad.date}</small>
        </p>
      </div>
    </div>
  );
}

export default AdCard;
