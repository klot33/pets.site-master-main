import React from 'react';
import PetCard from './PetCard'; // Импортируем компонент карточки
import cat from '../image/scale_1200.jfif';
import koza from '../image/koza.jpg';
import dog from '../image/dog.jpg';
import parrot from '../image/Parrot.jpg';
import rabbit from '../image/rabbit.jpg';

function FindPets() {
  // Данные животных
  const petsData = [
    {
      image: cat,
      type: 'Кошка',
      id: 14,
      description: 'Потерялась кошка, пушистая, серая. Любит играть, ласковая.',
      chipNumber: 'ca-001-spb',
      region: 'Василеостровский',
      date: '24-03-2020',
    },
    {
      image: koza,
      type: 'Коза',
      id: 18,
      description: 'Потерялась коза, последний раз видели в здании Московского вокзала г. Санкт-Петербург. Коза белая, пуховая.',
      chipNumber: 'go-011-spb',
      region: 'Центральный',
      date: '14-03-2022',
    },
    {
      image: dog,
      type: 'Собака',
      id: 22,
      description: 'Потерялась собака, черная, среднего размера. Очень дружелюбная.',
      chipNumber: 'do-003-moscow',
      region: 'Пресненский',
      date: '12-07-2023',
    },
    {
      image: parrot,
      type: 'Попугай',
      id: 27,
      description: 'Попугай с ярким зеленым оперением, улетел с балкона.',
      chipNumber: 'pa-010-spb',
      region: 'Петроградский',
      date: '21-08-2024',
    },
    {
      image: rabbit,
      type: 'Кролик',
      id: 34,
      description: 'Потерян кролик, белый с черными пятнами. Очень активный.',
      chipNumber: 'ra-005-kazan',
      region: 'Ново-Савиновский',
      date: '02-09-2024',
    },
  ];

  return (
    <div>
      <h2 className="text-center text-white bg-primary m-4 p-3 rounded-3">Карточки найденных животных</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {petsData.map((pet) => (
          <PetCard
            key={pet.id}
            image={pet.image}
            type={pet.type}
            id={pet.id}
            description={pet.description}
            chipNumber={pet.chipNumber}
            region={pet.region}
            date={pet.date}
          />
        ))}
      </div>
    </div>
  );
}

export default FindPets;
