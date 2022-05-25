
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEye, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Image, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import Logo from "../../assets/img/technologies/logo.png";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { useFormik,Field } from "formik";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputType = showPassword ? "text" : "password";
  const passwordIconColor = showPassword ? "#262B40" : "";
  const history = useHistory();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const o = localStorage.getItem('o');
  const  formik = useFormik({
    initialValues: {
      otp: ""
    },
    onSubmit (values) {
         }
  });

  return (
    <main>
      <section className="vh-lg-100 bg-soft d-flex align-items-center my-4">
        <Container>
        <p className="text-center">
          <Image src={Logo}  />
          </p>

          <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image">
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border border-light rounded p-4 p-lg-5 w-100 fmxw-500">
              <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Confirmer le mail</h3>
                </div>                <Form className="mt-5">
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Entre the code</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control id="otp" name="otp"                             onChange={formik.handleChange}



value={formik.values.otp} required type={passwordInputType} placeholder="Write OTP" />
                      <InputGroup.Text onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon color={passwordIconColor} icon={faEye} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" onClick={(values)=>{
                    if (o==formik.values.otp){
                      console.log(o);
                      history.push("/dashboard/overview");
                      localStorage.removeItem('o')
                    }
                    else {
                       toast.error("wrong otp. Try Again")
                    }
                  }} className="w-100">
                    Confirm
                  </Button>
                  <div className="text-left text-md-left mb-4 mt-md-0">
                  <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Resend Code
            </Card.Link>
            </div>

                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
