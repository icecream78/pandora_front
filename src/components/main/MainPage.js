import { connect } from "react-redux";
import React, { Component } from 'react';
import {
  Redirect,
} from "react-router-dom";
import './MainPage.css';

class MainPage extends Component {
  render() {
    // TODO: check user token for expire and resave user between saves
    if (!this.props.user) {
      return <Redirect to="/login" />
    }

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(MainPage);
