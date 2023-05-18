const regexpEmail = /^[^@]+@[^@]+\.[^@]+$/;

const regexpPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{6,10}$/;



const loginValidation = (input)=>{
    const errors = {}
        if(!input.email || !regexpEmail.test(input.email) 
        || input.email.length > 35)  errors.email = `Enter valid email`;     
        if(!regexpPassword.test(input.password)) errors.password = `Enter valid password`;
    return errors;
}

const formValidation = (input=undefined, state=undefined)=>{
    const errors = {}
        if(!input.name) errors.name = `Field can't be empty`;
        if(input.dificulty < 1 || input.dificulty > 5)  {
            errors.dificulty = `Difficulty must be between 1 and 5`;
        } 
        if(!input.duration || input.duration < 0.5) errors.duration = `Field can't be empty`;
        if(input.season!== "Summer" && input.season !== "Autumn" && input.season !== "Spring" && input.season !== "Winter"){ 
            errors.season = `Season: Summer, Autumn, Spring, Winter`;
        }
    return errors;
}

export {loginValidation, formValidation};