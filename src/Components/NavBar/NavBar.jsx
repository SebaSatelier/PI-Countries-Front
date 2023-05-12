import {Link} from 'react-router-dom'
import {SearchBar} from '../index'
import style from './NavBar.module.css'


const NavBar = () => {
    return (
        <nav className={style.Navbar}>
            <Link to='/home'><button>Home</button></Link>

            <Link to='/activities'><button>Activities</button></Link>
            
            <Link to='/favorites'><button>Favorites</button></Link>


            <SearchBar/>

            <Link to='/about'><button>About</button></Link>

            <Link to='/'><button>Logout</button></Link>
        </nav>
    )
}

export default NavBar;