import React, { useEffect, useState } from 'react';
import { AppNavbar } from '../../components/Navbar/Navbar';
import Parse from 'parse';
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import './Tenants.css';
import UserModel from '../../models/UserModel';
import NewTenantModal from '../../components/NewTenantModat/NewTenantModal';
import TenantsView from '../../components/TenantsView/TenantsView';

function Tenants(props) {
    const {activeUser, onLogOut} = props;
    const [tenantsArr, setTenantsArr] = useState([]);
    const [searchByStr, setSearchByStr] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(()=> {
        async function fetchUsersData() {
            const parseUser = Parse.Object.extend('User');
            const query = new Parse.Query(parseUser);
            const community = new Parse.Object.extend('Community');
            community.id = activeUser.community;
            console.log("active user", activeUser)
            query.equalTo("community", activeUser.community);
            query.equalTo("isCommitteeMember", false);
            const parseUsers = await query.find();
            setTenantsArr(parseUsers.map(item => new UserModel(item)));
            console.log("tenants arr", tenantsArr);
        }

        if (activeUser) {
            fetchUsersData();
        }
    }, [activeUser])

    async function addTenant(fname, lname, email, pwd, building, apartment, img) {
        // const community = Parse.Object.extend('Community');
        // const query = new Parse.Query(community);
        // const message = Parse.Object.extend('message');
        // const newMessage = new message();
        // const communityObject = await query.get(activeUser.community.id);


        const community = Parse.Object.extend('Community');
        const query = new Parse.Query(community);
        const user = Parse.Object.extend('User');
        const newUser = new user();
        const communityObject = await query.get(activeUser.community.id);
        
        newUser.set('fname', fname);
        newUser.set('lname', lname);
        newUser.set('email', email);
        newUser.set('pwd', pwd);
        newUser.set('building', building);
        newUser.set('apartment', apartment);
        newUser.set('img', new Parse.File(img.name, img));
        newUser.set('community', communityObject)
        
        const parseUser = await newUser.save();
        setTenantsArr(tenantsArr.concat(new UserModel(parseUser)));
    }

    async function updateTenantInfo(id, title, details, priority, img) {
        // const message = Parse.Object.extend('message');
        // const query = new Parse.Query(message);
        // const object = await query.get(id);
        // object.set('title', title);
        // object.set('details', details);
        // object.set('priority', parseInt(priority));
        // object.set('img',  new Parse.File(img.name, img));
        // const response = await object.save();
        // console.log('Updated message', response);
        // const tmpArr = messagesArr.filter(item => item.id !== id);
        // setMessagesArr(tmpArr.concat(new MessageModel(response))); 
    }

    async function deleteTenant(id) {
        // const ParseMessage = Parse.Object.extend('message');
        // const query = new Parse.Query(ParseMessage);
        // const object = await query.get(id);
        // const response = await object.destroy();
        // console.log('Deleted message', response);
        // const tmpArr = messagesArr.filter(item => item.id !== id);
        // setMessagesArr(tmpArr);
    }


    //convert data to presentation
    const filteredTenants = tenantsArr.filter(tenant => (tenant.fname.includes(searchByStr) || tenant.lname.includes(searchByStr)));

        
    return (
        <div className="p-tenants">
            <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/>
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