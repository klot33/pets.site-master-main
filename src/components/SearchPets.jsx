import React, { useState, useEffect } from 'react';
import '../pages/css/my.css';
import '../pages/css/search.css';
import SearchResults from './SearchResults';
import { useCallback } from 'react';

const SearchPets = () => {
  const [district, setDistrict] = useState('');
  const [kind, setKind] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAnimals = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://pets.сделай.site/api/pets`);
      const data = await response.json();
      if (data.data?.orders) {
        const sortedAnimals = [...data.data.orders].sort((a, b) => new
Date(b.date) - new Date(a.date));

        // Фильтрация по району и виду
        const filteredOrders = sortedAnimals.filter((order) => {
          const matchesDistrict = district ?
order.district.toLowerCase() === district.toLowerCase() : true;
          const matchesKind = kind ?
order.kind.toLowerCase().includes(kind.toLowerCase()) : true;
          return matchesDistrict && matchesKind;
        });

        setResults(filteredOrders);
        setTotalPages(Math.ceil(filteredOrders.length / 10)); //Пагинация на 10 элементов
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      setLoading(false);
    }
  }, [district, kind]);

  useEffect(() => {
    fetchAnimals();
  }, [district, kind, fetchAnimals]);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Поиск по объявлениям</h2>
      <div className="row mb-4 mt-5">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Введите район"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Введите вид животного"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      ) : (
        <SearchResults results={results} totalPages={totalPages} />
      )}
    </div>
  );
};

export default SearchPets;
