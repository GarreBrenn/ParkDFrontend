import React from "react";
import "../css/index.css"
export default class login extends React.Component{
    render(){
        return (
            <div>
                <body>
                <h1>Account Registration</h1>
                <br></br>
                <h2>Please enter your email address and create a password</h2>
                <br></br>
                     <form action="http://localhost:3000/testAPI/register" method="POST">
                        <label for="Email">Input email address</label>
                            <input type="email" id = "Email" name = "Email"/>
                            <br></br>
                        <label for="Password">Password</label>
                            <input type="password" id = "Password" name = "Password"/>
                        <label for="confirmPass">Re-type password</label>
                            <input type="password" id = "passwordConfirm" name = "passwordConfirm"/>
                            <br></br>
                        <button type="submit">Register</button>
                    </form>
                </body>
            </div>
        );
    }
}
