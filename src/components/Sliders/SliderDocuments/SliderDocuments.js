import React from "react";
import { Image } from "antd";
import { map } from "lodash";
import Slider from "react-slick";

import ImageError from "../../../assets/img/error.png";

import "./SliderDocuments.scss";

export default function SliderDocuments(props) {
  const { data } = props;
  return (
    <div className="slider-documents">
      <Slider
        className="slider-documents__items"
        speed={300}
        infinite={true}
        arrows={true}
        slidesToShow={3}
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
        {map(data, (item, index) => (
          <div key={index}>
            {item.url ? (
              <Image.PreviewGroup>
                <Image
                  alt={item?.nameDocument + index}
                  src={item?.url}
                  width={200}
                />
              </Image.PreviewGroup>
            ) : (
              <Image.PreviewGroup>
                <Image
                  alt={item?.nameDocument + index}
                  src={ImageError}
                  width={200}
                />
              </Image.PreviewGroup>
            )}
            <h2>{item?.nameDocument}</h2>
          </div>
        ))}
      </Slider>
    </div>
  );
}
