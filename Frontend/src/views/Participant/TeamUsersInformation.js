import React, { useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import { Button, CardLink, CardText, Col, Form, Row } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { searchByEmail } from "../../services/UserService";
import { debounce } from "../../services/Utils";

const userListByEmail = (query, callback) =>
  searchByEmail(query)
    .then((response) =>
      callback(
        response.data.map((user) => ({
          value: user.id,
          label: user.email,
        }))
      )
    )
    .catch((error) => toast(error.response.data.error));

const debouncedUserEmailSearch = debounce(userListByEmail, 600);

const TeamUsersInformation = ({
  addParticipantToTeam,
  teamMembers,
  selectedUserEmail,
  setSelectedUserEmail,
}) => {
  const { isAuth, loggedInUser } = useAuth();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const DropdownIndicatorAddMembers = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <MdPersonSearch color="black" />
      </components.DropdownIndicator>
    );
  };

  const handleInputChange = (input) => {
    if (input) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    addParticipantToTeam();
  };

  if (isAuth && loggedInUser.teamName && teamMembers.length)
    return (
      <>
        <Row className="fw-bold mt-4 mb-3">
          <Col xs={12} md={9}>
            Team Members:
          </Col>
          <Col xs={12} md={3}>
            <Button
              block
              size="sm"
              className={`p-2 text-center border-0 pe-none ${
                teamMembers.length < 3 ? "bg-warning" : "bg-success"
              }`}
            >
              {teamMembers.length < 3
                ? `Need ${3 - teamMembers.length} More Participants`
                : teamMembers.length === 3
                ? "Can Add One More Member"
                : teamMembers.length === 4 && "Team Is Full"}
            </Button>
          </Col>
        </Row>
        <Row className="mt-2">
          {teamMembers.map((teamMember) => (
            <Col xs={12} md={6} className="my-1" key={teamMember.id}>
              <CardLink
                href={`mailto:${teamMember.email}`}
                className="custom-member-button-link"
              >
                {teamMember.name} ({teamMember.email})
              </CardLink>
            </Col>
          ))}
        </Row>
        {teamMembers.length < 4 && (
          <Form onSubmit={onFormSubmit}>
            <CardText className="fw-bold ms-1 mt-3 mb-0">
              Add Team Member:{" "}
            </CardText>
            <Row className="mt-3">
              <Col xs={12} md={9}>
                <AsyncSelect
                  id="userListByEmail"
                  name="userListByEmail"
                  loadOptions={debouncedUserEmailSearch}
                  placeholder="Search Participant By Email"
                  onInputChange={handleInputChange}
                  menuIsOpen={menuIsOpen}
                  value={selectedUserEmail}
                  onChange={(userEmail) => setSelectedUserEmail(userEmail)}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  components={{
                    DropdownIndicator: DropdownIndicatorAddMembers,
                  }}
                  required
                />
              </Col>
              <Col xs={12} md={3}>
                <Button block className="custom-button">
                  Add Member
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </>
    );
};

export default TeamUsersInformation;
