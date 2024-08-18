import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DefaultSearch.css';
import Details from '../stockDetails/Details';
import { getAvailableStockByTicker } from '../../services/features/stock.slice';

const DefaultSearch = () => {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');

    // This is from redux slice
    const { stockDetails, loading, message } = useSelector(state => state.stocks);


    // For handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getAvailableStockByTicker([searchInput.toUpperCase()]));
    }

    return (
        <>
            <div className="container centered-container">
                <div className="row">
                    <div className="col">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search for stock..."
                                style={{ border: '2px solid gray' }}
                            />
                            <button className="btn btn-primary" onClick={handleSubmit}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
                { loading ? <p className='text-center' style={{ fontWeight: 'bolder' }}>Loading Please Wait...</p> : '' }
                { message !== '' ? <h3 className='text-center' style={{color: 'red', fontWeight: 'bolder'}}>{message}</h3> : '' }
                {stockDetails && stockDetails.length > 0 && (
                    <Details stockDetails={stockDetails} />
                )}

        </>
    );
}

export default DefaultSearch;
