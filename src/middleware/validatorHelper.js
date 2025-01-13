import validator from "validator"
export const validateSignUp = (obj)=>{

    const {name,email, password} = obj;

    if(!name || name.length < 3)
    {
        throw new Error(" Name is required and should be between 3 and 20 characters.")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Invalid Email.")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password should be at least 8 characters long and contain a mix of letters, numbers, and special characters.");
    }
    console.log("Valid");
}