import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import CustomCountdownTimer from "../../components/CustomCountdownTimer";

import useAuth from "../../hooks/useAuth";

const IdeaSubmission = ({
  teamSize,
  idea,
  setIdea,
  ideaDomains,
  selectedDomain,
  setSelectedDomain,
  submitTeamIdea,
  updateTeamIdea,
  isPanelistReviewOver,
  ideaSubmissionSchedule,
}) => {
  const { isAuth } = useAuth();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    if (idea) {
      if (idea.status && idea.status === "REVIEWED" && !isPanelistReviewOver) {
        setIsDisabled(false);
      } else if (
        idea.status &&
        ["ACCEPTED", "REJECTED", "UNDER REVIEW"].includes(idea.status)
      ) {
        setIsDisabled(true);
      } else if (isTimedOut || isPanelistReviewOver) {
        setIsDisabled(true);
      }
    }
  }, [idea, isTimedOut, isPanelistReviewOver]);

  const handleChange = (e) => {
    setIdea({ ...idea, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e, ideaData) => {
    e.preventDefault();
    if (!isDisabled) {
      if (ideaData.status === "REVIEWED") {
        updateTeamIdea(ideaData);
      } else {
        submitTeamIdea();
      }
    }
  };  

  if (isAuth && idea && teamSize >= 3 && ideaSubmissionSchedule) {
    const ideaSubmissionStart =
      new Date(ideaSubmissionSchedule.startTime) - new Date() < 0;
    if (ideaSubmissionStart)
      return (
        <Card className="p-2 m-3">
          <CardBody>
            <CardTitle tag="h5" className="custom-card-title">
              Idea Submission
            </CardTitle>
            <CustomCountdownTimer
              targetDate={ideaSubmissionSchedule.endTime}
              isTimedOut={isTimedOut}
              setIsTimedOut={setIsTimedOut}
            />
            <Form onSubmit={(e) => onFormSubmit(e, idea)}>
              <Row className="mt-5 mb-3">
                <Col xs={12} md={2} className="align-self-end">
                  <Label htmlFor="title" className="fw-bold">
                    Idea Title:
                  </Label>
                </Col>
                <Col xs={12} md={10}>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    className="custom-input"
                    placeholder="Idea Title"
                    value={idea.title}
                    onChange={(e) => handleChange(e)}
                    disabled={isDisabled}
                    required
                  />
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs={12} md={2}>
                  <Label htmlFor="description" className="fw-bold">
                    Idea Description:
                  </Label>
                </Col>
                <Col xs={12} md={10}>
                  <Input
                    id="description"
                    name="description"
                    type="textarea"
                    rows="4"
                    className="custom-input"
                    placeholder="Idea Description"
                    value={idea.description}
                    onChange={(e) => handleChange(e)}
                    disabled={isDisabled}
                    required
                  />
                </Col>
              </Row>
              <FormGroup>
                <Row className="g-0 my-4">
                  <Col xs={12} md={4}>
                    <InputGroupText className="custom-input-group-text">
                      Select Idea Domain
                    </InputGroupText>
                  </Col>
                  <Col xs={12} md={8}>
                    <Select
                      id="domain"
                      name="domain"
                      options={ideaDomains}
                      placeholder="Select One Idea Domain"
                      value={selectedDomain}
                      onChange={(domain) => setSelectedDomain(domain)}
                      autoFocus={true}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      isDisabled={isDisabled}
                      required
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Row
                className={`justify-content-md-end ${
                  isDisabled ? "d-none" : ""
                }`}
              >
                <Col xs={12} md={3}>
                  <Button block className="custom-button" disabled={isDisabled}>
                    {idea.status === "REVIEWED" ? "Update Idea" : "Submit Idea"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      );
    else
      return (
        <div className="text-center my-5 p-5 bg-warning rounded-1 text-white fw-bold fs-5">
          Idea Submission Is Not Started Yet
        </div>
      );
  }
};

export default IdeaSubmission;
