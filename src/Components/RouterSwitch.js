import React from 'react'
import Homepage from './Homepage'
import MyProfile from './MyProfile'
import SignIn from './SignIn'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function RouteSwitch() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={'/'} exact element={<Homepage />} />
            <Route path={'/my_profile'} element={<MyProfile />} />
            <Route path={'/sign_in'} element={<SignIn />} />
        </Routes>
    </BrowserRouter>
  )
}

