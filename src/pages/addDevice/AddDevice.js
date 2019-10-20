import axios from 'axios';
import { connect } from "react-redux";
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  Redirect,
} from "react-router-dom";

import './AddDevice.css';

class AddDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufactures: [],
      newDevice: { name: '', manufacturer: '', address: '', state: '', userId: '' },
    };
    this.createLightDeviceUrl = process.env.API_URL + '/lights/create';
    this.manufacturesListUrl = process.env.API_URL + '/manufactures/list';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleSubmit() {
  }

  render() {
    // TODO: check user token for expire and resave user between saves
    if (!this.props.user) {
      return <Redirect to="/login" />
    }

    return (
      <div className="AddDevice top-margin">
        <div className="top-corner" >
          {this.props.user.nickname} - {this.props.user.roleDescription}
        </div>

        <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Название устройства</Form.Label>
            <Form.Control type="text" placeholder="Введите название" onChange={(event) => ({ name: event.target.value })} />
          </Form.Group>
          {/* TODO: move manufacturer to select input */}
          <Form.Group controlId="manufacturer">
            <Form.Label>Производитель</Form.Label>
            <Form.Control type="text" placeholder="Выберите производителя" onChange={(event) => ({ manufacturer: event.target.value })} />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Адрес установки</Form.Label>
            <Form.Control type="text" placeholder="Введите адрес установки" onChange={(event) => ({ address: event.target.value })} />
          </Form.Group>
          {/* TODO: move initial state to select input */}
          <Form.Group controlId="state">
            <Form.Label>Начальное состояние</Form.Label>
            <Form.Control type="text" placeholder="Выберите начальное состояние" onChange={(event) => ({ state: event.target.value })} />
          </Form.Group>
          {/* TODO: move userId to select input */}
          <Form.Group controlId="userId">
            <Form.Label>Ответственный</Form.Label>
            <Form.Control type="text" placeholder="Выберите ответственного человека" onChange={(event) => ({ userId: event.target.value })} />
          </Form.Group>
          <Button block type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AddDevice);
