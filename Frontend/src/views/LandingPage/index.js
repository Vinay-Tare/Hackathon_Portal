import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import devops from "../../assets/images/LandingPage/agile.png";
import ai from "../../assets/images/LandingPage/ai.png";
import ar from "../../assets/images/LandingPage/ar.png";
import chatbot from "../../assets/images/LandingPage/chatbot.png";
import cloud from "../../assets/images/LandingPage/cloud-service.png";
import cyber from "../../assets/images/LandingPage/cyber-security.png";
import framework from "../../assets/images/LandingPage/framework.png";
import fun from "../../assets/images/LandingPage/fun.png";
import idea from "../../assets/images/LandingPage/idea.png";
import iot from "../../assets/images/LandingPage/iot.png";
import lightbulb from "../../assets/images/LandingPage/lightbulb.png";
import networking from "../../assets/images/LandingPage/networking.png";
import partners from "../../assets/images/LandingPage/partners.png";
import question from "../../assets/images/LandingPage/question.png";
import robotics from "../../assets/images/LandingPage/robot.png";
import rocket from "../../assets/images/LandingPage/rocket.png";
import blockchain from "../../assets/images/LandingPage/secure.png";
import top from "../../assets/images/LandingPage/top.webp";

import CustomSidebar from "../../components/CustomSidebar";
import useAuth from "../../hooks/useAuth";
import "./index.css";
import Winners from "./Winners";

const JUDGE_REMARKS = [
  {
    id: 0,
    title: "Innovation and Originality ",
    description:
      " This criteria evaluates how creative and unique the idea presented is. Judges may look for ideas that offer a fresh perspective, new approaches, or original solutions to the challenge or problem posed by the hackathon. They may also consider how well the idea stands out from other solutions presented by other teams.",
  },
  {
    id: 1,
    title: "Relevance and Impact ",
    description:
      " This criteria evaluates whether the idea presented is relevant to the challenge or problem posed by the hackathon and whether it has the potential to create a significant impact in the target area. Judges may look for ideas that address a pressing issue, have a strong social or environmental impact, or have potential for scalability and growth.",
  },
  {
    id: 2,
    title: "Collaboration & Communication",
    description:
      "This criteria evaluates how well the team worked together and communicated their ideas and progress. Judges may consider whether the team collaborated effectively, shared responsibilities, communicated clearly, and resolved conflicts constructively. They may also consider how well the team responded to feedback and integrated it into their idea.",
  },
];

