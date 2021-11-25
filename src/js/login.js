import React from "react";
import "../css/index.css"
export default class login extends React.Component{
    render(){
        return (
            <div>
                <body>
                    <h1>Please login with your credentials</h1>
                    <form action="http://localhost:3000/testAPI/login" method="POST">
                        <label for="Email">Input email address  </label>
                            <input type="email" id = "Email" name = "Email"/>
                            <br></br>
                        <label for="Password">Password  </label>
                            <input type="password" id = "Password" name = "Password"/>
                            <br></br>
                     <button type="submit">Login</button>
                     </form>
                     <h3>Or register! It's free</h3>
                     <a href ="/register">Register here</a>
                     
                        
                </body>
            </div>
        );
    }
}
