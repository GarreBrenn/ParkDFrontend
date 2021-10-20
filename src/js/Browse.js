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
export default class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstColumnData: null,
            secondColumnData: null,
            thirdColumnData: null
        }

    }
    componentDidMount() {
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
            body: null,
        }).then((response) =>
            response.json().then((data) => { 
                if(data.length % 3 == 0) {
                    this.setState({firstColumnData: data.slice(0,data.length/3),
                    secondClumnData: data.slice(data.length/3, (2*data.length) / 3),
                    thirdColumnData: data.slice(((2*data.length) / 3), data.length)})
                }
                else if(data.length % 3 == 1) {
                    this.setState({
                        firstColumnData: (data.slice(0,(data.length/3) + 1)),
                        secondColumnData: (data.slice((data.length / 3) + 1, (((2*data.length) / 3)))),
                        thirdColumnData: data.slice(((((2*data.length) / 3))), data.length)
                    })
                    //1st has one extra, other 2 have normal
                }
                else {
                    this.setState({
                        firstColumnData: (data.slice(0,(data.length/3) + 1)),
                        secondColumnData: (data.slice((data.length / 3) + 1, (((2*data.length) / 3) + 1))),
                        thirdColumnData: (data.slice(((((2*data.length) / 3) + 1)), data.length))
                    })
                    //1st and 2nd have one extra, last is %3
                }
                console.log(this.state.firstColumnData)
            }))
    }
    render() {
        return (
            <>
                {   
                !this.state.firstColumnData ? null :     
                <div className="entryContainer" id="entryContainer">
                <div style={{gridColumn: "1"}} id="col1">
                    {
                        this.state.firstColumnData.map((d) => {
                            return <div style={{backgroundColor: "lightgray", width: "400px", height: "400px", display: "block"}}>
                            <h1>{d.Record.Address}</h1>
                            <h1>{d.Record.Photos}</h1>
                            <h1>{d.Record.Type} Parking</h1>
                            <h1>Price: ${d.Record.Price}</h1>
                        </div>;
                        })
                    }
                </div>
                <div style={{gridColumn: "2"}} id="col2">
                {
                        this.state.secondColumnData.map((d) => {
                            return <div style={{backgroundColor: "lightgray", width: "400px", height: "400px", display: "block"}}>
                            <h1>{d.Record.Address}</h1>
                            <h1>{d.Record.Photos}</h1>
                            <h1>{d.Record.Type} Parking</h1>
                            <h1>Price: ${d.Record.Price}</h1>
                        </div>;
                        })
                    }
                </div>
                <div style={{gridColumn: "3"}} id="col3">
                {
                        this.state.thirdColumnData.map((d) => {
                            return <div style={{backgroundColor: "lightgray", width: "400px", height: "400px", display: "block"}}>
                            <h1>{d.Record.Address}</h1>
                            <h1>{d.Record.Photos}</h1>
                            <h1>{d.Record.Type} Parking</h1>
                            <h1>Price: ${d.Record.Price}</h1>
                        </div>;
                        })
                    }
                </div>
            </div>}
            </>
    
        );
    }
}
