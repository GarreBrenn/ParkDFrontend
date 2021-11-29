import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Grid, Box } from '@mui/material'
import SpotCard from './SpotCard.js'
import { getUserID } from './checkCookieExists.js';

function Manage() {
    const [cardData, setCardData] = useState([]);
    const location = useLocation();

    console.log(location);

    useEffect(() => {
        const myData = {
            // HostID: getUserID()
            HostID: 1
        }
        fetch('http://localhost:3000/testAPI/gethostspots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myData),
        }).then((response) =>
            response.json().then((data) => {
                setCardData(data);
            }))
    }, []);

    console.log(cardData)
    return (
        <Box sx={{ flexGrow: 1, marginTop: 5 }}>
            <Grid container rowSpacing={5}>
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <SpotCard addnew />
                </Grid>
                {
                    cardData.map(d => {
                        return <Grid item key={d.Key} xs={12} md={6} lg={4} xl={3}>
                            <SpotCard content={{ Record: d }} manage />
                        </Grid>
                    })
                }
            </Grid>
        </Box>
    );
}

export default Manage
