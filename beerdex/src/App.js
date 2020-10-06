import React, { Component } from 'react';
import FormContainer from './containers/FormContainer';

class App extends Component {
  render() {
    return (
      <div className="col-md-12">
        <h3>BeerDex</h3>
        <FormContainer />
      </div>
    );
  }
}

export default App;
