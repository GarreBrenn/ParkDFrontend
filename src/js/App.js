// npm start
import "../css/App.css";
import Home from "./Home.js";
import Header from "./Header.js";
import Browse from "./Browse.js";
import login from "./login.js"
import register from "./register.js"
import logout from "./logout.js"
import tempPage from "./tempPage.js"
import SpotPage from "./SpotPage.js";

import {useEffect} from 'react'
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
            <Route exact path="/register" component={register}/>
            <Route exact path="/tempPage" component={tempPage}/>
            <Route exact path="/logout" component={logout} />
            <Route path="/spot/:id" component={SpotPage} />
            <Redirect from="/spot" to="/browse" />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
