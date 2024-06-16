import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import CustomLoader from "../../components/CustomLoader";
import useAuth from "../../hooks/useAuth";
import { getAllDomain } from "../../services/DomainService";
import {
  getIdea,
  submitIdea,
  updateIdea,
  uploadFiles,
} from "../../services/IdeaSevice";
import {
  getIdeaReviewSchedule,
  getIdeaSubmissionSchedule,
  getProjectSubmissionSchedule,
} from "../../services/ScheduleService";
import {
  getTeamMembersByTeamName,
  registerTeamUser,
} from "../../services/UserService";
import IdeaSubmission from "./IdeaSubmission";
import PanelistReview from "./PanelistReview";
import ProjectSubmission from "./ProjectSubmission";
import TeamInformation from "./TeamInformation";

const Participants = () => {
  const { isAuth, loggedInUser, login, refreshPage } = useAuth();
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [selectedTeamName, setSelectedTeamName] = useState(null);
  const [idea, setIdea] = useState(null);
  const [ideaDomains, setIdeaDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [projectFiles, setProjectFiles] = useState(null);

  // States For Loader
  const [teamMembersLoading, setTeamMembersLoading] = useState(false);
  const [ideaLoading, setIdeaLoading] = useState(false);
  const [allDomainLoading, setAllDomainLoading] = useState(false);
  const [ideaSubmissionScheduleLoading, setIdeaSubmissionScheduleLoading] =
    useState(false);
  const [ideaReviewScheduleLoading, setIdeaReviewScheduleLoading] =
    useState(false);
  const [
    projectSubmissionScheduleLoading,
    setProjectSubmissionScheduleLoading,
  ] = useState(false);

  // States For Schedules
  const [ideaSubmissionSchedule, setIdeaSubmissionSchedule] = useState(null);
  const [ideaReviewSchedule, setIdeaReviewSchedule] = useState(null);
  const [isPanelistReviewOver, setIsPanelistReviewOver] = useState(false);
  const [projectSubmissionSchedule, setProjectSubmissionSchedule] =
    useState(null);

  let loading =
    teamMembersLoading ||
    ideaLoading ||
    allDomainLoading ||
    ideaSubmissionScheduleLoading ||
    projectSubmissionScheduleLoading ||
    ideaReviewScheduleLoading;

  useEffect(() => {
    if (loggedInUser && loggedInUser.teamName) {
      setTeamMembersLoading(true);
      getTeamMembersByTeamName(loggedInUser.teamName)
        .then((response) => {
          setTeamMembers(response.data);
          setTimeout(() => setTeamMembersLoading(false), 800);
        })
        .catch(() => {
          toast.error(
            "Error Occcured While Fetching Team Member's Information"
          );
          setTimeout(() => setTeamMembersLoading(false), 800);
        });
      setIdeaLoading(true);
      getIdea(loggedInUser.id)
        .then((response) => {
          if (response.status === 200) {
            let fetchedIdea = response.data;
            setIdea(fetchedIdea);
            setSelectedDomain({
              value: fetchedIdea.domain.id,
              label: fetchedIdea.domain.name,
            });
          } else {
            setIdea({
              title: "",
              description: "",
            });
            setAllDomainLoading(true);
            getAllDomain()
              .then((response) => {
                setIdeaDomains(
                  response.data.map((domain) => ({
                    value: domain.id,
                    label: domain.name,
                  }))
                );
                setTimeout(() => setAllDomainLoading(false), 800);
              })
              .catch(() => {
                toast.error(
                  "Error Occcured While Fetching All Domains Information"
                );
                setTimeout(() => setAllDomainLoading(false), 800);
              });
          }
          setTimeout(() => setIdeaLoading(false), 800);
        })
        .catch(() => {
          toast.error("Error Occcured While Fetching Team's Idea Information");
          setTimeout(() => setIdeaLoading(false), 800);
        });

      // API Calls For Schdules
      setIdeaSubmissionScheduleLoading(true);
      getIdeaSubmissionSchedule()
        .then((response) => {
          if (response.status === 200) {
            setIdeaSubmissionSchedule(response.data);
          }
          setTimeout(() => setIdeaSubmissionScheduleLoading(false), 800);
        })
        .catch((error) => {
          console.log("Server Error Occured");
          setTimeout(() => setIdeaSubmissionScheduleLoading(false), 800);
        });
      setSelectedTeamName({
        value: loggedInUser.teamName,
        label: loggedInUser.teamName,
      });

      setIdeaReviewScheduleLoading(true);
      getIdeaReviewSchedule()
        .then((response) => {
          if (response.status === 200) {
            setIdeaReviewSchedule(response.data);
          }
          setTimeout(() => setIdeaReviewScheduleLoading(false), 800);
        })
        .catch((error) => {
          console.log("Server Error Occured");
          setTimeout(() => setIdeaReviewScheduleLoading(false), 800);
        });

      setProjectSubmissionScheduleLoading(true);
      getProjectSubmissionSchedule()
        .then((response) => {
          if (response.status === 200) {
            setProjectSubmissionSchedule(response.data);
          }
          setTimeout(() => setProjectSubmissionScheduleLoading(false), 800);
        })
        .catch((error) => {
          console.log("Server Error Occured");
          setTimeout(() => setProjectSubmissionScheduleLoading(false), 800);
        });
    }
  }, [isAuth, loggedInUser]);

  useEffect(() => {
    if (idea && idea.fileName) {
      setProjectFiles({ name: idea.fileName });
    }
  }, [idea]);

  const registerUserWithTeam = () => {
    let data = {
      userId: loggedInUser.id,
      teamName: selectedTeamName.label,
    };
    registerTeamUser(data)
      .then((response) => {
        toast.success("User Registered With Team Succesfully");
        setTimeout(() => login({ loggedInUser: response.data }), 1000);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const addParticipantToTeam = () => {
    let data = {
      userId: selectedUserEmail.value,
      teamName: loggedInUser.teamName,
    };
    registerTeamUser(data)
      .then((response) => {
        toast.success("Team Member Registered With Team Succesfully");
        setTeamMembers([...teamMembers, response.data]);
        setSelectedUserEmail({
          value: "",
          label: "",
        });
      })
      .catch((error) => toast.error(error.response.data.error));
  };

  const submitTeamIdea = () => {
    const data = {
      teamName: loggedInUser.teamName,
      title: idea.title,
      description: idea.description,
      domain: { id: selectedDomain.value, name: selectedDomain.label },
    };
    submitIdea(data)
      .then((response) => {
        toast.success("Idea Submitted Succesfully");
        setTimeout(() => refreshPage(), 1000);
      })
      .catch((error) => toast.error(error.response.data.error));
  };

  const updateTeamIdea = (ideaData) => {
    updateIdea(ideaData)
      .then((response) => {
        setTimeout(() => refreshPage(), 1000);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const submitTeamProjectFiles = () => {
    const formData = new FormData();
    formData.append("projectFile", projectFiles);
    formData.append("ideaId", idea.id);
    uploadFiles(formData)
      .then((response) => {
        toast.success("Project Files Submitted Succesfully");
        setTimeout(() => refreshPage(), 1000);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  if (loading) return <CustomLoader />;

  if (isAuth)
    return (
      <Container fluid className="mt-3">
        <TeamInformation
          addParticipantToTeam={addParticipantToTeam}
          teamMembers={teamMembers}
          selectedUserEmail={selectedUserEmail}
          setSelectedUserEmail={setSelectedUserEmail}
          selectedTeamName={selectedTeamName}
          setSelectedTeamName={setSelectedTeamName}
          registerUserWithTeam={registerUserWithTeam}
        />
        <IdeaSubmission
          teamSize={teamMembers.length}
          idea={idea}
          setIdea={setIdea}
          ideaDomains={ideaDomains}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          submitTeamIdea={submitTeamIdea}
          updateTeamIdea={updateTeamIdea}
          isPanelistReviewOver={isPanelistReviewOver}
          ideaSubmissionSchedule={ideaSubmissionSchedule}
        />
        <PanelistReview
          idea={idea}
          ideaReviewSchedule={ideaReviewSchedule}
          isTimedOut={isPanelistReviewOver}
          setIsTimedOut={setIsPanelistReviewOver}
        />
        <ProjectSubmission
          idea={idea}
          submitTeamProjectFiles={submitTeamProjectFiles}
          projectFiles={projectFiles}
          setProjectFiles={setProjectFiles}
          isPanelistReviewOver={isPanelistReviewOver}
          projectSubmissionSchedule={projectSubmissionSchedule}
        />
      </Container>
    );
};

export default Participants;
