import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material';
import { useLocation } from "react-router-dom";
// const QRCode = require('qrcode.react');
// import { QrCodeScanner } from '@mui/icons-material';
import QrReader from 'react-qr-scanner';

function CheckIn() {
    const location = useLocation();
    const spotID = location.state.ID;
    const guestID = location.state.guestID;
    const [spot, setSpot] = useState({});
    const [valid, setValid] = useState(false);
    const [qrData, setQrData] = useState(null);
    const spot2 = {}

    function handleScan(data) {
        setQrData(data);
    }

    function handleScanError(err) {
        console.log(err);
    }

    const previewStyle = {
        height: 240,
        width: 320
    }

    useEffect(() => {
        const myData = {
            spotID: spotID,
            guestID: guestID
        }
        fetch('http://localhost:3000/testAPI/getreservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myData),
        }).then((response) =>
            response.json().then((data) => {
                console.log(data)
                console.log(data.spot)
                setValid(data.valid);
                if (valid) {
                    setSpot(data.spot);
                }
            }))

        console.log("here")
    }, []);

    if (valid) {
    return (
        <div className="container">
            <div className="title">
                <Typography variant="h4">Check In</Typography>
                <Typography variant="subtitle1" color="text.secondary" >
                    {valid} {spot.Record?.Address}
                </Typography>
            </div>
            <div className="body">
                <Typography variant="h5">Scan this</Typography>
            </div>
            <QrReader
                delay={100}
                style={previewStyle}
                onError={handleScanError}
                onScan={handleScan}
            />
            <p>qrdata: {qrData}</p>
        </div>
    )} else {
        return (
            <Typography style={{marginTop: "50px"}} variant="h4" align="center">
                We're having trouble processing your request. Please try again later.
            </Typography>
        )
    }
}

export default CheckIn
