import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Base from "../pages/Base";
import Employee from "../pages/Employee";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import SignUp from "../pages/Signup";
import SignIn from "../pages/Signin";
import SecureRoute from "./SecureRoute";
import Career from "../pages/Career";
import Application from "../pages/Application";

const secureRouteWrapper = (element) => <SecureRoute>{element}</SecureRoute>

const AppRoutes = () => {

  const routes = createBrowserRouter([
		{
			path: '/',
			element: secureRouteWrapper(<Base />),
			children: [
				{
					path:'home',
					element: secureRouteWrapper(<Home />)
				},
				{
					path: 'about',
					element: secureRouteWrapper(<About />)
				},
				{
					path: 'employees',
					element: secureRouteWrapper(<Employee />)
				},
				{
					path: 'profile',
					element: secureRouteWrapper(<Profile />)
				},
				{
					path:'show-details'
				},
				{
					path:'career',
					element: secureRouteWrapper(<Career />)
				},
				{
					path:'apply',
					element: secureRouteWrapper(<Application />)
				}
			],
		},
		{
			path: '/signin',
			element: <SignIn />
		},
		{
			path: '/signup',
			element: <SignUp />
		}
	]);

  return (<RouterProvider router={routes} />);
};

export default AppRoutes;