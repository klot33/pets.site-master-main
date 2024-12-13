import React, { useState, useEffect } from 'react';

function Slide({ data, isActive }) {
  return (
    <div className={`carousel-item ${isActive ? 'active' : ''}`}>
      <h2 className="text-center text-white">{data.title}</h2>
      <p className="text-center" style={{color:'white', fontWeight:'bold'}}>{data.description}</p>
      <img src={`https://pets.xn--80ahdri7a.site/${data.image}`} className="d-block m-auto" alt={data.title} style={{ height: '200px', borderRadius: '10%', paddingBottom: '10px'}} />
    </div>
  );
}

function Loader({ display }) {
  return (
    <div className="justify-content-center align-items-center" style={display}>
      <div className="fs-1 text-success">...Идет загрузка</div>
    </div>
  );
}

function Slider() {
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSliderData();
  }, []);

  const fetchSliderData = async () => {
    try {
      const response = await fetch('https://pets.сделай.site/api/pets/slider'); // Замените URL на реальный      
      const data = await response.json();      
      setSliderData(data.data.pets || []); // Убедитесь, что структура данных совпадает
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      setLoading(false);
    }    
  };

  
  const slides = sliderData.map((slide, index) => (
    <Slide key={index} data={slide} isActive={index === 0} />
  ));

  const indicators = sliderData.map((_, index) => (
    <button
      key={index}
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide-to={index}
      className={index === 0 ? 'active' : ''}
      aria-current={index === 0 ? 'true' : 'false'}
      aria-label={`Slide ${index + 1}`}
    />
  ));

  return (
    <div>
      <h2 className="text-center text-white bg-primary m-2">Найденные животные</h2>
      <Loader display={{ display: loading ? 'flex' : 'none' }} />
      {!loading && (
        <div
          id="carouselExampleIndicators"
          className="carousel slide m-auto w-75 p-2"
          style={{ background: 'linear-gradient(135deg, #320cdd, #528edd)', borderRadius: 10 }}
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">{indicators}</div>
          <div className="carousel-inner">{slides}</div>
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
      )}
    </div>
  );
}

export default Slider;
