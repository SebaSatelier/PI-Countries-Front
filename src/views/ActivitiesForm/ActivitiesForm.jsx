import { useState } from 'react'
import { FormCreateActivity, FormEditActivity } from '../../Components'
import style from './ActivitiesForm.module.css'

const ActivitiesForm = () => {

    const [searchActivity, setSearchActivity] = useState(false)


    return(
        <div className={style.container}>
            <div className={style.container2}>
                    <h1><button disabled={!searchActivity && true} onClick={()=> setSearchActivity(false)}>add activity</button></h1>
                    <h1><button disabled={searchActivity && true} onClick={()=> setSearchActivity(true)}>edit activity</button></h1>
            </div>
            {!searchActivity && <FormCreateActivity style={style}/>}
            {searchActivity && <FormEditActivity style={style}/>}
        </div>

    )
}

export default ActivitiesForm;