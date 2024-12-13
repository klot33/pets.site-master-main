import React from 'react';

function AnimalCard({ image, name, age, description }) {
    return (
        <div className="col-md-3 d-flex justify-content-center">
            <div className="ad text-center card p-3">
                <img src={image} alt={name} className="img-fluid mb-3" />
                <h5>{name}</h5>
                <p><strong>Возраст:</strong> {age}</p>
                <p><strong>Описание:</strong> {description}</p>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary">Редактировать</button>
                    <button className="btn btn-danger">Удалить</button>
                </div>
            </div>
        </div>
    );
}

export default AnimalCard;
