import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


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
