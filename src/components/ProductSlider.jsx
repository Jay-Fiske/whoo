import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const ProductSlider = (props) => {
  const [margin, setMargin] = useState(0);
  const lastSlideIndex = props.images.length - 1;
  const maxMargin = lastSlideIndex * -100;
  const handleMargin = (direction) => {
    if (direction === "left") {
      if (margin === 0) {
        setMargin(maxMargin);
      } else {
        setMargin((prev) => prev + 100);
      }
    } else {
      if (margin === maxMargin) {
        setMargin(0);
      } else {
        setMargin((prev) => prev - 100);
      }
    }
  };

  const sliderElements = props.images.map((image, index) => (
    <div className="slider-product-element" key={index}>
      <img src={image} alt="product" />
    </div>
  ));

  return (
    <div>
      <div>
        <div
          className="icon-product-div left"
          onClick={() => handleMargin("left")}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div
          className="icon-product-div right"
          onClick={() => handleMargin("right")}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <div className="product-slider" style={{ marginLeft: `${margin}vw` }}>
        {sliderElements}
      </div>
    </div>
  );
};

export default ProductSlider;