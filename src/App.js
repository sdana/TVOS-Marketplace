import React, { Component } from 'react';
import ApplicationViews from "./ApplicationViews"
import 'typeface-roboto'
import api from "./Components/Api"


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default App;
