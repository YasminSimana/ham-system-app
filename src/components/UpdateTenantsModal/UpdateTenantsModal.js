import { useState } from 'react';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';

function UpdateTenantsModal(props) {
    const { show, user, handleClose, updateTenant, id, currentFname, currentLname, currentEmail, currentBuilding, currentApartment, currentImg} = props;
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [building, setBuilding] = useState("");
    const [apartment, setApartment] = useState("");
    const [img, setImg] = useState("");
    
    function closeModal() {
      setFname("");
      setLname("");
      setEmail("");
      setBuilding("");
      setApartment("");
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

    function handleUpdate() {
        const newFname = fname ? fname : currentFname;
        const newLname = lname ? lname : currentLname;
        const newEmail = email ? email : currentEmail;
        const newBuilding = building ? building : currentBuilding;
        const newApartment = apartment ? apartment : currentApartment;
        const newImg = img ? img : currentImg;
        updateTenant(user, id, newFname, newLname, newEmail, newBuilding, newApartment, newImg);
        closeModal();
    }
  
    const imgURL = img ? URL.createObjectURL(img) : "";

    return (
      <Modal show={show} onHide={closeModal} size="xl" className="c-new-message-modal">
          <Modal.Header closeButton>
              <Modal.Title>Update Tenant's Info</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <Form>
                
                  <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column sm={3}>
                          First Name
                      </Form.Label>
                      <Col sm={9}>
                          <Form.Control type="text" placeholder={currentFname} value={fname} onChange={e => setFname(e.target.value)} />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={3}>
                        Last Name
                      </Form.Label>
                      <Col sm={9}>
                          <Form.Control type="text" placeholder={currentLname} value={lname} onChange={e => setLname(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={3}>
                        Email
                      </Form.Label>
                      <Col sm={9}>
                          <Form.Control type="email" placeholder={currentEmail} value={email} onChange={e => setEmail(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={3}>
                        Building
                      </Form.Label>
                      <Col sm={9}>
                          <Form.Control type="text" placeholder={currentBuilding} value={building} onChange={e => setBuilding(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={3}>
                        Apartment
                      </Form.Label>
                      <Col sm={9}>
                          <Form.Control type="text" placeholder={currentApartment} value={apartment} onChange={e => setApartment(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalImage">
                      <Form.Label column sm={3}>
                          Image
                      </Form.Label>
                      <Col sm={9}>
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
              <Button variant="primary" onClick={handleUpdate}>
                  Update Tenant
              </Button>
          </Modal.Footer>
      </Modal>
  );
  }

export default UpdateTenantsModal;