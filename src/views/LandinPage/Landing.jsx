import {Login, Register} from '../../Components'
import { useState} from 'react';
import style from './Landing.module.css'

const Landing = ({login}) => {
    const [openRegister, setOpenRegister] = useState(false);


    return (
            <div className={style.landing}>
                <div>
                    {!openRegister && <Login login= {login}/>}

                    {!openRegister && <button onClick={() => setOpenRegister(true)}>Sing up</button>}

                    {openRegister && <Register setOpenRegister={setOpenRegister}/>}

                    
                </div>
            </div>
    )
}

export default Landing;