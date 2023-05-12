const regexpEmail = /^[^@]+@[^@]+\.[^@]+$/;

const regexpPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{6,10}$/;



const loginValidation = (input)=>{
    const errors = {}
        if(!input.email || !regexpEmail.test(input.email) 
        || input.email.length > 35)  errors.email = `Ingrese un e-mail valido`;     
        if(!regexpPassword.test(input.password)) errors.password = `Ingrese un password valido`;
    return errors;
}

const formValidation = (input)=>{
    const errors = {}
        if(!input.name) errors.name = `Field can't be empty`;
        if(input.dificulty < 1 || input.dificulty > 5)  {
            errors.dificulty = `Difficulty must be between 1 and 5`;
        } 
        if(!input.duration || input.duration < 0.5) errors.duration = `Field can't be empty`;
        if(input.season !== "Summer" && input.season !== "Autumn" && input.season !== "Spring" && input.season !== "Winter"){ 
            errors.season = `Season must be one of: Summer, Autumn, Spring, Winter`;
        }
        if(!input.country) errors.country = `Field can't be empty`;
    return errors;
}

export {loginValidation, formValidation};