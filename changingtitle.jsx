import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";

const Home = () => <div>Home Page</div>;
const About = () => <div>About Us Page</div>;
const Services = () => <div>Services Page</div>;

const App = () => {
  return (
    <Router>
      <PageTitle />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
      </Switch>
    </Router>
  );
};

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let title = "XSuite";
    if (location.pathname === "/about") {
      title = "XSuite | About";
    } else if (location.pathname === "/services") {
      title = "XSuite | Services";
    } else {
      title = "XSuite | Home";
    }
    document.title = title;
  }, [location]);

  return null;
};

export default App;
