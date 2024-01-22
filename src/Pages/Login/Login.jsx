import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";
import { useEffect } from "react";


const Login = () => {
    const {user: {email}} = useSelector(state => state.auth)
    const {handleSubmit, register} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (email) {
          navigate('/');
        }
      }, [email, navigate]);

    const handleLogin = (data) => {
        dispatch(loginUser({email: data.email, password: data.password}));
        navigate('/')
    }
    return (
        <div className="flex justify-center mt-10">
            <div className='grid w-[400px]'>
                <div className='bg-[#FFFAF4] rounded-lg grid  p-10'>
                <h1 className='mb-5 font-medium text-2xl'>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className='space-y-3'>
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
                    
                    <div className='relative !mt-8'>
                        <button
                        type='submit'
                        className='font-bold text-white py-3 rounded-full bg-primary w-full'
                        >
                        Login
                        </button>
                    </div>
                    <div>
                        <p>
                        {"Don't"} have an account?{" "}
                        <Link to="/register"
                            className='text-primary hover:underline cursor-pointer'
                            
                        >
                            Sign In
                        </Link>
                        </p>
                    </div>
                    <button
                        
                        type='button'
                        className='font-bold text-white py-3 rounded-full bg-primary w-full'
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

export default Login;