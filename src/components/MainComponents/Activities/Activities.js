import React from "react";
import { Grid } from "semantic-ui-react";
import { Image } from "antd";

import Image1 from "../../../assets/img/portfolio/1.jpg";
import Image2 from "../../../assets/img/portfolio/2.jpg";
import Image3 from "../../../assets/img/portfolio/3.jpg";
import Image4 from "../../../assets/img/portfolio/4.jpg";
import Image5 from "../../../assets/img/portfolio/5.jpg";
import Image6 from "../../../assets/img/portfolio/6.jpg";
import Image7 from "../../../assets/img/portfolio/7.jpg";
import Image8 from "../../../assets/img/portfolio/8.jpg";
import Image9 from "../../../assets/img/portfolio/9.jpg";
import Image10 from "../../../assets/img/portfolio/10.jpg";
import Image11 from "../../../assets/img/portfolio/11.jpg";
import Image12 from "../../../assets/img/portfolio/12.jpg";
import Image13 from "../../../assets/img/portfolio/13.jpg";
import Image14 from "../../../assets/img/portfolio/14.jpg";

import "./Activities.scss";

const arrayImages = [
  { url: Image1 },
  { url: Image2 },
  { url: Image3 },
  { url: Image4 },
  { url: Image5 },
  { url: Image6 },
  { url: Image7 },
  { url: Image8 },
  { url: Image9 },
  { url: Image10 },
  { url: Image11 },
  { url: Image12 },
  { url: Image13 },
  { url: Image14 },
];

export default function Activities() {
  return (
    <>
      <div className="activities__header">
        <h1>
          ACTIVIDADES DE LA UNIDAD <br></br> EDUCATIVA AVE MARIA
        </h1>
        <h4>
          Mostrando un poco de las bonitas actividades que realizamos como
          Unidad Educativa
        </h4>
      </div>
      <div className="activities__content">
        <Grid className="activities__content__grid">
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Image src={arrayImages[0].url} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Image src={arrayImages[1].url} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Image src={arrayImages[2].url} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Image src={arrayImages[3].url} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Image src={arrayImages[4].url} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Image src={arrayImages[5].url} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Image src={arrayImages[6].url} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Image src={arrayImages[7].url} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Image src={arrayImages[8].url} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Image src={arrayImages[9].url} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Image src={arrayImages[10].url} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Image src={arrayImages[11].url} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Image src={arrayImages[12].url} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Image src={arrayImages[13].url} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}
