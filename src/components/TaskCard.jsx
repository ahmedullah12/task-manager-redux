import { FaCalendar, FaClock, FaFlag } from "react-icons/fa";
import PropTypes from 'prop-types';
import moment from "moment";
import { useDeleteTaskMutation } from "../features/tasks/tasksApi";
import { useState } from "react";
import UpdateTaskModal from "./UpdateTaskModal";
import CompleteTaskModal from "./CompleteTaskModal";


const TaskCard = ({task}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  
    const {_id, title, description, priority, date, addDate} = task;

    const [deleteTask] = useDeleteTaskMutation();
    

    const handleDeleteTask = (id) => {
      deleteTask(id);
    };

    



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
        <div className="flex gap-3 justify-end mt-3">
          <label htmlFor={`update-modal-${_id}`} className="btn btn-info btn-sm text-white">Update</label>
          <label htmlFor={`complete-modal-${_id}`} className="btn btn-success btn-sm text-white">Complete</label>
          <button onClick={() => handleDeleteTask(_id)} className="btn btn-error btn-sm text-white">Delete</button>
        </div>

        <UpdateTaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        task={task}
        modalId={`update-modal-${task._id}`}
      />
      <CompleteTaskModal task={task}  isModalOpen={isCompleteModalOpen}
      setIsModalOpen={setIsCompleteModalOpen} modalId={`complete-modal-${task._id}`}
      ></CompleteTaskModal>
      </div>
    );
};

TaskCard.propTypes = {
    task: PropTypes.object.isRequired,
}

export default TaskCard;