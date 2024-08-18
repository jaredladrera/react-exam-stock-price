import React, { useState, useEffect, useRef } from 'react';
import './StockTable.css';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import ModalDetails from '../modal-details/ModalDetails';

const Stocktable = ({ stockDetails }) => {

const [det, setDet] = useState({})

const modalRef = useRef(null);

// setting details for viewing and handle for opening the modal
const handleDetails = (details, event) => {
    event.preventDefault();

    setDet({
        ...details
    })

    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);

    modal.show();
  }


// Displaying all the data that filter with multiple values
  return (
    <>
    <table className="table">
    <thead>
        <tr>
        <th scope="col">Name</th>
        <th scope="col">Ticker</th>
        <th scope="col">Exchange</th>
        <th scope="col">Action</th>
        </tr>
    </thead>
    <tbody>
        { stockDetails.map(d => (

        <tr key={d?.ticker}>
        <th>{ d?.name }</th>
        <td>{ d?.ticker }</td>
        <td>{ d?.exchange }</td>
        <td>
            <button className="btn btn-success btn-sm" onClick={(event) => handleDetails(d, event)}>Details</button>
        </td>
        </tr>
        ))}
    </tbody>
    </table>

    <ModalDetails modalRef={modalRef} details={det} />
    </>
  )
}

export default Stocktable