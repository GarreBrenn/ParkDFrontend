import React from "react";
import "../css/Header.css";
import logo from "../ParkD_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
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
        <a href = "/tempPage">Become a host</a>
        <ExpandMoreIcon />
        <a href="/login">Login</a>
        <Avatar />
      </div>
    </div>
  );
}

export default Header;
