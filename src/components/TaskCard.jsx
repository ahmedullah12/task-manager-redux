import { FaCalendar, FaClock, FaFlag } from "react-icons/fa";
import PropTypes from 'prop-types';
import moment from "moment";


const TaskCard = ({task}) => {
    const {title, description, priority, date, addDate} = task;
    return (
        <div className="border rounded p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      <div className="flex items-center mb-2">
        <FaFlag className="text-yellow-500 mr-2" />
        <span className="text-gray-700">Priority: {priority}</span>
      </div>
      <div className="flex items-center mb-2">
        <FaCalendar className="text-blue-500 mr-2" />
        <span className="text-gray-700">DueDate: {date}</span>
      </div>

      <div className="flex items-center">
        <FaClock className="text-purple-500 mr-2" />
        <span className="text-gray-700">{moment(addDate).fromNow()}</span>
      </div>
    </div>
    );
};

TaskCard.propTypes = {
    task: PropTypes.object.isRequired,
}

export default TaskCard;