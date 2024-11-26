import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VncScreen } from "react-vnc";
import "./style.scss";

const VncPage = () => {
  const { vns_key } = useParams(); // Использование параметра маршрута
  const ref = useRef();

  useEffect(() => {
    const rfb = ref.current?.rfb;

    return () => {
      // Чистка соединения при размонтировании компонента
      if (rfb) {
        rfb.disconnect(); // Корректно закрываем соединение
      }
    };
  }, []);

  const vncUrl = `https://dd-api.ibm.kg/api2/json/nodes/host19/qemu/${vns_key}/vncwebsocket?port=5900&vncticket=PVEVNC:66D70074::pf8/zqUA+4Shrn5PFtYuxbuDZEpXGvIdP4vjahLcpFh8+I/0u3mr4lkP1kMrW1oiZTyl81qJOOAHD9VXf3jQUvbVL0FDMBwhkqN6I/K8s1EdMUs7TMiN0pbd0MS24pqAdtvCJbxzFCrlKJFHwCb6LkswutL3GERa5hgoHMoZLyIqWJKzf9KUv+jlcbNTYwpi9cD0dxcl5GhlsjttQPslZtM/HYNshFRhPU5teEnUp8q8g1IRVzNXxvg5wZEO1KtSPvN4pn7ypZVSi61gJk3uEoqHg/dwj7zyiaq/RYJtF87uKa0+5PzUCBWFczuuh/At7iRO4/tNnAQmLCtVlkdNgQ==`;

  return (
    <VncScreen
      url={vncUrl}
      scaleViewport
      background="#000000"
      style={{ width: "100vw", height: "100vh" }}
      ref={ref}
    />
  );
};

export default VncPage;

// import RFB from "novnc-core";
// import React, { useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";

// const VncPage = () => {
//   const { vns_key } = useParams();
//   const url = `https://dd-api.ibm.kg/vnc/?key=${vns_key}`;
//   const vncContainer = useRef(null);

//   useEffect(() => {
//     if (vncContainer.current) {
//       const rfb = new RFB(vncContainer.current, url, {
//         credentials: { username: "", password: "" },
//       });

//       rfb.addEventListener("connect", () => {
//         console.log("Connected to VNC");
//       });

//       rfb.addEventListener("disconnect", (e) => {
//         console.error("Disconnected from VNC:", e.detail.clean);
//       });

//       return () => {
//         rfb.disconnect();
//       };
//     }
//   }, [url]);

//   return <div ref={vncContainer} style={{ width: "100vw", height: "100vh" }} />;
// };

// export default VncPage;
// npm install novnc-core
