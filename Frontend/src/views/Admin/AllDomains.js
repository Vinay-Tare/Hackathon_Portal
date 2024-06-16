import React, { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Row,
} from "reactstrap";

const AllDomains = ({ domains }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  if (domains)
    return (
      <Card
        className="my-3"
        style={{
          boxShadow: "0px 0px 3px black",
        }}
      >
        <CardBody>
          <CardTitle
            tag="h5"
            role="button"
            onClick={toggle}
            className="custom-collapse-toggler custom-card-title"
          >
            <span>All Domains</span>
            <span>
              {isOpen ? <RxCaretUp size={30} /> : <RxCaretDown size={30} />}
            </span>
          </CardTitle>
          {isOpen && <hr className="text-dark" />}
          <Collapse isOpen={isOpen}>
            <Row>
              {domains.length > 0 ? (
                domains.map((domain) => (
                  <CardText key={domain.id}>{domain.name}</CardText>
                ))
              ) : (
                <Col xs={12} className="text-center fw-bold">
                  No Domains Added.
                </Col>
              )}
            </Row>
          </Collapse>
        </CardBody>
      </Card>
    );
};

export default AllDomains;
