import { useEffect, useState } from "react";
import { formValidation } from "../../Utils/Validation";
import { getAllCountries } from "../../Redux/countryActions";
import { getActivities } from "../../Redux/activityActions";
import { recFav } from "../../Redux/userActions";
import { URL } from "../../Utils/Utils";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const FormEditActivity = ({ style }) => {
  const dispatch = useDispatch();

  const { userData, allActivities } = useSelector((state) => state); //Traer esos 3 estados del global

  const [selectedActivity, setSelectedActivity] = useState(""); // Usado para saber que actividad selecciono el usuario y obtener sus datos

  const [edit, setEdit] = useState(false); // Usado para deshabilitar la edicion de los input hasta que se clickea en el boton EDIT

  const [response, setResponse] = useState("");// Maneja la respuesta del servidor, para que lo renderice

  const [activityData, setActivityData] = useState({ // usado para menajar el onchange de los input y cargar los datos de la actividad seleccionada por el usuario
    id: "",
    name: "",
    image: "",
    dificulty: "",
    duration: "",
    season: "",
  });

  // const [copySelectActivity, setCopySelectActivity] = useState({
  //   id: "",
  //   name: "",
  //   image: "",
  //   dificulty: "",
  //   duration: "",
  //   season: "",
  // })

  const [errors, setErrors] = useState({ //Usado para manejar las validaciones de los input cuando se van modificando
    name: "",
    image: "",
    dificulty: "",
    duration: "",
    season: "",
  });

  const handleSelect = (event) => { //Manejador del select
    setSelectedActivity(event.target.value);
    // setCopySelectActivity(event.target.value)
  };


  // const changeCheck =(activityData, copySelectActivity) => {
  //   let response = false
  //   for (const key in activityData) {
  //     if (key.value === copySelectActivity)
        
  //     }
  //   }
    // if(activityData === copySelectActivity) response = true;
    // return response
  // }

  const handleChange = (event) => { //Manejador del los cambios realizados en los input y poder validarlos
    if (!event) return setActivityData({ ...activityData });
    setActivityData({
      ...activityData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      formValidation({
        ...activityData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = async (event) => {// maneja el submit del form
    event.preventDefault(); //previene el default del form
    await updateActivity(activityData); 
    dispatch(getAllCountries());
    dispatch(recFav(userData.id));
    dispatch(getActivities())
  };

  const handleDelete = async (id) => {
    await deleteActivity(id); 
    dispatch(getAllCountries());
    dispatch(recFav(userData.id));
    dispatch(getActivities())
  };

  const deleteActivity = async (activityId)=>{
    try{
        const {data} = await axios.delete(`${URL}/activities`, {data: {activityId}})
        return setResponse(data.activity);
    } catch (error) {
      return setResponse(error.response.data.error);
    } finally {
    setEdit(false)
    setSelectedActivity('')
    setActivityData({
        ...activityData,
        name: "",
        image: "",
        dificulty: "",
        duration: "",
        season: "",
      });
    }

  }

  const updateActivity = async (activity) => {
    try {
      const { data } = await axios.put(`${URL}/activities`, activity);
      return setResponse(data.message);
    } catch (error) {
      return setResponse(error.response.data.error);
    } finally {
    setEdit(false)
    setSelectedActivity('')
    setActivityData({
        ...activityData,
        name: "",
        image: "",
        dificulty: "",
        duration: "",
        season: "",
      });
    }
  };

 

  const buttonDisable = (activityData, errors) => {
    let disable = false;
    // if(activityData.country.length<1) disable = true;
    if (!Object.values(activityData).every((value) => value)) disable = true;
    if (!Object.values(errors).every((value) => !value)) disable = true;
    return disable;
  };

  const handleMessage = () => {
    setResponse("");
  };

  useEffect(() => {
    const activity = allActivities?.find(
      (activity) => activity.id === +selectedActivity
    );
    setActivityData((prevActivityData) => ({
      ...prevActivityData,
      id: activity?.id,
      name: activity?.name,
      image: activity?.image,
      dificulty: activity?.dificulty,
      duration: activity?.duration,
      season: activity?.season,
    }));
  }, [selectedActivity, allActivities]);


  return (
    <form onSubmit={handleSubmit}>
      <div className={style.formDiv}>
        <div id={style.select}>
          <label htmlFor="activity">Activity:</label>
          <select
            disabled={response && true}
            name="activity"
            id=""
            value={selectedActivity}
            onChange={handleSelect}
          >
            <option disabled value="">
              Select an option
            </option>
            {allActivities?.map((activity) => {
              return <option key={activity.id} value={activity.id}>{activity.name}</option>;
            })}
          </select>
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            disabled={(response && true) || (!edit && true)}
            type="text"
            value={activityData.name}
            placeholder="Activity name"
            onChange={handleChange}
            name="name"
          />
        </div>
        {errors.name && <p>{errors.name}</p>}

        <div>
          <label htmlFor="name">Image (URL): </label>
          <input
            disabled={(response && true) || (!edit && true)}
            type="text"
            value={activityData.image}
            placeholder="Activity image"
            onChange={handleChange}
            name="image"
          />
        </div>
        {errors.image && <p>{errors.image}</p>}

        <div>
          <label htmlFor="dificulty">
            Dificulty
            <br />
            (1 - 5):{" "}
          </label>
          <input
            disabled={(response && true) || (!edit && true)}
            type="number"
            min="1"
            max="5"
            step="1"
            value={activityData.dificulty}
            placeholder="Dificulty"
            onChange={handleChange}
            name="dificulty"
          />
        </div>
        {errors.dificulty && <p>{errors.dificulty}</p>}

        <div>
          <label htmlFor="duration">
            Duration
            <br />
            (hours):{" "}
          </label>
          <input
            disabled={(response && true) || (!edit && true)}
            type="number"
            min="0"
            step="0.5"
            value={activityData.duration}
            placeholder="Duration"
            onChange={handleChange}
            name="duration"
          />
        </div>
        {errors.duration && <p>{errors.duration}</p>}

        <div>
          <label htmlFor="season">Season:</label>
          <select
            disabled={(response && true) || (!edit && true)}
            id="season"
            name="season"
            value={activityData.season}
            onChange={handleChange}
          >
            <option disabled value="">
              Select an option
            </option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
          </select>
        </div>
        {errors.season && <p>{errors.season}</p>}
      </div>
      {response && <div id={style.response2}>
                            <h2>{response}</h2> 
                            <button style={{height: "20px"}} onClick={handleMessage}>OK</button>
                        </div>}
      <div id={style.buttons}>
        <button onClick={() => setEdit(true)} type="button" disabled={response && true}>
          Edit
        </button>
        <button disabled={(buttonDisable(activityData, errors)) || (edit && true) } onClick={()=>handleDelete(activityData.id)} type="button">
          Delete
        </button>
        <button disabled={buttonDisable(activityData, errors)} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormEditActivity;
