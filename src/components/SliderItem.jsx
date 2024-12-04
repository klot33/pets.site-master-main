import React from 'react';

function SliderItem({ image, title, description, isActive }) {
  return (
    <div className={`carousel-item ${isActive ? 'active' : ''}`}>
      <img src={image} className="d-block mx-auto rounded-5" alt={title} style={{ width: 300, height: 300, objectFit: 'cover' }} />
      <div className="text-center mt-3 text-light">
        <h2 className="text-center">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default SliderItem;
