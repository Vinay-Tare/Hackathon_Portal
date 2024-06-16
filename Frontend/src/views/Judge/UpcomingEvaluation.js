import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

const DisplayDate = ({ startTime, endTime }) => {
  let startTimeOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  let endTimeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const dateString =
    new Intl.DateTimeFormat("en-US", startTimeOptions)
      .format(new Date(startTime))
      .replace("at", "→") +
    " - " +
    new Intl.DateTimeFormat("en-US", endTimeOptions).format(new Date(endTime));
  return <span>{dateString}</span>;
};

const UpcomingEvaluation = ({ evaluationSchedule }) => {
  return (
    <Card className="my-2 card-background">
      <CardBody>
        <Row className="align-items-center">
          <Col xs={12} md={7}>
            Project: {evaluationSchedule.project.title}
          </Col>
          <Col xs={12} md={5}>
            {
              <DisplayDate
                startTime={evaluationSchedule.startTime}
                endTime={evaluationSchedule.endTime}
              />
            }
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default UpcomingEvaluation;
