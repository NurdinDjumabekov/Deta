import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    setTimeout(() => {
      navigate("/");
      localStorage.clear();
    }, 3000);
  }, []);

  return (
    <div className="notFound">
      <div>
        {/* <img src={logo} alt="logo" /> */}
        <h1>Страница не найдена!</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
