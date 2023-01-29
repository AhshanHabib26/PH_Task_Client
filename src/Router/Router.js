import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Login from '../Pages/Login';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

export default Router;
