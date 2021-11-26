import React from "react";
import "../css/index.css"
import {Redirect} from "react-router-dom";

export default function logout(){
    document.cookie = "email=; expires=Fri, 06 Jan 1970 00:00:00 UTC; path=/;";
    return(
        <Redirect to='/'></Redirect>
    )
}