import { useState } from 'react';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';

function NewTenantModal(props) {
    const { show, handleClose, addTenant } = props;
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [building, setBuilding] = useState("");
    const [apartment, setApartment] = useState("");
    const [img, setImg] = useState("");
    
    function closeModal() {
      setFname("");
      setLname("");
      setEmail("");
      setPwd("");
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

    function handleAddTenant() {
      addTenant(fname, lname, email, pwd, building, apartment, img);
      closeModal();
    }
  
    const imgURL = img ? URL.createObjectURL(img) : "";

    return (
      <Modal show={show} onHide={closeModal} size="xl" className="c-new-message-modal">
          <Modal.Header closeButton>
              <Modal.Title>New Tenant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                
                  <Form.Group as={Row} controlId="formHorizontalName">
                      <Form.Label column sm={2}>
                          Tenant First Name
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder="Tenant First Name" value={fname} onChange={e => setFname(e.target.value)} />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                        Tenant Last Name
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder="Tenant Last Name" value={lname} onChange={e => setLname(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                        Tenant Email Address
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="email" placeholder="Tenant Email Address" value={email} onChange={e => setEmail(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                        Building
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder="Building" value={building} onChange={e => setBuilding(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDesc">
                      <Form.Label column sm={2}>
                        Apartment
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control type="text" placeholder="Apartment" value={apartment} onChange={e => setApartment(e.target.value)}  />
                      </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalImage">
                      <Form.Label column sm={2}>
                          Tenant Image
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
              <Button variant="primary" onClick={handleAddTenant}>
                  Create Tenant
              </Button>
          </Modal.Footer>
      </Modal>
  );
  }

export default NewTenantModal;