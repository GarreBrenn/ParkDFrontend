import React from 'react'
import '../css/Dropdown.css'
import {
    Paper, Avatar, Typography,
    Divider
} from '@mui/material'
import { Link } from "react-router-dom";

function Dropdown() {
    return (
        <Paper className="paper" elevation={4}>
            <Link style={{textDecoration: "none"}} to="/login">
                <p className="listItem">Login</p>
            </Link>
            <hr />
            <Link style={{textDecoration: "none"}} to="logout">
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
                    pathname: `/account`,
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

export default Dropdown
