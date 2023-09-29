import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import auth from "../../firebase/firebase.config";
import { Link } from "react-router-dom";
import { UserFullNameContext } from "../Root/Root";

const Login = () => {

    const {setUserFullName} = useContext(UserFullNameContext)

    const [loginError, setLoginError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const emailRef = useRef(null)


    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset error and success messages
        setLoginError('')
        setSuccess('')


        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if(result.user.emailVerified){
                    setSuccess("Login successful")
                    setUserFullName(result.user.displayName)
                    alert("Login successful")
                }else{
                    alert("Please check your email and verify it")
                }
            })
            .catch(error => {
                setLoginError(error.message)
                console.log(error.message)
            })
    }



    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       
        if(!email){
            console.log("Please provide an email", emailRef.current.value);
            return;
        }else if(!emailRegex.test(email)){
            console.log("Please write a valid email")
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setSuccess("Password reset email sent")
                alert("Password reset email sent")
            })
            .catch(error => {
                setLoginError("Invalid credential")
                console.log(error.message)
                console.log(error.code)
            })

    }

    return (
        <div>
            <div className="mx-auto w-1/2">
                <h2 className="text-3xl mb-10">Login</h2>
                <form onSubmit={handleLogin}>
                    <input 
                    className="w-full mb-4 px-4 py-2" 
                    type="email" 
                    name="email" 
                    ref={emailRef}
                    placeholder="Email" 
                    />
                    <br />
                    <div className="relative border">
                        <input
                            className="w-full px-4 py-2 mr-2"                            
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password" />
                        <span onClick={handleShowPassword} className="absolute top-3 right-2">
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                    </div>
                    <p onClick={handleForgetPassword} className="my-2">Forgot password?</p>

                    <input className="btn btn-secondary w-full mb-4  px-4 py-2" type="submit" name="Login" />
                </form>
                {
                    loginError && <p className="text-red-500 mb-2">{loginError}</p>
                }
                {
                    success && <p className="text-green-500 mb-2">{success}</p>
                }
                <p>Not a member? Please <Link to={'/register'}>Register</Link></p>
            </div>
        </div>
    );
};

export default Login;