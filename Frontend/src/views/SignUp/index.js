import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { registerUser } from "../../services/UserService";
import "./index.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [registerUserForm, setRegisterUserForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  // Form Validation Schema
  const isNameValid = validator.isLength(registerUserForm.name, {
    min: 3,
    max: 20,
  });

  const isEmailValid =
    validator.isEmail(registerUserForm.email) &&
    registerUserForm.email.split("@")[1] === "incedoinc.com";

  const isPasswordValid = validator.isStrongPassword(registerUserForm.password);

  useEffect(() => {
    if (
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      confirmPassword === registerUserForm.password
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    isNameValid,
    isEmailValid,
    isPasswordValid,
    confirmPassword,
    setIsDisabled,
    registerUserForm.password,
  ]);

  const handleChange = (e) => {
    setRegisterUserForm({
      ...registerUserForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!isDisabled) {
      registerUser(registerUserForm)
        .then(() => {
          toast.success("User Registered SuccessFully.");
          setTimeout(() => {
            navigate("/login");
          }, 500);
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
    }
  };

  return (
    <Container className="my-5">
      <Row className="row justify-content-center">
        <Card className="space-4 border rounded-1">
          <CardBody>
            <CardTitle className="custom-card-title" tag="h4">
              REGISTER
            </CardTitle>
            <Form
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              <Row className="mt-3 gy-2 justify-content-center">
                <Col xs={10} md={8}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      className="custom-input"
                      placeholder="Full Name"
                      value={registerUserForm.name}
                      onChange={handleChange}
                      valid={Boolean(registerUserForm.name && isNameValid)}
                      invalid={Boolean(registerUserForm.name && !isNameValid)}
                      required
                    />
                    <FormFeedback valid>Great Name !</FormFeedback>
                    <FormFeedback>
                      Full Name should contain atleast 3 or atmost 20 letters !
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs={10} md={8}>
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      className="custom-input"
                      placeholder="Email Id"
                      value={registerUserForm.email}
                      onChange={handleChange}
                      valid={Boolean(registerUserForm.email && isEmailValid)}
                      invalid={Boolean(registerUserForm.email && !isEmailValid)}
                      required
                    />
                    <FormFeedback valid>Great, Incedoer !</FormFeedback>
                    <FormFeedback>
                      Email should be of domain: incedoinc.com !
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs={10} md={8}>
                  <FormGroup>
                    <Input
                      type="password"
                      className="custom-input"
                      name="password"
                      placeholder="Password"
                      value={registerUserForm.password}
                      onChange={handleChange}
                      valid={Boolean(
                        registerUserForm.password && isPasswordValid
                      )}
                      invalid={Boolean(
                        registerUserForm.password && !isPasswordValid
                      )}
                      required
                    />
                    <FormFeedback valid>
                      Password Strength Is Good !
                    </FormFeedback>
                    <FormFeedback>
                      Password should be alphanumeric with atleast 8 characters!
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col xs={10} md={8}>
                  <FormGroup>
                    <Input
                      type="password"
                      className="custom-input"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      valid={Boolean(
                        confirmPassword &&
                          confirmPassword === registerUserForm.password
                      )}
                      invalid={Boolean(
                        confirmPassword &&
                          confirmPassword !== registerUserForm.password
                      )}
                      required
                    />
                    <FormFeedback valid>Password Confirmed !</FormFeedback>
                    <FormFeedback>
                      Confirm Password Doesn't Match !
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="justify-content-center my-4">
                <Col xs={10} md={3}>
                  <Button
                    block
                    className="custom-button rounded-3"
                    disabled={isDisabled}
                  >
                    REGISTER
                  </Button>
                </Col>
              </Row>
              <CardText className="text-center my-3">
                Already have an account?{" "}
                <CardLink className="text-decoration-none" href="/login">
                  LOGIN
                </CardLink>
              </CardText>
            </Form>
          </CardBody>
        </Card>
      </Row>
    </Container>
  );
};

export default SignUp;
