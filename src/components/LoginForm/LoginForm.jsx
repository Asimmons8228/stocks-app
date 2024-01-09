import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      navigate('/');
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div id='loginform'>
      <div className="form-container">
        <h1 className='mb-6 font-bold text-white text-xl'>Login to your account</h1>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label className='font-bold text-white'>Email</label>
          <input id='logininput' type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <label className='font-bold text-white'>Password</label>
          <input id='logininput' type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button id='loginbtn' type="submit">LOG IN</button>
        </form>
        <p className='mt-2 text-white font-bold'>Not a user? < Link to={'/signup'} className='underline'> Sign up here</Link></p>
        <p className='mt-2 text-white font-bold'>Guest Email: test@gmail.com | Guest Password: abc123</p>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}