// @flow
import * as React from 'react';
import Parse from 'parse';
import UserModel from '../../models/UserModel';
import { Button, Form} from 'react-bootstrap';
import { Redirect } from 'react-router';
import './LogIn.css';
import { useState } from 'react';

export function LogIn(props) {
  const {onLogIn} = props;
  const [userName, setUserName] = useState("yasmins")
  const [email, setEmail] = useState("yasminsheffer21@gmail.com");
  const [pwd, setPwd] = useState("123");
  const [redirect, setRedirect] = useState(false);

  async function login() {
    try{
      const parseUser = await Parse.User.logIn(email,pwd);
      console.log('Logged in user', parseUser);
      const user = new UserModel(parseUser);
      console.log("community", user.community.id);
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
        <h2>
          Log-In to HAM
        </h2>
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
        <Button variant="primary" type="button" onClick={login}>
          Submit
        </Button>
      </Form>
      
    </div>
  );
};