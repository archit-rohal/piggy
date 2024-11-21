import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import About from "./About.jsx";
import Contact from "./components/Contact.jsx";
import Error from "./components/Error.jsx";
import Body from "./components/Body.jsx";
import RestaurantMenu from "./components/RestaurantMenu.jsx";
import Cart from "./components/Cart.jsx";
// import Grocery from "./components/Grocery.jsx";

const Grocery = lazy(() => import("./components/Grocery.jsx"));

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Body/>
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading...</h1>}><Grocery/></Suspense>
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu/>,
            },
            {
                path: "/cart",
                element: <Cart/>,
            },
        ],
        errorElement: <Error/>,
    },
])
console.log("this is appRouter",appRouter);


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={appRouter}/>
        {/*<App/>*/}
    </React.StrictMode>,
)