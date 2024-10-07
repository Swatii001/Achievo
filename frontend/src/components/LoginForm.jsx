// components/LoginForm.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { useDispatch, useSelector } from "react-redux";
import { postLoginData, postGoogleLoginData } from '../redux/actions/authActions'; 
import Loader from './utils/Loader';
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin component

const LoginForm = ({ redirectUrl }) => {
  console.log('Google Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);
  
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const authState = useSelector(state => state.authReducer);
    const { loading, isLoggedIn } = authState;
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            navigate(redirectUrl || "/");
        }
    }, [authState, redirectUrl, isLoggedIn, navigate]);

    const handleChange = e => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errors = validateManyFields("login", formData);
        setFormErrors({});
        if (errors.length > 0) {
            setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
            return;
        }
        dispatch(postLoginData(formData.email, formData.password));
    }

    const handleGoogleSuccess = (credentialResponse) => {
        // Here you can dispatch your action with the token
        const { credential } = credentialResponse;
        dispatch(postGoogleLoginData(credential));
    };

    const handleGoogleFailure = (error) => {
        console.error("Google login failed: ", error);
        // Handle error accordingly
    };

    const fieldError = (field) => (
        <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
            <i className='mr-2 fa-solid fa-circle-exclamation'></i>
            {formErrors[field]}
        </p>
    );

    return (
        <>
            <form className='m-auto my-16 max-w-[500px] bg-white p-8 border-2 shadow-md rounded-md' onSubmit={handleSubmit}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <h2 className='text-center mb-4'>Welcome user, please login here</h2>
                        <div className="mb-4">
                            <label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
                            <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} />
                            {fieldError("email")}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>
                            <Input type="password" name="password" id="password" value={formData.password} placeholder="Your password.." onChange={handleChange} />
                            {fieldError("password")}
                        </div>

                        <button className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark' type="submit">Submit</button>

                        <div className="mt-4">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                
                                onError={handleGoogleFailure}
                                logo="Google" // Optional: Change to your custom logo
                            />
                        </div>

                        <div className='pt-4'>
                            <Link to="/signup" className='text-blue-400'>Don't have an account? Signup here</Link>
                        </div>
                    </>
                )}
            </form>
        </>
    );
}

export default LoginForm;
