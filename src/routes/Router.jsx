import { createBrowserRouter } from 'react-router-dom';
import HomeLayouts from '../Layout/HomeLayouts';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AuthLayout from '../Layout/AuthLayout';
import Terms from '../pages/Terms';
import AllGroupDetails from '../Components/AllGroupDetails';
import ErrorPage from '../pages/ErrorPage';
import Profile from '../pages/Profile';
import MyAssignments from '../pages/MyAssignments';
import PrivateRoute from './PrivateRoute';
import UpdateGroup from '../pages/UpdateGroup';
import AllGroup from '../Components/AllGroup';
import CreateAssignment from '../pages/CreateAssignment';
import Pending from '../Components/Pending';
import Contact from '../pages/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AllGroup />,
      },
      {
        path: 'assignments',
        element: <AllGroup />,
      },
      {
        path: 'contact',
        element: <Contact/>,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'services/:id',
        element: <AllGroupDetails />, // Protect the route
      },
      {
        path: 'my-group',
        element: <MyAssignments />,
      },
      {
        path: 'updateGroup/:id',
        element: <UpdateGroup />,
      },
      {
        path: 'create-assignments',
        element: <PrivateRoute element={<CreateAssignment />} />,
      },
      {
        path: 'pending-assignments',
        element: <PrivateRoute element={<Pending />} />,
      },
    ],
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/profile',
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
]);

export default router;