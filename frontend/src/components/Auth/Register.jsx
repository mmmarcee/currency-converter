import './Register.css';
import logo from "../../assets/Register&Login/logo.svg"
import google from "../../assets/Register&Login/google.png"

const Register = () => {
  return (
    <div className='register-container'>
        <div className='register-div'>
        <img className='logo' src={logo} alt='logo' draggable={false}/>
        <h1>Welcome to FiatFlux</h1>
        <div  className='label-div'><label htmlFor="Email">Enter email</label></div>
        <div className='input-div'>
            <label htmlFor="Email" className='label'><span className="material-symbols-outlined" id='label'>person</span></label><input className='input-register' type="email" id='Email'  placeholder='Email' />
        </div>
       <div  className='label-div'><label htmlFor="Login">Create a username</label></div>
        <div className='input-div'>
            <label htmlFor="Login" className='label'><span className="material-symbols-outlined" id='label'>person</span></label><input className='input-register' type="text" id='Login'  placeholder='Login' />
        </div>
        <div className='label-div'><label htmlFor="Password">Create a password</label></div>
        <div className='input-div'>
            <label htmlFor="Password" className='label'><span className="material-symbols-outlined" id='label'>lock</span></label><input className='input-register' type="password" id='Password'  placeholder='Password' />
        </div>
        <button className='LogUp'>Log up</button>
        <div className="divider">Or</div>
        <button className='Google'><img src={google} alt="google" className='google-img' />Continue with Google</button>
        </div>
        
      
    </div>
  );
};

export default Register;