// @flow
import * as React from 'react';
import { Carousel, Container, Row } from 'react-bootstrap';
import { AppNavbar } from '../../components/Navbar/Navbar';
import './HomePage.css';

export function HomePage(props) {
  const {activeUser, onLogOut} = props;
  return (
    <div className="p-hp">
      {/* <AppNavbar activeUser={activeUser} onLogOut={onLogOut}/> */}
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
              {/* <AppCard 
                img="https://www.gethow.org/wp-content/uploads/2019/08/property-manager.jpg"
                title="Manage your committee"
                desc="With this app you will find it very easy to manage your committee"
                link="">
              </AppCard>
            <AppCard 
                img="data:image/jpeg;base64,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"
                title="Improve your performance"
                desc="This app will help you improve your performance"
                link="">
              </AppCard>
            <AppCard 
                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqXbDmRJkcFQWqNf-cBaynQC-2sNF6mKcDag&usqp=CAU"
                title="Happy tenants"
                desc="Useing this app will lead to much happyer tenants"
                link="">
              </AppCard> */}
          </Row>
        </Container>
      </div>
      </div>
  );
};