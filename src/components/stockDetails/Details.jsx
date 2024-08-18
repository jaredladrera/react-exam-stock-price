import React, { useEffect } from 'react';
import './Details.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableStockByTicker } from '../../services/features/stock.slice';

const Details = (props) => {

 const dispatch = useDispatch();

 const { stockDetails, loading} = useSelector(state => state.stocks)

//  dispatching for getting the detail of the stock
 useEffect(() => {
  if(props.stockDetails.ticker) {
    dispatch(getAvailableStockByTicker([props.stockDetails.ticker]))
  }
 }, [dispatch, props.stockDetails])


//  this is the component handling for viewing the details depends on what passing on the props
 

  return (
    <>

    { loading ? <p className='text-center'>Loading...</p> : ''}
    <table className="table mt-5">
      <tbody>
        <tr>
          <th>Name : </th>
          <td>{ stockDetails[0]?.name }</td>
        </tr>
        <tr>
          <th>Exchange : </th>
          <td>{ stockDetails[0]?.exchange }</td>
        </tr>
        <tr>
          <th>Ticker : </th>
          <td>{ stockDetails[0]?.ticker }</td>
        </tr>
        <tr>
          <th>Price : </th>
          <td>{ stockDetails[0]?.price }</td>
        </tr>
        <tr>
          <th>Change : </th>
          <td>{ stockDetails[0]?.change }</td>
        </tr>
        <tr>
          <th>ChangePercentage : </th>
          <td>{ stockDetails[0]?.changePercentage}</td>
        </tr>
        <tr>
          <th>Volume : </th>
          <td>{ stockDetails[0]?.volume }</td>
        </tr>
        <tr>
          <th>DayLow : </th>
          <td>{ stockDetails[0]?.dayLow }</td>
        </tr>
        <tr>
          <th>Dayhigh : </th>
          <td>{ stockDetails[0]?.dayHigh }</td>
        </tr>
        <tr>
          <th>YearLow : </th>
          <td>{ stockDetails[0]?.yearLow }</td>
        </tr>
        <tr>
          <th>YearHigh : </th>
          <td>{ stockDetails[0]?.yearHigh }</td>
        </tr>
        <tr>
          <th>Avg50Price : </th>
          <td> { stockDetails[0]?.avg50Price }</td>
        </tr>
        <tr>
          <th>avg200Price : </th>
          <td>{ stockDetails[0]?.avg200Price }</td>
        </tr>
      </tbody>
    </table>

    
    </>
  )
}

export default Details