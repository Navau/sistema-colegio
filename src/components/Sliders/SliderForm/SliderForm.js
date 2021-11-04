import React, { useRef } from "react";
import Slider from "react-slick";

import "./SliderForm.scss";

export default function SliderForm(props) {
  const { children, setSliderRef, setActiveSlide } = props;

  const sliderRef = useRef();

  setSliderRef(sliderRef);
  return (
    <div className="slider-form-items">
      <Slider
        className="slider-form-items__list"
        speed={300}
        infinite={false}
        ref={sliderRef}
        slidesToShow={1}
        slidesToScroll={1}
        lazyload={true}
        swipeToSlide={false}
        draggable={false}
        dots={true}
        beforeChange={(current, next) => setActiveSlide(next + 1)}
        appendDots={(dots) => (
          <div>
            <ul> {dots} </ul>
          </div>
        )}
      >
        {children}
      </Slider>
    </div>
  );
}
