import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import { logout } from "../../features/auth/authSlice";
import { FaUser } from "react-icons/fa";

const Navbar = () => {

  const {user: {email, name}} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      dispatch(logout());
      navigate('/login')
    })
  }


    return (
        <div>
            <div  className="navbar bg-orange-500 text-white">
              <div className="navbar-start">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    {
                      email ? 
                      (
                        <>
                          <li className="text-black"><button onClick={handleLogout}>Logout</button></li>
                          <li className="text-black"><span><FaUser/> {name}</span></li>
                        </>
                      ) :
                      (
                        <>
                          <li className="text-black"><Link to="/login">Sign In</Link></li>
                          <li className="text-black"><Link to="register">Sign Up</Link></li>
                        </>
                      )
                    }
                  </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl mr-0 lg:ml-10">TaskManager</Link>
              </div>
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  {
                    email ? 
                    <>
                      <li><button onClick={handleLogout}>Logout</button></li>
                      <li><span><FaUser/> {name}</span></li>
                    </>
                    :
                    (<>
                      <li><Link to="/login">Sign In</Link></li>
                      <li><Link to="register">Sign Up</Link></li> 
                    </>)
                  }
                </ul>
              </div>
            </div>
        </div>
    );
};

export default Navbar;