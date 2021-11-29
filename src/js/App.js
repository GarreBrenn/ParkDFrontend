// npm start
import "../css/App.css";
import Home from "./Home.js";
import Header from "./Header.js";
import Browse from "./Browse.js";
import login from "./login.js"
import Register from "./Register.js"
import Reservations from "./Reservations.js"
import Account from "./Account.js"
import logout from "./logout.js"
import tempPage from "./tempPage.js"
import SpotPage from "./SpotPage.js";
import ManageSpotPage from "./ManageSpotPage.js"
import CheckIn from "./CheckIn.js";
import Manage from "./Manage.js";
import {useEffect} from 'react';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";



const dotenv = require('dotenv');
//const cookieParser = require('cookie-parser');
dotenv.config({path: '../env'});
//const mysql = require("mysql");



function App() {
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#80e8a9",
      },
      secondary: {
        main: "#aaaaaa",
      },
    },
  });
  //Removes 8pt margin associated with root child "body"
  useEffect(() => {
    document.documentElement.childNodes[2].style.margin = 0;
  })
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="myApp">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/login" component={login} />
            <Route exact path="/reservations" component={Reservations}/>
            <Route exact path="/registerspot" component={Register}/>
            <Route exact path="/myaccount" component={Account}/>
            <Route exact path="/tempPage" component={tempPage}/>
            <Route exact path="/manage" component={Manage}/>
            <Route exact path="/logout" component={logout} />
            <Route path="/spot/:id" component={SpotPage} />
            <Route path="/managespot/:id" component={ManageSpotPage} />
            <Route path="/checkin/:id" component={CheckIn} />
            <Redirect from="/spot" to="/browse" />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
