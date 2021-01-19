import { useState } from 'react';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';

function UpdateMessageModal(props) {
    const { show, handleClose, updateMessage, id, currentTitle, currentDetails, currentPriority, currentImg} = props;
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [priority, setPriority] = useState(null);
    const [img, setImg] = useState(null);
    
    function closeModal() {
      setTitle("");
      setDetails("");
      setPriority(null);
      setImg(null);
      handleClose();
    }

    function handleFileChange(e) {
      if (e.target.files.length === 1) {
          setImg(e.target.files[0]);
      } else {
          setImg(null);
      }
    }

    function handleUpdateMessage() {
        const newTitle = title ? title : currentTitle;
        const newDetails = details ? details : currentDetails;
        const newPriority = priority ? priority : currentPriority;
        const newImg = img ? img : currentImg;
        console.log("update", newTitle, newDetails, newPriority, newImg);
        updateMessage(id, newTitle, newDetails, newPriority, newImg);
        closeModal();
    }
  
    const imgURL = img ? URL.createObjectURL(img) : "";

    return (
      <Modal show={show} onHide={closeModal} size="xl" className="c-new-message-modal">
          <Modal.Header closeButton>
              <Modal.Title>Update Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                
                  <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column sm={2}>
                          Message Title
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder={currentTitle} value={title} onChange={e => setTitle(e.target.value)} />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                          Message Details
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder={currentDetails} value={details} onChange={e => setDetails(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                          Message Priority
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="number" placeholder={currentPriority} value={priority} onChange={e => setPriority(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalImage">
                      <Form.Label column sm={2}>
                          Message Image
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                      </Col>
                  </Form.Group>
              </Form>
              <Image src={imgURL} className="img-preview"/>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                  Cancel
              </Button>
              <Button variant="primary" onClick={handleUpdateMessage}>
                  Update Message
              </Button>
          </Modal.Footer>
      </Modal>
  );
  }

export default UpdateMessageModal;