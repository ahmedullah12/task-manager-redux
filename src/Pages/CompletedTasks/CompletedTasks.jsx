import { useSelector } from "react-redux";
import { useCompletedTasksQuery } from "../../features/tasks/tasksApi";
import CompletedTaskCard from "../../components/CompletedTaskCard";


const CompletedTasks = () => {
    const {user: {email}} = useSelector(state => state.auth);

    const {data} = useCompletedTasksQuery(email);


    return (
        <div className="w-5/6 mx-auto mt-3">
           <h3 className="text-center text-2xl font-bold">Here you can see your completed tasks.</h3>
           <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            {
                data?.map(task => <CompletedTaskCard key={task._id} task={task}></CompletedTaskCard>)
            }
           </div>
        </div>
    );
};

export default CompletedTasks;