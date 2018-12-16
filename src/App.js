import React, { Component } from 'react';
import SmsInbox from './components/SmsInbox.js';
import './stylesheets/App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    this.getTextMessage();
  }

  getTextMessage = () => {
    fetch('http://localhost:8080/api')
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response
        });
      })
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <SmsInbox
          data={data}
        />
      </div>
    );
  }
}

export default App;
