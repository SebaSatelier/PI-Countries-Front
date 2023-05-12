import {Link} from 'react-router-dom'
import {SearchBar} from '../index'
import style from './NavBar.module.css'


const NavBar = () => {
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

                <Link to='/'><button>LOGOUT</button></Link>
            </div>
        </nav>
    )
}

export default NavBar;