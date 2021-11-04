import React from "react";
import {
  TwitterOutlined,
  FacebookOutlined,
  GoogleOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

import "./Contact.scss";

export default function Contact() {
  return (
    <div className="contact">
      <div className="contact__icons">
        <TwitterOutlined key="twitter" />
        <FacebookOutlined key="facebook" />
        <GoogleOutlined key="google" />
        <LinkedinOutlined key="linkedin" />
        <WhatsAppOutlined key="whatsapp" />
      </div>
      <div className="contact__info">
        <h2>© Unidad Educatica Ave Maria - All right reserved</h2>
        <h4>Ave Maria by Univalle</h4>
      </div>
    </div>
  );
}
