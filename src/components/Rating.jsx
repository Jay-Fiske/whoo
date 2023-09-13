import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Rating = (props) => {
  return (
    <div className="rating">
      <FontAwesomeIcon icon={faStar} className="star" />
      <FontAwesomeIcon icon={faStar} className="star" />
      <FontAwesomeIcon icon={faStar} className="star" />
      <FontAwesomeIcon icon={faStar} className="star" />
      <FontAwesomeIcon icon={faStar} className="star" />
      <div className="front-rating" style={{ width: `${props.percent}%` }}>
        <FontAwesomeIcon icon={faStarSolid} className="star" />
        <FontAwesomeIcon icon={faStarSolid} className="star" />
        <FontAwesomeIcon icon={faStarSolid} className="star" />
        <FontAwesomeIcon icon={faStarSolid} className="star" />
        <FontAwesomeIcon icon={faStarSolid} className="star" />
      </div>
    </div>
  );
};

export default Rating;