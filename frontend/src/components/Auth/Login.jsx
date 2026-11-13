import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import logo from "../../assets/Register&Login/logo.svg";
import google from "../../assets/Register&Login/google.png";
import { login } from '../../api/auth';

const Login = () => {
  // Состояние формы
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Состояние запроса
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(username, password);
      navigate('/');   // успех → на главную
    } catch (err) {
      if (err.status === 403) {
        setError('Аккаунт не подтверждён. Проверьте Telegram.');
      } else if (err.status === 401) {
        setError('Неверный логин или пароль.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-div" onSubmit={handleSubmit}>
      <img className='logo' src={logo} alt='logo' draggable={false} />

      <div className='input-div-login'>
        <label htmlFor="Login" className='label-login'>
          <span className="material-symbols-outlined" id='labelLogin'>person</span>
        </label>
        <input
          className='input-login'
          type="text"
          id='Login'
          placeholder='Login'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className='input-div'>
        <label htmlFor="Password" className='label-login'>
          <span className="material-symbols-outlined" id='label'>lock</span>
        </label>
        <input
          className='input-login'
          type="password"
          id='Password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button className='LogIn' type="submit" disabled={loading}>
        {loading ? 'Вход...' : 'Log in'}
      </button>

      <div className="divider">Or</div>

      <button className='Google' type="button">
        <img src={google} alt="google" className='google-img' />
        Continue with Google
      </button>

      <p>New to FiatFlux? <Link to="/register">Зарегистрироваться</Link></p>
    </form>
  );
};

export default Login;