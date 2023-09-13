import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { categories } from "../data/slider";
import { createSearchParams, useNavigate } from "react-router-dom";

const Slider = () => {
  const [margin, setMargin] = useState(0);
  const navigate = useNavigate();
  const categoryPage = (category) => {
    navigate({
      pathname: "/category",
      search: createSearchParams({
        category: category,
      }).toString(),
    });
  };
  const handleMargin = (direction) => {
    if (direction === "left") {
      if (margin === 0) {
        setMargin(-200);
      } else {
        setMargin((prev) => prev + 100);
      }
    } else {
      if (margin === -200) {
        setMargin(0);
      } else {
        setMargin((prev) => prev - 100);
      }
    }
  };
  const sliderElements = categories.map((category) => {
    return (
      <div
        key={category.id}
        className="slider-element"
        style={{ backgroundColor: `${category.bgColor}` }}
      >
        <div className="picture">
          <img src={category.image.src} alt={category.image.alt} />
        </div>
        <div className="details">
          <div className="details-sub-div">
            <h1>{category.title}</h1>
            <h3>{category.content}</h3>
            <div className="btn-div">
              <button onClick={()=>{categoryPage(category.category)}}>SHOP NOW</button>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="icon-div left" onClick={() => handleMargin("left")}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <div className="icon-div right" onClick={() => handleMargin("right")}>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
      <div className="slider" style={{ marginLeft: `${margin}vw` }}>
        {sliderElements}
      </div>
    </div>
  );
};

export default Slider;