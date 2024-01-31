import PropTypes from "prop-types";
import { useDeleteTaskMutation, usePostCompletedTaskMutation } from "../features/tasks/tasksApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

const CompleteTaskModal = ({modalId, task,isModalOpen, setIsModalOpen}) => {
    const [postCompletedTask, {isSuccess}] = usePostCompletedTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    const handleCompleteTasks = (task) => {
        postCompletedTask({...task, completed: true});
      }
  
      useEffect(() => {
        if(isSuccess){
          deleteTask(task._id);
          toast.success("Task added to completed task")
        }
      }, [isSuccess, deleteTask, task])
    return (
        <div>
            <input type="checkbox"  id={modalId} className="modal-toggle" checked={isModalOpen}
            onChange={() => setIsModalOpen(!isModalOpen)}/>
            <div className="modal w-auto max-w-none">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Have you completed the task <span className="text-orange-500">{task.title}</span>
                    </h3>

                    <div className="modal-action">
                        <label onClick={() => handleCompleteTasks(task)} 
                        htmlFor="confirm-modal2" className="btn">Yes</label>
                        <button onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

CompleteTaskModal.propTypes = {
    modalId: PropTypes.string.isRequired,
    task: PropTypes.object.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
}

export default CompleteTaskModal;