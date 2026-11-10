import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import logo from "../../assets/Register&Login/logo.svg";
import google from "../../assets/Register&Login/google.png";
import { register, getTelegramLink } from '../../api/auth';

const Register = () => {
 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


 

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    await register(username, password);
    const url = await getTelegramLink(username);

    if (!url) {
      throw new Error('T.me url error');
    }

    window.location.href = url;
  } catch (err) {
    setError(err.message);

     if(err.status === 400 && err.data?.error === 'Логин уже занят'){
        setError("Логин уже существует")
    }

  } finally {
    setLoading(false);
  }
    
};


  return (
    <form className='register-container' onSubmit={handleSubmit}>
      <div className='register-div'>
        <img className='logo' src={logo} alt='logo' draggable={false} />
        <h1>Welcome to FiatFlux</h1>

        <div className='label-div'>
          <label htmlFor="Login">Create a username</label>
        </div>
        <div className='input-div'>
          <label htmlFor="Login" className='label'>
            <span className="material-symbols-outlined" id='label'>person</span>
          </label>
          <input
            className='input-register'
            type="text"
            id='Login'
            placeholder='Login'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='label-div'>
          <label htmlFor="Password">Create a password</label>
        </div>
        <div className='input-div'>
          <label htmlFor="Password" className='label'>
            <span className="material-symbols-outlined" id='label'>lock</span>
          </label>
          <input
            className='input-register'
            type="password"
            id='Password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button className='LogUp' type="submit" disabled={loading}>
          {loading ? '...' : 'Log up'}
        </button>

        <div className="divider">Or</div>
        <button className='Google' type="button">
          <img src={google} alt="google" className='google-img' />
          Continue with Google
        </button>

        <p>Already have an account? <Link to="/login">Войти</Link></p>
      </div>
    </form>
  );
};

export default Register;