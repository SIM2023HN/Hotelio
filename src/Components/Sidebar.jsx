import React from 'react';
import { ReactComponent as PadlockSVG } from "../Images/padlock.svg";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { ReactComponent as InfoSVG } from "../Images/info.svg";
import { ReactComponent as DoorSVG } from "../Images/door.svg";
import { ReactComponent as UserSVG } from "../Images/user.svg";
import {Container} from "react-bootstrap"


export default function Sidebar({ openCheckinForm, openInHouseList, openMasterKey, openRoomplaner }) {
  return (
    <div style={{ marginTop: "10%" }}>
      <button onClick={openCheckinForm} className='sideBarButtons'>
        <span className='sideBarButtonSpan'>Check In</span>
        <DoorSVG className="sideBarSVGs" style={{ position: "relative", left: "10px", top: "-5px" }} />
      </button>
      <button onClick={openInHouseList} className='sideBarButtons'>
        <span className='sideBarButtonSpan'>In House</span>
        <UserSVG className="sideBarSVGs" style={{ width: "70px", position: "relative", top: "-5px" }} />
      </button>
      <button className='sideBarButtons' onClick={openRoomplaner} >Roomplaner</button>



      <button className='sideBarButtons'></button>
      


      <OverlayTrigger 
        overlay={
          <Tooltip >
            Wenn auf das Schloss gedrückt wird, öffnet sich das Masterkeyfenster. Es ist beabsichtigt, dass nur Admins diesen Zugang haben.
            In dem Masterkeyfenster können Preisanpassungen für alle Preise festgelegt werden.<br />
            Der Benutzername : master<br />
            Das Password : master
          </Tooltip>
        }
      >
      <Container>
          <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={openMasterKey}>
            <PadlockSVG style={{position:"relative", top:"-80px",width: "50px", height:"70px", right:"270px"}} />
            
          </button>
          <p style={{position:"relative", top:"-120px", right:"170px"}}>Masterkey</p>
          <button className='infoContainer' style={{ border: 'none', backgroundColor: 'transparent',position:"relative",top:"-190px", right:"110px"}}>
            <InfoSVG  />
            
          </button>
        
          </Container>
          </OverlayTrigger>
    </div>
  );
}
