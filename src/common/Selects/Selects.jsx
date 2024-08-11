import React, { useRef, useState } from "react";

///// styles
import "./style.scss";

///// только для сортировки на главной странице
import aroow from "../../assets/icons/arrowWhite.svg";

const Selects = (props) => {
  const { list, initText } = props;
  const { onChnage, nameKey } = props;

  const [active, setActive] = useState(false);
  const [id, setId] = useState(0);
  const accordionRef = useRef(null);

  React.useEffect(() => {
    const handleChange = (e) => {
      if (
        active &&
        accordionRef.current &&
        !accordionRef.current.contains(e.target)
      ) {
        setActive(false);
      }
    };

    document.addEventListener("click", handleChange);

    return () => {
      document.removeEventListener("click", handleChange);
    };
  }, [active]);

  const clickSelect = (id, name) => {
    setActive(false);
    setId(id);
    onChnage(nameKey, name, id);
  };

  const textSelect = list?.find((i) => i?.id === id);

  return (
    <div className="selectBlockMain">
      <div className="selectBlock" id="uniqueSelectID" ref={accordionRef}>
        <div className="selectBlock__inner" onClick={() => setActive(!active)}>
          <p className={textSelect ? "activeText" : ""}>
            {textSelect ? textSelect?.name : initText}
          </p>
          <img src={aroow} alt="<" className={active ? "" : "rotate180"} />
        </div>
        {active && (
          <div className="selectBlock__activeBlock">
            {list?.map((i) => (
              <p onClick={() => clickSelect(+i?.id, i?.name)} key={i.id}>
                {i?.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Selects;
