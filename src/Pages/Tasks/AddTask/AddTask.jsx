import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { usePostTaskMutation } from "../../../features/tasks/tasksApi";

const AddTask = () => {
  const {user} = useSelector(state => state.auth);
  const { register, handleSubmit } = useForm();
  const [postTask] = usePostTaskMutation();

  const handleAddTask = (data) => {
    if (isDueDateInPast(data.date)) {
        toast.error("Due date must be in the future.");
        return;
      }

    const addDate = new Date();
    console.log({...data,userEmail: user.email, addDate});
    const task = {...data,userEmail: user.email, addDate};
    postTask(task);
  };

  const isDueDateInPast = (dueDate) => {
    const selectedDate = new Date(dueDate);
    const currentDate = new Date();
    return selectedDate < currentDate && !isSameDay(selectedDate, currentDate);
  };
  
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <h3 className="text-2xl mb-4 text-center">Add a Task</h3>
      <form  onSubmit={handleSubmit(handleAddTask)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-[1000px] mx-auto p-4">
          {/* Task Title */}
          <label className="form-control">
            <span className="label-text mb-1">Title</span>
            <input
              {...register("title", { required: "Title is required." })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-[400px]"
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Task Description</span>
            <textarea
              {...register("description", {
                required: "Task description is required.",
              })}
              placeholder="Enter task description"
              className="textarea textarea-bordered w-[400px] h-[100px]"
            ></textarea>
          </label>

          {/* Priority Level */}
          <label className="form-control">
            <span className="label-text mb-1">Priority Level</span>
            <select
              {...register("priority", { required: "Priority is required." })}
              className="select select-bordered w-[400px]"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Due Date</span>
            <input
              {...register("date", { required: "Date is required." })}
              type="date"
              placeholder="Type here"
              className="input input-bordered w-[400px]"
            />
          </label>
          
          
        </div>
        <div className="flex justify-center"> 
            <button
                type="submit"
                className="btn btn-primary w-[200px]"
            >
                Add Task
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
