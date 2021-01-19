import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import './Card.css';

function AppCard(props) {
    const {img, title, desc, link} = props;
    return (
        <div className="c-app-card">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={img} roundedcircle="true" />
                <Image src={img} roundedCircle ></Image>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                    {desc}
                    </Card.Text>
                    {link ? <Button variant="primary" href={link}>More info...</Button> : null}
                </Card.Body>
            </Card>
        </div>
    );
}

export default AppCard;