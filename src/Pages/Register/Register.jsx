import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUser, googleLogin } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useEffect, useState } from "react";


const Register = () => {
    const {user: {email}, isError, error} = useSelector(state => state.auth);
    const [loginError, setLoginError] = useState('');
    const {handleSubmit, register} = useForm();
    const dispatch = useDispatch();
    const [postUser] = useRegisterMutation();
    const navigate = useNavigate();

    const handleRegister = (data) => {
        dispatch(createUser({email: data.email, password: data.password}));
        const user = {
            name: data.name,
            email: data.email,
        };
        console.log(user);
        postUser(user);
    };


    const handleGoogleLogin = () => {
        dispatch(googleLogin())
        .then((user) => {
            const saveUser = {
                name: user.payload.displayName,
                email: user.payload.email,
            };
            postUser(saveUser)
        })
        .catch((error) => {
            console.log(error);
          });
    }

    useEffect(() => {
        if (email) {
          navigate('/');
        }
      }, [email, navigate]);

    useEffect(() => {
    if(isError){
        setLoginError(error);
        }
    }, [error, isError]);
    return (
        <div className="flex justify-center mt-10">
            <div className='grid w-[400px]'>
                <div className='bg-[#FFFAF4] rounded-lg grid  p-10'>
                <h1 className='mb-5 font-medium text-2xl'>Register</h1>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className='space-y-3'>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input {...register("name", {required: "Name is required."})} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input {...register("email", {required: "Email is required"})} type="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input {...register("password", {required: "Password is required"})} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <p className="text-red-500">{loginError}</p>
                    <div className='relative !mt-8'>
                        <button
                        type='submit'
                        className='font-bold text-white py-3 rounded-full bg-primary w-full'
                        >
                        Register
                        </button>
                    </div>
                    <div>
                        <p>
                        Already have an account?{" "}
                        <Link to="/login"
                            className='text-primary hover:underline cursor-pointer'
                            
                        >
                            Sign In
                        </Link>
                        </p>
                    </div>
                    <button
                        
                        type='button'
                        className='font-bold text-white py-3 rounded-full bg-primary w-full'
                        onClick={handleGoogleLogin}
                        >
                        Login with Google
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
};

export default Register;