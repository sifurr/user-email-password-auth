import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import auth from "../../firebase/firebase.config";

const Login = () => {

    const [loginError, setLoginError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)


    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess("Login successful")
            })
            .catch(error => {
                setLoginError(error.message)
                console.log(error.message)
            })
    }



    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <div className="mx-auto w-1/2">
                <h2 className="text-3xl mb-10">Login</h2>
                <form onSubmit={handleLogin}>
                    <input className="w-full mb-4 px-4 py-2" required type="email" name="email" placeholder="Email" />
                    <br />
                    <div className="relative border">
                        <input
                            className="w-full px-4 py-2 mr-2"
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password" />
                        <span onClick={handleShowPassword} className="absolute top-3 right-2">
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                    </div>
                    <p className="my-2">Forgot password?</p>

                    <input className="btn btn-secondary w-full mb-4  px-4 py-2" type="submit" name="Login" />
                </form>
                {
                    loginError && <p className="text-red-500">{loginError}</p>
                }
                {
                    success && <p className="text-green-500">{success}</p>
                }
            </div>
        </div>
    );
};

export default Login;