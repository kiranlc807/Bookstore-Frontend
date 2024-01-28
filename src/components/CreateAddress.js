import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import {addNewAddress} from '../utils/store/AddressSlice';
import {addAddress} from '../utils/AddressApi';

const AddressForm = ({handleSave}) => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    type:'',
  });
  const dispatch = useDispatch()
  const [editAddress, setEditAddress] = useState(true);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? value : '') : value,
    }));
  };

  const handleSaveAddress = async() => {
    handleSave();
    dispatch(addNewAddress(formData))
    const res = await addAddress(formData);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
    <h5>Enter Details</h5>
      <TextField
        placeholder="Address"
        name="address"
        onChange={handleChange}
        fullWidth
        sx={{ height: "60px" }}
      />
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <TextField
          placeholder="City"
          name="city"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          placeholder="State"
          name="state"
          onChange={handleChange}
          fullWidth
        />
      </div>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChange}
              name="addressType"
              value="work"
            />
          }
          label="Work"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChange}
              name="addressType"
              value="home"
            />
          }
          label="Home"
        />
      </FormGroup>
      {editAddress && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAddress}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default AddressForm;
