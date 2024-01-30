import './index.scss';
import LoginImage from '../../assets/img/Login.png';
import { FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Login, Register } from '../../server/Login.js'
import { getToken } from '../../server/Auth.js';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
    const [registerForm, setRegisterForm] = useState(false);
    const [userInfo, setUserInfo] = useState({
      name:'',
      email:'',
      password:''
    })
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      authToken()
      //getAllMovements()
  },[]);

  const authToken = () => {
      if(getToken()) navigate('/expenses/wallet');
  }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordRepeat = () => setShowPasswordRepeat((show) => !show);
    const handleRegisterClick = () => setRegisterForm((registerForm) => !registerForm);

    const handleUserChange = (e) => {
      setUserInfo({ ...userInfo, name: e.target.value });
    };

    const handleEmailChange = (e) => {
      setUserInfo({ ...userInfo, email: e.target.value });
    };

    const handlePasswordChange = (e) => {
      setUserInfo({ ...userInfo, password: e.target.value });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const matchPasswords = () => {return userInfo.password === passwordRepeat};

    const accessGranted = response => {
      localStorage.setItem('token',response.access_token);
      localStorage.setItem('user',response.user_data.name);
      localStorage.setItem('email',response.user_data.email);
      navigate('/expenses/wallet');
    }

    const handleLoginSubmit = async() => {
        await Login(userInfo)
        .then(response => {
            if(response.error)
              console.error(response)
            else
              accessGranted(response)
        })
        .catch(error => console.error(error));
    }

    const handleRegisterSubmit = async() => {
        if(!matchPasswords()){
            console.error('passwords no hacen match');
            return;
        }    

        await Register(userInfo)
        .then(response => {
            accessGranted(response)
        })
        .catch(error => console.error(error));
    }

    // VALIDAR CORRE Y CONTRASENIAS MAS SEGURAS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    return (
    <div className='container'>
        <img src={LoginImage} alt='LoginImage'/>
        <div className='login'>
          {registerForm && <FormControl className='username'>
            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              type='text'
              onChange={handleUserChange}
              label="Username"
            />
          </FormControl>}

          <FormControl className='email'>
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type='text'
              onChange={handleEmailChange}
              label="Email"
            />
          </FormControl>

          <FormControl className='password'>
            <InputLabel htmlFor="input-password">Password</InputLabel>
            <OutlinedInput
              id="input-password"
              type={showPassword ? 'text' : 'password'}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <FontAwesomeIcon className='icon' icon={faEyeSlash}/> : <FontAwesomeIcon className='icon' icon={faEye}/>}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          {registerForm && <FormControl className='password-repeat'>
            <InputLabel htmlFor="input-password-repeat">Repeat password</InputLabel>
            <OutlinedInput
              id="input-password-repeat"
              type={showPasswordRepeat ? 'text' : 'password'}
              onChange={e => setPasswordRepeat(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordRepeat}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPasswordRepeat ? <FontAwesomeIcon className='icon' icon={faEyeSlash}/> : <FontAwesomeIcon className='icon' icon={faEye}/>}
                  </IconButton>
                </InputAdornment>
              }
              label="Repeat password"
            />
          </FormControl>}

          <Button onClick={registerForm ? handleRegisterSubmit : handleLoginSubmit} className="login-button" variant="contained" color="secondary">{registerForm ? 'REGISTER' : 'LOGIN'}</Button>

          <div className='register-text' onClick={handleRegisterClick}>{registerForm ? 'Login' : 'Register'}</div>
        </div>
    </div>
    )
}

export default Layout;