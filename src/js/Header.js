import React, { useState } from "react";
import "../css/Header.css";
import logo from "../ParkD_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

function Header() {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  function dropdownComponent() {
    return (
      <div>
        <h1>Hello world</h1>
      </div>
      
      // <Paper>
      //   <p>Hello world</p>
      // </Paper>
    );
  }

  return (
    <div className="header">
      <Link to="/">
        <img className="header_icon" src={logo} alt="" />
      </Link>

      <div className="header_center">
        <input className="noOutline" type="text" />
        <SearchIcon />
      </div>

      <div className="header_right">
        <a href="/browse">Rent A Spot</a>
        <p>Become a host</p>
<<<<<<< HEAD
        <Avatar onClick={() => setDropdownOpen(!dropdownOpen)}/>
=======
        <a href = "/tempPage">Become a host</a>
        <ExpandMoreIcon />
        <a href="/login">Login</a>
        <Avatar />
>>>>>>> 96e9cbc94505a80d12afe717710261ca78849f2e
      </div>

      {dropdownOpen && <Dropdown/>}
    </div>
  );
}

export default Header;
