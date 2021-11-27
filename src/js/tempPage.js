import React from "react";
import "../css/index.css"
import {Redirect} from "react-router-dom";
import checkCookieExists from "./checkCookieExists";
//import {useCookies} from 'react-cookie';

/* var cookieValue = document.cookie
  .split('; ')
  .find(row => row.startsWith('test2='))
  .split('=')[1];

function showCookieValue() {
  const output = document.getElementById('cookie-value')
  output.textContent = '> ' + cookieValue
} */

// function ourCookieExists(){ // ARE THEY LOGGED IN CHECK
//     if(document.cookie.split(';').some((item) => item.trim().startsWith('email='))){
//         console.log("THE USER HAS A COOKIE. THEY ARE LOGGED IN.");        
//         return true;
//     }
//     else{
//         console.log("THE USER HAS TO LOGIN")
//         return false;
//     }
// }   

export default function Register(){
    if (checkCookieExists()){
        //showCookieValue()
        return (
            <>
                
                <div>
                    <body>
                        <h1>No peeking unless you're logged in ;)</h1>
                    </body>
                </div>
                
                    
                    
            </>
        );
    }
    else{
        return(
            <Redirect to='/login'></Redirect>
        )
    }
}   //var uri = 'deez%40nuts.com' //use these to convert the URI-encoded cookie email to something with an "@"
    //var decodedEmail = (decodeURIComponent(uri));
