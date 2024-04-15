import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function RangeSlider({ min, max, step, formatLabel,handleChange }) {
  const [value, setValue] = React.useState([min, max]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    handleChange(newValue); // Gọi hàm xử lý sự kiện từ props
  };
  

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Hour range"}
        value={value}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={formatLabel}
        min={min}
        max={max}
        step={step}
      />
      
    </Box>
  );
}
