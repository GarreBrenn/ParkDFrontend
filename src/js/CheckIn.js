import React, { useState, useEffect } from 'react'
import { Typography, Button, Input } from '@mui/material';
import { useLocation, Link } from "react-router-dom";
import "../css/CheckIn.css";
// const QRCode = require('qrcode.react');
// import { QrCodeScanner } from '@mui/icons-material';
//import QrReader from 'react-qr-scanner';
import QrReader from 'react-qr-reader'
import { truncate } from 'fs';

function CheckIn() {
    const location = useLocation();
    const spotID = location.state.ID;
    const guestID = location.state.guestID;
    const [spot, setSpot] = useState({});
    const [valid, setValid] = useState(false);
    const [reservationIndex, setReservationIndex] = useState(null);
    const [canCheckIn, setCanCheckIn] = useState(false);
    
    function isScanValid(scanData) {
        let scanObj = null;
        if (scanData == null) {return null;} else {
            scanObj = JSON.parse(scanData);
        }
        console.log("**** is scan valid ****")
        const res = spot.Record.Reservations[reservationIndex];
        console.log(res);
        console.log(scanObj);
        if (scanObj?.resTimeIn == res.resTimeIn &&
            scanObj?.resTimeOut == res.resTimeOut &&
            scanObj?.guestId == res.guestId) {
            console.log("res matches");
            return true;
        } else {
            console.log("res doesn't match");
            return false;
        }
    }
    
    function handleScan(data) {
        setCanCheckIn(isScanValid(data));
    }

    function handleScanError(err) {
        console.log(err);
    }

    function handleCheckIn() {
        const myData = {
            spotKey: spot.Key,
            reservationIndex: reservationIndex,
            CheckInTime: Date.now()
        }
        fetch('http://localhost:3000/testAPI/checkin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(myData),
            }).then((response) =>
                response.json().then((data) => {
                    console.log("response");
                    console.log(data)
                }))
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
                setValid(data.valid);
                if (data.valid) {
                    setSpot(data.spot);
                    setReservationIndex(data.reservationIndex);
                }
            }))

    }, []);

    if (valid && !canCheckIn) {
        return (
            <div className="container">
                <div className="title">
                    <Typography variant="h4">Check In</Typography>
                    <Typography variant="subtitle1" color="text.secondary" >
                        {valid} {spot.Record?.Address}
                    </Typography>
                </div>
                <div className="body">
                    <Typography variant="h5">Your upload</Typography>
                    <Typography variant="body2" color="text.secondary" >
                        To check in to this spot, please scan your QR code at the spot you're checking in to.
                    </Typography>
                    <div style={{ width: '700px', height: 'auto', margin: '0 auto' }} >
                        {!canCheckIn && <QrReader delay={300}
                            onError={handleScanError}
                            onScan={handleScan}
                            style={{ width: '100%' }}
                        />}
                    </div>
                    <Button disabled={!canCheckIn} variant="contained"
                    onClick={handleCheckIn()}> Check In </Button>
                    <Typography style={{marginTop: "10px"}} paragraph variant="body1" align="center" color="text.secondary">If you're experiencing difficulty checking in, you can  
                    {/* TODO: SUBSTITUTE GUESTID FOR REAL VALUE */}
                    <Link to="/reportaproblem">
                        <Typography align="inherit" display="inline" variant="body1" color="text.secondary">&nbsp;report a problem</Typography>
                    </Link></Typography>
                </div>
            </div>
        )
    } else {
        return (
            <>
                <Typography style={{ marginTop: "50px" }} variant="h4" align="center">
                    We're having trouble processing your request. Please try again later.
                </Typography>
            </>
        )
    }
}

export default CheckIn
