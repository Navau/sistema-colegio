import React, { useRef } from "react";
import Slider from "react-slick";
import { map } from "lodash";

import "./SliderHome.scss";

export default function SliderHome(props) {
  const { images } = props;

  return (
    <Slider
      className="slider-images"
      speed={300}
      autoplay
      autoplaySpeed={2000}
      infinite={true}
      arrows={true}
      slidesToShow={1}
      slidesToScroll={1}
      lazyload={true}
      swipeToSlide={true}
      draggable={true}
      dots={true}
      appendDots={(dots) => (
        <div>
          <ul> {dots} </ul>
        </div>
      )}
    >
      {map(images, (item, index) => (
        <Image key={item.id} image={item} />
      ))}
    </Slider>
  );
}
function Image(props) {
  const {
    image: { id, url },
  } = props;

  return (
    <div
      className="slider-images__image"
      style={{ backgroundImage: `url(${url})` }}
    ></div>
  );
}
