//import React, { useEffect, useState} from 'react'
//import { useLocation} from "react-router-dom";
//import "../css/Browse.css";

//export default function Browse() {
//    const location = useLocation();
//    const [queryData, setQueryData] = useState([]);
//    const [firstColumnData, setFirstColumnData] = useState([]);
//    const [secondColumnData, setSecondColumnData] = useState([]);
//    const [thirdColumnData, setThirdColumnData] = useState([]);
//    let data;
//   useEffect(() => {
//        data = {
//            startDate: location.state != null ? location.state.startDate : null,
//            endDate: location.state != null ? location.state.endDate : null,
//            price: location.state != null ? location.state.price : null
//        }
//            
//    }, []);
//
//    );
//}

import React from 'react';
import '../css/Browse.css';
import { Grid, Box } from '@mui/material'
import SpotCard from './SpotCard.js'
export default class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // firstColumnData: null,
            // secondColumnData: null,
            // thirdColumnData: null
            cardData: null,
            lat_lng: {}
        }

    }

    componentDidMount() {
        const setPosition = (position) => {
            const lat_lng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            this.setState({
                lat_lng: lat_lng
            })
        };

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

        let data = {
            startDate: this.props.location.state != null ? this.props.location.state.startDate : null,
            endDate: this.props.location.state != null ? this.props.location.state.endDate : null,
            price: this.props.location.state != null ? this.props.location.state.price : null
        }
        fetch('http://localhost:3000/testAPI/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then((response) =>
            response.json().then((data) => {
                this.setState({
                    cardData: data
                })
            }))
    }
    render() {
        if (this.state.cardData !== null && this.state.lat_lng !== null) {
            return (
                <Box sx={{ flexGrow: 1, marginTop: 5 }}>
                    <Grid container rowSpacing={5}>
                        {
                            this.state.cardData.map(d => {
                                return <Grid item key={d.Key} xs={12} md={6} lg={4} xl={3}>
                                    <SpotCard content={d}
                                        filterInfo={this.props.location.state}
                                        location={this.state.lat_lng} />
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
}
