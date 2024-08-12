import "./Modals.scss";
import krest from "../../assets/icons/krest.svg";
import { useEffect } from "react";

const Modals = (props) => {
  const closeModal = () => {
    props.setOpenModal(false);
  };

  useEffect(() => {
    if (props.openModal) {
      document.body.style.overflow = "hidden";
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [props.openModal]);

  return (
    <>
      {props.openModal && (
        <div className="modal">
          <div className="modal__shadow" onClick={closeModal}></div>
          <div className="modal__inner">
            {props.children}
            <button className="krest" onClick={closeModal}>
              <img src={krest} alt="x" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;
