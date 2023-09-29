import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const Register = () => {

    const [registerError, setRegisterError] = useState('')

    const handleRegister = e =>{
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => console.log(result.user))
            .catch(error => 
            {
                console.log(error.message)
                setRegisterError(error.message)
            })
    }
    return (
        <div>
            <div className="mx-auto w-1/2">
                <h2 className="text-3xl mb-10">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className="w-3/4 mb-4 px-4 py-2" type="email" name="email" placeholder="Email" />
                    <br />                   
                    <input className="w-3/4 mb-4  px-4 py-2" type="password" name="password" placeholder="Password" />
                    <br />                  
                    <input className="btn btn-secondary w-3/4 mb-4  px-4 py-2" type="submit" name="Register" />
                </form>
                <p className="text-red-500">{registerError}</p>
            </div>
        </div>
    );
};

export default Register;