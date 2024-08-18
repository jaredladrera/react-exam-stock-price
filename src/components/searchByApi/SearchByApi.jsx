
import './SearchByApi.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableStockByTicker } from '../../services/features/stock.slice';
import { useDebounce } from '../../services/hooks';
import Details from '../stockDetails/Details';

const SearchByApi = () => {
  const dispatch = useDispatch();
  const { allStock: availableStock, loading: availableStockLoading } = useSelector(state => state.stocks);

  const [inputValue, setInputValue] = useState('');
//   adding delay 1500 for input not requesting to the api for every character input
  const debounce = useDebounce(inputValue, 1500);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);


  useEffect(() => {
    let isActive = true;
    // Using debounce for delaying input search for performance issue
    if (debounce && isActive) {
      dispatch(getAvailableStockByTicker([debounce]))
        .unwrap()
        .then((response) => {
          if (response.length > 0) {
            setFilteredSuggestions(response);
            setShowSuggestions(true);
          } else {
            setFilteredSuggestions([]);
            setShowSuggestions(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching stock data:', error);
        });
    }

    return () => {
      isActive = false;
    };
  }, [debounce, dispatch]);

//   handle change for input and filter for every type character of user
  const handleChange = (e) => {
    const userInput = e.target.value;
    setInputValue(userInput);

    if (userInput === '') {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }
   
    // filter base on input search 
    const filtered = availableStock.filter((item) =>
      item.ticker.toLowerCase().includes(userInput.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  // Handle click suggestion and set the selected value in input search  
  const handleSuggestionClick = (data) => {
    setInputValue(`${data.name} - ${data.ticker}`);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <>
      <div className="container">
        <div className="search">
          <label>Search For Stock Price</label>
          <input
            type="text"
            className="form-control search-input"
            value={inputValue}
            onChange={handleChange}
          />
        </div>

        {showSuggestions && inputValue && (
          <div className="suggestions">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {`${suggestion.name} - (${suggestion.ticker})`}
                </div>
              ))
            ) : (
              availableStockLoading ? (
                <div className="p-2">Loading...</div>
              ) : (
                <div className="p-2">No suggestions available</div>
              )
            )}
          </div>
        )}
        {/* if the filter already fullfiled the details is showing */}
        { filteredSuggestions.length > 0 && <Details stockDetails={filteredSuggestions} />}
      </div>
    </>
  );
};

export default SearchByApi;


