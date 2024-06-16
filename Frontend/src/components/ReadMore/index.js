import React, { useState } from "react";

const ReadMore = ({ text, maxLength }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => setIsReadMore(!isReadMore);

  return (
    <span>
      {isReadMore ? text.slice(0, maxLength) : text}
      {text.length > maxLength && (
        <span role="button" className="text-primary" onClick={toggleReadMore}>
          {isReadMore ? "...read more" : "...show less"}
        </span>
      )}
    </span>
  );
};

export default ReadMore;
