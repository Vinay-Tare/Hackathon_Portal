import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import CustomLoader from "../../components/CustomLoader";
import useAuth from "../../hooks/useAuth";
import { getEvaluationsAssignedToJudge } from "../../services/EvaluationService";
import { getProjectEvaluationSchedules } from "../../services/ScheduleService";
import "./index.css";
import ShowAssignedProject from "./ShowAssignedProject";
import UpcomingEvaluation from "./UpcomingEvaluation";

const Judge = () => {
  const { isAuth, loggedInUser, roles, refreshPage } = useAuth();
  const [loading, setLoading] = useState(false);
  const [projectEvaluationSchedules, setProjectEvaluationSchedules] =
    useState(null);
  const [allAssignedEvaluations, setAllAssignedEvaluations] = useState(null);

  useEffect(() => {
    let timer;
    if (loggedInUser) {
      setLoading(true);
      getProjectEvaluationSchedules({ judgeId: loggedInUser.id })
        .then((response) => {
          if (response.status === 200) {
            let sortedSchedules = response.data.sort((pes1, pes2) => {
              let st1 = new Date(pes1.startTime).getTime();
              let st2 = new Date(pes2.startTime).getTime();
              return st1 - st2;
            });
            setProjectEvaluationSchedules(sortedSchedules);
            if (sortedSchedules) {
              let firstProjectTime = new Date(
                sortedSchedules[0].startTime
              ).getTime();
              let currentTime = new Date().getTime();
              let timeInMilliSecondsToFirstProjectTime =
                firstProjectTime - currentTime;
              console.log(timeInMilliSecondsToFirstProjectTime);
              if (timeInMilliSecondsToFirstProjectTime > 0) {
                timer = setTimeout(
                  () => refreshPage(),
                  timeInMilliSecondsToFirstProjectTime
                );
              }
            }
          }
          setTimeout(() => setLoading(false), 800);
        })
        .catch((error) => {
          console.log("Server Error Occured");
          setTimeout(() => setLoading(false), 800);
        });

      setLoading(true);
      getEvaluationsAssignedToJudge({ judgeId: loggedInUser.id })
        .then((response) => {
          setAllAssignedEvaluations(response.data);
          setTimeout(() => setLoading(false), 800);
        })
        .catch((error) => {
          toast.error(error.response.data.error);
          setTimeout(() => setLoading(false), 800);
        });
    }
    return () => {
      clearTimeout(timer);
    };
  }, [loggedInUser]);

  if (
    isAuth &&
    loggedInUser &&
    allAssignedEvaluations &&
    projectEvaluationSchedules
  ) {
    let currentAssignedSchedule = projectEvaluationSchedules.find(
      (schedule) => {
        let currentDateTime = new Date().getTime();
        let scheduleStartDateTime = new Date(schedule.startTime).getTime();
        let scheduleEndDateTime = new Date(schedule.endTime).getTime();
        return (
          currentDateTime > scheduleStartDateTime &&
          currentDateTime < scheduleEndDateTime
        );
      }
      
    );

    return (
      <Container>
        {loading ? (
          <CustomLoader />
        ) : (
          <div>
            <Row className="mt-3 align-items-center justify-content-between">
              <Col xs={12} md={3} className="p-0">
                <div className="bg-light p-3 border border-dark rounded-2">
                  Hey, {loggedInUser.name}
                </div>
              </Col>
              {roles.includes("PANELIST") && (
                <Col xs={12} md={3}>
                  <Link
                    to={"/panelist"}
                    className="btn w-100 custom-button text-white p-2 border border-dark rounded-2"
                  >
                    GO TO PANELIST DASHBOARD
                  </Link>
                </Col>
              )}
            </Row>
            <Row>
              {currentAssignedSchedule ? (
                <ShowAssignedProject
                  currentAssignedSchedule={currentAssignedSchedule}
                  currentAssignedProject={allAssignedEvaluations.find(
                    (evaluation) => {
                      return (
                        evaluation.idea.id ===
                        currentAssignedSchedule.project.id
                      );
                    }
                  )}
                />
              ) : (
                <div className="text-center my-5 p-5 bg-info rounded-2 text-white fw-bold fs-3">
                  No Project Assigned To You For Current Time Slot !!
                </div>
              )}
              {projectEvaluationSchedules
                .filter((pes) => {
                  let st = new Date(pes.startTime).getTime();
                  let ct = new Date().getTime();
                  return st > ct;
                })
                .map((pes) => (
                  <UpcomingEvaluation key={pes.id} evaluationSchedule={pes} />
                ))}
            </Row>
          </div>
        )}
      </Container>
    );
  } else
    return (
      <div className="text-center m-5 m-2 p-5 bg-info rounded-2 text-white fw-bold fs-3">
        No Project Assigned To You For Current Time Slot !!
      </div>
    );
};
export default Judge;
