import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

function EndDateUpdateModal(props) {
    const { show, handleClose, updateVoting, voting} = props;
    const [endDate, setEndDate] = useState("");
    let currentEndDate;
    if (voting) {
        currentEndDate = voting.endDate;
    }

    function closeModal() {
      setEndDate("");
      handleClose();
    }

    function handleUpdateVoting() {
        const newEndDate = endDate ? endDate : currentEndDate;
        console.log("update", newEndDate);
        // updateVoting(id, newEndDate);
        closeModal();
    }
  
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Change the end date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {console.log("index voting", voting)}
            Current End Date:
            {voting ? voting.endDate.toLocaleDateString() : null}
            <Form>
            <Form.Group as={Row} controlId="formHorizontalDesc">
              <Form.Label column sm={6}>
                New End Date
              </Form.Label>
              <Col sm={6}>
                  <Form.Control type="date" placeholder="New End Date" value={endDate} onChange={e => setEndDate(e.target.value)}  />
              </Col>
          </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
            Close
        </Button>
        {/* <Button variant="primary" onClick={handleUpdateEndDate(index)}>
            Save Changes
        </Button> */}
        </Modal.Footer>
    </Modal>
  );
  }

export default EndDateUpdateModal;