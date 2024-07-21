import React, { Component } from 'react';
import './result.css';
import { Button } from 'react-bootstrap';
import Popup from './Popup';


class ResultItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
          };

        // Bind the method to the component instance
        this.formatTime = this.formatTime.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }
    handleShow = () => {
        this.setState({ showModal: true });
      };
    
      handleClose = () => {
        this.setState({ showModal: false });
      };

    formatTime(time24) {
        const [hour, minute] = time24.split(':').map(Number);
        const period = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
    }


    render() {
        
        const { data } = this.props;

        return (
            <div className='item-container'>

               <div className='destination-holder'>
                <h4 className='text-left-align'>From {data.from}</h4>
                <p className='text-left-align'>Departure <span className='bold-text'>{this.formatTime(data.departureTime)}</span></p>
               </div>

               <div className='flight-detail'>
                    <h3 className='text-center-align detail-title'>Flight Detail</h3>
                    <p className='text-center-align'>Passengers: <span className='bold-text'>{data.passengers}</span></p>
                    <p className='text-center-align'>Disnatce: <span className='bold-text'>{Math.round(data.distance)}</span></p>
                    <p className='text-center-align'>FlightDate: <span className='bold-text'>{data.flightDate}</span></p>
                    <p className='text-center-align'>Flight Time: <span className='bold-text'>{data.totalTime}</span></p>
               </div>

               <div className='destination-holder'>
               <h4 className='text-right-align'>To {data.to}</h4>
               <p className='text-right-align'>Arrival <span className='bold-text'>{this.formatTime(data.arrivalTime)}</span></p>
               <div className='empty-grow-div'></div>
              
               <p className='text-right-align'>Price:<span className='bold-text'>{data.price} USD</span> </p>
               <button className='book-btn' onClick={this.handleShow} >Book Flight</button>
                </div>
                <Popup 
          show={this.state.showModal} 
          handleClose={this.handleClose} 
        />
               
            </div>
        );
    }
}

export default ResultItem;
