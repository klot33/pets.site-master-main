import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AnimalCard = ({ orderId }) => {
  const [animalData, setAnimalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    photos1: null,
    photos2: null,
    photos3: null,
    mark: "",
    description: "",
  });

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
          Authorization: `Bearer ${token}`,
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
 

  const handleShowModal = (animal) => {
    setCurrentAnimal(animal);
    setUpdatedData({
      photos1: animal.photos[0],
      photos2: animal.photos[1] || null,
      photos3: animal.photos[2] || null,
      mark: animal.mark,
      description: animal.description,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentAnimal(null);
    setUpdatedData({
      photos1: null,
      photos2: null,
      photos3: null,
      mark: "",
      description: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos1" || name === "photos2" || name === "photos3") {
      setUpdatedData({
        ...updatedData,
        [name]: files[0], // Сохраняем файл вместо пути
      });
    } else {
      setUpdatedData({
        ...updatedData,
        [name]: value, // Обновление состояния для других полей
      });
    }
  };

  const editAnimal = async (id, updatedData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, please log in.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      // Добавляем файлы в FormData только если они были изменены
      if (updatedData.photos1) formData.append("photos1", updatedData.photos1);
      if (updatedData.photos2) formData.append("photos2", updatedData.photos2);
      if (updatedData.photos3) formData.append("photos3", updatedData.photos3);
  
      // Добавляем остальные данные
      if (updatedData.mark) formData.append("mark", updatedData.mark);
      if (updatedData.description) formData.append("description", updatedData.description);
  
      const response = await fetch(`https://pets.сделай.site/api/pets/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.status === 200) {
        const result = await response.json();
        if (result.data.status === "OK") {
          setAnimalData((prevData) =>
            prevData.map((animal) =>
              animal.id === id ? { ...animal, ...updatedData } : animal
            )
          );
        } else {
          alert("Объявление успешно обновлено.");
        }
      } else {
        alert("Ошибка при обновлении объявления.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveChanges = () => {
    if (!updatedData.photos1) {
      alert("Фото 1 обязательно для заполнения!");
      return;
    }
  
    // Создаём объект, который будет хранить только изменённые данные
    const dataToSend = {};
  
    if (updatedData.photos1 !== currentAnimal.photos[0]) {
      dataToSend.photos1 = updatedData.photos1;
    }
    if (updatedData.photos2 !== currentAnimal.photos[1]) {
      dataToSend.photos2 = updatedData.photos2;
    }
    if (updatedData.photos3 !== currentAnimal.photos[2]) {
      dataToSend.photos3 = updatedData.photos3;
    }
    if (updatedData.mark !== currentAnimal.mark) {
      dataToSend.mark = updatedData.mark;
    }
    if (updatedData.description !== currentAnimal.description) {
      dataToSend.description = updatedData.description;
    }
  
    // Если есть изменённые данные, отправляем их на сервер
    if (Object.keys(dataToSend).length > 0) {
      editAnimal(currentAnimal.id, dataToSend);
      handleCloseModal();
      
    

        fetchAnimalData();
    
    } else {
      alert("Нет изменений для сохранения.");
    }
  };

  const deleteAnimal = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, please log in.");
      return;
    }

    const confirmDelete = window.confirm("Вы уверены, что хотите удалить это объявление?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://pets.сделай.site/api/users/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const result = await response.json();
        if (result.data.status === "ok") {
          setAnimalData((prevData) => prevData.filter((animal) => animal.id !== id));
        } else {
          alert("Объявление успешно удалено.");
        }
      } else if (response.status === 403) {
        alert("Доступ запрещен. Можно удалять только свои объявления со статусом 'active' или 'onModeration'.");
      } else if (response.status === 401) {
        alert("Ошибка авторизации. Пожалуйста, войдите в систему.");
      } else {
        alert("Ошибка при удалении объявления.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

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
            <button
              className="btn btn-danger mt-2"
              onClick={() => deleteAnimal(animal.id)}
            >
              Удалить
            </button>
            <button
              className="btn btn-primary mt-2"
              onClick={() => handleShowModal(animal)}
            >
              Редактировать
            </button>
          </div>
        </div>
      ))}

      {/* Модальное окно для редактирования */}
      {currentAnimal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Редактировать объявление</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formphotos1">
                <Form.Label>Фото 1 (обязательно)</Form.Label>
                <Form.Control
                  type="file"
                  name="photos1"
                  accept="image/png"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formphotos2">
                <Form.Label>Фото 2</Form.Label>
                <Form.Control
                  type="file"
                  name="photos2"
                  accept="image/png"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formphotos3">
                <Form.Label>Фото 3</Form.Label>
                <Form.Control
                  type="file"
                  name="photos3"
                  accept="image/png"
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formMark">
                <Form.Label>Клеймо</Form.Label>
                <Form.Control
                  type="text"
                  name="mark"
                  value={updatedData.mark}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={updatedData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Сохранить изменения
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AnimalCard;
