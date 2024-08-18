import React, {useState, useEffect} from 'react';
import './SearchMultiple.css';
import { useDispatch, useSelector } from 'react-redux';
import Stocktable from '../stockDetailsTable/Stocktable';
import { getAvailableStock, getAvailableStockByTicker } from '../../services/features/stock.slice';

const SearchMultiple = () => {

    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);

    const { allStock: availableStock, stockDetails, loading } = useSelector(state => state.stocks);

    useEffect(() => {
        dispatch(getAvailableStock())
    }, [dispatch]);
    
  
    // handle change from input and filter for list of suggestion 
    const handleInputChange = (e) => {
      const userInput = e.target.value;
      setInputValue(userInput);

      if (userInput === '') {
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        return;
      }
    //   filter for all character on search input
      const filtered = availableStock.filter((item) =>
        item.ticker.toLowerCase().includes(userInput.toLowerCase())
      );
  
      setFilteredSuggestions(filtered);
    //   adding setShowSuggestions for rendering condition
      setShowSuggestions(true);
    };
  
    // this method is for pushing selected items in selected values state only ticker
    const handleSelectSuggestion = (suggestion) => {
      if (!selectedValues.includes(suggestion)) {
        setSelectedValues([...selectedValues, suggestion.ticker]);
        setInputValue("");
      }
    };
  
    // method for removing from the list of items
    const handleRemoveValue = (value) => {
      setSelectedValues(selectedValues.filter((val) => val !== value));
    };

    // submitting or dispatching the request
    const submitData = (e) => {
        e.preventDefault();
        dispatch(getAvailableStockByTicker(selectedValues))
    }

  
    return (
      <div className="multi-value-input mt-5">
        <div className="form-group">
          <div className="selected-values">
            {selectedValues.map((value, index) => (
              <span key={index} className="badge bg-primary me-2">
                {value}
                <button
                  type="button"
                  className="btn-close btn-close-white ms-2"
                  aria-label="Remove"
                  onClick={() => handleRemoveValue(value)}
                ></button>
              </span>
            ))}
          </div>
          <div className="form-con">
          <input
            type="text"
            className="form-control"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Start typing..."
            style={{ border: '2px solid gray'}}
          />
         <button className="btn btn-danger btn-sm text-white" onClick={(e) => submitData(e)}>Submit</button>
          </div>

         {/* mapping all suggestion */}
          {inputValue && showSuggestions && (
            <div className="suggestions-list mt-2">
            { filteredSuggestions.length > 0 ? (

              <ul className="list-group">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion.name} - {suggestion.ticker}
                  </li>
                ))}
              </ul>
            ) : (
                loading ? (
                    <div className="p-2">Loading...</div>
                  ) : (
                    <div className="p-2">No suggestions available</div>
                  )
            )} 
            </div>
          )}
           {stockDetails.length > 0 ? (
               <Stocktable stockDetails={stockDetails}/>
           ) : <p> No Data to Display </p>}
        </div>
      </div>
    );

}

export default SearchMultiple