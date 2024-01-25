import './index.scss';
import LoginImage from '../../assets/img/Login.png';
import { FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput, Button } from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {Login,Register} from '../../server/Login.js'
import { useNavigate } from 'react-router-dom';

const Layout = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
    const [registerForm, setRegisterForm] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [user, setUser] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordRepeat = () => setShowPasswordRepeat((show) => !show);
    const handleRegisterClick = () => setRegisterForm((registerForm) => !registerForm);

    const navigate = useNavigate();

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const matchPasswords = () => {return password === passwordRepeat};

    const handleLoginSubmit = async() => {
        const body = {'username':user,'password':password}
        await Login(body)
        .then(response => {
            localStorage.setItem('token',response.access_token);
            navigate('/expenses/wallet');
        })
        .catch(error => console.error(error));
    }

    const handleRegisterSubmit = async() => {
        if(!matchPasswords()){
            console.error('passwords no hacen match');
            return;
        }    

        const body = {'username':user,'password':password}
        await Register(body)
        .then(response => {
            localStorage.setItem('token',response.access_token);
            navigate('/expenses/wallet');
        })
        .catch(error => console.error(error));
    }

    return (
    <div className='container'>
        <img src={LoginImage} alt='LoginImage'/>
        <div className='login'>
        <FormControl className='username'>
          <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            type='text'
            onChange={e => setUser(e.target.value)}
            label="Username"
          />
        </FormControl>
        <FormControl className='password'>
          <InputLabel htmlFor="input-password">Password</InputLabel>
          <OutlinedInput
            id="input-password"
            type={showPassword ? 'text' : 'password'}
            onChange={e => setPassword(e.target.value)}
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