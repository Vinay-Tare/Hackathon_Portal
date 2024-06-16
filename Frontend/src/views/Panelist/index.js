import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import CustomCountdownTimer from "../../components/CustomCountdownTimer";
import CustomLoader from "../../components/CustomLoader";
import useAuth from "../../hooks/useAuth";
import { getIdeasAssignedToPanelist } from "../../services/IdeaSevice";
import { getIdeaReviewSchedule } from "../../services/ScheduleService";
import IdeaReviewCard from "./IdeasReviewCard";
import "./index.css";

const Panelist = () => {
  const [ideas, setIdeas] = useState(null);
  const { isAuth, loggedInUser, roles } = useAuth();
  const [loading, setLoading] = useState(false);

  const [ideaReviewSchedule, setIdeaReviewSchedule] = useState(null);
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    getIdeaReviewSchedule()
      .then((response) => {
        if (response.status === 200) setIdeaReviewSchedule(response.data);
      })
      .catch((error) => {
        console.log("Server Error Occured");
      });
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      setLoading(true);
      getIdeasAssignedToPanelist(loggedInUser.id)
        .then((response) => {
          setIdeas(response.data);
          setTimeout(() => setLoading(false), 800);
        })
        .catch((error) => {
          toast.error(error.response.data.error);
          setTimeout(() => setLoading(false), 800);
        });
    }
  }, [loggedInUser]);

  const ideaReviewStart =
    ideaReviewSchedule &&
    new Date(ideaReviewSchedule.startTime) - new Date() < 0;

  if (ideaReviewStart) {
    if (isAuth && ideas && ideas.length)
      return (
        <div>
          {loading ? (
            <CustomLoader />
          ) : (
            <div>
              {/* TIMER COMPONENT - TELLS HOW MUCH TIME IS LEFT FOR THE PANELIST TO CHECK THE IDEAS SUBMITTED  */}
              <Container className="my-3">
                <Row className="mt-3 align-items-center justify-content-between">
                  <Col xs={12} md={3}>
                    <div className="bg-light p-3 border border-dark rounded-2">
                      Hey, {loggedInUser.name}
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <CustomCountdownTimer
                      targetDate={ideaReviewSchedule.endTime}
                      isTimedOut={isTimedOut}
                      setIsTimedOut={setIsTimedOut}
                    />
                  </Col>
                  {roles.includes("JUDGE") && (
                    <Col xs={12} md={3}>
                      <Link
                        to={"/judge"}
                        className="btn w-100 custom-button text-white p-2 border border-dark rounded-2"
                      >
                        GO TO JUDGE DASHBOARD
                      </Link>
                    </Col>
                  )}
                </Row>
              </Container>
              {/* IdeaReviewCard - IT LOADS THE IDEAS SUBMITTED BY PARTICIPANTS AND WHICH IS ASSIGNED TO PARTICULAR PANELIST */}
              <Container fluid>
                {ideas.map((idea) => (
                  <Row key={idea.id}>
                    <Col>
                      <IdeaReviewCard idea={idea} isTimedOut={isTimedOut} />
                    </Col>
                  </Row>
                ))}
              </Container>
            </div>
          )}
        </div>
      );
    else
      return (
        <div className="text-center m-5 p-5 bg-warning rounded-1 text-white fw-bold fs-5">
          No Ideas Assigned To You As Of Now
        </div>
      );
  } else {
    return (
      <div className="text-center m-5 p-5 bg-warning rounded-1 text-white fw-bold fs-5">
        Idea Review Is Not Started Yet
      </div>
    );
  }
};

export default Panelist;
