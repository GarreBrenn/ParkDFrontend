import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import "../css/ManageSpotPage.css";
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { MenuItem } from '@mui/material';
import { Link } from "react-router-dom";
import { checkCookieExists, getUserID } from './checkCookieExists';
import QRCode from 'react-qr-code';

function Register() {
    const history = useHistory();
    const [address, setAddress] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [price, setPrice] = useState(0);
    const [state, setState] = useState("Available");
    const [type, setType] = useState("Street")
    const [userID, setUserID] = useState(null);
    const states = [{ value: "Available", label: "Available" },
    { value: "Unavailable", label: "Unavailable" }];
    const types = [{ value: "Street", label: "Street" },
                    { value: "Garage", label: "Garage" },
                    { value: "Lot", label: "Lot" },
                    { value: "Driveway", label: "Driveway" }];


    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleLatChange = (event) => {
        setLat(event.target.value);
    };

    const handleLongChange = (event) => {
        setLong(event.target.value);
    };

    function handleCreateSpot() {
        const myData = {
            latlong: lat + "_" + long,
            address: address,
            type: type,
            price: price,
            state: state,
            hostID: userID,
            guestID: "",
            photo: ""
        }
        console.log("pre")
        fetch('http://localhost:3000/testAPI/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myData),
        }).then((response) =>
            response.json().then((data) => {
                console.log(data)
            }))
        console.log("post")
    }

    // const [address, setAddress] = useState("");
    // const [lat, setLat] = useState("");
    // const [long, setLong] = useState("");
    // const [price, setPrice] = useState(0);
    // const [state, setState] = useState("Available");
    // const [userID, setUserID] = useState(null);
    
    function canSubmit() {
        if (address !== "" &&
            lat !== "" &&
            long !== "" &&
            price >= 0 &&
            state !== "" &&
            userID !== null) 
        {
            return true;
        } else {
            return false;
        }
    } 

    useEffect(() => {

        if (checkCookieExists()) {
            setUserID(getUserID());
        } else {
            history.push("/");
        }

    }, []);

    return (
        <div className="container">
            <div className="title">
                <Typography variant="h4">Register a new spot</Typography>
                {/* <Typography variant="subtitle1" color="text.secondary" >
                    {distanceAndTime.distance} away from you (About {distanceAndTime.time})
                </Typography> */}
            </div>
            <img className="spotImage" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFRYZGBgaGhoaGBgaGiEaHBwYHBgZGhoaHBocIS4lHB4rIR4YJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISGjQhISE0MTQxNDQ0MTQ0MTQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQxMTExNDE0NDE/MTQxNDQxNP/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQYAB//EAEMQAAIBAgIGBggDBgUEAwAAAAECAAMRBCEFEjFBUWEicYGRofAGEzJSscHR4UJikiMzcoKy8RQVU5OiFkNz0pSjwv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHxEBAQEAAgMBAQEBAAAAAAAAAAERAjESIUFRAyIT/9oADAMBAAIRAxEAPwDhn0gxFrL3feeXSLBdWy27evjEXqKPzHgNnaZbD1NYOMgQustuXteFz2S+p0rRw2lNUMNS+shp7Ts10e+zdqgSEx43o0xyWO8ntkZ85NHQ08bSO0lesfSa2FwiOLqwYcQb/CcWjki1zl8PPxjqUaqWdCRvDIbG3Zug19C0bgtUiw8OfnzaO6QwNmR8wfWU1vfi4ty3+PPPA9FfSpCwp4llQ26NQ5KeT7lO3pZDqync6bI9UG4PTbudTfzx5nV1GaysXo6swI9c/UKhp97KCfJ53rhtCM2RqP8A/IqfTr8eGeljHsfPnz3Cw1fpC3nu85DgIlVOL9EwKTsXdrI5zrVWGSk+yWtu2TG9EtDDEIWZ9WzsuQa9hbeHA47vt3WIrA4d+aOP+B4dmzlb8M4b0Jxeqji+yo3ymOXL1cXjPbexvopRor60VKrtrBekVtZgUOxb7+Pztr6T9H6KUarqXDKjsvTO0KSMt+cS0vjgcO/LVPcQfP8Ae/SnEqQQbEZgg7LZ3vfdke48DJOdzsscritD0gxAZwq4lU/eN7DYZHIOfvG99s43E1FNNWSowNsyGJIOuBZ1bPIcAN0+jV9HYOxvhqH+0m7+Xl4cjOR0zojDC5Sii8gg8OA5feLz36s4uOxRqKGOvrWtYgjriT4mp77eH0mpicCl8kUctUWiFTDL7gB6pPK/q4Vau/vt/wAfpK+ue20HbtG7sMO+GHujugmoj3R3Szlf0xSpiGVbm3tMOVgFN/ExnB1y9Krcb6fxb6RGsAD7I7o/gB+yqZW6VP8A/c2z9Uw5s6mwPSUZ7MyBNDD1b0X/AIqmzrt8onh16a/xD+oRvC/uG/n+Jmfi/TFAdMefwibdAzEw4/ad/wABNmnLxWmhDUzF0MIhl0Ml5bXyg0EMqZSarzbIjq59s0WGRiKpt7Jmtwao1kv52Tk8Wms57BOnxJsh7fhOXrt0u2ZpQ/VapPZAuo2njGnfMRSptMIUxbKALi+eQ6gdvHbFC/5m8IzjajLaxttv0tXgO3fEfXP7x/WfrO3Dpx5ds0ILZT2FfVdSdlwD1HI+BMu9EjNcx490UqGYU4yWYqdxsew2lUGUJXa/T4hW8M/G8WWvbdKgjdE33b+qbWhMTtQ7s1P5T5B7Zhl78ofC1CrKwzKnPmP7XEJZsbeN0Ur9JMn8D9DGdE+kL06T4aoSU1SEJ2owzC/wct3VeBwGkddwgUi5tdtg67Ak9gJl/STRxQK9tc72QNa3A3AIO3bLEmzt9BxlW+fnz543Ww9TOfP6WMYU09W76yghrMbCxJXLflYWPuzqsPpFQFL5EgE22XsL2I2i/nZI3HYPXuhH5SO8EeevnlwnoxWIFT/yHz5+82l03Tta57j8hz+PK/L6IxIQ1Lna1xv4+fteY5dLO3WYvFXpuvEfMTYTSh4+fIHcOAvxtXSCspA29vEcR574YaSGzVbsDH5efhjPTTpq2kr7/PZ2dw4LfMxGLvv8+fOy+S+kfyv+lj8ufm4sB8Zf8L/pP05+bizAbEOIlUYSGr3/AAv+k/TzlF2b8rfpMvtUM8ozDOeY/lbu8+e2CcflbuiBetT1mj2Gp6tJ/wCNPg8VGR2HujAq/syNRvaU3sbZA5X7fDqnf45/VaHtjzvEcw4/YHmGmdRc6wyPdHE/deeMx8X6bw37zvmwrTEwedQ/zfGbaiJ0tHpxhFgUEZSFERYYCCWGQ3hUVBZTE7b+ccxB6PcPGLqt7dclagWPPQ89U5Ws3SM6jSq9C3P53nMVhkPO+ZpXtTKAqkRtBkOQi5sTCFK9O9ur5mJVaOcdxWKRWKk5i18jwiNTEqTe/gZ2meMcr2zLz2vxAPWJJkWii/rMtgytbq3+NoMueHhJFxmINySbkk77773gSahka5kGVIhBFY7b7Of3v3R+ppLWUqqU0G+yknPgzliOwiZiyRCiAndsj2jNJ1KLayG/vKfZYcD9do3WieqLQFVioy2mNR9GoacR0Di+dujtIOWVh8chs5WwcJWKO5IIDNcbM8jt8JmaAYsGB5H4xrHLZr38+Mxa1I2P8YGst9tt/MefObFJ2IGzZ58/a+DgAS2V8lY5cFBJM3sIQVU8l4bwv5xx5dlxaVqTXqlUqLm3nz5vFKmkRztvOXHx2nx4wukR0Dlw4cV/Mfh8csU7PPGIljYaqbX8/Dz3xepXIBPAX7pdyAov4C/HgfPZmKuo1G6jw4Rq4QfS/wCU9/289keZzlzPhMJybHb4zeqAZW+UqB4gjWuosLbL63jYS4f9kf8AyKO3UY/OI4yva1gTly4y2Ga9I32+s38NXnn8pu30zOxcMjF7AXy8LiaJo2pZixvY/rEX0Tb1n8p4cRwzmji80P8AGP6xMNQvgP3jdviTNtJjYEdNm7fEzZQyTpaaRoVYFIdTKoyQypBLDLCoxBOqOsQF9kLWOQ64E7pmqU0q91HLPuBnNVHBsPN5v6ZNgRfcfGc66zNDZtqX6rfSLUlGsPHullfodnjIoqRmeEIwcXh3Lu2QBY2JYDlxiuq3EfqH1jK6pFmVmuTa2bAk3yy+0ep6JpEXtVHI2B7rT0yenC6xNWRaF1ZVhI0CwkQrKLXOQijY1L2F+u3kzNoKZGrLI4MuqxpgVp4LC6okyauIEGVueoQtoPeYQzomkzMEU2vtPIXJ2b9w5kCPuoIGzrvsiejqYHSNjfYDu5zSp01JyUfeLFgejmGuRcexUAO3/tvbb2c+Fjaa2HqLqqGK+yuR1TssRtHUc/7rthQuRRVPUCfnaTSwptewsN5C/TMzNalM6QdSjWYHIcNxHbuPj+a+IW4Tok0aWANxsv8Auxvz3Dn8OAlv8uOef/1/acv+3CfW7/O34XpU1ai49eEqPqqigG4XWVmN1Ns9W27hvFsurow7PWIctvR4cQxM120abjInh0eEq+jnIvqn9Jvs65Z/f+f6l/ny/HN4jAuh1MieOVjfnymuXBAz5eEYp6NZhcoRnsKHj1wNeiiMVYAEWy35gHZLP6ceVyVLxvGe4xtJsQ66ufR4X3mOYRh6q5Njr7NluhwjvqabDZfsnjQQDZ4Tp5M+IOFr6hLAa1l2Xt+JZp4g9Ejg5Hc5+kS9Qu4fDqhqaaqqn4V2ASb6WQXRjdJpsUj4TJwA1Tnv3zVQ59cToNpDU4BBlDpKpoCXCytM7YRTMqFVXZA6uYh6zXI5XkDaOqFYumjmeyY1TECxA2zZ0yLkjzvmEU2TNKtUNlXnPVXOo+qCTqmwGZJsdnbPYjO14N6hUEi2X1A+cs7SucpVmpn2DxAtax7Y/wD9SVD+AHmdW/wjjY9jtKHruPmYP/Hn3U/Uf/Wd56+uLJlbXNpLG0mkNp8+cpKpLF3dtUZKNvXw7INsEp2GxjVCkWOqNpuSdthtJm7T0EjioASDTSm+te5bXcqDwsLeImKuOVwtwSh2iPyuIw7I5DCzqSrDqMs2UCpHGed7QVWsBzMUZ2O+A0XyOcBRqG2e+Gw+Gd8hv5TTw3o8p9p26hb6RaSWr4GkCoN9wnVYbALSQO9tdvYXhzMPoHQ6InrHFlUArfaeB58hL4kl2LHsHAcI8mvEhh8IXcKDmxzPDiTyAjml6CJamh9kdI89w+fbNvA4H1NI1XHSIyFtx9kdpz/tMR6RJLHMk3J5nOFwilZ9mu2X5j9ZWrUc7Hb9TfWPtQEH6uc/Dj+Rdv6yKgqE9Gq/VrsPgYCorgdJ6n+4/wBZ0KURA4rBhiMrc5Zx4/kLv65Z69X/AFH/ANxvrIRXJ1umTxuSe+dAujRfM5RujhUXICJJOomW9sOhRcZln7SPgTGiDx8JqtREH6gS6Yy2dhx7o7gqj7bXB2g7PGFqYUGLvhTuPZAYrYY21lyHw7ZFDFkZNFKTuhNxrA7Re0bahrLrqpt3EHhYSauNmlUBUWh6c5rD4t1IK21fGb2ExAaxHdLqNFDCqYIDKFWFQ7Z9k8huc5naTqsp1g2XRFrcdY3vu2bOcvgMQWW542kXSWmjY/Dnl95hkm819JEs5F8he3hsmcUz7JAKveCxagJmL3OY2c/lD6ucHjxkADLO0rMamDsJ6mz8RK/4b8p7CLQzA8JTVmtc8ZFoa1kPO/yH1lNfnD16qFLb9Ud95q0VwGMFJtcre7Kg42NybdoWdngcTTpUqzkWYtTzOwU6Ydyg5hjs/Om4Tl9Bv7a+rNQkqbdGy2v0mLHogcZpY4s6BnsQW1RrdJBZlsMxci4OfG+zKZrUZOmqZDI5/GgY95+VpjVsTfId82/SANqJrADoNZVNwBrFQOWw5TBo0SxsJWb2EqEmauA0bexbZ1XmhozRGwmdDQwIGUzbjU4s/DYMAZC86PQmh9fpuCEH/Ijd1DeYXQugWr1LWK0xm7Dh7o/MfDbNzT9ZAP8ADUuiq5OR/QPn3cZm1uRg6QxhdtVLhFNl3XOzWt8OUd0Dot6znZqJm23Pgvb8BBYfDAkKouxIAHMzs62rg8PqrbXbIHix2t1AfASpXK6ers76h9lCQbe/v7tnfM5KUaHab79vxkFQeI7I1S7IeEGKXKMuZUnnAEUtPat5Sphwc7EniZKrbKQQUngghCQAc78t/dBub7L9fEdsaJNMQTJnCMTlLbt8ARFpRkvLvQ33kalt8Bd6UvhmKNde0HYRzlyplQYBsRolag9ZTIVvxLxPyPODw1PVPOGw+IKm6/3HCahpLUXWQ2YbQePP6xopRr3ABjaDumSFIOe0bY1h8T/YyhbStNSGO8EWPLh1QWjdYUV1szbWv1i/0ldL1rKeZy7j8odckA4AeAg+s3EuBn2RL1l4xibEjdxiiKM5BdTK4hNYgyVIg6wN7jhCVQpylPVjhCrW3ET00y5JnA2kCCxGJDWC7N5+EXGFMnUtNMtfR2KZCStrspUXNhcjom/XadZjMAvq6OFdvYSmHdCCNcEOSrWscza/KcFRfdNAY99TU121eF8urq5SVZTekFWrVKIx1B0VY7wN+XEzS0fopVtlfnaT6PaEdv2jrYH2VO23E8J1lPBgdclrUhDDYW24901tHaNaq4Rd+02yA3kwuGwbMwVRck2AnZ4XDrhaR3sdp95twHAD6zC24VxrphqQpUx0yNu/mx5nd9pzi0OMfq6zMWJuxNz54QuDwpqMFHaeA3mIsmT2b9GtG5msw5IPBm+XfM3TuJ9bVNr6q9FeHNu0+AE6PTFcU6YRciw1V5KBme7LtnLilzlrPH3dJGlbdBlOU0isE9M8pl0Z7qOEoE4R80ryVpgShI02I4RdqZF+lflb7TTdeXZBth7wMtcMAdaxEuiXIyy28LR44QAWBM8lDj2Z+bRrJV6XO3Vb5yq0SNrE8rD4gR8UpPqoaZj07wZo9c1npQJoQM4qZQrymg1Iyj0+UMlDL0qzIdZdvy4HiJc0OU8Etu8JRqoErJcCzAZjePqJnV0IOqRYytOoyMGXIjz3TXFRK65izDaN45jiJOhzOLGtUVf4R3uCfBDH62SntlcTgArhiDrDZmdU+1nb+Y98mtUuhBFjaUZFff2xanTJyjdwMzBs4OwyCPU2I3xV6nSMb9ZNFqFOovRsj8D7J88R3RuIw9W+60H6po7XwrIbEW+B6jF9RppHKhDuEsuDZvwE9hmzgtG7L3vv4TfwuCAtea1nHK4X0ed9q6o4k/KdToj0bpUyGI1mG9t3UN01qKADIGHBmLybkgqBRuEMFvs28s/CARCZ1Xo7oq1qrj+AH+o/Lv4SLbkNaG0cKKa72D2ux91dtuvjMvH4s1Xv+EZKOA+pjWm9I6x9Wp6IPSI3nh1D49UygeFoqcZ9ognR6HwmousfabM8huHzmVonC+sYEjorYtzO4TT05i9VdUe039O/v2d81PU1OV3/ADGJpHEGo5YbNi/wjZ9e2JkHZ5755qmfnbLA9Uy3JjypaVYz1zxH2lHEivF7SMibwVSw3z1Eb4BwizzgTmtLYx0qsquyjo2A/hH3iLaRqe+x/mM3OKXlHXEDdKKDwlHwaPo9sShqB1IBvULbKgVjYWGwk7JiaEwdXE1Vpq7gbXbWPRQbTt2nYOZjxZ846ErLKbRHS2jKRwTVqDEtTrOrOHZtZVqNTF7kj2WRiR7pivoth6VXD4klDUroCUB12XVKHV6K5A6wfM8o8Tzazi/EQZmfozD0sZhqoFILiKY1k9XrBWW111luVuSpF+rZOTD3GyPE8ndKR/aVKzhsNWZHV19oZjr3g9YuJ22HxAdFcbGF+o7weYOUlmLOWoYGDIhWaUaRpVVtv7MoSnUKsGU2IgzIByhl0GGKYhCrW1hmRbMc1It8/rkY/AmkbOtwfZYDI8jfYeUClYqQymxGwidRgcYmJQo6jWt0l4j3l8OYk6Xtx5w9I5lBy6IlXw9G3sL+kTU0joh6bdFS6HYQLnqYDYfj4RQYCp/pv+g/SPSEWpU7ZL1WAtIUIPwd2UfXRtbdTbulX0XW/wBNuqXYKU8cp6Lr0e/z1iEOjNbNDdTsNr+MVOjqx/7beHdtkDA4gZajfqt4XhAcPQA3R5KfKXpUxChOEaK2ytJCQyIJcIL7ZFaugNF+sOu46IOz3jwPITqMXTZkKowUnLWtew32tvnFJfcTbrIEKG5nxlliXjv1rj0eb31/SfrLf9Pt/qD9H3mMT198lY3j+Jl/XWYWitFLEiwzZjlc8ZyukMUXZm4+yOC7h55yjbZS184vLV48cugIDxPw+MZQ2Gdrzyr3Sw875G1CeEC7Q2r5tBsAd0AJNhcZyBfhCOslFJgcxpLBO1VzqMQbZgE/hGyKf5dUH4H7j9J2msPvILc5qcqz4s7RukWTBVMM1GoWcvqsALDWVbXub+0CZmaOqYqhrepumvbWyU31b6vtg7LnZxm+xlGQbo8jxgOjdL4pKdZHRneqSQ4dEKsUCX1QLZBV4bJkaCTFYV9ekqgkarKxUqwyNiA19wzBvNxWA25SusOEaeMBwWNrUHepQw1JGdQD0mYDMliF1sr9HLdqzDbQ1Qkk6oubnO23kBN5l5jlleeVb538I08YwRoJyPaTvP0mlofBvTDKzKVJuLXyO/dvy7o7bcJZXA58otJJEFZGrJLc5DTLSjXgg3GXdoNjDKQ3OXo1GVgytqsMwR5zgTKs5vs+kDcqekNQj2U55N/7RR9N1dwQdSn6zPeVJlyG1oHTVb3h+kQdTTNc/j/4r9IizQbPGRNps6Xrbdf/AIr9JX/N63vj9K/SKO0BrS4a1UcRhHiaMIZDluihhal4QMYKmu+MKsyqaZN84wHggMvteWz4wLBiZIeUEtqZXygWZ55XEqt5fszhpVznfO3Dd4ypduqXJ6hIJPGBRV5HORe2UKr7vjKs/VAGQRaea8ve88yjcYC7TwvGSmQzkGmON4CztyMprWjBWVYDzsgAEh0G2ECKL+RPMQdnjAquzODOrPW3ZnzykZcIFWI7pCmS2zZK6xlZEV8pAbjBipylWkFmcShIkMD1SAed5R6e1pQtPXgWYiDLyZVjAhjAvCNAuJUVLwcq8Hryo0Q0coc+6enopDKNeMowkz0w0sKglhUnp6BUvLBvPznp6BOvulgTutJnoEM4lRU4z09DSHa4uILWkz0CWfcO36SA+fVJnoEl8uUrryZ6BVqg2XzlHYW87Z6egC1zsntbdInoE/2lWbdPT0D2UE09PQBsJAznp6VlDi+w9s9q259c9PSATSLz09KPBhPa09PQKEwFRpE9KgDGBLT09NRmv//Z" />
            <div className="body">
                <div className="body-flex">
                    <div className="body-left" style={{ maxWidth: "400px" }}>
                        <div className="row">
                            <TextField
                                style={{ width: "320px" }}
                                required
                                onChange={handleAddressChange}
                                className="text-field"
                                label="Address"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={address}
                            />
                        </div>
                        <div className="row">
                            <TextField
                                style={{ width: "125px" }}
                                required
                                onChange={handleLatChange}
                                className="text-field"
                                label="Latitude"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={lat}
                            />
                            <TextField
                                style={{ width: "125px" }}
                                required
                                onChange={handleLongChange}
                                className="text-field"
                                label="Longitude"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={long}
                            />
                        </div>
                        <div className="row">
                            <TextField
                                onChange={handlePriceChange}
                                required
                                className="text-field"
                                label="Price"
                                type="number"
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={price}
                            />
                            <Typography variant="body1" color="text.secondary" gutterBottom
                                style={{ display: "inline", lineHeight: "270%" }}>&nbsp;per hour</Typography>
                        </div>
                        <div className="row">
                            <TextField
                                style={{ align: "left" }}
                                select
                                label="State"
                                value={state}
                                size="small"
                                onChange={handleStateChange}
                                helperText='Select "Unavailable" to temporarily disable this spot'
                            >
                                {states.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="row">
                            <TextField
                                style={{ align: "left" }}
                                select
                                label="Type"
                                value={type}
                                size="small"
                                onChange={handleTypeChange}
                            >
                                {types.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                </div>
                <div>
                    <Link style={{ textDecoration: "none" }}
                        to={{
                            pathname: `/manage`,
                            state: {
                                userID: userID
                            }
                        }}
                    onClick={handleCreateSpot}
                    >
                        <Button className="button"
                            variant="contained"
                            disabled={!canSubmit()}
                        >Create Spot</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
