import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardLink,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import validator from "validator";
import useAuth from "../../hooks/useAuth";
import { loginUser } from "../../services/UserService";
import "./index.css";

const SignIn = () => {
  const { login } = useAuth();
  const [userLoginForm, setUserLoginForm] = useState({
    email: "",
    password: "",
  });

  // Form Validation Schema
  const isEmailValid =
    validator.isEmail(userLoginForm.email) &&
    userLoginForm.email.split("@")[1] === "incedoinc.com";

  const handleChange = (e) => {
    setUserLoginForm({ ...userLoginForm, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(userLoginForm)
      .then((response) => {
        login({ loggedInUser: response.data });
      })
      .catch((error) => toast.error(error.response.data.error));
  };

  return (
    <Container className="my-5">
      <Row className="row justify-content-center">
        <Card className="space-2 border rounded-1">
          <CardBody>
            <CardTitle className="custom-card-title" tag="h4">
              HACKATHON PORTAL
            </CardTitle>
            <Form
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              <Row className="mt-5 justify-content-center">
                <Col xs={10} md={8}>
                  <FormGroup>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="custom-input my-3"
                      placeholder="Email Id"
                      onChange={(e) => handleChange(e)}
                      valid={Boolean(userLoginForm.email && isEmailValid)}
                      invalid={Boolean(userLoginForm.email && !isEmailValid)}
                      required
                    />
                    <FormFeedback valid>Great, Incedoer !</FormFeedback>
                    <FormFeedback>
                      Email should be of domain: incedoinc.com !
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs={10} md={8}>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="custom-input my-3"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </Col>
              </Row>
              <Row className="justify-content-md-center my-4">
                <Col xs={12} md={3}>
                  <Button
                    block
                    className="custom-button rounded-1 space-3"
                    disabled={!isEmailValid}
                  >
                    LOGIN
                  </Button>
                </Col>
              </Row>
              <CardText className="text-center my-1">
                Don't have an account?{" "}
                <CardLink className="text-decoration-none" href="/register">
                  REGISTER
                </CardLink>
              </CardText>
            </Form>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
};

export default SignIn;
