import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../../features/tasks/tasksApi";
import TaskCard from "../../../components/TaskCard";
import { Link } from "react-router-dom";


const MyTasks = () => {
    const {user: {email}} = useSelector(state => state.auth)
    const {data, isLoading} = useGetTasksQuery(email);
    
    if(isLoading){
        return <p>Loading...</p>
    }

    const sortedData = data.slice().sort((a, b) => new Date(b.addDate) - new Date(a.addDate));
    
    return (
        <div className="w-5/6 mx-auto">
            <h3 className="text-2xl font-bold">MyTasks</h3>
            <div className="my-2 flex justify-end">
                <button className="btn btn-outline btn-info text-white">
                    <Link to='/completed-tasks'>Completed Tasks</Link>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
            {
                data.length === 0 && <p>{`You haven't added any task yet..`}</p>
            }
            {
                sortedData?.map((task) => <TaskCard key={task._id} task={task}></TaskCard>)
            }
            </div>
        </div>
    );
};

export default MyTasks;