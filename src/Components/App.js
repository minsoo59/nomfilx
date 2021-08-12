import React, { Component } from "react";
import Router from "Components/Router";
import Home from "Routes/Home";
import GlobalStyles from "Components/GlobalStyles";

class App extends Component {
  render() {
    return (
      <>
        <Router path="/" exact Component={Home} />
        <GlobalStyles />
      </>
    );
  }
}

export default App;
