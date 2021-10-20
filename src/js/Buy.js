import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";

export default function Buy() {
    const location = useLocation();
    useEffect(() => {
        const data = {
            startDate: location.state.startDate,
            endDate: location.state.endDate,
            price: location.state.price
        }

        fetch('http://localhost:3000/testAPI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then((response) =>
            response.json().then((data) => { console.log(data) }))


    }, []);

    return (
        <div>
            <h1>{"startDate: " + location.state.startDate}</h1>
            <h1>{"endDate: " + location.state.endDate}</h1>
            <h1>{"price: " + location.state.price}</h1>
        </div>
    );
}
