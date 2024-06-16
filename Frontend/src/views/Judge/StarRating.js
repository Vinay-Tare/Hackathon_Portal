import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import "./StarRating.css";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      <Container>
        <Row>
          <Col xs="4" className="names my-3 mx-2">
            {rating.name}
          </Col>
          <Col>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={
                    index <= (hover || rating.value) ? "stars on" : "stars off"
                  }
                  onClick={() => {
                    setRating(index);
                  }}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating.value)}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StarRating;
