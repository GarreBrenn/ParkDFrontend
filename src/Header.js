import React from "react";
import "./Header.css";
import logo from "./ParkD_logo.png";
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
        <input type="text" />
        <SearchIcon />
      </div>

      <div className="header_right">
        <p>Become a host</p>
        <ExpandMoreIcon />
        <Avatar />
      </div>
    </div>
  );
}

export default Header;
