import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const InHouse = ({ handelCloseInHouse}) => {
  const [formData, setFormData] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [roomNumberQuery, setRoomNumberQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);






  








 

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/formdata');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
    fetchData();
  }, []);

 

  

  const handleDeleteByRoomNumber = async (roomNumber) => {
    try {
      await axios.delete(`http://localhost:5000/api/formdata/${roomNumber}`);
      // Refresh the data after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };



  useEffect(() => {
    const filteredLastName = formData.filter((data) =>
      data.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredLastName);
  }, [searchQuery, formData]);

  useEffect(() => {
    const filteredRoomNumber = formData.filter((data) =>
      String(data.roomNumber).toLowerCase().includes(roomNumberQuery.toLowerCase())
    );
    setFilteredData(filteredRoomNumber);
  }, [roomNumberQuery, formData]);

  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  


  const handleDelete = (roomNumber) => {
    handleDeleteByRoomNumber(roomNumber);
  };

  
  return ( 
    <div className='checkinForm' >

      <div style={{ backgroundColor: 'blue', marginTop: '5px', height: '30px'}}>
        <span
          style={{
            position: 'relative',
            color: 'white',
            left: '5%',
            fontSize: '25px',
            top: '-5px',
          }}
        >
          In House Guest
        </span>
        <button type='button' className='closeButton' onClick={handelCloseInHouse}>
          X
        </button>
      </div>
      <Container style={{ position: 'relative', top: '50px'}}>
        <label>Search Lastname : </label>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginLeft: '3%' }}
        />
      
      </Container>
      <Container style={{ position: 'relative', top: '25px', left: '50%' }}>
        <label>Search Roomnumber: </label>
        <input
          type='text'
          value={roomNumberQuery}
          onChange={(e) => setRoomNumberQuery(e.target.value)}
          style={{ marginLeft: '3%' }}
        />
      
      </Container>
   
     
      <Container
        style={{
          marginTop:"10%",
          overflow: 'scroll', 
          maxHeight: '400px', 
   
        }}
      >
        <Table  style={{position:"relative"}} striped bordered hover>
          <thead >
            <tr >
            <th>#</th>
              <th>Room Number</th>
              <th>Titel</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>phoneNumber</th>
              <th>passNumber</th>
              <th>arrivalDate</th>
              <th>depatureDate</th>
              <th>Anreisen</th>
              <th>Verpflegung</th>
              <th>roomType</th>
              <th>Nächte</th>
              <th>Geburtstag</th>
              <th>Geburtsort</th>
              <th>country</th>
              <th>City</th>
              <th>Street</th>
              <th>PLZ</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
              .map((data, index) => (
         
                <tr key={index}>
                    <td>
          {/* Hier wird die Zelle für den Delete Button hinzugefügt */}
          {roomNumberQuery && (
            <Button variant='danger' onClick={() => handleDelete(data.roomNumber)}>
              Delete
            </Button>
          )}
        </td>

                  
                  <td>{data.roomNumber}</td>
                  <td>{data.titel}</td>
                  <td>{data.lastName}</td>
                  <td>{data.firstName}</td>
                  <td>{data.phoneNumber}</td>
                  <td>{data.passNumber}</td>
                  <td>{new Date(data.arrivalDate).toLocaleDateString()}</td>
                  <td>{new Date(data.depatureDate).toLocaleDateString()}</td>
                  <td>{data.person}</td>
                  <td>{data.pension}</td>
                  <td>{data.roomType}</td>
                  <td>{data.dayofNights}</td>
                  <td>{data.birthDay}</td>
                  <td>{data.placeOfBorn}</td>
                  <td>{data.country}</td>
                  <td>{data.city}</td>
                  <td>{data.street}</td>
                  <td>{data.PLZ}</td>
                  <td>{data.email}</td>
                </tr>
               
              ))}
           
          </tbody>
     
        </Table>
   
     <Container/>
      </Container>
      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={page === index ? 'primary' : 'secondary'}
            onClick={() => handlePageChange(index)}
            style={{ position: 'relative', left: '10%', marginTop: '30px', marginLeft: '1%' }}
          >
            {index + 1}
          </Button>
        ))}
     
      </div>
    </div>
  );
};

export default InHouse;
