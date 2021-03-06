import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import "./login.css";
import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext';
import LoginForm from '../../components/LoginForm/LoginForm';
import Loginlogo from './Login.png';

class Login extends Component {
  static contextType = AuthContext;

  state = {
    redirectToReferrer: false,
    error: ""
  }

  handleSubmit = (email, password) => {

    // console.log('in handleSubmit', email, password);
    
    API.Users.login(email, password)
      // .then((response) => {
      //   console.log('response', response);
      // });
      // // .then(x => console.log('x',x))
      .then(response => response.data)
      .then(({ user, token }) => {

        console.log('got', user, token);

        this.context.onLogin(user, token);
        this.setState({ redirectToReferrer: true, error: "" });
      })
      .catch(err => {
        let message;

        switch (err.response.status) {
          case 401:
            message = 'Sorry, that email/password combination is not valid. Please try again.';
            break;
          case 500:
            message = 'Server error. Please try again later.';
            break;
          default:
            message = 'Unknown error.';
        }

        this.setState({ error: message });
      });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/secret" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className='Login'>
        <div className='row'>
          <div className='col'>
          <img src={Loginlogo} alt='websitelogo' className='img-div'/>
          </div>
        </div>
        {this.state.error &&
          <div className='row'>
            <div className='col'>
              <div className='alert alert-danger mb-3' role='alert'>
                {this.state.error}
              </div>
            </div>
          </div>}
        <div className='row'>
          <div className='col'>
            <LoginForm onSubmit={this.handleSubmit} />
            <div className='mt-3'>Don't have an account? <Link to='/register'>Click here to register.</Link></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
