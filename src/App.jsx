import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Notfound from './Components/Notfound/Notfound'




export default function App() {

  


  let routes = createBrowserRouter([
    {
      path:'',element: <Layout></Layout>,children:[
        {path:'login',element:<Login></Login>},
        {index:true ,element:<Register></Register>},
        {path:'*',element:<Notfound></Notfound>}
      ]
    }
  ])



  return <>
    <RouterProvider router={routes}></RouterProvider>
  </>
}
