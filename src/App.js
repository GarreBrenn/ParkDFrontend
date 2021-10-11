import "./App.css";
import Home from "./Home.js";
import Header from "./Header.js";
import Browse from "./Browse.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="myApp">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/browse" component={Browse} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
