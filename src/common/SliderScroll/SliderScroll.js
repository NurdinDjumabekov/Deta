import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import "./style.scss";

const SliderScroll = (props) => {
  const { max, type, step, typeEnd, img } = props;
  const { name, onChange, value } = props;

  const handleSliderChange = (e, newValue) => {
    console.log({ [name]: newValue });
    onChange({ [name]: newValue });
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onChange({ [name]: newValue });
  };

  return (
    <div className="sliderScroll">
      <Box
        sx={{ display: "flex", alignItems: "center", width: "100%", gap: 1 }}
      >
        <div>{img}</div>
        <h5 className="title" sx={{ marginRight: 3 }}>
          {type}
        </h5>
        <Slider
          value={value}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          sx={{ color: "#1976d2", marginRight: 2 }}
          step={step} // Подстройте шаг в зависимости от количества доступных ядер
          max={max}
        />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className="inputNum"
          maxLength={max}
        />

        <p className="typeSel" sx={{ marginLeft: 1 }}>
          {typeEnd}
        </p>
      </Box>
    </div>
  );
};

export default SliderScroll;
