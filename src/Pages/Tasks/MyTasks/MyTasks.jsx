import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../../features/tasks/tasksApi";
import TaskCard from "../../../components/TaskCard";
import { useEffect } from "react";


const MyTasks = () => {
    const {user: {email}} = useSelector(state => state.auth)
    const {data, isLoading} = useGetTasksQuery(email);
    
    useEffect(() => {
        if(isLoading){
            return <p>Loading...</p>
        }
    })
    
    return (
        <div className="w-5/6 mx-auto">
            <h3 className="text-2xl font-bold">MyTasks</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {
                data?.map((task) => <TaskCard key={task._id} task={task}></TaskCard>)
            }
            </div>
        </div>
    );
};

export default MyTasks;