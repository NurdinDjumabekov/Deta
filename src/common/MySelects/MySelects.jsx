import React, { useRef, useState } from "react";

///// styles
import "./style.scss";

///// icons
import arrow from "../../assets/icons/arrowWhite.svg";

const MySelects = (props) => {
  const { list, initText, title } = props;
  const { onChange, nameKey, value } = props;

  const [active, setActive] = useState(false);
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

  const clickSelect = (item) => {
    onChange({ ...item, name: nameKey });
    setActive(false);
  };

  const textSelect = list?.find((i) => i?.value == value?.value);

  return (
    <div className="mySelect">
      <h5>{title}</h5>
      <div className="selectBlock" id="uniqueSelectID" ref={accordionRef}>
        <div className="selectBlock__inner" onClick={() => setActive(!active)}>
          <p className={textSelect ? "activeText" : ""}>
            {textSelect ? textSelect?.label : initText}
          </p>
          <img src={arrow} alt="<" className={active ? "" : "rotate180"} />
        </div>
        {active && (
          <div className="selectBlock__activeBlock">
            {list?.map((i) => (
              <p onClick={() => clickSelect(i)} key={i.value}>
                {i?.label}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySelects;
