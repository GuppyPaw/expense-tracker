import './index.scss'
import { Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../server/Login';
import { getToken, getUser, deleteSession } from '../../server/Auth';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

const Account = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        authToken()
    },);

    const authToken = () => {
        if(!getToken()) navigate('/expenses/login');
    }

    const handleLogout = async() => {
        await Logout(getToken())
        .then(response => {
            deleteSession()
            navigate('/expenses/login')
        })
        .catch(error => console.error(error));
    }

    return (
        <div className="account-page">
            <div className="text-zone">
                <h1>account.</h1>
            </div>
            <Paper className='container'>
                <div className='user-info'>
                    <div className='name'>{getUser().user}</div>
                    <div className='email'>{getUser().email}</div>
                </div>
                <Button className='logout-btn' color='error' onClick={handleLogout}>
                    <FontAwesomeIcon className='icon' icon={faRightFromBracket}/>
                </Button>
            </Paper>
        </div>
    );
}

export default Account