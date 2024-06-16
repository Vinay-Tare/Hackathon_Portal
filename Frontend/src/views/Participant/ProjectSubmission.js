import React, { useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { toast } from "react-toastify";

import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Form,
  Input,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import CustomCountdownTimer from "../../components/CustomCountdownTimer";
import useAuth from "../../hooks/useAuth";

const ProjectSubmission = ({
  idea,
  submitTeamProjectFiles,
  projectFiles,
  setProjectFiles,
  isPanelistReviewOver,
  projectSubmissionSchedule,
}) => {
  const { isAuth } = useAuth();
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [isDisabled, setisDisabled] = useState(false);

  useEffect(() => {
    setisDisabled(isTimedOut);
  }, [isTimedOut]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    submitTeamProjectFiles();
  };

  if (isAuth && idea && isPanelistReviewOver) {
    const projectSubmissionStart =
      projectSubmissionSchedule &&
      new Date(projectSubmissionSchedule.startTime) - new Date() < 0;
    if (projectSubmissionStart && idea.status === "ACCEPTED") {
      return (
        <Card className="p-2 m-3">
          <CardBody>
            <CardTitle tag="h5" className="custom-card-title">
              Project Submission
            </CardTitle>
            <CustomCountdownTimer
              targetDate={projectSubmissionSchedule.endTime}
              isTimedOut={isTimedOut}
              setIsTimedOut={setIsTimedOut}
            />
            <Form onSubmit={onFormSubmit}>
              <Row className="mt-5 mb-1">
                <Col xs={12} md={3} className="pe-md-0">
                  <InputGroupText className="custom-input-group-text">
                    Upload Project Files{" "}
                    <MdFileUpload size={20} className="ms-4" />
                  </InputGroupText>
                </Col>
                <Col className="ps-md-0">
                  <Label className="custom-file-input" htmlFor="projectFiles">
                    {projectFiles ? projectFiles.name : "Upload Project Files"}
                    <Input
                      id="projectFiles"
                      name="projectFiles"
                      type="file"
                      className="d-none"
                      accept=".zip,.rar,.7z,.gz"
                      onChange={(e) => {
                        if (e.target.files[0].size >= 10 * 1024 * 1024) {
                          toast.error("File size greater than 10 MB");
                          e.target.value = "";
                        }
                        setProjectFiles(e.target.files[0]);
                      }}
                      disabled={isDisabled}
                      required
                    />
                  </Label>
                </Col>
              </Row>
              <Row className="mb-5 p-0">
                <Col>
                  <CardText className="me-0 text-dark float-end">
                    File should be of .zip format having size less than 10MB.
                  </CardText>
                </Col>
              </Row>
              <Row className="justify-content-md-end">
                <Col xs={12} md={3}>
                  <Button
                    block
                    className="custom-button"
                    disabled={!projectFiles || isDisabled}
                  >
                    Submit Project
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      );
    } else if (projectSubmissionStart) return <div></div>;
    else if (!projectSubmissionStart)
      return (
        <div className="text-center my-5 p-5 bg-warning rounded-1 text-white fw-bold fs-5">
          Project Submission Is Not Started Yet
        </div>
      );
  }
};

export default ProjectSubmission;
