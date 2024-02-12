import React from "react";
import {
  FormGroup,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  IconButton
} from "@mui/material";
import "../css/AddressCard.css"
import { useState } from "react";
import  Delete  from "@mui/icons-material/DeleteOutlined";


const AddressComponent = ({
  _id,
  address,
  city,
  state,
  type,
  bookId,
  editAddress,
  handleChange,
  defaultAddressId,
  DeleteAddress
}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    _id,
    address,
    city,
    state,
    type,
    bookId,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Save the edited data to state or perform any other actions
    // For example, you can pass the edited data to a function in the parent component
    // and update the state there.
    // saveEditedData(editedData);
  };

  const handleDelete = ()=>{
      console.log(_id,"addressCard");
      DeleteAddress(_id);
  }
  
  return (
    <div className="outerAdressCard-div">
      <div style={{display: "flex", flexDirection: "row", alignItems: "center" ,gap:"30%"}}>
        <div>
        <FormGroup className="formGroup-container">
          <RadioGroup
            row
            name="bookId"
            value={bookId}
            onChange={(e) => handleChange(e, _id)}
          >
            <FormControlLabel
              control={<Radio />}
              label={city}
              value={_id}
              checked={_id === defaultAddressId}
              // disabled={!editAddress}
            />
          </RadioGroup>
        </FormGroup>
        </div>
        <div>
        {!isEditing && (
              <Button onClick={handleEditClick} variant="text" color="primary" sx={{marginLeft:"40%",marginTop:"5px"}}>
                Edit
              </Button>
            )}
        </div>
        <div style={{}}>
        <IconButton onClick={handleDelete}> 
          <Delete />
        </IconButton>
        </div>
        </div>
      <TextField
        placeholder="Address"
        name="address"
        value={editedData.address}
        // onChange={(e) => handleChange(e, _id)}
        onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
        fullWidth
        disabled={!isEditing}
        sx={{ height: "50px" }}
      />
      <div className="address-city-state">
        <TextField
          placeholder="City"
          name="city"
          // onChange={(e) => handleChange(e, _id)}
          value={editedData.city}
          onChange={(e) => setEditedData({ ...editedData, city: e.target.value })}
          fullWidth
          disabled={!isEditing}
        />
        <TextField
          placeholder="State"
          name="state"
          value={editedData.state}
          onChange={(e) => setEditedData({ ...editedData, state: e.target.value })}
          fullWidth
          disabled={!isEditing}
        />
      </div>
      <div>
        <FormGroup style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
          <FormControlLabel
            control={
              <Checkbox
              checked={editedData.type === 'work'}
              onChange={(e) => setEditedData({ ...editedData, type: e.target.value })}
                name="addressType"
                value="work"
              />
            }
            label="Work"
            disabled={!isEditing}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editedData.type === 'home'}
                onChange={(e) => setEditedData({ ...editedData, type: e.target.value })}
                name="addressType"
                value="home"
              />
            }
            label="Home"
            disabled={!isEditing}
          />
        </FormGroup>
      </div>
      {isEditing && (
        <Button onClick={handleSaveClick} variant="contained" color="primary">
          Save
        </Button>
      )}
    </div>
  );
};

export default AddressComponent;




  