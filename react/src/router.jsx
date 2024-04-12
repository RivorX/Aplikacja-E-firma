import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx';
import Dashboard from './views/Dashboard.jsx';
import Login from './views/Login.jsx';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <Dashboard/>
    }
])

export default router;