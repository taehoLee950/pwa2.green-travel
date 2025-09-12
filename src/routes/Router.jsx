import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Main from "../components/Main.jsx";
import FestivalList from "../components/festivals/FestivalList.jsx";

// nested router 
const router = createBrowserRouter([ 
  {
    //parent obj
    element: <App/>,
    //children obj
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/festivals',
        element: <FestivalList />
      }
    ]
  }

])

function Router() {
  return <RouterProvider router={router}/> //giving props 'router' from line 6
}

export default Router;