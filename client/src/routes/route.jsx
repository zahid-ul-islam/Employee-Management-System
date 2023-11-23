import {BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import SignUp from "../pages/SignUp.jsx";
import SignInSide from "../pages/SignIn.jsx";

export function RoutesApp() {
    const routes = createBrowserRouter([
        {path: '/',
        element: <SignInSide />},
        {path: '/signup',
        element: <SignUp />}
    ])
    return <RouterProvider router={routes} />
}