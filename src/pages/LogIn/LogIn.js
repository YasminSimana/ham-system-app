// @flow
import * as React from 'react';
import Parse from 'parse';
import UserModel from '../../models/UserModel';
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import { Redirect } from 'react-router';
import './LogIn.css';

export function LogIn(props) {
  const {onLogIn} = props;
  const [userName, setUserName] = React.useState("yasmins")
  const [email, setEmail] = React.useState("yasminsheffer21@gmail.com");
  const [pwd, setPwd] = React.useState("123");
  const [redirect, setRedirect] = React.useState(false);

  async function login() {
    try{
      const parseUser = await Parse.User.logIn(email,pwd);
      console.log('Logged in user', parseUser);
      const user = new UserModel(parseUser);
      onLogIn(user);
      setRedirect(true);
    }
    catch(error) {
        console.error('Error while logging in user', error);
    }
  }

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="p-login">

      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control value={email} type="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicUserName">
          <Form.Label>User name</Form.Label>
          <Form.Control value={userName} type="text" placeholder="Enter your username" onChange={(e)=>setUserName(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={pwd} type="password" placeholder="Password" onChange={(e)=>setPwd(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="button" onClick={login}>
          Submit
        </Button>
      </Form>
      
    </div>
  );
};