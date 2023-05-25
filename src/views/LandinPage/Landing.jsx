import {Login, Register} from '../../Components'
import { useState} from 'react';
import style from './Landing.module.css'

const Landing = ({login, response, setResponse}) => {
    const [openRegister, setOpenRegister] = useState(false);
    


    return (
            <div className={style.landing}>

                    <div className={style.text}>
                        <h1>Explore de world in one place!</h1>
                        <br />
                        <h2>Find detailed country information, discover exciting activities,
                        and connect with a community of passionate travelers.</h2>
                        <br />
                        <h2>Welcome to our countries page!</h2>
                    </div>

                    <div className={style.SingIn}>
                        {!openRegister && <Login login= {login} response={response} setResponse={setResponse}/>}

                    {!openRegister && <button onClick={() => setOpenRegister(true)} className={style.buttonSingUp}>
                                        SING UP
                                    </button>}

                        <div>
                            {openRegister && <Register className={style.SingIn} setOpenRegister={setOpenRegister} login={login}/>}
                        </div>
                    </div>


                <div className={style.container}></div>
            </div>
    )
}

export default Landing;