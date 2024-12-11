///// hooks
import React from "react";
import { useSelector } from "react-redux";

//// styles
import "./style.scss";

export const Preloader = () => {
  const { preloader } = useSelector((state) => state.requestSlice);
  const { preloaderDns } = useSelector((state) => state.dnsSlice);

  if (preloader || preloaderDns) {
    return (
      <div className="preloader">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
};
