import './Login.css';
import logo from "../../assets/Register&Login/logo.svg"
import google from "../../assets/Register&Login/google.png"

const Login = () => {
  return (
    <div className="login-div">
      <img className='logo' src={logo} alt='logo' draggable={false}/>
            <div className='input-div-login'>
            <label htmlFor="Login" className='label-login'><span className="material-symbols-outlined" id='labelLogin'>person</span></label><input className='input-login' type="text" id='Login'  placeholder='Login' />
        </div>
         <div className='input-div'>
            <label htmlFor="Password" className='label'><span className="material-symbols-outlined" id='label'>lock</span></label><input className='input-register' type="password" id='Password'  placeholder='Password' />
        
        </div> 
         <button className='LogIn'>Log in</button>
          <div className="divider">Or</div>
           <button className='Google'><img src={google} alt="google" className='google-img' />Continue with Google</button>
    </div>
  );
};

export default Login;