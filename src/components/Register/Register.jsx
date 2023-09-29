import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {

    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted);


        //reset success
        setSuccess('')

        //reset error message
        setRegisterError('');

        // client side password check
        if (password.length < 6) {
            setRegisterError("Password length should be at least 6 characters or longer")
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError("Your password should have an upper case letter")
            return;
        }else if(!accepted){
            setRegisterError('Please accept our terms and conditions')
            return;
        }

        // user creation
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User created successfully');

                // send user verification mail
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                    .then(()=> alert("Profile updated"))
                    .catch(() => alert("An error occurred"))

                // send user verification mail
                sendEmailVerification(result.user)
                    .then(() => alert("verification email sent"));
            })
            .catch(error => {
                console.log(error.message)
                setRegisterError("User email already exists")
            })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <div className="mx-auto w-1/2">
                <h2 className="text-3xl mb-10">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className="w-full mb-4 px-4 py-2" required type="text" name="name" placeholder="Name" />
                    <br />
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
                    <br />
                    <div className="mb-4">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Please accept our <a href="#">terms and conditions</a> </label>
                    </div>
                    <input className="btn btn-secondary w-full mb-4  px-4 py-2" type="submit" name="Register" />
                </form>
                {
                    registerError && <p className="text-red-500">{registerError}</p>
                }
                {
                    success && <p className="text-green-500">{success}</p>
                }
                <p>Already have an account? Please <Link to={'/login'}>login</Link> </p>
            </div>
        </div>
    );
};

export default Register;