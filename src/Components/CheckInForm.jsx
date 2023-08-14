import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import{Container} from "react-bootstrap";
import  { useState, useEffect} from 'react';
import axios from "axios"
import {Modal}from "react-bootstrap"
import Roomplaner from './Roomplaner';
import { ReactComponent as RoomPlanerSVG } from "../Images/roomPlaner.svg"


const CheckInForm = ({handelClose}) => {

const [arrivalDate,setArrivalDate] = useState(new Date())
const [depatureDate,setDepatureDate] = useState("")
const [pension,setPension] = useState("")
const [roomType,setRoomType] = useState("")
const [dayofNights,setDayOfNights] = useState(0)
const [price,setPrice] = useState(0)
const [person,setPerson] = useState(1)
const [email,setEmail] = useState("")
const [firstName,setFirstName] = useState("")
const [titel,setTitel] = useState("")
const [lastName,setLastName] = useState("")
const [birthDay,setBirstDay] = useState("")
const [placeOfBorn, setPlaceOfBorn] = useState("")
const [phoneNumber, setPhoneNumber] = useState("")
const [passNumber,setPassNumber] = useState("")
const [country,setCountry] = useState("")
const [city,setCity] = useState("")
const [street,setStreet] = useState("")
const [PLZ,setPLZ] = useState("")
const [roomNumber,setRoomNumber] = useState(1)
const [validated, setValidated] = useState(false);
const [arrivalAndDepatureDateModal, setArrivalAndDepatureDateModal] = useState(false)
const [countryOption,setCountryOption] = useState([])
const apiURL = "https://restcountries.com/v3.1/all"
const [filteredCountrys, setFilteredCountrys] = useState(countryOption);
const [countryIsVisibel,setCountryIsVisibel] = useState(false)
const [modalToday,setModalToday] = useState(false)
const [roomPlaner,setRoomPlaner] = useState(false)


const handleCellClick = (event) => {
  const cellValue = event.target.getAttribute('value');
  setRoomNumber(cellValue)
  setRoomPlaner(false)
};

const handleRoomPlaner = () => {
  setRoomPlaner(!roomPlaner)
}

const handleCountryInputChange = (event) => {
  const input = event.target.value;
  setCountry(input);
  
  
  const filtered = countryOption.filter(
    (country) =>
      country.toLowerCase().startsWith(input.toLowerCase())
  );

  const limitedFiltered = filtered.slice(0, 20);

  setFilteredCountrys(limitedFiltered);
  setCountry(input);
};



const handleCountryClick = (selectedCountry) => {
  setCountry(selectedCountry);
  setFilteredCountrys([]);
};

const handleIsVisibel = () => {
  setCountryIsVisibel(true)
}


useEffect(() => {
  async function fetchCountry() {
    try {
      const response = await axios.get(apiURL);
      const data = response.data.map((country) => country.name.common);
      setCountryOption(data);
    } catch (error) {
      console.error('Fehler beim Aufrufen der Länder', error);
    }
  }
  fetchCountry();
}, []);






const handleOnSubmit = async (e) => {


  e.preventDefault();



  try {
    const response = await axios.post('http://localhost:5000/api/formdata', {
      titel,
      firstName,
      lastName,
      birthDay,
      placeOfBorn,
      phoneNumber,
      email,
      passNumber,
      country,
      city,
      street,
      PLZ,
      arrivalDate,
      depatureDate,
      person,
      pension,
      roomType,
      roomNumber,
      dayofNights,
      price
      
      
 


      
    });


 
    
    if (response.data) {
    
      alert("Data saved successfully");
      handleValue()
     
    
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
 
  setValidated(true);
}


const handelTitel = (event) => {
setTitel(event.target.value)
}


const handelLastName = (event) => {
  setLastName(event.target.value)
  }
  

  const handelBirthDay = (event) => {
    setBirstDay(event.target.value)
    }
    

    const handelPlaceOfBorn = (event) => {
      setPlaceOfBorn(event.target.value)
      }
      

      const handelPhoneNumber = (event) => {
        const valueOf = event.target.value
        if(valueOf  < 0){
          return;
        } else{
          setPhoneNumber(valueOf )
        }
       
        }
        

        const handelPassNumber = (event) => {
          setPassNumber(event.target.value)
          }
        


       
            
            const handelCity = (event) => {
              setCity(event.target.value)
              }
            
              const handelStreet= (event) => {
                setStreet(event.target.value)
                }
                
                const handelPLZ = (event) => {
                  const valueOf = event.target.value
                  if(valueOf < 0){
                    return;
                  } else{
                    setPLZ(event.target.value)
                  }
                 
                
                  }
  
       
     

                  const handelRoomNumber = (event) => {
                    const valueOf = event.target.value
                    if( valueOf < 1){
                      return;
                    } else{
                      setRoomNumber(valueOf )
                    }
                   
                  
                    }

                 
                    const handleValue = () => {
                      setTitel("")
                      setEmail("");
                      setFirstName("")
                      setLastName("")
                      setBirstDay("")
                      setPlaceOfBorn("")
                      setPhoneNumber("")
                      setPassNumber("")
                      setCountry("")
                      setCity("")
                      setStreet("")
                      setPLZ("")
                      setArrivalDate("");
                      setDepatureDate("")
                      setPerson(1)
                      setRoomNumber(1)
                      setDayOfNights(0)
                      setPrice(0)
                   
                    }




              
                    



const handleTodayModal = () => {
  setModalToday(false)
  setDayOfNights(0)
}





const handleModal = () => {
setArrivalAndDepatureDateModal(false)

}        
                 




const handelFirstName = (event) => {
setFirstName(event.target.value)
}

const handelEmail = (event) => {
  setEmail(event.target.value)
  }
  

const handelArrivalDate = (event) => {
const arrival = new Date(event.target.value)
const today = new Date()
setArrivalDate(new Date(arrival))
if(arrival < today){
  setModalToday(true)

}


}
const handelDepatureDate = (event) => {
  const depature = event.target.value
  setDepatureDate(new Date(depature))
  }
  

 const handelPerson = (event) => {
  const valueOf = event.target.value
  if(valueOf < 1 ){
return;
  } else{
    setPerson(valueOf)   
  }

 }


 useEffect(() => {
  if (arrivalDate && depatureDate) {
   
    const durationInMilliseconds = depatureDate - arrivalDate;
    const durationInDays = durationInMilliseconds / 86400000; 
    setDayOfNights(durationInDays);

    if (arrivalDate > depatureDate || depatureDate < arrivalDate  ) {
      setDayOfNights(0)
      
      setArrivalAndDepatureDateModal(true);
    } else {
      setArrivalAndDepatureDateModal(false);
    }
  

  }
}, [arrivalDate, depatureDate]);

  

  useEffect(() => {

  setPrice(roomType * dayofNights  + pension * person)
  }, [roomType, dayofNights, pension, person]);

 const handelPension = (event) => {
   setPension(event.target.value)
 }



 const handelRoomType = (event) => {
  setRoomType(event.target.value)
 }






  return (
   
    
    <div className='checkinForm'>
     
    <div style={{backgroundColor:"blue", marginTop:"5px",height:"30px"}}>
    <span style={{position:"relative",color:"white",left:"5%", fontSize:"25px", top:"-5px"}}>Checkin</span>
    <button type="button" className='closeButton' onClick={handelClose} >X</button>
    </div>
 
    
<Container>
  {roomPlaner ? (<Roomplaner handleRoomValue={handleCellClick } />): (<></>)}

    {arrivalAndDepatureDateModal ?  (<div
      className="modal show"
      style={{ display: 'block', position: 'absolute'  }}
    >
      <Modal.Dialog >
        <Modal.Header style={{backgroundColor:"red"}} >
          <Modal.Title >Anreise Abreise</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{backgroundColor:"red"}}  >
          <p>Bitte achte auf das Anreise und Abreise Datum !</p>
        </Modal.Body>

        <Modal.Footer style={{backgroundColor:"red"}}  >
       
          <Button variant="primary" onClick={handleModal} >ok</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>):(<></>)}
    
 
     {modalToday ? (<div
      className="modal show"
      style={{ display: 'block', position: 'absolute'  }}
    >
      <Modal.Dialog >
        <Modal.Header style={{backgroundColor:"red"}} >
          <Modal.Title >Anreise Abreise</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{backgroundColor:"red"}}  >
          <p>Die Anreise darf nicht in der Vergangenheit liegen oder für den selben Tag gebucht werden ! </p>
        </Modal.Body>

        <Modal.Footer style={{backgroundColor:"red"}}  >
       
          <Button onClick={handleTodayModal } variant="primary"  >ok</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>) : <></>}
   
     <Form  noValidate={validated} onSubmit={ handleOnSubmit}> 
     
     <Container className='headerCheckinForm'>
      <Container style={{marginBottom:"5%"}}>
      <Row  className="mb-3">
      <Form.Group style={{marginTop:"5%"}}  as={Col} >
          <Form.Label>Titel</Form.Label>
          <Form.Select required onChange={handelTitel}>
          <option>...</option>
          <option>Herr</option>
            <option>Frau</option>
            <option>Dr.</option>
            <option>Professor</option>
            <option>Other</option>
          </Form.Select>
          
          
        </Form.Group>

        <Form.Group style={{marginTop:"5%"}} as={Col} >
          <Form.Label>Vorname</Form.Label>
          <Form.Control required onChange={handelFirstName} value={firstName}    />
         
        </Form.Group>

        <Form.Group style={{marginTop:"5%"}} as={Col} >
          <Form.Label>Nachname</Form.Label>
          <Form.Control   required onChange={handelLastName}  value={lastName} />
        </Form.Group>
        <Form.Group style={{marginTop:"5%"}} as={Col} >
          <Form.Label>Geburtstag</Form.Label>
          <Form.Control    required onChange={handelBirthDay} type="date" value={birthDay}   />
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group  as={Col} >
          <Form.Label>Geburtsort</Form.Label>
          <Form.Control    required onChange={handelPlaceOfBorn} value={placeOfBorn}  />
        </Form.Group>

    <Form.Group as={Col} >
    <Form.Label>telefonnummer</Form.Label>
    <Form.Control type="number"   required onChange={handelPhoneNumber} value={phoneNumber} />
  </Form.Group>

  <Form.Group as={Col} >
    <Form.Label>E-Mail</Form.Label>
    <Form.Control type="email"required  value={email}  onChange={handelEmail} />
  </Form.Group>

  <Form.Group as={Col} >
    <Form.Label>Passnummer</Form.Label>
    <Form.Control minLength={"10"}   required onChange={handelPassNumber} value={passNumber}   />
  </Form.Group>

</Row>
      <Row >
      <Form.Group    as={Col} style={{ position: 'relative' }}>
                <Form.Label>Land</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Land eingeben'
                  onChange={handleCountryInputChange}
                  autoComplete='off'
                  value={country}
                  onFocus={handleIsVisibel}
                
                
                />
                {countryIsVisibel ? (   <div
            
                  className='country-list'
               
                >
                  {filteredCountrys.map((country, index) => (
                    <div
                      key={index}
                      className='country-option'
                      onClick={() => handleCountryClick(country)}
                    >
                      {country}
                    </div>
                  ))}
                </div>):<></>}
          
              
              </Form.Group>
      
      
        <Form.Group as={Col}>
  <Form.Label>Stadt</Form.Label>
  <Form.Control  required onChange={handelCity} value={city}/>
</Form.Group>
     

        <Form.Group as={Col} >
          <Form.Label>Straße</Form.Label>
          <Form.Control    required  onChange={handelStreet} value={street} />
        </Form.Group>
        <Form.Group as={Col} >
          <Form.Label>PLZ</Form.Label>
          <Form.Control type="number"   required onChange={handelPLZ} value={PLZ}  />
        </Form.Group>
        </Row>
        </Container>
        </Container>
        <Container className='footerCheckinForm'>





        <Row className="mb-3">
  <Form.Group style={{marginTop:"3%"}} as={Col} xs={4}>
    <Form.Label>Arrival Date</Form.Label>
    <Form.Control     required onChange={handelArrivalDate}   type="date"  />
  </Form.Group>






  <Form.Group style={{marginTop:"3%"}} as={Col} xs={4}>
    <Form.Label>Depature Date</Form.Label>
    <Form.Control    required  onChange={handelDepatureDate}  type="date"  />
  </Form.Group>

  <Form.Group style={{marginTop:"3%"}} as={Col} xs={4}>
    <Form.Label>Anreise Anzahl</Form.Label>
    <Form.Control    required  onChange={handelPerson} type="number"  value={person}/>
  </Form.Group>
</Row>

<Row>
<Form.Group as={Col} xs={4} >
          <Form.Label>Verpflegung</Form.Label>
          <Form.Select required  onChange={handelPension} >
            <option value={0}>...</option>
            <option value={25}>Halbpension</option>
            <option value={45}>Vollpension</option>
            <option value={120}>All inClusive</option>
          
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Room Type</Form.Label>
          <Form.Select onChange={handelRoomType} >
          <option value={0}>...</option>
            <option value={68}>Einzelzimmer</option>
            <option value={85}>Doppelzimmer</option>
            <option value={180}>VIP</option>
          </Form.Select>
        </Form.Group>
     
       
        <Form.Group as={Col} xs={4}>
    <Form.Label>RoomNumber</Form.Label>
    <Form.Control   required readOnly  onChange={handelRoomNumber}  type="number" value={roomNumber}/>
    
    <RoomPlanerSVG className="roomPlanerSVG" onClick={handleRoomPlaner} />
  </Form.Group>
 
</Row>

<Row>
<Form.Group as={Col} xs={4}>
    <Form.Label>Day of Nights</Form.Label>
    <Form.Control value={dayofNights}  readOnly  />
  </Form.Group>

  <Form.Group as={Col} xs={4}>
    <Form.Label>Price</Form.Label>
    <Form.Control   value={price} readOnly/>
  </Form.Group>
  <Form.Group style={{marginBottom:"5%"}}  as={Col} >
          <Form.Label>Payment</Form.Label>
          <Form.Select >
            <option >Bar</option>
          
          </Form.Select>
        </Form.Group>
</Row>
</Container>

<Button variant="primary" type="submit" 
  

className='checkinButton'>
       Check In
      </Button>
    </Form>
    </Container>
    </div>
   
  );
}

export default CheckInForm;

