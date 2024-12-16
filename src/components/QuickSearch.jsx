import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuickSearch = ({ host, handleNavbarCollapse }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  const debounce = (func, delay) => {
    return (...args) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchSuggestions = async (query) => {
    if (query.length > 3) {
      setLoading(true);
      try {
        const response = await
fetch(`${host}/api/search?query=${encodeURIComponent(query)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setSuggestions(data.data.orders || []);
        } else if (response.status === 204) {
          setSuggestions([]);
        } else {
          console.error('Ошибка при загрузке данных');
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Ошибка сети:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchChange = debounce((query) => {
    fetchSuggestions(query);
  }, 1000);

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearchChange(query);
  };

  const handleSuggestionClick = (animal) => {
    setSearchQuery('');
    setSuggestions([]);
    navigate(`/search/animal/${animal.id}`, { state: { animal } });

    // Скрыть navbar после клика на элемент
    if (handleNavbarCollapse) {
      handleNavbarCollapse(); // Закрываем navbar
    }
  };

  // Обработчик кликов вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current &&
!searchContainerRef.current.contains(event.target)) {
        setSearchQuery(''); // Сбрасываем поле ввода
        setSuggestions([]); // Закрываем подсказки
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="position-relative" ref={searchContainerRef}>
      <input
        type="text"
        className="form-control"
        placeholder="Поиск по описанию"
        value={searchQuery}
        onChange={handleChange}
        style={{ width: '250px' }}
      />
      {loading && (
        <div
          className="position-absolute bg-light text-center
text-primary py-2 px-3 shadow rounded"
          style={{ width: '250px', marginTop: '10px', zIndex: 10 }}
        >
          <span className="spinner-border spinner-border-sm me-2"></span>
          Загрузка...
        </div>
      )}
      {suggestions.length > 0 && (
        <ul
          className="list-group position-absolute shadow rounded"
          style={{ width: '250px', marginTop: '10px', zIndex: 10 }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="list-group-item list-group-item-action d-flex
justify-content-between align-items-center"
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: 'pointer' }}
            >
              <span className="text-truncate">{suggestion.description}</span>
              <i className="bi bi-arrow-right-circle text-primary"></i>
            </li>
          ))}
        </ul>
      )}
      {searchQuery.length > 3 && !loading && suggestions.length === 0 && (
        <div
          className="position-absolute bg-light text-muted text-center
py-2 px-3 shadow rounded"
          style={{ width: '250px', marginTop: '10px', zIndex: 10 }}
        >
          Результаты не найдены
        </div>
      )}
    </div>
  );
};

export default QuickSearch;