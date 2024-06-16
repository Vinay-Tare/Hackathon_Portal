import React from "react";
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";
import CustomCountdownTimer from "../../components/CustomCountdownTimer";
import CustomStatus from "../../components/CustomStatus";
import useAuth from "../../hooks/useAuth";

const PanelistReview = ({
  idea,
  ideaReviewSchedule,
  isTimedOut,
  setIsTimedOut,
}) => {
  const { isAuth } = useAuth();

  if (isAuth && ideaReviewSchedule) {
    const ideaReviewStart =
      new Date(ideaReviewSchedule.startTime) - new Date() < 0;
    if (ideaReviewStart)
      return (
        <Card className="p-2 m-3">
          <CardBody>
            <CardTitle tag="h5" className="custom-card-title">
              Panelist Review
            </CardTitle>
            <CustomCountdownTimer
              targetDate={ideaReviewSchedule.endTime}
              isTimedOut={isTimedOut}
              setIsTimedOut={setIsTimedOut}
            />
            {idea && idea.panelist ? (
              <>
                <Row className="justify-content-space-between">
                  <Col
                    xs={{ order: 2, size: 12 }}
                    md={{ order: 1, size: 10 }}
                    className="py-2"
                  >
                    <CardText>
                      <span className="fw-bold">Panelist Name: </span>
                      <span>{idea.panelist.name}</span>
                    </CardText>
                  </Col>
                  <Col
                    xs={{ order: 1, size: 12 }}
                    md={{ order: 2, size: 2 }}
                    className="py-2"
                  >
                    <CustomStatus status={idea.status} />
                  </Col>
                </Row>
                <CardText className="fw-bold">Reviews: </CardText>
                <Card>
                  <CardBody>
                    <CardText>{idea.reviewComment}</CardText>
                  </CardBody>
                </Card>
              </>
            ) : (
              <Row>
                <Col xs={12} className="text-center fw-bold p-3">
                  No Panelist Assigned To You As Of Now
                </Col>
              </Row>
            )}
          </CardBody>
        </Card>
      );
    else
      return (
        <div className="text-center my-5 p-5 bg-warning rounded-1 text-white fw-bold fs-5">
          Idea Review Is Not Started Yet
        </div>
      );
  } else return <div></div>;
};

export default PanelistReview;
