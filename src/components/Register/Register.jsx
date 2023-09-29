import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const Register = () => {

    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        
        //reset success
        setSuccess('')
        
        //reset error message
        setRegisterError('');
        
        // client side password check
        if(password.length < 6){
            setRegisterError("Password length should be at least 6 characters or longer")
            return;
        }else if(!/[A-Z]/.test(password)){
            setRegisterError("Your password should have an upper case letter")
            return;
        }

        // user creation
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess('User created successfully')
            })
            .catch(error => {
                console.log(error.message)
                setRegisterError("User email already exists")
            })
    }

    const handleShowPassword = () =>{
        setShowPassword(!showPassword)
    } 

    return (
        <div>
            <div className="mx-auto w-1/2">
                <h2 className="text-3xl mb-10">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className="w-3/4 mb-4 px-4 py-2" required type="email" name="email" placeholder="Email" />
                    <br />
                    <input 
                    className="w-3/4 mb-4  px-4 py-2 mr-2" 
                    required 
                    type={ showPassword ? "text" : "password"} 
                    name="password" 
                    placeholder="Password" />
                    <span onClick={handleShowPassword} className="btn btn-neutral">show password</span>
                    <br />
                    <input className="btn btn-secondary w-3/4 mb-4  px-4 py-2" type="submit" name="Register" />
                </form>
                {
                    registerError && <p className="text-red-500">{registerError}</p>
                }
                {
                    success && <p className="text-green-500">{success}</p>
                }
            </div>
        </div>
    );
};

export default Register;