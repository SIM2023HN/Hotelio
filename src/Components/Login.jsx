import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container,Button } from 'react-bootstrap';
import FrontImage from '../Images/frontPage.jpg';
import {ReactComponent as StarSVG} from "../Images/star.svg"
import { ReactComponent as LogoSVG } from "../Images/Logo.svg";
import { ReactComponent as InfoSVG } from "../Images/info.svg";
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';





const Login = ({ handelBoolean}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showInfo,setShowInfo] = useState(true);
  const [validated, setValidated] = useState(false);
  const [showModal,setShowModal] = useState(false);





  const handelLogin = (event) => {
    event.preventDefault();
    if(username === "test" && password === "test"){
      setShowModal(true)
     
    }else{
    setUsername("")
    setPassword("")
    setShowModal(false)  
    }

   
    setValidated(true);

    }


 const handelInfo = (event) => {
event.preventDefault()
  setShowInfo(false)
 }

 const handleAllInfoButtons = (event) => {
  event.preventDefault()
 }




  return (
    
    <div className='loginBackGround' style={{ backgroundImage: `url(${FrontImage})`, width:"100%", height:"100vh" }}>
       <h1 className='h1'> <span style={{color:"rgb(211, 28, 28)"}}>H</span>otelio FULLSERVICE</h1>
       {showModal ? ( <div
      className="modal show"
      style={{ display: 'block', position: 'absolute'  }}
    >
      <Modal.Dialog >
        <Modal.Header style={{backgroundColor:"rgba(11, 152, 20, 0.677)"}} >
          <Modal.Title >Login</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{backgroundColor:"rgba(11, 152, 20, 0.677)"}} >
          <p>Sie haben sich sicher eingeloggt!</p>
        </Modal.Body>

        <Modal.Footer style={{backgroundColor:"rgba(11, 152, 20, 0.677)"}} >
       
          <Button onClick={ handelBoolean} variant="primary">ok</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>): (<></>)}
      {showInfo ? (
 <div
 className="modal show"
 style={{ display:'block',  position: 'absolute' }}
>
 <Modal.Dialog>
   <Modal.Header  closeButton onClick={handelInfo}>
     <Modal.Title>Info</Modal.Title>
   </Modal.Header>
   <Modal.Body>
     <p>Da es sich hier um eine Demo handelt:<br/>
       Benutzername : test <br/>
       Password : test
       </p>
   </Modal.Body>
 
   <Modal.Footer>
    
<p>Bitte beachten Sie beim testen auf die Info - Symbole <OverlayTrigger overlay={<Tooltip>Hier werden alle Infos stehen!</Tooltip>}>
      <span className="d-inline-block">
        <button style={{borderRadius:"50%"}}>
        <InfoSVG onClick={handleAllInfoButtons} />
        </button>
      </span>
    </OverlayTrigger>  <br/>
um die Funktionen und Zusammenhänge zu verstehen.
 </p>
   </Modal.Footer>
 </Modal.Dialog>
</div>
      ): (
        <></>
      )}
      
      <Container>
  
  
        <div>
        <StarSVG className={"StarSVG"} />
        <StarSVG className={"StarSVG"} />
        <StarSVG className={"StarSVG"} />
        <StarSVG className={"StarSVG"} />
        <StarSVG className={"StarSVG"} />
       <LogoSVG className={"LogoSVG"}/>
        </div>
        








        <Form noValidate validated={validated}  className ="loginForm" style={{transform: "translateY(45%)"}} >

          <Form.Group  className="mb-3" style={{marginRight:"25%", marginLeft: "25%" }}>
            <Form.Label style={{marginTop:"20%", color:"white",fontSize:"20px"}}>Benutzername</Form.Label>
            <Form.Control
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Benutzername..."
              required
            />
            <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
         
          </Form.Group>

          <Form.Group  className="mb-3" style={{marginRight:"25%", marginLeft: "25%" }}>
            <Form.Label style={{color:"white", fontSize:"20px"}}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
              <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
     
          </Form.Group>
      
          <Button className="loginButton" onClick={handelLogin} variant="primary" type="button" >
            Login
          </Button>
        </Form>
  
      </Container>
      <Container className="LoginFormFooter">
      <h2 style={{ position: "relative", top:"350px", right:"15%", color:"white", fontSize:"20px"}}>Copyright &copy; 2022, all rights reserved. </h2>
     </Container>
    </div>
  );
};

export default Login;