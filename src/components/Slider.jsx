import React from 'react';
import SliderItem from './SliderItem'; // Импортируем компонент слайдера
import dog from '../image/dog.jpg';
import mouse from '../image/mouse.jpg';
import monkey from '../image/maxresdefault.jpg';

function Slider() {
  // Данные для слайдера
  const sliderData = [
    {
      image: dog,
      title: 'Найдена собака',
      description: 'Собака белая, была утеряна в Красногвардейском районе',
    },
    {
      image: mouse,
      title: 'Найдена мышь',
      description: 'Мышь серая, была утеряна в Центральном районе',
    },
    {
      image: monkey,
      title: 'Найдена горилла',
      description: 'Горилла, была утеряна в Красногвардейском районе',
    },
  ];

  return (
    <div>
      <h2 className="text-center text-white bg-primary m-2">Найденные животные</h2>
      <div
        id="carouselExampleIndicators"
        className="carousel slide m-auto w-75 p-2"
        style={{ background: 'linear-gradient(135deg, #320cdd, #528edd)', borderRadius: 10 }}
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {sliderData.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="carousel-inner">
          {sliderData.map((slide, index) => (
            <SliderItem
              key={index}
              image={slide.image}
              title={slide.title}
              description={slide.description}
              isActive={index === 0}
            />
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Предыдущий</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Следующий</span>
        </button>
      </div>
    </div>
  );
}

export default Slider;
