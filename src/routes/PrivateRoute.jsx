import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';


const PrivateRoute = ({children}) => {
    const {user: {email}} = useSelector(state => state.auth);
    const location = useLocation();



    if(!email){
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }
    return <>{children}</>;
};

PrivateRoute.propTypes = {
    children: PropTypes.element, // or PropTypes.element
  };

export default PrivateRoute;