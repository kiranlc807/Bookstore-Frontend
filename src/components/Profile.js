import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "********",
    mobileNumber: "123-456-7890",
    address: "",
    city: "",
    state: "",
    addressType: {
      work: false,
      home: false,
    },
  });

  const [editPersonalDetails, setEditPersonalDetails] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  const handleEditPersonalDetails = () => {
    setEditPersonalDetails(true);
  };

  const handleEditAddress = () => {
    setEditAddress(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? { ...prevData[name], [value]: checked } : value,
    }));
  };

  const handleSavePersonalDetails = () => {
    setEditPersonalDetails(false);
    // You can add logic here to save the personal details
  };

  const handleSaveAddress = () => {
    setEditAddress(false);
    // You can add logic here to save the address details
  };

  const handleAddAddress = () => {};

  return (
    <Container style={{width:"35%",marginLeft:"20%",objectFit:"contain"}}>
      <Box sx={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "45%" }}>
          <h2>Personal Details </h2>
          {!editPersonalDetails && (
            <Button
              variant="text"
              onClick={handleEditPersonalDetails}
              style={{ height: "30px", marginTop: "16px" }}
            >
              Edit
            </Button>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            disabled={!editPersonalDetails}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            disabled={!editPersonalDetails}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            disabled={!editPersonalDetails}
          />
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            fullWidth
            disabled={!editPersonalDetails}
          />
          {editPersonalDetails && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSavePersonalDetails}
            >
              Save
            </Button>
          )}
        </div>
      </Box>

      <Box>
        <div style={{ display: "flex", flexDirection: "row", gap: "55%" }}>
          <h2>Address </h2>
          <Button
            variant="text"
            color="primary"
            onClick={()=>{handleAddAddress();handleEditAddress()}}
            style={{ height: "30px", marginTop: "18px" }}
          >
            Add Address
          </Button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            disabled={!editAddress}
            sx={{ height: "60px" }}
          />
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              disabled={!editAddress}
            />
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              disabled={!editAddress}
            />
          </div>
        </div>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.addressType.work}
                onChange={handleChange}
                name="addressType"
                value="work"
              />
            }
            label="Work"
            disabled={!editAddress}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.addressType.home}
                onChange={handleChange}
                name="addressType"
                value="home"
              />
            }
            label="Home"
            disabled={!editAddress}
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
      </Box>
    </Container>
  );
};

export default UserProfile;