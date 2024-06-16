import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import CustomLoader from "../../components/CustomLoader";
import useAuth from "../../hooks/useAuth";
import { getAllDomain } from "../../services/DomainService";
import { getAllIdeas } from "../../services/IdeaSevice";
import {
  addSchedules,
  getHackathonStatus,
} from "../../services/ScheduleService";
import { getAllJudges, getAllPanelists } from "../../services/UserService";
import AddDomain from "./AddDomain";
import AddUser from "./AddUser";
import AllDomains from "./AllDomains";
import AllIdeas from "./AllIdeas";
import AllProjects from "./AllProjects";
import AllUserCard from "./AllUserCard";

const Admin = () => {
  const { isAuth, loggedInUser } = useAuth();
  const [allIdeas, setAllIdeas] = useState(null);
  const [allPanelists, setAllPanelists] = useState(null);
  const [allJudges, setAllJudges] = useState(null);
  const [allDomains, setAllDomains] = useState(null);
  const [allIdeasLoading, setAllIdeasLoading] = useState(true);
  const [allPanelistsLoading, setAllPanelistsLoading] = useState(true);
  const [allJudgesLoading, setAllJudgesLoading] = useState(true);
  const [allDomainsLoading, setAllDomainsLoading] = useState(true);
  const [hackathonRunning, setHackathonRunning] = useState(false);

  useEffect(() => {
    getHackathonStatus()
      .then((response) => {
        if (response.data.error) {
          setHackathonRunning(false);
        } else {
          let message = response.data.message;
          switch (message) {
            case "HACKATHON RUNNING": {
              setHackathonRunning(true);
              break;
            }
            case "HACKATHON ENDED": {
              setHackathonRunning(false);
              break;
            }
            default:
              break;
          }
        }
      })
      .catch((error) => {
        toast.error("Trouble Getting Hackathon Status");
      });
    getAllIdeas()
      .then((response) => {
        setAllIdeas(response.data);
        setTimeout(() => setAllIdeasLoading(false), 800);
      })
      .catch((e) => {
        console.log(e);
        setTimeout(() => setAllIdeasLoading(false), 800);
      });
    getAllJudges()
      .then((response) => {
        setAllJudges(response.data);
        setTimeout(() => setAllJudgesLoading(false), 800);
      })
      .catch((e) => {
        console.log(e);
        setTimeout(() => setAllJudgesLoading(false), 800);
      });
    getAllPanelists()
      .then((response) => {
        setAllPanelists(response.data);
        setTimeout(() => setAllPanelistsLoading(false), 800);
      })
      .catch((e) => {
        console.log(e);
        setTimeout(() => setAllPanelistsLoading(false), 800);
      });
    getAllDomain()
      .then((response) => {
        setAllDomains(response.data);
        setTimeout(() => setAllDomainsLoading(false), 800);
      })
      .catch((e) => {
        console.log(e);
        setTimeout(() => setAllDomainsLoading(false), 800);
      });
  }, []);

  const startHackathon = () => {
    if (!hackathonRunning) {
      addSchedules({
        adminId: loggedInUser.id,
      })
        .then((response) => {
          toast.success("Hackathon Started Successfully");
          setHackathonRunning(true);
        })
        .catch((error) => {
          toast.error("Trouble Starting Hackathon");
        });
    }
  };

  if (
    allIdeasLoading ||
    allPanelistsLoading ||
    allJudgesLoading ||
    allDomainsLoading
  )
    return <CustomLoader />;

  if (isAuth && loggedInUser && allIdeas && allPanelists && allJudges)
    return (
      <Container fluid className="mt-3">
        <Card style={{ boxShadow: "0px 0px 3px" }}>
          <CardBody>
            <CardTitle tag="h5" className="custom-card-title">
              Admin Dashboard
            </CardTitle>
            <Row className="justify-content-space-between">
              <Col
                xs={{ order: 2, size: 12 }}
                md={{ order: 1, size: 10 }}
                className="py-2"
              >
                <CardText>
                  <span className="fw-bold ms-2">Admin Name:</span>{" "}
                  <span>{loggedInUser.name}</span>
                </CardText>
              </Col>
              <Col
                xs={{ order: 1, size: 12 }}
                md={{ order: 2, size: 2 }}
                className="py-2"
              >
                <Button
                  block
                  className={`custom-button float-end ${
                    hackathonRunning ? "bg-success" : ""
                  }`}
                  onClick={startHackathon}
                  disabled={hackathonRunning}
                >
                  {hackathonRunning
                    ? "Hackathon In Progress"
                    : "Start Hackathon"}
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <AddUser />
        <AllUserCard allPanelists={allPanelists} allJudges={allJudges} />
        <AddDomain />
        <AllDomains domains={allDomains} />
        <AllIdeas
          allIdeas={allIdeas.map((ideaWithJudges) => ideaWithJudges.idea)}
          allPanelists={allPanelists}
        />
        <AllProjects
          allProjects={allIdeas.filter(
            (ideaWithJudges) => ideaWithJudges.idea.status === "ACCEPTED"
          )}
          allJudges={allJudges}
        />
      </Container>
    );
};

export default Admin;