const LandingPage = () => {
  const { isAuth, roles } = useAuth();

  return (
    <div className="landing-page">
      <CustomSidebar />
      <div className="landing-page">
        <div className="container">
          <div className="info">
            <h1 className="txt-1">Hack-a-thon Submission to Evaluation</h1>
            <p className="txt-1">
              “Innovation at its technological best: Leveraging cutting-edge
              technologies to drive progress and create new opportunities for
              growth and development.”
            </p>
            <Button className="btn-participate txt-1" href="/register">
              {isAuth ? `GO TO ${roles[0]} DASHBOARD` : "PARTICIPATE NOW"}
            </Button>
          </div>
          <div className="images">
            <img src={top} height="500" alt="" />
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
      <Container className="spacing">
        <Row>
          <Col id="about">
            <div className="text-center">
              <h1>ABOUT INCEDO HACKATHON</h1>
            </div>
          </Col>
          <hr />
        </Row>
        <Row className="spacing">
          <Col className="my-3 mx-4">
            <p className="text-justify">
              A company-level "Hack-a-thon" for encouraging innovation and
              driving technical excellence at our company. By bringing together
              employees from diverse backgrounds to come up with innovating
              ideas and work on challenging projects and build new solutions,
              our hackathon can drive innovation and help Incedo to remain
              competitive in a fast-paced and constantly evolving technological
              landscape. The benefits of this Incedo level hackathon include
              fostering innovation, building employee engagement and teamwork,
              promoting cross-functional collaboration, and generating new ideas
              and solutions that can help the company stay competitive and
              relevant. This event will be a fun and engaging way for employees
              to develop new skills and showcase their talents.{" "}
            </p>
          </Col>
        </Row>
      </Container>
      <Winners />
      <Container>
        <Row>
          <Col id="domain" className="spacing">
            <h1 className="text-center ">DOMAINS </h1>
            <hr />
          </Col>
        </Row>
      </Container>
      <Container className="spacing">
        <Row className="card-1">
          <Col lg="3" md="3">
            <img className="mx-5 my-7" src={ai} height="150" alt="" />
          </Col>
          <Col>
            <h4>AI/ML</h4>
            <p className="align">
              Artificial Intelligence and Machine Learning are rapidly growing
              fields that involve the development of computer systems that can
              perform tasks typically requiring human intelligence, such as
              recognizing speech, images, and patterns in data. Participants may
              come up with ideas about the new applications or tools that
              leverage these technologies to solve real-world problems.
            </p>
          </Col>
        </Row>
        <br />
        <Row className="card-1">
          <Col lg="3" md="3">
            <img className="mx-5" src={cloud} height="150" alt="" />
          </Col>
          <Col>
            <h4>Cloud</h4>
            <p className="align">
              The cloud refers to the delivery of computing services over the i
              nternet, allowing businesses and consumers to access data and
              services from anywhere with an internet connection. Participants
              may come up with ideas about new cloud-based applications or work
              on improving existing cloud infrastructure.
            </p>
          </Col>
        </Row>
        <br />
        <Row className="card-1">
          <Col lg="3" md="3">
            <img className="mx-5" src={framework} height="150" alt="" />
          </Col>
          <Col>
            <h4>Developer Community Toolkit / Framework</h4>
            <p className="align">
              A developer community toolkit or framework is a collection of
              software tools and libraries that make it easier for developers to
              build applications. Participants may come up with ideas about new
              toolkits or frameworks, or work on improving existing ones.
            </p>
          </Col>
        </Row>
        <br />
        <Row className="card-1">
          <Col lg="3" md="3">
            <img className="mx-5" src={chatbot} height="150" alt="" />
          </Col>
          <Col>
            <h4>Intelligent CHAT BOTS</h4>
            <p className="align">
              Chatbots are computer programs designed to simulate conversation
              with human users, often through messaging applications, websites,
              or mobile apps. Participants may come up with ideas about new
              chatbots or work on improving existing ones.
            </p>
          </Col>
        </Row>
        <br />

        <Row className="card-1">
          <Col lg="3" md="3">
            <img className="mx-5" src={iot} height="150" alt="" />
          </Col>
          <Col>
            <h4>IOT/IIOT - Industrial Devices / Smart Home</h4>
            <p className="align">
              The Internet of Things (IoT) refers to the growing network of
              connected devices, such as smart home devices and wearable
              technology, while the Industrial Internet of Things (IIoT) refers
              to the application of IoT technology in industrial settings.
              Participants may come up with ideas about new IoT or IIoT devices,
              or work on improving existing ones
            </p>
          </Col>
        </Row>
        <br />
        <Row className="card-1">
          <Col lg="3" md="3">
            <img className="mx-5" src={cyber} height="150" alt="" />
          </Col>
          <Col>
            <h4>Cyber Security & Safety</h4>
            <p className="align">
              Cybersecurity is the practice of protecting computer systems and
              networks from theft, damage, or unauthorized access. Participants
              may come up with ideas about new tools or techniques for
              protecting against cyber threats.
            </p>
          </Col>
        </Row>
        <br />
        <Row className="card-1">
          <Col lg="3" md="3">
            <img className="mx-5" src={blockchain} height="150" alt="" />
          </Col>
          <Col>
            <h4>Blockchain</h4>
            <p className="align">
              Blockchain is a distributed ledger technology that allows for
              secure and transparent record-keeping. Participants may come up
              with ideas about new applications or tools that leverage the
              technology.
            </p>
          </Col>
        </Row>
        <br />
        <Row className="card-1">
          <Col lg="3" md="3">
            <img className="mx-5" src={ar} height="150" alt="" />
          </Col>
          <Col>
            <h4>AR/VR</h4>
            <p className="align">
              AR (Augmented Reality) and VR (Virtual Reality) are technologies
              that allow users to experience digital content in a more immersive
              way. Participants may come up with ideas about new AR/VR
              applications or work on improving existing ones.
            </p>
          </Col>
        </Row>
        <br />
        <Row className="card-1">
          <Col lg="3" md="3">
            <img className="mx-5" src={robotics} height="150" alt="" />
          </Col>
          <Col>
            <h4>Robotics</h4>
            <p className="align">
              Robotics involves the design, construction, operation, and use of
              robots. Participants may come up with ideas about new robots or
              work on improving existing ones.
            </p>
          </Col>
        </Row>
        <br />
        <Row className="card-1">
          <Col lg="3" md="3">
            <img className="mx-5" src={devops} height="150" alt="" />
          </Col>
          <Col>
            <h4>DevOps - Automation Toolkit / Framework</h4>
            <p className="align">
              DevOps is a set of practices that aim to improve collaboration and
              communication between software developers and operations teams,
              with the goal of improving the speed and quality of software
              delivery. Participants may come up with ideas about new automation
              toolkits or frameworks, or work on improving existing ones.
            </p>
          </Col>
        </Row>
        <br />
      </Container>
      {/* ************************************************************ */}
      <Container>
        <Row>
          <Col id="judging" className="spacing">
            <h1 className="text-center ">JUDGING CRITERIA </h1>
            <hr />
          </Col>
        </Row>
      </Container>
      <Container className="color-txt">
        <CardGroup>
          {JUDGE_REMARKS.map((values, i) => (
            <Card className="card-judging" key={i}>
              {/* <CardImg alt="Card image cap" src={values.imgs} top width="100%"/> */}
              <CardBody className="align">
                <CardTitle className="bold" tag="h6">
                  {values.title}
                </CardTitle>
                <CardText>{values.description}</CardText>
              </CardBody>
            </Card>
          ))}
        </CardGroup>
      </Container>
      {/* **************************************************************************** */}
      <br />
      <Container>
        <Row>
          <Col id="benefits" className="spacing">
            <h1 className="text-center ">BENEFITS OF PARTICIPATION </h1>
            <hr />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col className="align" lg="6">
            <Card className="space">
              <div className="color-txt display-benefits">
                <img src={networking} height="100" alt="" />

                <p className="spacing-margin">
                  <b>Collaboration and Networking</b> with colleagues from
                  different departments and teams can lead to new opportunities
                  and foster a culture of teamwork and communication within our
                  company.
                </p>
              </div>
            </Card>
          </Col>
          <Col className="align" lg="6">
            <Card className="space">
              <div className="color-txt display-benefits">
                <img src={idea} height="100" alt="" />

                <p className="spacing-margin">
                  This Hack-a-thon will provide a platform to explore new
                  projects and <b>Technologies</b>, which can expose the
                  participants to new areas of the business and give them a
                  better understanding of how Incedo operates.
                </p>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="align" lg="6">
            <Card className="space">
              <div className="color-txt display-benefits">
                <img src={lightbulb} height="100" alt="" />

                <p className="spacing-margin">
                  We are encouraging <b>innovation and risk-taking</b> through
                  this Hack-a-thon that can lead to breakthrough ideas and
                  solutions, and help create a culture that supports
                  experimentation.
                </p>
              </div>
            </Card>
          </Col>
          <Col className="align" lg="6">
            <Card className="space">
              <div className="color-txt display-benefits">
                <img src={partners} height="100" alt="" />

                <p className="spacing-margin">
                  We will have a fast-paced and <b>challenging environment</b>{" "}
                  that will allow the employees to develop and showcase their
                  technical skills, including coding, software design, and
                  problem-solving.
                </p>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="align" lg="6">
            <Card className="space">
              <div className="color-txt display-benefits">
                <img src={rocket} height="100" alt="" />

                <p className="spacing-margin">
                  Participating in this Hack-a-thon will boost morale, increase
                  motivation, and lead to a more engaged and productive
                  workforce and will this create a sense of{" "}
                  <b>community and camaraderie </b>
                  within Incedo.
                </p>
              </div>
            </Card>
          </Col>
          <Col className="align" lg="6">
            <Card className="space">
              <div className="color-txt display-benefits">
                <img src={fun} height="100" alt="" />

                <p className="spacing-margin">
                  Hackathons provide a fun and engaging way for employees to
                  participate in company activities, improving their overall{" "}
                  <b>job satisfaction</b> and commitment to the company.
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* ****************************************************************** */}
      <Container id="contact">
        <Card className=" center-txt back">
          <div className="text-center style">Having any queries ?</div>
          <div>
            <img src={question} height="100" alt="" />
          </div>
          <div>React out your Queries at</div>

          <Button className="space-up" color="warning">
            support@incedoinc.com
          </Button>
        </Card>
      </Container>
      <br />
    </div>
  );
};
export default LandingPage;
