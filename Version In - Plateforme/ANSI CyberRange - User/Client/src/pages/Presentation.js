import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faExternalLinkAlt, faCheckCircle, faCalendarAlt, faCodeBranch, faShoppingCart, faFolder, faMapMarkedAlt, faPager, faFileCode, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faBootstrap, faGithub, faJs, faReact, faSass } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, Container, ListGroup, Tooltip, OverlayTrigger, Form, Navbar, Nav, Badge } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Code from "../components/CodeEditor";
import GitHubButton from 'react-github-btn';

import { Routes } from "../routes";
import ThemesbergLogoIcon from "../assets/img/themesberg.svg";
import ThemesbergLogo from "../assets/img/themesberg-logo.svg";
import MockupPresentation from "../assets/img/mockup-presentation.png";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import MapboxImg from "../assets/img/mockup-map-presentation.png";
import CalendarImg from "../assets/img/mockup-calendar-presentation.png";
import ReactMockupImg from "../assets/img/react-mockup.png";
import BS5IllustrationsImg from "../assets/img/illustrations/bs5-illustrations.svg";
import BS5Logo from "../assets/img/technologies/bootstrap-5-logo.svg";
import Logo from "../assets/img/technologies/logo.png";
import learn from "../assets/img/technologies/learn.PNG";
import hack from "../assets/img/technologies/Hack.PNG";
import sec from "../assets/img/technologies/sec.PNG";
import ex from "../assets/img/technologies/ex.PNG";

import pages from "../data/pages";
import features from "../data/features";

export default () => {
  const PagePreview = (props) => {
    const { name, image, link } = props;

    return (
      <Col xs={6} className="mb-5">
        <Card.Link as={Link} to={link} className="page-preview page-preview-lg scale-up-hover-2">
          <Image src={image} className="shadow-lg rounded scale" alt="Dashboard page preview" />

          <div className="text-center show-on-hover">
            <h6 className="m-0 text-center text-white">
              {name} <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-2" />
            </h6>
          </div>
        </Card.Link>
      </Col>
    );
  };

  const Feature = (props) => {
    const { title, description, icon } = props;

    return (
      <Col xs={12} sm={6} lg={3}>
        <Card className="bg-white shadow-soft text-primary rounded mb-4">
          <div className="px-3 px-lg-4 py-5 text-center">
            <span className="icon icon-lg mb-4">
              <FontAwesomeIcon icon={icon} />
            </span>
            <h5 className="fw-bold text-primary">{title}</h5>
            <p>{description}</p>
          </div>
        </Card>
      </Col>
    );
  };

  const FolderItem = (props) => {
    const { name, icon, tooltip, iconColor } = props;
    const color = iconColor ? `text-${iconColor}` : "";

    return (
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="left"
        overlay={<Tooltip>{tooltip}</Tooltip>}
      >
        <li data-toggle="tooltip" data-placement="left" title="Main folder that you will be working with">
          <FontAwesomeIcon icon={icon ? icon : faFolder} className={`${color} me-2`} /> {name}
        </li>
      </OverlayTrigger>
    );
  };

  return (
    <>
      <Navbar variant="white" expand="lg" bg="light" className="navbar-transparent navbar-theme-white sticky-top">
        <Container className="position-relative justify-content-between px-3">
            <Image src={Logo} classname="mb-5"/>

          <div className="d-flex align-items-center">
     
                       <Button href="/examples/Sign-in" variant="outline-primary" className="ms-3"> Connexion</Button>
            <Button  href="/examples/Sign-up" variant="outline-primary" className="ms-3"> S'inscrire</Button>
          </div>
        </Container>
      </Navbar>
      <div className="section-header overflow-hidden  bg-light text-white" id="home">
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <div className="react-big-icon d-none d-lg-block"><span className="fab fa-react"></span></div>
              <h1 className="fw-bolder text-primary mb-5">Bienvenue sur la Plateforme CyberRange de l'ANSI</h1>
              <p className="text-primary fw-light mb-2 h5">Solution de simulation avancée pour entraîner et développer leur expertise en cybersécurité</p>
              <p className="text-primary fw-light mb-2 h5">Pour commencer, consultez le guide d'utilisation ici: <u><b>Guide d'utilisation</b></u></p>
  
            </Col>
            <div className="section pt-0 bg-light mb-0">
</div>
            <div className="section pt-0 bg-light mb-4">
        <Container className="mt-n10 mt-lg-n12 z-2">
          <Row className="justify-content-center mt-5 mt-lg-12">
            <Col xs={12}>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5 mt-lg-6 ">
            <h1 className="text-center mb-5 text-primary">Fonctionnalités</h1>
            <Col xs={6} md={3} className="text-center mb-4">
              <Image src={learn} className="shadow-lg rounded scale" alt="CTF" />
              <h3 className="fw-bolder text-primary">Exercices Pratiques</h3>
              <p className="text-gray"></p>
            </Col>
            <Col xs={6} md={3} className="text-center mb-4">
              <Image src={ex} className="shadow-lg rounded scale" alt="CTF" />
              
              <h3 className="fw-bolder text-primary">Simulation en temps réel</h3>
              <p className="text-gray"></p>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <Image src={hack} className="shadow-lg rounded scale" alt="CTF" />
              <h3 className="fw-bolder text-primary">CTFs</h3>
              <p className="text-gray"></p>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <Image src={sec} className="shadow-lg rounded scale" alt="CTF" />
              <h3 className="fw-bolder text-primary">Solution sécurisée</h3>
              <p className="text-gray"></p>
            </Col>
          </Row>
        </Container>
      </div>

          </Row>
        </Container>
      </div>
      <footer className="footer py-6 bg-light text-primary">
        <div className="d-flex text-center justify-content-center align-items-center" role="contentinfo">
        <p className="font-weight-normal font-small mb-0">Plateforme CyberRange © ANSI 2022-</p>

              </div>


      </footer>

     
    </>
  );
};
