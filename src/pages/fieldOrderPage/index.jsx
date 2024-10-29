import React from 'react';
import { Button, Container } from 'react-bootstrap';
import FieldOrder from '../../components/fieldOrder';

function OrderPage() {
  return (
    <Container fluid>
      <div className='row'> 
        <Button className='col-1 m-3'>Back</Button>
        <h2 className='col text-center'>Danh sách thời gian đặt</h2>
      </div>
      <FieldOrder />
    </Container>
  );
}

export default OrderPage;
