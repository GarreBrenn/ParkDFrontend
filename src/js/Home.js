import React, { useState, useEffect } from "react";
import "../css/Home.css";
import Banner from "./Banner.js"
import Map from "./Map";

function Home() {
  const [state, setState] = useState([]);

  useEffect(() => {
  let placesData = [];
  fetch('http://localhost:3000/testAPI/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) =>
      response.json().then((data) => {
        for (let [key,value] of data.entries()) {
          placesData.push(value.Record);
        }
        setState(placesData);
      }));
  }, []);

  return (
    <div>
      <Banner />
      {state && <Map listOfPlaces={state} />}
    </div>
  );
}

export default Home;
