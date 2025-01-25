import React from 'react'
import DoctorSidebar from '../DoctorSidebar/DoctorSidebar'
import Body from '../../UserPortal/Dashboard/Body'
import Downbar from '../../UserPortal/Dashboard/Downbar'
import Footer from '../../UserPortal/Component/Footer/Footer'

const DoctorDahboard = () => {
  return (
<>
    <div className="dashboard-container">
      <DoctorSidebar/>
      <div className="main-content">
        <Body />
        <Downbar />
      </div>
    </div>
      <Footer/>
    </>
  )
}

export default DoctorDahboard