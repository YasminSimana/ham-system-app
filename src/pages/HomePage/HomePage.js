// @flow
import * as React from 'react';
import { Carousel, Container, Row } from 'react-bootstrap';
import './HomePage.css';

export function HomePage(props) {
  const {activeUser, onLogOut} = props;
  return (
    <div className="p-hp">
      <div>

        <Container>
          <Row className="justify-content-lg-center">
            <h1>Homeowner Association Management System</h1>
          </Row>
          <Row>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block img-set mx-auto"
                src="https://www.gethow.org/wp-content/uploads/2019/08/property-manager.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Manage your committee</h3>
                <p>With this app you will find it very easy to manage your committee</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block img-set mx-auto"
                src="https://images.idgesg.net/images/article/2018/01/group-of-people-applauding_agreement_community-100746938-large.jpg"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Improve your performance</h3>
                <p>This app will help you improve your performance</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block img-set mx-auto"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqXbDmRJkcFQWqNf-cBaynQC-2sNF6mKcDag&usqp=CAU"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Happy tenants</h3>
                <p>Useing this app will lead to much happyer tenants</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </Row>
        </Container>
      </div>
      </div>
  );
};