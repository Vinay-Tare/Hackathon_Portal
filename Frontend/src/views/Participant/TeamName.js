import React, { useState } from "react";
import { Button, Col, Form, Row } from "reactstrap";

import { RiTeamFill } from "react-icons/ri";
import { components } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";
import useAuth from "../../hooks/useAuth";
import { searchTeamName } from "../../services/UserService";
import { toast } from "react-toastify";
import { debounce } from "../../services/Utils";

const teamListByTeamName = (query, callback) =>
  searchTeamName(query)
    .then((response) =>
      callback(
        response.data.map((team) => ({
          value: team.teamName,
          label: team.teamName,
        }))
      )
    )
    .catch((error) => toast(error.response.data.error));

const debouncedTeamNameSearch = debounce(teamListByTeamName, 600);

const TeamName = ({
  selectedTeamName,
  setSelectedTeamName,
  registerUserWithTeam,
}) => {
  const { isAuth, loggedInUser } = useAuth();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    registerUserWithTeam();
  };

  const DropdownIndicatorJoinCreateTeam = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <RiTeamFill color="black" />
      </components.DropdownIndicator>
    );
  };

  // On search input this opens dropdown menu. Incase no search input is given it hides dropdown
  const handleInputChange = (input) => {
    setInputValue(input);
    if (input) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
  };

  if (isAuth)
    return (
      <Form onSubmit={onSubmit}>
        <Row className="align-items-center">
          <Col xs={12} md={2}>
            <span className="fw-bold ms-1 mt-3 mb-0">Team Name:</span>
          </Col>
          <Col xs={12} md={7}>
            <AsyncCreatableSelect
              id="teamListByName"
              name="teamListByName"
              loadOptions={debouncedTeamNameSearch}
              placeholder="Search Team Name Or Create New Team"
              inputValue={inputValue}
              onInputChange={handleInputChange}
              menuIsOpen={menuIsOpen}
              value={selectedTeamName}
              onChange={(teamNameOption) => setSelectedTeamName(teamNameOption)}
              className="react-select-container"
              classNamePrefix="react-select"
              components={{
                DropdownIndicator: DropdownIndicatorJoinCreateTeam,
              }}
              isDisabled={loggedInUser.teamName}
              required
            />
          </Col>
          {!loggedInUser.teamName && (
            <Col xs={12} md={3}>
              <Button block className="custom-button">
                Create/Join Team
              </Button>
            </Col>
          )}
        </Row>
      </Form>
    );
};

export default TeamName;
