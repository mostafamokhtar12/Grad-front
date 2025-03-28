import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function Layout() {
    return <>
        {/* <Navbar> </Navbar>
        <div className='container my-5 py-5'>
            <Outlet></Outlet>
        </div>
        <Footer></Footer> */}
        <Outlet></Outlet>
    </>
}
