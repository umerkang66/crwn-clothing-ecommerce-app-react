import React, { Component } from 'react';
import './SignIn.scss';
import FormInput from '../formInput/FormInput.js';
import CustomButton from '../customButton/CustomButton.js';

import { auth, signInWithGoogle } from '../../firebase/firebase.js';

class SignIn extends Component {
  state = { email: '', password: '' };

  handleFormSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (err) {
      console.error(err);
    }
  };

  handleFormChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleFormSubmit}>
          <FormInput
            type="email"
            name="email"
            id="email"
            value={this.state.email}
            label="Email"
            required
            handleChange={this.handleFormChange}
          />
          <FormInput
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            label="Password"
            required
            handleChange={this.handleFormChange}
          />

          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton onClick={signInWithGoogle} colorBlue>
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;