import React, { useEffect, useState } from "react";
import "./Map.css";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Map(props) {
  const [lat_lng, set_lat_lng] = useState(null);

  const setPosition = (position) => {
    const lat_lng = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    set_lat_lng(lat_lng);
  };

  useEffect(() => {
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition, error, options);
    } else {
      console.log("error: geolocdation not supported");
    }
  }, []);

  const GMap = function () {
    const center = {
      lat: lat_lng.lat,
      lng: lat_lng.lng,
    };
    const zoom = 11;
    const key = { key: "AIzaSyCeSCMP1OEHFd7eRtmSS1HOQV7eEEe_o5k" };

    return (
      <GoogleMapReact
        bootstrapURLKeys={key}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <div lat={lat_lng.lat} lng={lat_lng.lng}>
          <LocationOnIcon fontSize="large" color="secondary" />
        </div>
        {props.listOfPlaces?.map((place, i) => (
          <div lat={place.LatLong.split("_")[0]} lng={place.LatLong.split("_")[1]} key={i}>
            <LocationOnIcon fontSize="large" color="primary" />
          </div>
        ))}
      </GoogleMapReact>
    );
  };

  if (lat_lng) {
    console.log(lat_lng.lat);
    return (
      <div className="outer_div">
        <GMap style={{ marginTop: "40px" }} a={2} />
      </div>
    );
  } else {
    return (
      <div className="outer_div">
        <h1>Loading...</h1>
      </div>
    );
  }
}

export default Map;
