
import React, {useState, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft,faEye, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row,Image,Form, Card, Button, FormCheck, Container, InputGroup, Modal  } from '@themesberg/react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import  axios  from 'axios';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import Logo from "../../assets/img/technologies/logo.png";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";

import { useFormik } from "formik";
import * as Yup from 'yup';



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
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      //.test('must be strong',StringValid)
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
    //const navigate = Link();
    const API_URL = "http://localhost:8080/api/users/authenticate/mail";
    

  const  formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit(values) {
                    console.log('Logeddin');
                console.log({formik});
    try{
              axios.post(API_URL,{ 
               Email:formik.values.email,
               Password:formik.values.password
            }).then((res)=>{
              console.log("hello",res.data);
        history.push("/dashboard/overview");
        localStorage.setItem('email', formik.values.email);

            }).catch((e)=>     { setShowNotification(true);
            })

            
            
        }
     catch(err){
                console.log(API_URL)
                console.log(err)

        }
    }
  });
 
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const register2 = () => {
      axios.post("https://localhost:8080/api/users/authenticate/mail", {
        email: emailReg,
        password: passwordReg,
      }).then((response) => {
         console.log(response);
                  console.log("hello");

      });
    };
    
        const [email] = useState("");
    const [password] = useState("");

    const register = (email, password) => {
  return axios.post("https://localhost:8080/api/users/authenticate/mail", {
    email:formik.values.email,
    password: formik.values.password,
  });
};

   /*const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  let history = useHistory();

  const login = () => {
    const data = { Email: email, Password: password };
    axios.post("http://localhost:3001/api/users/",data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
        history.push("/");
      }
    });
  };*/
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

          <Row className="justify-content-center form-bg-image" >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0 pt-4">Bienvenue sur notre  CyberRange</h3>
                </div>
                <Form className="mt-4" onSubmit={formik.handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Votre Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control  id="email" name="email" type="email"              className="form-control"
            onChange={formik.handleChange}
            value={formik.values.email} 
 required       placeholder="example@company.com" />

                    </InputGroup>
                    <div className="text-danger">
            {formik.errors.email ? formik.errors.email : null}
          </div>

                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Mot de Passe</Form.Label>
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

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Rester Connecter</FormCheck.Label>
                      </Form.Check>
                      <Card.Link  href="examples/forgot-password" className="small text-end">Mot de passe oublié?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button  variant="primary" type="submit" className="w-100" >
                    Sign in
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faGoogle} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Non enregistrée?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Créer un compte `}
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
