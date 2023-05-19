import {Login, Register} from '../../Components'
import { useState} from 'react';
import style from './Landing.module.css'

const Landing = ({login, response, setResponse}) => {
    const [openRegister, setOpenRegister] = useState(false);
    


    return (
            <div className={style.landing}>
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