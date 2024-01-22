import PropType from "prop-types"
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useUpdateTaskMutation } from "../features/tasks/tasksApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

const UpdateTaskModal = ({task, isModalOpen, setIsModalOpen, modalId}) => {
    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            title: task.title,
            description: task.description,
            priority: task.priority,
            date: task.date,
        }
    });
    const [updateTask, {isSuccess}] = useUpdateTaskMutation();


    const handleUpdate = (data) => {
        updateTask({id: task._id, data});
    };

    useEffect(() => {
        if(isSuccess){
            reset();
            toast.success("Task Updated");
            setIsModalOpen(false);
        }
    }, [isSuccess, reset, setIsModalOpen])
    
    return (
        <div>
            <input type="checkbox" id={modalId} className="modal-toggle" checked={isModalOpen}
                    onChange={() => setIsModalOpen(!isModalOpen)}
                />
                <label htmlFor='update-modal' className="modal cursor-pointer">
                    <label className="modal-box relative">
                        <div className="absolute top-3 right-5">
                            <button
                                className="modal-close text-xl"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <IoMdClose size={25}/>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <label className="block mt-4">
                                <span>Title</span>
                                <input
                                {...register('title')}
                                type="text"
                                className="input input-bordered w-full"
                                />
                            </label>

                            <label className="block mt-4">
                                <span>Description</span>
                                <textarea
                                {...register('description')}
                                className="textarea textarea-bordered w-full"
                                ></textarea>
                            </label>

                            <label className="block mt-4">
                                <span>Priority</span>
                                <select {...register('priority')} className="select select-bordered w-full">
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                                </select>
                            </label>

                            <label className="block mt-4">
                                <span>Due Date</span>
                                <input
                                {...register('date')}
                                type="date"
                                className="input input-bordered w-full"
                                />
                            </label>

                            <div className="mt-6 flex justify-end">
                                <button
                                type="submit"
                                className="btn btn-primary"
                                >
                                Update Task
                                </button>
                            </div>
                        </form>
                    </label>
                </label>
        </div>
    );
};

UpdateTaskModal.propTypes= {
    task: PropType.object.isRequired,
    isModalOpen: PropType.bool.isRequired,
    setIsModalOpen: PropType.func.isRequired,
    modalId: PropType.string.isRequired,
}

export default UpdateTaskModal;