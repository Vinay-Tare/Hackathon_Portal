import { useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlineClose } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import CustomStatus from "../../components/CustomStatus";
import useAuth from "../../hooks/useAuth";
import { setReview } from "../../services/IdeaSevice";
import "./index.css";

const IdeasReviewCard = ({ idea, isTimedOut }) => {
  const { isAuth, refreshPage } = useAuth();
  const [currentIdea, setCurrentIdea] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (idea && idea.status) {
      setCurrentIdea(idea);
      setIsDisabled(
        ["ACCEPTED", "REJECTED", "REVIEWED"].includes(idea.status) || isTimedOut
      );
    }
  }, [idea, setIsDisabled, isTimedOut]);

  //   FUNCTION HANDLE submit request - IT ACCEPTS IDEA GIVEN BY PARTICIPANT AND SENDS TO DATABASE

  const handleSubmit = (e, idea) => {
    e.preventDefault();
    let toSendIdea = idea;
    toSendIdea.reviewComment = currentIdea.reviewComment;
    // Takes the status as per the name field of the clicked button
    toSendIdea.status = e.target.name;
    setReview(idea)
      .then((response) => {
        toast.success("Remark Submmited");
        setTimeout(() => refreshPage(), 1000);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  if (isAuth && currentIdea)
    return (
      <Container>
        <Card className="my-2 card-color">
          <CardHeader className="card-color">
            <CustomStatus status={currentIdea.status} addClasses="p-3" />
          </CardHeader>
          <CardBody>
            <CardTitle tag="h5">Team Name :</CardTitle>
            <CardText>{idea.teamName}</CardText>
            <CardTitle tag="h5">Idea Title :</CardTitle>
            <CardText>{idea.title}</CardText>
            <CardTitle tag="h5">Idea Domain :</CardTitle>
            <CardText>{idea.domain.name}</CardText>
            <CardTitle tag="h5">Idea Description :</CardTitle>
            <CardText>{idea.description}</CardText>
            <Form>
              <FormGroup>
                <Label htmlFor="reviewComment" tag="h5">
                  Remarks:
                </Label>
                <Input
                  id="reviewComment"
                  name="reviewComment"
                  type="textarea"
                  className="border-input"
                  value={currentIdea.reviewComment}
                  onChange={(e) => {
                    setCurrentIdea({
                      ...currentIdea,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  disabled={isDisabled}
                  required
                />
              </FormGroup>
              {/* ACCEPT / REJECT /UNDER REVIEW BUTTONS  */}
              <Container>
                {!isDisabled && (
                  <Row>
                    <Col lg="2">
                      <Button
                        className="accept-btn"
                        name="ACCEPTED"
                        onClick={(e) => handleSubmit(e, idea)}
                        disabled={isDisabled}
                      >
                        <BiCheck /> ACCEPT
                      </Button>
                    </Col>
                    <Col lg="2">
                      <Button
                        className="reject-btn"
                        name="REJECTED"
                        onClick={(e) => handleSubmit(e, idea)}
                        disabled={isDisabled}
                      >
                        <AiOutlineClose /> REJECT
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className="inreview-btn"
                        name="REVIEWED"
                        onClick={(e) => handleSubmit(e, idea)}
                        disabled={isDisabled}
                      >
                        <AiOutlineCalendar /> SEND REVIEW
                      </Button>
                    </Col>
                  </Row>
                )}
              </Container>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
};

export default IdeasReviewCard;
