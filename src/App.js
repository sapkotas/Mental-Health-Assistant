import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Dashboard from './Dashboard/Dashboard';
import About from './Pages/About/About';
import Service from './Pages/Services/Service';
import { Predict } from './Component/Predict/Predict';


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/service" element={<Service/>} />
        <Route path="/check_your_condition" element={<Predict/>} />
        {/* {/* <Route path ="/about" element = { <About/>}/> */}
        {/* <Route path ="/login" element = { <Login/>}/>
        <Route path ="/signup" element = { <Signup/>}/> */}
        <Route path ="/overview/dashboard" element = { <Dashboard/>}/>


    </Routes>
    </BrowserRouter>
</>
  )
}

export default App;
