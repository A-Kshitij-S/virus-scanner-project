import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Scan from "../pages/Scan"
import History from '../pages/History'

const appRouter= createBrowserRouter([
  {
    path:"/",
    element: <Home/>
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/signup",
    element: <SignUp/>
  },
  {
    path:"/scan",
    element: <Scan/>
  },
  {
    path:"/history",
    element: <History/>
  }
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
