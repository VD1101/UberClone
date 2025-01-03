import React from 'react'
import { Route, Routes } from 'react-router-dom'

import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import UserProtectWraper from './pages/UserProtectWraper'
import UserLogout from './pages/UserLogout'
import UserHome from './pages/UserHome'
import CaptainProtectWraper from './pages/CaptainProtectWraper'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import StartRiding from './pages/StartRiding'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/riding' element={<UserProtectWraper>
          <Riding />
        </UserProtectWraper>} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />

        <Route path='/captain-riding' element={
          <CaptainProtectWraper>
            <StartRiding />
          </CaptainProtectWraper>} />
        {/* /}/> */}
        <Route path='/user-home' element={
          <UserProtectWraper>
            <UserHome />
          </UserProtectWraper>
        } />
        <Route path='/user/logout' element={
          <UserProtectWraper>
            <UserLogout />
          </UserProtectWraper>
        } />
        <Route path='/captain-home' element={
          <CaptainProtectWraper>
            <CaptainHome />
          </CaptainProtectWraper>
        } />
        <Route path='/captain/logout' element={
          <CaptainProtectWraper>
            <CaptainLogout />
          </CaptainProtectWraper>
        } />


      </Routes>
    </div>
  )
}

export default App