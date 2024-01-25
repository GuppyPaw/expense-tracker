import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartColumn, faWallet, faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import './index.scss'

const Sidebar = () => {
    const [showNav, setShowNav] = useState(false);

    return (
    <div className='nav-bar'>
        <nav className={showNav ? 'mobile-show' : ''}>
            <NavLink exact="true" activeclassname="active" to="/wallet"  onClick={() => setShowNav(false)}>
                <FontAwesomeIcon className='icon' icon={faWallet}/>
            </NavLink>
            <NavLink exact="true" activeclassname="active" to="/dashboard"  onClick={() => setShowNav(false)}>
                <FontAwesomeIcon className='icon' icon={faChartColumn}/>
            </NavLink>
            <FontAwesomeIcon onClick={() => setShowNav(false)} icon={faClose} size="3x" className='close-icon' />
        </nav>
        <FontAwesomeIcon className='hamburger-icon' icon={faBars} size="3x" onClick={() => setShowNav(true)}/>
    </div>
    )
}

export default Sidebar