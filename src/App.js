import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'

import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import Home from './Component/Static/Home'
import About from './Component/Static/About'
import Dashboard from './Dashboard/Dashboard'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path ="/about" element = { <About/>}/>
        <Route path ="/login" element = { <Login/>}/>
        <Route path ="/signup" element = { <Signup/>}/>
        <Route path ="/dashboard" element = { <Dashboard/>}/>
        


    </Routes>
    </BrowserRouter>
</>
  )
}

export default App;
