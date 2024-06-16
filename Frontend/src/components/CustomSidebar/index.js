import React from "react";
import "./index.css";

const CustomSidebar = () => {
  return (
    <div className="social">
      <a href="/">
        <div className="social-btn color-telegram">
          <div className="icons8-telegram-app"></div>
          <p className="order-1 google-font margin-telgram">Telegram</p>
        </div>
      </a>
      <a href="/">
        <div className="social-btn color-instagram">
          <div className="icons8-instagram"></div>
          <p className="order-1 google-font margin-instagram">Instagram</p>
        </div>
      </a>
      <a href="/">
        <div className="social-btn color-whatsapp">
          <div className="icons8-whatsapp"></div>
          <p className="order-1 google-font margin-whatsapp">WhatsApp</p>
        </div>
      </a>
      <a href="/">
        <div className="social-btn color-github">
          <div className="icons8-github"></div>
          <p className="order-1 google-font margin-github">GitHub</p>
        </div>
      </a>
    </div>
  );
};

export default CustomSidebar;
