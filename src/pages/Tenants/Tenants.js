import React, { useState } from 'react';
import { AppNavbar } from '../../components/Navbar/Navbar';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './Tenants.css';
import NewTenantModal from '../../components/NewTenantModat/NewTenantModal';
import TenantsView from '../../components/TenantsView/TenantsView';
import { Redirect } from 'react-router';

function Tenants(props) {
    const {activeUser, users, addTenant, updateTenantInfo, deleteTenant, onLogOut} = props;
    const [searchByStr, setSearchByStr] = useState("");
    const [showModal, setShowModal] = useState(false);

    
    if(!activeUser) {
        return <Redirect to="/" />
    }



    //convert data to presentation
    let tenants = users.filter(user=> user.deleted === false && user.isCommitteeMember === false);
    console.log("tenants", tenants)
    const filteredTenants = tenants.filter(tenant => (tenant.fname.includes(searchByStr) || tenant.lname.includes(searchByStr)));

        
    return (
        <div className="p-tenants">
            {/* <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/> */}
            <div className="filters">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <Form>
                                <Form.Group controlId="formBasicSearch">
                                <Form.Control value={searchByStr} type="text" placeholder="Filter by text in Title and Details" onChange={e => setSearchByStr(e.target.value)}/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="new-msg-btn">
                            <Button variant="link" onClick={() => setShowModal(true)}>New Tenant</Button>
                        </Col>
                    </Row>
                </Container>
                
            </div>
            
            <Container>
                <TenantsView tenants={filteredTenants} activeUser={activeUser} deleteTenant={deleteTenant} updateTenantsInfoFromModal={updateTenantInfo}/>
            </Container>
            <NewTenantModal show={showModal} handleClose={() => setShowModal(false)} addTenant={addTenant}/>
        </div>
    );
}

export default Tenants;