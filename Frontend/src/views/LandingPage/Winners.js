import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { getWinners } from "../../services/EvaluationService";
import { getHackathonEndTime } from "../../services/ScheduleService";
import "./winners.css";

const Winners = () => {
  const [winnerResult, setWinnerResult] = useState(null);
  useEffect(() => {
    let timer;
    getHackathonEndTime()
      .then((response) => {
        if (response.status === 200) {
          let hackathonEndTime = new Date(
            response.data.hackathonEndTime
          ).getTime();
          let currentTime = new Date().getTime();
          let timeInMilliSecondsToEndHackathon = hackathonEndTime - currentTime;

          if (timeInMilliSecondsToEndHackathon < 0) {
            // If hackathon has ended then fetch winner details
            getWinners()
              .then((response) => {
                setWinnerResult(response.data);
              })
              .catch((error) => {
                console.log("Server Error Occured");
              });
          } else {
            // If hackathon has not ended then set a timer
            // to fetch winner details on hackathon end
            timer = setTimeout(() => {
              getWinners()
                .then((response) => {
                  if (response.status === 200) setWinnerResult(response.data);
                })
                .catch((error) => {
                  console.log("Server Error Occured");
                });
            }, timeInMilliSecondsToEndHackathon);
          }
        }
      })
      .catch((error) => {
        console.log("Server Error Occured");
      });
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container fluid id="winners" className="my-3">
      <Row>
        <Col className="spacing">
          <h1 className="text-center">WINNERS OF HACKATHON</h1>
          <hr />
        </Col>
      </Row>
      {winnerResult ? (
        <Row>
          {winnerResult.map((winner, i) => (
            <Col sm="4" key={i}>
              <div className="cards text-center">
                <div className="title">
                  <h2>{winner.position}</h2>
                </div>
                <div className="price">
                  <h4>
                    {winner.no}
                    <sup>{winner.suffix}</sup>
                  </h4>
                </div>
                <a href="#winners">Team Name : {winner.teamName} </a>
                <div className="option">
                  <ul key={winner.id}>
                    {winner.team.map((memberName, index) => (
                      <li key={index}>{memberName}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col>
            <div className="text-center spc-txt py-5">
              Results Will Be Out Soon ..
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default Winners;
