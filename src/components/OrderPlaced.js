import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import orderPlaced from '../assets/success.jpg'
import { useNavigate } from 'react-router-dom';

const OrderPlacedSuccess = () => {

    const route = useNavigate();
    const handleNavigate = ()=>{
        route('/dashboard/books')
    }
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <img
        src={orderPlaced}  // Replace with the actual path to your image
        alt="Order Placed Successfully"
        style={{ maxWidth: '90%', maxHeight: '50%', marginBottom: '10px' }}
      />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Order Placed Successfully
      </Typography>
      <Typography variant="body1" paragraph>
        Thank you for your order! We've received it and are processing it.
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigate}
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default OrderPlacedSuccess;
