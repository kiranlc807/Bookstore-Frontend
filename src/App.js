import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthComponent from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import Books from './components/books.js';
import AboutBook from './components/AboutBook.js';
import Cart from './components/Cart.js';
import Wishlist from './components/WishList.js';
import UserProfile from './components/Profile.js';

function App() {

      const AppRoute = createBrowserRouter([
        {
          path:"/",
          element:<AuthComponent />
        },
        {
          path:"dashboard",
          element:<DashboardLayout />,
          children:[
            {path: "books", index: true,element: <Books />},
            {path: "aboutbook/:id", element: <AboutBook/>},
            {path: "cart", element: <Cart/>},
            {path:"wishlist",element:<Wishlist />},
            {path:"profile",element:<UserProfile/>}
          ]
        }
      ])
  return (<RouterProvider router={AppRoute} ></RouterProvider>);
}

export default App;
