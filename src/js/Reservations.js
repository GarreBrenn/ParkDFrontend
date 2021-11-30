
import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { checkCookieExists, getUserID } from './checkCookieExists';
import '../css/Browse.css';
import { Grid, Box } from '@mui/material'
import SpotCard from './SpotCard.js'

function Reservations() {
    const history = useHistory();
    const [valid, setValid] = useState(false);
    const [spots, setSpots] = useState(false);

    useEffect(() => {
        let userID = "";
        if (checkCookieExists()) {
            userID = getUserID();
        } else {
            history.push("/login");
        }

        const myData = {
            // TODO: REPLACE
            guestID: userID
        }
        console.log(myData);
        fetch('http://localhost:3000/testAPI/getreservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myData),
        }).then((response) =>
            response.json().then((data) => {
                setValid(data.valid);
                if (data.valid) {
                    setSpots(data.spots);
                }
            }))

    }, []);

    if (valid) {
        return (
            <Box sx={{ flexGrow: 1, marginTop: 5 }}>
                <Grid container rowSpacing={5}>
                    {
                        Object.keys(spots).map(d => {
                            const obj = spots[d];
                            return <Grid item key={obj.Key} xs={12} md={6} lg={4} xl={3}>
                                <SpotCard regular content={obj} />
                            </Grid>
                        })
                    }
                </Grid>
            </Box>
        );
    } else {
        return (
            <h1>It looks like you don't have any reservations...</h1>
        )
    }
}

export default Reservations
