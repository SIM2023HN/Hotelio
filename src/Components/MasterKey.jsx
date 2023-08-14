import React from 'react';
import Form from 'react-bootstrap/Form';
import { Container,Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';


const MasterKey = ({closeMasterKey}) => {




  return (
    <div>
        <Container>

<Form className="MasterKeyForm" style={{position:"absolute"}}>
<CloseButton onClick={closeMasterKey} />
<h1 className='h1'>MasterKey</h1>
<Form.Group style={{marginLeft:"25%", marginRight:"25%"}} className="mb-3" >
<Form.Label  style={{marginTop:"30%"}} >Email address</Form.Label>
<Form.Control type="email"  />
<Form.Text className="text-muted">
  We'll never share your email with anyone else.
</Form.Text>
</Form.Group>

<Form.Group style={{marginLeft:"25%", marginRight:"25%"}}   >
<Form.Label>Password</Form.Label>
<Form.Control type="password" placeholder="Password" />
</Form.Group>

<Button variant="primary" type="submit">
Submit
</Button>
</Form>
</Container>

    </div>
  );
}

export default MasterKey;
