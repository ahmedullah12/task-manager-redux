import { Link } from 'react-router-dom';
import bgImg from '../../assets/taskbanner.jpg'
import { useSelector } from 'react-redux';

const Banner = () => {
    const {user: {email}} = useSelector(state => state.auth)
    const navbarHeight = 68;
    const bannerStyle = {
        width: '100%',
        height: `calc(100vh - ${navbarHeight}px)`,
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',  // Adjust as needed
        backgroundPosition: 'center',  // Adjust as needed
      };

    return (
        <div className={`flex justify-center items-center`} 
        style={bannerStyle}
        >
            <div className='text-center'>
            <p className='text-2xl text-white mb-4'><span className='text-3xl text-orange-500 text-bold'>Stay organized, stay productive</span> <br /> –  Your tasks, Your way!</p>
            <button className="btn btn-outline btn-white text-black">
                {
                    email ? 
                    <Link to="/tasks">Get Started</Link> :
                    <Link to="/login">Get Started</Link>
                }
            </button>
            </div>
        </div>
    );
};

export default Banner;