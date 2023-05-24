import {Link, useLocation} from 'react-router-dom'
import {SearchBar} from '../index'
import style from './NavBar.module.css'


const NavBar = ({logOut}) => {
    const location = useLocation()
    return (
        <nav className={style.Navbar}>
            <div>

                <Link to='/home'><button className={(location.pathname === '/home')?style.selectButton:style.navBarButton}>HOME</button></Link>

                <Link to='/activities'><button className={(location.pathname === '/activities')?style.selectButton:style.navBarButton}>ACTIVITIES</button></Link>
            
                <Link to='/favorites'><button className={(location.pathname === '/favorites')?style.selectButton:style.navBarButton}> FAVORITES</button></Link>
            </div>


            <SearchBar style={style}/>
            <div>

                <Link to='/about'><button className={(location.pathname === '/about')?style.selectButton:style.navBarButton}>ABOUT</button></Link>

                <button onClick={logOut} className={style.navBarButton}>LOGOUT</button>
            </div>
        </nav>
    )
}

export default NavBar;