import React, { useEffect, useState } from 'react'
import { Grid, Box } from '@mui/material'
import SpotCard from './SpotCard.js'

function Manage() {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/testAPI/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) =>
            response.json().then((data) => {
                setCardData(data);
            }))
    }, []);

    if (cardData !== null) {
        return (
            <Box sx={{ flexGrow: 1, marginTop: 5 }}>
                <Grid container rowSpacing={5}>
                    {
                        cardData.map(d => {
                            return <Grid item key={d.Key} xs={12} md={6} lg={4} xl={3}>
                                <SpotCard content={d}/>
                            </Grid>
                        })
                    }
                </Grid>
            </Box>
        );
    } else {
        return (<h1>Loading...</h1>);
    }
}

export default Manage
