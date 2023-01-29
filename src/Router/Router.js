import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'billing-dashboard',
    element: <Dashboard />,
  },
]);

export default Router;
