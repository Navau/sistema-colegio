import React from "react";
import { Card, Avatar, Image } from "antd";
import {
  TwitterOutlined,
  FacebookOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

import Logo from "../../../assets/img/logo-school.jpg";
import Personalities1 from "../../../assets/img/team1.jpg";
import Personalities2 from "../../../assets/img/team2.jpg";
import Personalities3 from "../../../assets/img/team3.jpg";
import Personalities4 from "../../../assets/img/team4.jpg";

import "./Personalities.scss";

const { Meta } = Card;

export default function Personalities() {
  return (
    <>
      <div className="personalities__header">
        <h1>PERSONALIDADES DE LA UNIDAD EDUCATIVA AVE MARIA</h1>
        <h4>La excelencia nos sigue a nosotros y al mundo.</h4>
      </div>
      <div className="personalities__content">
        <Card
          hoverable
          style={{ width: "20vw", height: "30vh" }}
          cover={<Image src={Personalities1} />}
          actions={[
            <TwitterOutlined key="twitter" />,
            <FacebookOutlined key="facebook" />,
            <WhatsAppOutlined key="whatsapp" />,
          ]}
        >
          <Meta
            avatar={<Avatar src={Logo} />}
            title="Sandra Alcazar"
            description="Comediante - Periodista"
          />
        </Card>
        <Card
          hoverable
          style={{ width: "20vw", height: "30vh" }}
          cover={<Image src={Personalities2} />}
          actions={[
            <TwitterOutlined key="twitter" />,
            <FacebookOutlined key="facebook" />,
            <WhatsAppOutlined key="whatsapp" />,
          ]}
        >
          <Meta
            avatar={<Avatar src={Logo} />}
            title="Denisse Quiroga"
            description="Periodista"
          />
        </Card>
        <Card
          hoverable
          style={{ width: "20vw", height: "30vh" }}
          cover={<Image src={Personalities3} />}
          actions={[
            <TwitterOutlined key="twitter" />,
            <FacebookOutlined key="facebook" />,
            <WhatsAppOutlined key="whatsapp" />,
          ]}
        >
          <Meta
            avatar={<Avatar src={Logo} />}
            title="Ruben Luna"
            description="Cantante - Autor"
          />
        </Card>
        <Card
          hoverable
          style={{ width: "20vw", height: "30vh" }}
          cover={<Image src={Personalities4} />}
          actions={[
            <TwitterOutlined key="twitter" />,
            <FacebookOutlined key="facebook" />,
            <WhatsAppOutlined key="whatsapp" />,
          ]}
        >
          <Meta
            avatar={<Avatar src={Logo} />}
            title="Jhon Arandia"
            description="Reconocido Peridista"
          />
        </Card>
      </div>
    </>
  );
}
