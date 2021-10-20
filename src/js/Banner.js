import React, { useState } from "react";
import "../css/Banner.css";
import { Button } from "@mui/material";
import Search from "./Search.js"

function Banner() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="Banner">
      <div className="banner_search">
        {showSearch && <Search />}
        <Button
          className="search_button"
          onClick={() => setShowSearch(!showSearch)}
          variant="outlined"
        >
          {showSearch ? "Hide" : "Search Dates"}
        </Button>
      </div>
      <div className="banner_info">
        <h1>Find a place to park :/</h1>
        <h5>Parking is hard. Be better. We'll help.</h5>
        <Button variant="contained"
        onClick={() => setShowSearch(!showSearch)}>Explore Nearby</Button>
      </div>
    </div>
  );
}

export default Banner;
