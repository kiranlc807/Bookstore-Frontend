// Assume 'addresses' is an array of address objects

// Define the component
// import { TextField,FormGroup,FormControlLabel,Checkbox, } from "@mui/material";
// const AddressComponent = ({ address, city, state, type, editAddress, handleChange }) => {
//     return (
//       <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//         <TextField
//           placeholder="Address"
//           name="address"
//           value={address}
//           onChange={handleChange}
//           fullWidth
//           disabled={!editAddress}
//           sx={{ height: "50px" }}
//         />
//         <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
//           <TextField
//             placeholder="City"
//             name="city"
//             value={city}
//             onChange={handleChange}
//             fullWidth
//             disabled={!editAddress}
//           />
//           <TextField
//             placeholder="State"
//             name="state"
//             value={state}
//             onChange={handleChange}
//             fullWidth
//             disabled={!editAddress}
//           />
//         </div>
//         <div >
//         <FormGroup style={{display:"flex",flexDirection:"row"}}>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={type === 'work'}
//                 onChange={handleChange}
//                 name="addressType"
//                 value="work"
//               />
//             }
//             label="Work"
//             disabled={!editAddress}
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={type === 'home'}
//                 onChange={handleChange}
//                 name="addressType"
//                 value="home"
//               />
//             }
//             label="Home"
//             disabled={!editAddress}
//           />
//         </FormGroup>
//         </div>
//       </div>
//     );
//   };
  
// export default AddressComponent;

// import React from 'react';
// import { TextField, FormGroup, FormControlLabel, Checkbox, Radio, RadioGroup } from "@mui/material";

// const AddressComponent = ({ _id, address, city, state, type, bookId, editAddress, handleChange }) => {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "40px", position: "relative" }}>
//         <div>
//         <FormGroup style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "10px", position: "absolute", top: 0, left: 0 }}>
//           <RadioGroup
//             row
//             name="bookId"
//             value={bookId}
//             onChange={(e) => handleChange(_id)}
//           >
//             <FormControlLabel
//               control={<Radio />}
//               label={city}
//               value={_id}
//             //   disabled={!editAddress}
//             />
//           </RadioGroup>
//         </FormGroup>
//         </div>
//       <TextField
//         placeholder="Address"
//         name="address"
//         value={address}
//         onChange={handleChange}
//         fullWidth
//         disabled={!editAddress}
//         sx={{ height: "50px" }}
//       />
//       <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
//         <TextField
//           placeholder="City"
//           name="city"
//           value={city}
//           onChange={handleChange}
//           fullWidth
//           disabled={!editAddress}
//         />
//         <TextField
//           placeholder="State"
//           name="state"
//           value={state}
//           onChange={handleChange}
//           fullWidth
//           disabled={!editAddress}
//         />
//       </div>
//       <div>
//         <FormGroup style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={type === 'work'}
//                 onChange={handleChange}
//                 name="addressType"
//                 value="work"
//               />
//             }
//             label="Work"
//             disabled={!editAddress}
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={type === 'home'}
//                 onChange={handleChange}
//                 name="addressType"
//                 value="home"
//               />
//             }
//             label="Home"
//             disabled={!editAddress}
//           />
//         </FormGroup>
//       </div>
//     </div>
//   );
// };

// export default AddressComponent;

import React from "react";
import {
  FormGroup,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Checkbox,
} from "@mui/material";

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
}) => {
  console.log("ID",_id);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px", position: "relative" }}>
      <div>
        <FormGroup style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "10px", position: "absolute", top: 0, left: 0 }}>
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
      <TextField
        placeholder="Address"
        name="address"
        value={address}
        onChange={(e) => handleChange(e, _id)}
        fullWidth
        disabled={!editAddress}
        sx={{ height: "50px" }}
      />
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <TextField
          placeholder="City"
          name="city"
          value={city}
          onChange={(e) => handleChange(e, _id)}
          fullWidth
          disabled={!editAddress}
        />
        <TextField
          placeholder="State"
          name="state"
          value={state}
          onChange={(e) => handleChange(e, _id)}
          fullWidth
          disabled={!editAddress}
        />
      </div>
      <div>
        <FormGroup style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={type === 'work'}
                onChange={(e) => handleChange(e, _id)}
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
                checked={type === 'home'}
                onChange={(e) => handleChange(e, _id)}
                name="addressType"
                value="home"
              />
            }
            label="Home"
            disabled={!editAddress}
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default AddressComponent;


  