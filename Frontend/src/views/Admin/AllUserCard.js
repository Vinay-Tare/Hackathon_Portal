import React, { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import {
  Card,
  CardBody,
  CardGroup,
  CardHeader,
  CardText,
  CardTitle,
  Collapse,
} from "reactstrap";

const AllUserCard = ({ allPanelists, allJudges }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  if (allPanelists && allJudges)
    return (
      <Card
        className="my-3"
        style={{
          boxShadow: "0px 0px 3px black",
        }}
      >
        <CardBody className="px-0 pb-0">
          <CardTitle
            tag="h5"
            role="button"
            onClick={toggle}
            className="custom-collapse-toggler custom-card-title px-3 pb-1"
          >
            <span>All Judges/Panelists</span>
            <span>
              {isOpen ? <RxCaretUp size={30} /> : <RxCaretDown size={30} />}
            </span>
          </CardTitle>
          <Collapse isOpen={isOpen}>
            <CardGroup>
              <Card className="text-center rounded-left border-bottom0-0">
                <CardHeader tag="h6" className="bg-dark text-white  rounded-0">
                  All Panelists
                </CardHeader>
                <CardBody>
                  {allPanelists.map((panelist) => (
                    <CardText key={panelist.id}>{panelist.name}</CardText>
                  ))}
                </CardBody>
              </Card>
              <Card className="text-center rounded-right">
                <CardHeader
                  tag="h6"
                  className="bg-dark text-white  rounded-0 rouned-bottom"
                >
                  All Judges
                </CardHeader>
                <CardBody>
                  {allJudges.map((judge) => (
                    <CardText key={judge.id}>{judge.name}</CardText>
                  ))}
                </CardBody>
              </Card>
            </CardGroup>
          </Collapse>
        </CardBody>
      </Card>
    );
};

export default AllUserCard;
