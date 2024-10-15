import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './Component/Home'
import About from './Component/About'
import Login from './User/Login'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path ="/about" element = { <About/>}/>
        <Route path ="/login" element = { <Login/>}/>
    </Routes>
    </BrowserRouter>
</>
  )
}

export default App;
