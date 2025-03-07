///// hooks
import React from "react";
import { useSelector } from "react-redux";

//// styles
import "./style.scss";

export const Preloader = () => {
  const { preloader } = useSelector((state) => state.requestSlice);
  const { preloaderProxy } = useSelector((state) => state.haProxySlice);
  const { preloaderDns } = useSelector((state) => state.dnsSlice);
  const { preloadeкBaza } = useSelector((state) => state.bazaSaveSlice);
  const { preloaderTodos } = useSelector((state) => state.todosSlice);
  const { preloaderUsers } = useSelector((state) => state.todosSlice);
  const { preloaderDC } = useSelector((state) => state.dataCenterSlice);
  const { preloaderVM } = useSelector((state) => state.virtualMachineSlice);
  const { preloaderContainer } = useSelector(
    (state) => state.actionsContaiersSlice
  );

  if (
    preloader ||
    preloaderDns ||
    preloadeкBaza ||
    preloaderTodos ||
    preloaderUsers ||
    preloaderDC ||
    preloaderVM ||
    preloaderContainer ||
    preloaderProxy
  ) {
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
