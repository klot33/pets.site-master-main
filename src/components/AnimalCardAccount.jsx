import React, { useEffect, useState } from "react";

const AnimalCard = ({ orderId }) => {
  const [animalData, setAnimalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimalData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://pets.сделай.site/api/users/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setAnimalData(data.data.orders); // Предполагаем, что возвращается массив объектов
        } else if (response.status === 204) {
          setAnimalData([]); // Если данных нет, устанавливаем пустой массив
        } else {
          throw new Error("Ошибка при получении данных");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalData();
  }, [orderId]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!animalData || animalData.length === 0) return <div>Нет данных</div>;

  return (
    <div className="card-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {animalData.map((animal, index) => (
        <div className="card" style={{ width: "18rem", margin: "10px" }} key={index}>
          <img
            src={`https://pets.сделай.site${animal.photos}`}
            className="card-img-top"
            alt="Фото животного"
          />
          <div className="card-body">
            <h5 className="card-title">{animal.kind}</h5>
            <p className="card-text">{animal.description}</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Марка: {animal.mark}</li>
              <li className="list-group-item">Район: {animal.district}</li>
              <li className="list-group-item">Дата: {animal.date}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimalCard;
