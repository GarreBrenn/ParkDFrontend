import React, { useState } from "react";
import "../css/Search.css";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Slider from "@mui/material/Slider";
import { Link } from "react-router-dom";

function Search() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = React.useState([0, 30]);

  const marks = [
    { value: 0, label: "Free" },
    { value: 30, label: "$30+" },
  ];

  return (
    <div className="Search">
      <h3 className="prompt">Select the length of your stay</h3>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <div className="row">
          <DatePicker
            label="Start Date/Time"
            value={startDate}
            onChange={(newValue) => {
              console.log(newValue);
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date/Time"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </LocalizationProvider>
      <h3 className="prompt">Price range</h3>
      <div className="slider">
        <Slider
          getAriaLabel={() => "price range"}
          value={price}
          onChange={(event, value) => setPrice(value)}
          valueLabelDisplay="auto"
          marks={marks}
          max={30}
          getAriaValueText={(value) => `${value}`}
        />
      </div>
      <Link
        to={{
          pathname: "/browse",
          state: {
            startDate: startDate,
            endDate: endDate,
            price: price,
          }
        }}
      >
        <Button id="submit" variant="contained">
          Submit
        </Button>
      </Link>
    </div>
  );
}

export default Search;
