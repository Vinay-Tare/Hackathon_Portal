import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Form,
  Row,
} from "reactstrap";

import { MdKeyboardReturn, MdSend } from "react-icons/md";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import { toast } from "react-toastify";
import CustomStatus from "../../components/CustomStatus";
import useAuth from "../../hooks/useAuth";
import { assignIdeaToPanelist } from "../../services/IdeaSevice";

const IdeaCard = ({ idea, availablePanelists }) => {
  const { refreshPage } = useAuth();
  const [isAssignVisible, setIsAssignVisible] = useState(false);
  const [selectedPanelist, setSelectedPanelist] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      panelistId: selectedPanelist.value,
      ideaId: idea.id,
    };
    assignIdeaToPanelist(data)
      .then((response) => {
        toast.success("Successfully Assigned Idea To Panelist");
        setTimeout(() => refreshPage(), 500);
      })
      .catch((response) => {
        toast.error("Error While Assigning Idea To Panelist");
      });
  };

  return (
    <Col xs={12} sm={6} md={4} className="my-2">
      <Card className="h-100 border border-dark rounded-0">
        <CardBody>
          <CardText>
            <span className="fw-bold m-0">Team Name: </span>
            {idea.teamName}
          </CardText>
          <CardText>
            <span className="fw-bold m-0">Title: </span>
            {idea.title}
          </CardText>
          <CardText>
            <span className="fw-bold m-0">Domain: </span>
            {idea.domain.name}
          </CardText>
          <CardText>
            <span className="fw-bold m-0">Description: </span>
            {idea.description}
          </CardText>
        </CardBody>
        <CardFooter className="bg-white border-0">
          {idea.panelist && (
            <div className="my-2">
              <CardText>
                <span className="fw-bold m-0">Assigned Panelist: </span>
                {idea.panelist.name}
              </CardText>
              <CustomStatus status={idea.status} />
            </div>
          )}
          {!isAssignVisible && (
            <Button
              block
              className="custom-button mb-2"
              onClick={() => setIsAssignVisible(true)}
            >
              Assign Idea To Panelists <MdSend />
            </Button>
          )}
          {isAssignVisible && (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12}>
                  <Select
                    options={availablePanelists}
                    placeholder="Select Panelist"
                    autoFocus={true}
                    value={selectedPanelist}
                    onChange={(panelist) => setSelectedPanelist(panelist)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={6}>
                  <Button
                    block
                    type="button"
                    color="danger"
                    className="custom-button"
                    onClick={() => setIsAssignVisible(false)}
                  >
                    <MdKeyboardReturn /> Back
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    block
                    className="custom-button"
                    type="submit"
                    disabled={!selectedPanelist}
                  >
                    Assign <MdSend />
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </CardFooter>
      </Card>
    </Col>
  );
};

const AllIdeas = ({ allIdeas, allPanelists }) => {
  const [availablePanelists, setAvailablePanelists] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (allPanelists) {
      setAvailablePanelists(
        allPanelists.map((panelist) => ({
          value: panelist.id,
          label: panelist.name,
        }))
      );
    }
  }, [allPanelists]);

  if (allIdeas && allPanelists)
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
            <span>All Ideas</span>
            <span>
              {isOpen ? <RxCaretUp size={30} /> : <RxCaretDown size={30} />}
            </span>
          </CardTitle>
          {isOpen && <hr className="text-dark" />}
          <Collapse isOpen={isOpen}>
            <Row>
              {allIdeas.length ? (
                allIdeas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    availablePanelists={availablePanelists}
                  />
                ))
              ) : (
                <Col xs={12} className="text-center fw-bold">
                  No Ideas Availaible
                </Col>
              )}
            </Row>
          </Collapse>
        </CardBody>
      </Card>
    );
};

export default AllIdeas;
