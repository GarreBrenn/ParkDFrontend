import React from 'react';
import '../css/Browse.css';
import { Grid, Box } from '@mui/material'
import SpotCard from './SpotCard.js'
export default class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            priceLow: this.props.location.state != null ? this.props.location.state.price[0] : null,
            priceHigh: this.props.location.state != null ? this.props.location.state.price[1] : null
        }
        console.log(data);
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
