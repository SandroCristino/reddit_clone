import React from 'react'
import Homepage from './Homepage'
import MyProfile from './MyProfile'
import SignIn from './SignIn'
import Register from './Register'
import Reset from './Reset'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function RouteSwitch() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={'/'} exact element={<Homepage />} />
            <Route path={'/my_profile'} element={<MyProfile />} />
            <Route path={'/sign_in'} element={<SignIn />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/reset'} element={<Reset />} />
        </Routes>
    </BrowserRouter>
  )
}

