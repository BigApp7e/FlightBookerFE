import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Popup extends Component {
  render() {
    const { show, handleClose } = this.props;

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have successfully booked your flight!
        Thank you for using our services.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Popup;
