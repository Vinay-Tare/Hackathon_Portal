import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { addDomain } from "../../services/DomainService";

const AddDomain = () => {
  const [domainName, setDomainName] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    addDomain(domainName)
      .then((response) => {
        toast.success("Domain Added Successfully");
      })
      .catch(function (error) {
        toast.error(error.response.data.error);
      });
    setDomainName("");
  };

  return (
    <Card
      className="my-3"
      style={{
        boxShadow: "0px 0px 3px black",
      }}
    >
      <CardBody>
        <CardTitle tag="h5" className="custom-card-title">
          Add Domain
        </CardTitle>
        <Form onSubmit={onFormSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <FormGroup>
                <Input
                  id="domainName"
                  name="domainName"
                  type="text"
                  className="custom-input"
                  placeholder="Enter Domain Name"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <Button block className="custom-button" disabled={!domainName}>
                Add Domain
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AddDomain;
