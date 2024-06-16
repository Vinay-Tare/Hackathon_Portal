import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroupText,
  Row,
} from "reactstrap";
import { addJudgeOrPanelist } from "../../services/UserService";
import useAuth from "../../hooks/useAuth";
import validator from "validator";

const USER_TYPES = [
  { value: "PANELIST", label: "Panelist" },
  { value: "JUDGE", label: "Judge" },
];

const AddUser = () => {
  const { refreshPage } = useAuth();
  const [selectedUserType, setSelectedUserType] = useState(USER_TYPES[0]);
  const [addUserFormData, setAddUserFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  // Form Validation Schema
  const isNameValid = validator.isLength(addUserFormData.name, {
    min: 3,
    max: 20,
  });

  const isEmailValid =
    validator.isEmail(addUserFormData.email) &&
     addUserFormData.email.split("@")[1] === "incedoinc.com";

  const isPasswordValid = validator.isStrongPassword(addUserFormData.password);

  const onFormSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...addUserFormData,
      roles: selectedUserType.value,
    };
    addJudgeOrPanelist(data)
      .then((response) => {
        let user = response.data;
        let userRoles = user.roles.split(",");
        if (userRoles.includes("JUDGE") && userRoles.includes("PANELIST")) {
          toast.success(
            "Panelist " + user.name + " Upgraded To Judge SuccessFully!"
          );
        } else if (userRoles.includes("JUDGE")) {
          toast.success("Judge Added SuccessFully!");
        } else if (userRoles.includes("PANELIST")) {
          toast.success("Panelist Added SuccessFully!");
        }

        setTimeout(() => refreshPage(), 1000);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const onInputChange = (e) => {
    setAddUserFormData({
      ...addUserFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="my-3" style={{ boxShadow: "0px 0px 3px black" }}>
      <CardBody>
        <CardTitle tag="h5" className="custom-card-title">
          Add User
        </CardTitle>
        <Form onSubmit={onFormSubmit} className="my-3">
          <Row>
            <Col xs={12}>
              <FormGroup>
                <Row className="g-0">
                  <Col xs={12} md={2}>
                    <InputGroupText className="custom-input-group-text">
                      Select User Type
                    </InputGroupText>
                  </Col>
                  <Col xs={12} md={3}>
                    <Select
                      id="userType"
                      name="userType"
                      options={USER_TYPES}
                      value={selectedUserType}
                      onChange={(userType) => setSelectedUserType(userType)}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      required
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  className="custom-input"
                  placeholder={
                    selectedUserType?.label === "Panelist"
                      ? "Enter Panelist Name"
                      : selectedUserType?.label === "Judge"
                      ? "Enter Judge Name"
                      : ""
                  }
                  value={addUserFormData.name}
                  onChange={onInputChange}
                  valid={Boolean(addUserFormData.name && isNameValid)}
                  invalid={Boolean(addUserFormData.name && !isNameValid)}
                  required
                />
                <FormFeedback valid>Great Name !</FormFeedback>
                <FormFeedback>
                  Full Name should contain atleast 3 or atmost 20 letters !
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="custom-input"
                  placeholder={
                    selectedUserType?.label === "Panelist"
                      ? "Enter Panelist Email"
                      : selectedUserType?.label === "Judge"
                      ? "Enter Judge Email"
                      : ""
                  }
                  value={addUserFormData.email}
                  onChange={onInputChange}
                  valid={Boolean(addUserFormData.email && isEmailValid)}
                  invalid={Boolean(addUserFormData.email && !isEmailValid)}
                  required
                />
                <FormFeedback valid>Great, Incedoer !</FormFeedback>
                <FormFeedback>
                  Email should be of domain: incedoinc.com !
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="custom-input"
                  placeholder={
                    selectedUserType?.label === "Panelist"
                      ? "Enter Panelist Password"
                      : selectedUserType?.label === "Judge"
                      ? "Enter Judge Password"
                      : ""
                  }
                  value={addUserFormData.password}
                  onChange={onInputChange}
                  valid={Boolean(addUserFormData.password && isPasswordValid)}
                  invalid={Boolean(
                    addUserFormData.password && !isPasswordValid
                  )}
                  required
                />
                <FormFeedback valid>Password Strength Is Good !</FormFeedback>
                <FormFeedback>
                  Password should be alphanumeric with atleast 8 characters!
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
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
                      confirmPassword === addUserFormData.password
                  )}
                  invalid={Boolean(
                    confirmPassword &&
                      confirmPassword !== addUserFormData.password
                  )}
                  required
                />
                <FormFeedback valid>Password Confirmed !</FormFeedback>
                <FormFeedback>Confirm Password Doesn't Match !</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row className="justify-content-md-end">
            <Col xs={12} md={4}>
              <Button
                block
                className="custom-button"
                disabled={
                  !isNameValid ||
                  !isEmailValid ||
                  !isPasswordValid ||
                  confirmPassword !== addUserFormData.password
                }
              >
                {selectedUserType?.label === "Panelist"
                  ? "Add Panelist"
                  : selectedUserType?.label === "Judge"
                  ? "Add Judge"
                  : ""}
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AddUser;
