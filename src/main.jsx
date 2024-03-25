import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Errorpage from './components/template/errorpage.jsx';
import Home from './components/home/home.jsx';
import Login from './components/data/login.jsx';
import Signup from './components/data/signup.jsx';
import Singleitem from './components/shopping/singleitem.jsx';
import Itemslist from './components/shopping/itemslist.jsx';
import Fullinfoitem from './components/shopping/fullinfoitem.jsx';
import Searchitems from './components/shopping/searchitems.jsx';
import Trending from './components/shopping/trending.jsx';
import Cartpage from './components/shopping/cart.jsx';
import Favoritepage from './components/shopping/favorites.jsx';
import Payement from './components/shopping/payement.jsx';
import Profile from './components/data/profile.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <Errorpage />,  
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/products",
    element: <Itemslist/>
  },
  {
    path: "/fulldetails",
    element: <Fullinfoitem/>
  },
  {
    path: "/search",
    element: <Searchitems/>
  },
  {
    path: "/trending",
    element: <Trending/>
  },
  {
    path: "/cart",
    element: <Cartpage/>
  },
  {
    path: "/favorite",
    element: <Favoritepage/>
  },
  {
    path: "/Payement",
    element: <Payement/>
  },
  {
    path: "/profile",
    element: <Profile/>
  }


]);
ReactDOM.createRoot(document.getElementById('root')).render(

      <RouterProvider router={router} />

)
