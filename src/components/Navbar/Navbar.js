// @flow
import * as React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import './Navbar.css';


export function AppNavbar(props) {
  const {activeUser, onLogOut} = props;
  return (
    <div className="c-nav">
      <Navbar expand="md">
        <Navbar.Brand href="#/">HAM System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {activeUser ? <Nav.Link href="#/">Home</Nav.Link> : null}
              {activeUser ? <Nav.Link href="#/dashboards">Dashboards</Nav.Link> : null}
              {activeUser ? <Nav.Link href="#/tenants">Tenants</Nav.Link> : null}
              {activeUser ? <Nav.Link href="#/messages">Messages</Nav.Link> : null}
              {activeUser ? <Nav.Link href="#/votings">Votings</Nav.Link> : null}
              {activeUser ? <Nav.Link href="#/issues">Issues</Nav.Link> : null}
            </Nav>
            <Nav className="ml-auto">
              {activeUser ? null : <Nav.Link href="#/login">LogIn</Nav.Link>}
              {activeUser ? null : <Nav.Link href="#/signup">SignUp</Nav.Link>}
              {activeUser ? <Nav.Link href="#" onClick={() => onLogOut()}>LogOut</Nav.Link> : null}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    </div>
  );
};