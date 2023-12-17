import { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import { Link } from 'react-router-dom';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {name, email, password} = this.state;
      const formData = {name, email, password};
      // The promise returned by the signUp service
      // method will resolve to the user object included
      // in the payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // An error occurred
      // Probably due to a duplicate email
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div id='signupform' className='flex flex-col items-center justify-center'>
        
        <div className="signupform-container">
            <h1 className='text-white font-bold text-xl mb-2'>Registration</h1>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label className='font-bold text-white'>Name</label>
            <input id='signupinput' type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label  className='font-bold text-white'>Email</label>
            <input id='signupinput' type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label className='font-bold text-white'>Password</label>
            <input id='signupinput' type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label className='font-bold text-white'>Confirm</label>
            <input id='signupinput' type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button id='signupbtn' type="submit" disabled={disable}>SIGN UP</button>
          </form>
          <p className='mt-2 text-white font-bold'>Already a user? < Link to={'/login'} className='underline'> Login here</Link></p>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}