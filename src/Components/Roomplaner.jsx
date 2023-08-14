import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const Roomplaner = ({handleRoomValue}) => {
  const [roomType, setRoomType] = useState('all');
  const [roomData, setRoomData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/formdata');
      setRoomData(response.data);
      const filteredRoomNumbers = response.data.map((data) => data.roomNumber);
      setFiltered(filteredRoomNumbers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filtered, roomType]);





  const renderCells = () => {
    const cells = [];

    for (let i = 1; i <= 50; i++) {
      const cellType = determineCellType(i);

      const isRoomMatch = filtered.includes(i.toString());

      if (roomType === 'all' || cellType === roomType) {
        cells.push(
          <td
            key={i}
            className={`tableCell ${cellType} ${isRoomMatch ? 'highlighted' : ''}`}
            value={i} 
            onClick={handleRoomValue} 
          >
            {i} {cellType}
            <input type="hidden" value={i} />
          </td>
        );
      }
    }

    return cells;
  };

  const determineCellType = (number) => {
    if (number <= 25) {
      return 'EZ';
    } else if (number <= 45) {
      return 'DP';
    } else {
      return 'VIP';
    }
  };



  useEffect(() => {
    // Update cell highlight based on filtered room numbers
    const tableCells = document.getElementsByClassName('tableCell');
    for (const cell of tableCells) {
      const cellValue = cell.getAttribute('value');
      const isRoomMatch = filtered.includes(cellValue);
      cell.classList.toggle('highlighted', isRoomMatch);
    }
  }, [filtered]);













  return (
    <div className='absolute'>
   
      <Table className='table' responsive>
        <tbody>
          <tr   className='tableCells'>{renderCells()}</tr>
          
        </tbody>
        <div>
        <button className='roomPlanerButtons' onClick={() => setRoomType('EZ')}>Einzelzimmer</button>
        <button className='roomPlanerButtons'  onClick={() => setRoomType('DP')}>Doppelzimmer</button>
        <button className='roomPlanerButtons'  onClick={() => setRoomType('VIP')}>VIP - Rooms</button>
        <button  className='roomPlanerButtons' onClick={() => setRoomType('all')}>Show all rooms</button>
      </div>
      </Table>
      {filtered.map((roomNumber, index) => {
        const room = roomData.find((data) => data.roomNumber === roomNumber);

        if (room) {
          return (
            <div key={`room-${index}`}>
           
         
            </div>
          );
        }

        return null; 
      })}
   
    </div>
    
  );
};

export default Roomplaner;
