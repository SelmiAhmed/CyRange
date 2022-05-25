
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEye, faEnvelope, faUnlockAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card,Image, Button, FormCheck, Container, InputGroup, Modal } from '@themesberg/react-bootstrap';
import { Link, useHistory } from "react-router-dom";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import Logo from "../../assets/img/technologies/logo.png";

import { useFormik } from "formik";
import * as Yup from 'yup';
import  axios  from 'axios';
import  emailExistence  from 'email-existence';
import { toast } from "react-toastify";


export default () => {
  const history = useHistory();

  const StringValid = (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) || value.length === 0;
  const StringValid2 = (value) => /^\d*[\.{a}]\d*$/.test(value) || value.length === 0;
  const StringValid3 = (value) => /^\d*[\.{A}]\d*$/.test(value) || value.length === 0;
    const [showPassword, setShowPassword] = useState(false);
  const passwordInputType = showPassword ? "text" : "password";
  const passwordIconColor = showPassword ? "#262B40" : "";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

const [showNotification, setShowNotification] = useState(false);
const handleClose = () => setShowNotification(false);


  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").min(6, "Username must be at least 8 characters").max(40, "Password must not exceed 40 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
      //.test('must be strong',StringValid)
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
    //const navigate = Link();
    const API_URL = "http://localhost:8080/api/users/register";
const { Auth, LoginCredentials } = require("two-step-auth");
  
async function login(emailId) {
  try {
    const res = await Auth(emailId, "CyberRange ANSI");
    console.log(res);
    console.log(res.mail);
    console.log(res.OTP);
    localStorage.setItem('o',res.OTP)
    console.log(res.success);
  } catch (error) {
    console.log(error);
  }
}
  


  const  formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit(values) {
    try{
      //const emailExistence = require("email-existence");

      console.log('Logeddin');
      console.log({formik});
      const Verifier = require("email-verifier");
      let verifier = new Verifier("at_5MQlA9KHRE5Nh1VxBTQMcfiyni2US");
          verifier.verify(formik.values.email, {
            checkCatchAll: false,
            checkDisposable: false,
            checkFree: false,
            validateDNS: false,
            validateSMTP: false
          }, (err, data) => {
      if (data.dnsCheck === "false") {
      toast.error('mail is invalid');
      }
    else { 
      try{

        axios.post(API_URL,{ 
          Username:formik.values.username,
          Email:formik.values.email,
          Password:formik.values.password
       }).then((res)=>{
        history.push("/examples/lock");
        login(formik.values.email);
LoginCredentials.mailID = "testdevtest20@gmail.com"; 
LoginCredentials.password = "A1234567890.a"; 
LoginCredentials.use = false;
console.log(res.data);
         })
        }
          catch(e){
            setShowNotification(true);
           }
      }
              }); 
        }
     catch(err){
                console.log(err);   
        }
    }
  });
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
                <React.Fragment>

  <Modal centered show={showNotification} className="modal-secondary" onHide={handleClose}>
    <Modal.Header>
      <Modal.Title>
        <p className="mb-0 pe-3 pe-md-0">
Error        </p>
      </Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
      <div className="py-3 text-center">

        <Modal.Title className="h4 my-3">Verifier Vos données!</Modal.Title>
      </div>
    </Modal.Body>
  </Modal>
</React.Fragment>

        <p className="text-center">
          <Image src={Logo}  />
          </p>
          <p className="text-center">
          <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
            </p>
          <Row className="justify-content-center form-bg-image">
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Créer un compte</h3>
                </div>
                <Form className="mt-4" onSubmit={formik.handleSubmit}>
                                   <Form.Group id="email" className="mb-4">
                    <Form.Label>Votre Username</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control autoFocus  id="username" name="username" type="username"              className="form-control"
            onChange={formik.handleChange}
            value={formik.values.username} 
 required   placeholder="Username" />
                    </InputGroup>
                                        <div className="text-danger">
            {formik.errors.username ? formik.errors.username : null}
          </div>

                  </Form.Group>

                 
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Votre Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus  id="email" name="email" type="email"              className="form-control"
            onChange={formik.handleChange}
            value={formik.values.email} 
 required   placeholder="example@company.com" />
                    </InputGroup>
                                        <div className="text-danger">
            {formik.errors.email ? formik.errors.email : null}
          </div>

                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Votre Mot de passe</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control   id="password"   name="password"  
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.password} 
  required type={passwordInputType} placeholder="Password" />
                        <InputGroup.Text onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon color={passwordIconColor} icon={faEye} />
                      </InputGroup.Text>

                    </InputGroup>

                                        <div className="text-danger">
            {formik.errors.password ? formik.errors.password : null}
          </div>

                  </Form.Group>
                    { /*<Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirmer Mot de passe</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Confirm Password" />
                    </InputGroup>
                  </Form.Group>*/}
                  <FormCheck type="checkbox" default="checked" className="d-flex mb-4">
                    <FormCheck.Input required id="terms" className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                     J'accepte les <Card.Link>règles et les conditions</Card.Link>
                    </FormCheck.Label>
                  </FormCheck>

                  <Button  variant="primary" type="submit" className="w-100">
                    Sign up
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">ou</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faGoogle} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    J'ai déja un compte?
                    <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                      {` Login ici `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
