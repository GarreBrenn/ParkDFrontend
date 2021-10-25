import "../css/App.css";
import Home from "./Home.js";
import Header from "./Header.js";
import Browse from "./Browse.js";
import Buy from "./Buy.js";
import {useEffect} from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

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
            <Route exact path="/buy" component={Buy} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
