import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Router>
        <Switch>
          <Route exact to="/" component={Home} />
        </Switch>
      </Router>
      <Footer />
    </React.Fragment>
  );
}

export default App;
