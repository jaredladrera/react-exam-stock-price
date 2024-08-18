import React from 'react'

const ModalDetails = (props) => {
  return (
    <>
    {/* Modal for complete details of every single data on the table */}
    <div className="modal fade" ref={props.modalRef} id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
    <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <table className="table">
            <tbody>
                <tr>
                <th>Name : </th>
                <td>{ props.details?.name }</td>
                </tr>
                <tr>
                <th>Exchange : </th>
                <td>{ props.details?.exchange }</td>
                </tr>
                <tr>
                <th>Ticker : </th>
                <td>{ props.details?.ticker }</td>
                </tr>
                <tr>
                <th>Price : </th>
                <td>{ props.details?.price }</td>
                </tr>
                <tr>
                <th>Change : </th>
                <td>{ props.details?.change }</td>
                </tr>
                <tr>
                <th>ChangePercentage : </th>
                <td>{ props.details?.changePercentage}</td>
                </tr>
                <tr>
                <th>Volume : </th>
                <td>{ props.details?.volume }</td>
                </tr>
                <tr>
                <th>DayLow : </th>
                <td>{ props.details?.dayLow }</td>
                </tr>
                <tr>
                <th>Dayhigh : </th>
                <td>{ props.details?.dayHigh }</td>
                </tr>
                <tr>
                <th>YearLow : </th>
                <td>{ props.details?.yearLow }</td>
                </tr>
                <tr>
                <th>YearHigh : </th>
                <td>{ props.details?.yearHigh }</td>
                </tr>
                <tr>
                <th>Avg50Price : </th>
                <td> { props.details?.avg50Price }</td>
                </tr>
                <tr>
                <th>avg200Price : </th>
                <td>{ props.details?.avg200Price }</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div className="modal-footer">

        </div>
        </div>
    </div>
    </div>
        
    </>
  )
}

export default ModalDetails