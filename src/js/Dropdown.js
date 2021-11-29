import React from 'react'
import '../css/Dropdown.css'
import {
    Paper, Avatar, Typography,
    Divider
} from '@mui/material'
import { Link } from "react-router-dom";
import { checkCookieExists, getUserID } from './checkCookieExists';


function ourCookieExists(){ // CHECK TO SEE IF USER IS LOGGED IN BY EXISTENSE
    if(document.cookie.split(';').some((item) => item.trim().startsWith('email='))){
        console.log("THE USER HAS A COOKIE. THEY ARE LOGGED IN.");        
        return true;
    }
    else{
        console.log("THE USER HAS TO LOGIN")
        return false;
    }
}   


function Dropdown() {
  
  //get userID if logged in
  let userID = null;
  if (checkCookieExists()) {
      userID = getUserID();
  }

    if (ourCookieExists()){ // the ARE logged in so give only the logOUT function
        return (
            <Paper className="paper" elevation={4}>
              
                <Link style={{textDecoration: "none"}} to="/logout">
                    <p className="listItem">Logout</p>
                </Link>
                <hr />
                <Link style={{textDecoration: "none"}} 
                    to={{
                        pathname: `/reservations`,
                        state: {
                            userID: 1
                        }
                    }}
                >
                    <p className="listItem">Reservations</p>
                </Link>
                <hr />
                <Link style={{textDecoration: "none"}} 
                    to={{
                        pathname: `/manage`,
                        state: {
                            userID: 1
                        }
                    }}
                >
                    <p className="listItem">Manage Spots</p>
                </Link>
                <hr />
                <Link style={{textDecoration: "none"}} 
                    to={{
                        pathname: `/myaccount`,
                        state: {
                            userID: 1
                        }
                    }}
                >
                    <p className="listItem">Account</p>
                </Link>
            </Paper>
        )
    }
    else{ // they AREN'T logged in so give only login option
        return (
            <Paper className="paper" elevation={4}>
            
             <Link style={{textDecoration: "none"}} to="/login">
                    <p className="listItem">Login</p>
            </Link>
        </Paper>

        
    )
   } 

}

export default Dropdown
