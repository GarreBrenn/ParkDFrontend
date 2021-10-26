import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

//TODO: BUY PAGE BREAKS IF START/END DATES AND PRICE WERE NOT INITIALIZED
export default function Buy() {
    const location = useLocation();
    const [myData, setMyData] = useState({});
    useEffect(() => {
        const data = {
            id: location.state.content.Record.ID,
            timeIn: Date.parse(location.state.filterInfo.startDate),
            timeOut: Date.parse(location.state.filterInfo.endDate)
        }
        setMyData(data);

        fetch('http://localhost:3000/testAPI/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then((response) =>
            response.json().then((data) => { 
                console.log("hello world");
                console.log(data) }))


    }, []);

    if (Object.keys(myData).length === 0) {
        return (
            <h1>Loading...</h1>
        );
    } else {
        return (
            <div>
                <h1>Congratulations, you've reserved a spot!</h1>
                <h3>Address: {location.state.content.Record.Address}</h3>
                <h3>Checkin Date/Time: {location.state.filterInfo.startDate.toString()}</h3>
                <h3>Checkout Date/Time: {location.state.filterInfo.endDate.toString()}</h3>
            </div>
        );
    }
}
