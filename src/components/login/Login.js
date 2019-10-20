import axios from 'axios';
import { connect } from "react-redux";
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import ACTIONS from '../../store/actions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      isValid: false,
    };

    this.authUrl = process.env.API_URL + '/auth/login';

    // crutches for correct handling events
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  // TODO: add more stricter fields validation
  validateForm() {
    return this.state.login.length > 0 && this.state.password.length > 0;
  }

  // TODO: add more pretty error render
  handleSubmit(event) {
    event.preventDefault();
    axios.post(this.authUrl, {
      login: this.state.login,
      password: this.state.password,
    }).then(resp => {
      if (resp.status !== 200) {
        // TODO: render error or make popup message
        console.log('error response');
        alert('error while auth');
        return;
      }

      this.props.authUser(resp.data.user);
      this.props.history.push("/");
    }).catch(err => {
      alert('Ошибка при авторизации. Проверьте логин и пароль');
    });
  }

  handleLoginChange(event) {
    this.setState({ login: event.target.value })
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  // TODO: add error rendering
  render() {
    return (

      <div className="Login">
        <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control type="text" placeholder="Enter login" onChange={this.handleLoginChange} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={this.handlePasswordChange} />
          </Form.Group>
          <Button block disabled={!this.validateForm()} type="submit">
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

const mapDispatchToProps = dispatch => {
  return {
    authUser: (item) => dispatch(ACTIONS.auth(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);