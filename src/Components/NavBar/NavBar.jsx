import {Link} from 'react-router-dom'
import {SearchBar} from '../index'
import style from './NavBar.module.css'


const NavBar = ({logOut}) => {
    return (
        <nav className={style.Navbar}>
            <div>

                <Link to='/home'><button>HOME</button></Link>

                <Link to='/activities'><button>ACTIVITIES</button></Link>
            
                <Link to='/favorites'><button>FAVORITES</button></Link>
            </div>


            <SearchBar/>
            <div>

                <Link to='/about'><button>ABOUT</button></Link>

                <button onClick={logOut}>LOGOUT</button>
            </div>
        </nav>
    )
}

export default NavBar;