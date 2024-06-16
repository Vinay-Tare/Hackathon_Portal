import React, { useEffect, useState } from "react";
import { MdKeyboardReturn, MdSend } from "react-icons/md";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardLink,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Form,
  Row,
} from "reactstrap";
import ReadMore from "../../components/ReadMore";
import useAuth from "../../hooks/useAuth";
import { baseUrl } from "../../services/baseUrl";
import { assignProjectToJudges } from "../../services/EvaluationService";

const ProjectCard = ({ project, availableJudges }) => {
  const { refreshPage } = useAuth();
  const [isAssignVisible, setIsAssignVisible] = useState(false);
  const [selectedJudges, setSelectedJudges] = useState(
    project.judges.map((judge) => ({
      value: judge.id,
      label: judge.name,
    }))
  );

  const handleSubmit = (e) => {
    console.log(selectedJudges);
    e.preventDefault();
    console.log(project);
    let data = {
      projectId: project.idea.id,
      listOfJudgeId: selectedJudges.map((j) => j.value),
    };
    assignProjectToJudges(data)
      .then((response) => {
        toast.success("Project Assigned To Judges Successfully");
        setTimeout(() => refreshPage(), 500);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <Col xs={12} sm={6} md={4} className="my-2">
      <Card className="h-100 border border-dark rounded-2">
        <CardBody>
          <CardText>
            <span className="fw-bold m-0">Team Name: </span>
            {project.idea.teamName}
          </CardText>
          <CardText>
            <span className="fw-bold m-0"> Title: </span>
            {project.idea.title}
          </CardText>
          <CardText>
            <span className="fw-bold m-0"> Domain: </span>
            {project.idea.domain.name}
          </CardText>
          <CardText>
            <span className="fw-bold m-0"> Description: </span>
            <ReadMore text={project.idea.description} maxLength={12} />
          </CardText>
          <Row className=" d-flex align-items-center">
            <Col xs={12} md={4} className="fw-bold">
              Project Files:
            </Col>
            <Col xs={12} md={7}>
              {project.idea.fileName ? (
                <CardLink
                  className="btn btn-color-1 ms-3"
                  href={`${baseUrl}/ideas/files/${project.idea.id}`}
                  target="_blank"
                >
                  Downlaod Files
                </CardLink>
              ) : (
                <div className="text-start">No Files Uploaded</div>
              )}
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="bg-white border-0">
          {project.judges.length > 0 && (
            <CardText className="mt-2">
              <span className="fw-bold m-0">Assigned Judges: </span>
              {project.judges.map((judge, index) => (
                <span key={judge.id}>
                  {judge.name}
                  {index !== project.judges.length - 1 && ", "}
                </span>
              ))}
            </CardText>
          )}
          {!isAssignVisible && (
            <Button
              block
              className="custom-button mb-2"
              onClick={() => setIsAssignVisible(true)}
            >
              Assign Project To Judges <MdSend />
            </Button>
          )}
          {isAssignVisible && (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12}>
                  <Select
                    isMulti
                    placeholder="Select Judges"
                    options={availableJudges}
                    onChange={(panelist) => {
                      console.log(panelist);
                      setSelectedJudges(panelist);
                    }}
                    value={selectedJudges}
                    autoFocus={true}
                    required
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={6}>
                  <Button
                    block
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
                    disabled={selectedJudges.length === 0}
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

const AllProjects = ({ allProjects, allJudges }) => {
  const [availableJudges, setAvailableJudges] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (allJudges) {
      setAvailableJudges(
        allJudges.map((judge) => ({
          value: judge.id,
          label: judge.name,
        }))
      );
    }
  }, [allJudges]);

  if (allProjects && allJudges) {
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
            <span> All Projects</span>
            <span>
              {isOpen ? <RxCaretUp size={30} /> : <RxCaretDown size={30} />}
            </span>
          </CardTitle>
          {isOpen && <hr className="text-dark" />}
          <Collapse isOpen={isOpen}>
            <Row>
              {allProjects.length ? (
                allProjects.map((project) => (
                  <ProjectCard
                    key={project.idea.id}
                    project={project}
                    availableJudges={availableJudges}
                  />
                ))
              ) : (
                <Col xs={12} className="text-center fw-bold">
                  No Projects Availaible
                </Col>
              )}
            </Row>
          </Collapse>
        </CardBody>
      </Card>
    );
  }
};

export default AllProjects;
