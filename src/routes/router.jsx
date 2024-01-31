import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import Tasks from "../Pages/Tasks/Tasks/Tasks";
import CompletedTasks from "../Pages/CompletedTasks/CompletedTasks";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/tasks',
                element: <PrivateRoute><Tasks></Tasks></PrivateRoute>
            },
            {
                path: '/completed-tasks',
                element: <PrivateRoute><CompletedTasks></CompletedTasks></PrivateRoute>
            },
        ]
    }
]);

export default router;