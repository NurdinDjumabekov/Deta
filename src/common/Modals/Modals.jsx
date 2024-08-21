import "./Modals.scss";
import krest from "../../assets/icons/krestWhite.svg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOpenModals } from "../../store/reducers/stateSlice";

const Modals = (props) => {
  const { setOpenModal, openModal, title, children } = props;

  const dispatch = useDispatch();

  const closeModal = () => {
    setOpenModal(false);
    dispatch(setOpenModals(0)); //// закрываю модалку
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [openModal]);

  return (
    <>
      {openModal && (
        <div className="modal">
          <div className="modal__shadow" onClick={closeModal}></div>
          <div className="modal__inner">
            <div className="modal__inner__title">
              <h6>{title}</h6>
              <button className="krest" onClick={closeModal}>
                <img src={krest} alt="x" />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modals;
