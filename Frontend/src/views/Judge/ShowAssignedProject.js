import React, { useEffect, useState } from "react";
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
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import CustomCountdownTimer from "../../components/CustomCountdownTimer";
import useAuth from "../../hooks/useAuth";
import { baseUrl } from "../../services/baseUrl";
import { projectEvalutation } from "../../services/EvaluationService";
import "./index.css";
import StarRating from "./StarRating";

const ShowAssignedProject = ({
  currentAssignedProject,
  currentAssignedSchedule,
}) => {
  const { refreshPage } = useAuth();
  const [assignedProject, setAssignedProject] = useState(null);
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    if (isTimedOut) setTimeout(() => refreshPage(), 2000);
  }, [isTimedOut, refreshPage]);

  useEffect(() => {
    if (currentAssignedProject) {
      setAssignedProject(currentAssignedProject);
    }
  }, [currentAssignedProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    projectEvalutation(assignedProject)
      .then((response) => {
        toast.success("Successfully Submitted The Project Evaluation");
        setTimeout(() => refreshPage(), 1000);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  if (assignedProject && currentAssignedSchedule)
    return (
      <Card className="my-3 p-2 card-background">
        <CustomCountdownTimer
          targetDate={currentAssignedSchedule.endTime}
          isTimedOut={isTimedOut}
          setIsTimedOut={setIsTimedOut}
        />
        <CardBody>
          <CardTitle tag="h5">
            Team Name :<Col xs={12} md={4}></Col>
            <CardLink
              className="me-3 mb-3 btn btn-color-1 float-end"
              href={`${baseUrl}/ideas/files/${assignedProject.idea.id}`}
              target="_blank"
            >
              Download Files
            </CardLink>
          </CardTitle>
          <CardText>{assignedProject.idea.teamName}</CardText>
          <CardTitle tag="h5">Project Title :</CardTitle>
          <CardText>{assignedProject.idea.title}</CardText>
          <CardTitle tag="h5">Project Description :</CardTitle>
          <CardText>{assignedProject.idea.description}</CardText>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label tag={"h5"} htmlFor="remark">
                Remarks :
              </Label>
              <Input
                id="remark"
                name="remark"
                type="textarea"
                rows={5}
                className="border-text"
                value={assignedProject.remark}
                onChange={(e) =>
                  setAssignedProject({
                    ...assignedProject,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
            </FormGroup>
            <hr />
            <Row>
              <h4 className="txt-heading">EVAULATION</h4>
            </Row>
            <br />
            <Container>
              <Row>
                <Col xs={12}>
                  <StarRating
                    rating={{
                      value: assignedProject.wowFactor,
                      name: "Wow Factor",
                    }}
                    setRating={(value) =>
                      setAssignedProject({
                        ...assignedProject,
                        wowFactor: value,
                      })
                    }
                  />
                </Col>
                <Col xs={12}>
                  <StarRating
                    rating={{
                      value: assignedProject.futurePlans,
                      name: "Future Plans",
                    }}
                    setRating={(value) =>
                      setAssignedProject({
                        ...assignedProject,
                        futurePlans: value,
                      })
                    }
                  />
                </Col>
                <Col xs={12}>
                  <StarRating
                    rating={{
                      value: assignedProject.technicalDifficulty,
                      name: "Technical Difficulty",
                    }}
                    setRating={(value) =>
                      setAssignedProject({
                        ...assignedProject,
                        technicalDifficulty: value,
                      })
                    }
                  />
                </Col>
              </Row>
            </Container>
            <Container>
              <Row className="justify-content-md-end mt-4 mb-2">
                <Col xs={12} md={3}>
                  <Button block className="btn-submit" onClick={handleSubmit}>
                    SUBMIT
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </CardBody>
      </Card>
    );
};

export default ShowAssignedProject;
