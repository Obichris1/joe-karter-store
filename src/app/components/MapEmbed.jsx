import React from "react";

const MapEmbed = () => {
  return (
    <div className="map-container mb-10" style={{ width: "100%", height: "400px", borderRadius: "10px", overflow: "hidden", border: "1px solid #ddd" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8626951670226!2d3.2992404752411226!3d6.539018093453829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d0309e815cd%3A0x3b21b54e26fd9c27!2sJoe%20Karter!5e0!3m2!1sen!2sng!4v1750368309170!5m2!1sen!2sng"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
