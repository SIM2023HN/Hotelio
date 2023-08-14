import React, { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Sidebar from "./Components/Sidebar"
import CheckInForm from './Components/CheckInForm';
import InHouse from "./Components/inHouse"
import MasterKey from "./Components/MasterKey"






export default function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [checkinForm, setCheckinForm] = useState(false);
  const [inHouseList, setInHouseList] = useState(false);
  const [showMasterKey,setShowMasterKey] = useState(false);

 



  const handelLogin = () => {
    setIsLogin(true);
  };

  const handelCheckinForm = () => {
    setCheckinForm(false);
  }

  const handelOpenCheckinForm = () => {
    setCheckinForm(true);
    setInHouseList(false); // Close the InHouse list
  }

  const handelInHouseList = () => {
    setCheckinForm(false); // Close the CheckInForm if it's open
    setInHouseList(true);
  }

  const handleShowMasterKey = () => {
    setShowMasterKey(true)
  }
  
const handleCloseMasterKey = () => {
  setShowMasterKey(false)
}

const closeInHouseList = () => {
  setInHouseList(false)
} 





  return (
    <div className="App">
     {showMasterKey? (   <MasterKey closeMasterKey={handleCloseMasterKey }  />) : (<></>) }
     

      {!isLogin ? (
        <Login handelBoolean={handelLogin} />
      ) : (
        <Sidebar openMasterKey={handleShowMasterKey}  openCheckinForm={handelOpenCheckinForm} openInHouseList={handelInHouseList} />
      )}
    
        {checkinForm ? (
          <CheckInForm handelClose={handelCheckinForm} />
        ) : (<></>)}
   
 
        {inHouseList ? (
          
          <InHouse handelCloseInHouse={closeInHouseList } openInHouseList={handelInHouseList} />
        ) : (
          <></>
        )}
            
      

     
   
    
  
    </div>
  );
}
