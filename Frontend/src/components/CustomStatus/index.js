import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { BiCommentEdit } from "react-icons/bi";
import { MdPublishedWithChanges } from "react-icons/md";
import { Button } from "reactstrap";

const CustomStatus = ({ status, addClasses }) => {
  return (
    <Button
      style={{ cursor: "default" }}
      block
      size="sm"
      className={`p-2 border-0 d-flex justify-content-center align-items-center ${
        status === "UNDER REVIEW"
          ? "bg-warning"
          : status === "REVIEWED"
          ? "bg-info"
          : status === "ACCEPTED"
          ? "bg-success"
          : status === "REJECTED" && "bg-danger"
      } ${addClasses}`}
    >
      <div>{status}</div>
      <div className="ms-auto">
        {status === "UNDER REVIEW" ? (
          <BiCommentEdit size={20} />
        ) : status === "REVIEWED" ? (
          <MdPublishedWithChanges size={20} />
        ) : status === "ACCEPTED" ? (
          <AiOutlineCheckCircle size={20} />
        ) : (
          status === "REJECTED" && <AiOutlineCloseCircle size={20} />
        )}
      </div>
    </Button>
  );
};

export default CustomStatus;
