import React from "react";
import "../css/index.css"
import {useState, useEffect} from "react";

export default function register(){
    const [mount, setMount] = useState(false)
    //this is basically your component did mount, do your fetch here
    useEffect(() => {
        let body = "Set Body to whatever you wanted to do with it"
        fetch('https://localhost:3000/testAPI/WHATEVERROUTEHERE', body).then((response) => {
            console.log(response)
            setMount(true);
        })
    })
        return (
            <>
                {mount ?
                <div>
                    <body>
                        <h1>No peeking unless you're logged in ;)</h1>
                    </body>
                </div>
                    : null}
            </>
        );
    
}
