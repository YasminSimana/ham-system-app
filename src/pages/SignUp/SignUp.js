import * as React from 'react';
import Parse from 'parse';
import UserModel from '../../models/UserModel';
import { Button, Form, Image, Row} from 'react-bootstrap';
import { Redirect } from 'react-router';
import './SignUp.css';
import { useState } from 'react';

export function SignUp(props) {
  const {onSignUp} = props;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [userName, setUserName] = useState("");
  const [img, setImg] = useState(null);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [apartment, setApartment] = useState("");
  const [redirect, setRedirect] = useState(false);
  
  function handleFileChange(e) {
    if (e.target.files.length === 1) {
        setImg(e.target.files[0]);
    } else {
        setImg(null);
    }
  }

  async function signup() {
    try{
        const Community = Parse.Object.extend('Community');
        const myNewObject = new Community();

        myNewObject.set('address', { city: city, street: street });

        const result = await myNewObject.save();
        
        console.log('Community created', result);

        const user = new Parse.User()
        user.set('username', userName);
        user.set('email', email);
        user.set('fname', fname);
        user.set('lname', lname);
        user.set('apartment', apartment);
        user.set('isCommitteeMember', true);
        user.set('img', new Parse.File(img.name, img));
        user.set('community', result);
        user.set('building', building);
        user.set('password', pwd);

        user.signUp().then((user) => {
        console.log('User signed up', user);
        }).catch(error => {
        console.error('Error while signing up user', error);
        });
        onSignUp(user);
        setRedirect(true);
        }
        catch(error){
            console.error('Error while creating Community: ', error);
        }
  }

  if (redirect) {
    return <Redirect to="/" />;
  }

  const imgURL = img ? URL.createObjectURL(img) : "";

  return (
    <div className="p-signup">
        
      <Form>
      <h2>
            Create a Committee Member Account
        </h2>
        <Form.Group controlId="formBasicUserFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control value={fname} type="text" placeholder="Enter your first name" onChange={(e)=>setFname(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicUserLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control value={lname} type="text" placeholder="Enter your last name" onChange={(e)=>setLname(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicUserLastName">
          <Form.Label>User name</Form.Label>
          <Form.Control value={userName} type="text" placeholder="Select your user name" onChange={(e)=>setUserName(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control value={email} type="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={pwd} type="password" placeholder="Password" onChange={(e)=>setPwd(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicUserCity">
          <Form.Label>City</Form.Label>
          <Form.Control value={city} type="text" placeholder="Enter city name" onChange={(e)=>setCity(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicUserLastName">
          <Form.Label>Street</Form.Label>
          <Form.Control value={street} type="text" placeholder="Enter street name" onChange={(e)=>setStreet(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicUserLastName">
          <Form.Label>Building</Form.Label>
          <Form.Control value={building} type="text" placeholder="Enter building number" onChange={(e)=>setBuilding(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicUserLastName">
          <Form.Label>Apartment</Form.Label>
          <Form.Control value={apartment} type="text" placeholder="Enter apartment number" onChange={(e)=>setApartment(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalImage">
          <Form.Label>Img</Form.Label>
          <Form.Control type="file" placeholder="Select profile img" accept="image/*" onChange={handleFileChange}/>
        </Form.Group>

        <Image src={imgURL} className="img-preview"/>

        <Button variant="primary" type="button" onClick={signup}>
          Submit
        </Button>
      </Form>
      
      
    </div>
  );
};