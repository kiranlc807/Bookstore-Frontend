import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthComponent from './components/Login';
import DashboardLayout from './components/DashboardLayout';

function App() {

      const AppRoute = createBrowserRouter([
        {
          path:"/",
          element:<AuthComponent />
        },
        {
          path:"dashboard",
          element:<DashboardLayout />
        }
      ])
  return (<RouterProvider router={AppRoute} ></RouterProvider>);
}

export default App;
