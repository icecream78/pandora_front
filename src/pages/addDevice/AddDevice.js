import axios from 'axios';
import { connect } from "react-redux";
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  Redirect,
} from "react-router-dom";
import ACTIONS from '../../store/actions';


import './AddDevice.css';

class AddDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufactures: [],
      name: '', manufacturer: '', address: '', state: '', userId: '',
    };

    this.manufactureListUrl = process.env.API_URL + '/services/manufactures';
    this.usersListUrl = process.env.API_URL + '/services/users';
    this.createLightDeviceUrl = process.env.API_URL + '/lights/create';

    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadManufactureList = this.loadManufactureList.bind(this);
  }

  loadManufactureList() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    };

    axios.get(this.manufactureListUrl, config).then(resp => {
      if (resp.status !== 200) {
        // TODO: render error or make popup message
        console.log('error response');
        alert('Ошибка при загрузке списка производителей. Попробуйте позже');
        return;
      }

      this.props.loadManufactures(resp.data.result);
    }).catch(err => {
      alert('Ошибка при загрузке списка производителей. Попробуйте позже');
    });
  }

  loadUsersList() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    };

    axios.get(this.usersListUrl, config).then(resp => {
      if (resp.status !== 200) {
        // TODO: render error or make popup message
        console.log('error response');
        alert('Ошибка при загрузке списка пользователей. Попробуйте позже');
        return;
      }

      this.props.loadUsers(resp.data.result);
      console.log(this);
    }).catch(err => {
      alert('Ошибка при загрузке списка пользователей. Попробуйте позже');
    });
  }

  componentDidMount() {
    if (this.props.manufactureList && this.props.manufactureList.length === 0) {
      this.loadManufactureList();
    }
    if (this.props.usersList && this.props.usersList.length === 0) {
      this.loadUsersList();
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const config = {
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    };

    axios.post(this.createLightDeviceUrl, {
      name: this.state.name,
      manufacturer: this.state.manufacturer,
      address: this.state.address,
      state: this.state.state,
      userId: this.state.userId,
    }, config).then(resp => {
      if (resp.status !== 200) {
        // TODO: render error or make popup message
        console.log('error response');
        alert('Ошибка при создании нового устройства. Попробуйте позже');
        return;
      }

      alert('Новое устройство успешно создано');
      this.props.history.push("/");
    }).catch(err => {
      alert('Ошибка при создании нового устройства. Попробуйте позже');
    });
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
            <Form.Control type="text" placeholder="Введите название" onChange={(event) => this.setState({ name: event.target.value })} />
          </Form.Group>
          {/* TODO: move manufacturer to select input */}
          <Form.Group controlId="manufacturer">
            <Form.Label>Производитель</Form.Label>
            <Form.Control as="select">
              <option>Выберите производителя</option>
              {this.props.manufactureList.map(manufacturer => (
                <option onClick={(event) => this.setState({ manufacturer: manufacturer.id })}> {manufacturer.name} </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Адрес установки</Form.Label>
            <Form.Control type="text" placeholder="Введите адрес установки" onChange={(event) => this.setState({ address: event.target.value })} />
          </Form.Group>
          {/* TODO: move initial state to select input with load states*/}
          <Form.Group controlId="state">
            <Form.Label>Начальное состояние</Form.Label>
            <Form.Control as="select">
              <option>Выберите начальное состояние</option>
              <option onClick={(event) => this.setState({ state: 1 })}>Вкл</option>
              <option onClick={(event) => this.setState({ state: 2 })}>Выкл</option>
            </Form.Control>
          </Form.Group>
          {/* TODO: move userId to select input */}
          <Form.Group controlId="userId">
            <Form.Label>Ответственный</Form.Label>
            <Form.Control as="select">
              <option>Выберите ответственного</option>
              {this.props.usersList.map(user => (
                <option onClick={(event) => this.setState({ userId: user.id })}> {user.nickname} </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button className="centerCreateBtn" type="submit">
            Создать
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  manufactureList: state.manufactureList,
  usersList: state.usersList,
});

const mapDispatchToProps = dispatch => {
  return {
    loadManufactures: (item) => dispatch(ACTIONS.loadManufactureList(item)),
    loadUsers: (item) => dispatch(ACTIONS.loadSystemUsersList(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDevice);
