import './../searchByApi/SearchByApi.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableStock } from '../../services/features/stock.slice';
import Details from '../stockDetails/Details';

const SearchByAll = () => {

 // my meaning for search By All is i load the all data first and i will filtrer it depends on the inputed character

  const dispatch = useDispatch();
  const { allStock: availableStock, loading: availableStockLoading } = useSelector(state => state.stocks);

    
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [stockDetails, setStockDetails] = useState(null)

//   loading all data
    useEffect(() => {
        dispatch(getAvailableStock())
    }, [dispatch]);


//  handle change of the input and filter it same time
    const handleChange = (e) => {
        const userInput = e.target.value;
        setInputValue(userInput);
    
        if (userInput === '') {
          setFilteredSuggestions([]);
          setShowSuggestions(false);
          return;
        }
    
        const filtered = availableStock.filter((item) =>
          item.ticker.toLowerCase().includes(userInput.toLowerCase())
        );
    
        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
      };
    
    //   setting the value of input depends on suggestion click and get also the data for details viewing
      const handleSuggestionClick = (data) => {
        setInputValue(`${data.name} - ${data.ticker}`);
        setStockDetails(data)
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
 {/* basically  if you only type on the input box only the suggestion will show even all the data is loadded */}
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
        { stockDetails && <Details stockDetails={stockDetails} />}
        
      </div>
    </>
  )
}

export default SearchByAll