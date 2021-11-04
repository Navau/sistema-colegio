import React, { useState, useEffect } from "react";
import { Row, Col, Carousel, Button } from "antd";
import { Link } from "react-router-dom";
import SliderHome from "../../../components/Sliders/SliderHome";
import Image1 from "../../../assets/img/1.jpg";
import Image2 from "../../../assets/img/2.jpg";
import Image3 from "../../../assets/img/3.jpg";

import "./Home.scss";

export default function Home() {
  const [images, setImages] = useState({});
  useEffect(() => {
    const arrayAux = [];
    arrayAux.push({ id: 1, url: Image1 });
    arrayAux.push({ id: 2, url: Image2 });
    arrayAux.push({ id: 3, url: Image3 });
    setImages(arrayAux);
  }, []);
  return (
    <>
      <SliderHome images={images} />
    </>
  );
}
