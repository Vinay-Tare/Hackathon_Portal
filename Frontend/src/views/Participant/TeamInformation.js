import React from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import useAuth from "../../hooks/useAuth";

import TeamName from "./TeamName";
import TeamUsersInformation from "./TeamUsersInformation";

const TeamInformation = ({
  addParticipantToTeam,
  teamMembers,
  selectedUserEmail,
  setSelectedUserEmail,
  selectedTeamName,
  setSelectedTeamName,
  registerUserWithTeam,
}) => {
  const { isAuth, loggedInUser } = useAuth();

  if (isAuth)
    return (
      <Card className="p-2 m-3">
        <CardBody>
          <CardTitle tag="h5" className="custom-card-title">
            Profile Information
          </CardTitle>
          <CardText>
            <span className="fw-bold">Particpant Name: </span>
            <span>{loggedInUser.name}</span>
          </CardText>
          <TeamName
            selectedTeamName={selectedTeamName}
            setSelectedTeamName={setSelectedTeamName}
            registerUserWithTeam={registerUserWithTeam}
          />
          <TeamUsersInformation
            addParticipantToTeam={addParticipantToTeam}
            teamMembers={teamMembers}
            selectedUserEmail={selectedUserEmail}
            setSelectedUserEmail={setSelectedUserEmail}
          />
        </CardBody>
      </Card>
    );
};

export default TeamInformation;
