import axios from 'axios';
import { connect } from "react-redux";
import React, { Component } from 'react';
import {
  Redirect,
} from "react-router-dom";
import DeviceTable from '../../components/deviceTable/Table';
import './MainPage.css';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light: [],
    };
    this.lightListUrl = process.env.API_URL + '/lights/list';
    this.lightSwitchUrl = process.env.API_URL + '/lights/switch';
    this.handleLightTrigger = this.handleLightTrigger.bind(this);
  }

  componentDidMount() {
    if (!this.props.user) {
      return;
    }

    const config = {
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    };

    axios.get(this.lightListUrl, config)
      .then(res => {
        const light = res.data.result.map(item => ({
          id: item.id,
          name: item.ligth_device_name,
          manufacturer: item.manufacturer_name,
          address: item.address,
          state: item.current_state,
        }));
        this.setState({ light });
      }).catch(err => {
        console.log(err);
        alert('Error while getting device list');
      });
  }

  handleLightTrigger(lightId, currentState) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    };

    // TODO: fix this by loading states from db
    let switchState = 0;
    if (currentState === 1) {
      switchState = 2;
    } else {
      switchState = 1
    }

    const sendData = {
      lightId,
      stateId: switchState
    };

    axios.put(this.lightSwitchUrl, sendData, config).then(res => {
      if (res.status !== 200) {
        alert('Error update status');
      }
      const mappedLights = this.state.light.map(light => {
        if (light.id === lightId) {
          return { ...light, state: switchState };
        }
        return light;
      })
      this.setState({ light: mappedLights });
    }).catch(err => {
      console.log(err);
      alert('Error while getting device list');
    });
  }

  render() {
    // TODO: check user token for expire and resave user between saves
    if (!this.props.user) {
      return <Redirect to="/login" />
    }

    return (
      <div className="App top-margin">
        <div className="top-corner" >
          {this.props.user.nickname} - {this.props.user.roleDescription}
        </div>

        <DeviceTable data={this.state.light || []} trigger={this.handleLightTrigger} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(MainPage);
