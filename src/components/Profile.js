import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AddressCard from "./AddressCard";
import AddressForm from "./CreateAddress";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../utils/store/AddressSlice";
import { addAddress, getAddress } from "../utils/AddressApi";
import "../css/Profile.css"

const UserProfile = () => {
  const [formData, setFormData] = useState({});
  const [inputData, setInputData] = useState({});
  const dispatch = useDispatch();
  const addresses = useSelector((store) => store.address.addressData);

  useEffect(() => {
    const fetchData = async () => {
      const addressData = await getAddress();
      dispatch(setAddress(addressData));
      setFormData(addressData[0]);
    };
    fetchData();
  }, [dispatch]);

  const [editPersonalDetails, setEditPersonalDetails] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [defaultAddressId, setDefaultAddressId] = useState(null);

  const handleEditPersonalDetails = () => {
    setEditPersonalDetails(true);
  };

  const handleChange = (e, addressId) => {
    if (e.target.name === "bookId") {
      setDefaultAddressId(addressId);
      const updatedAddresses = addresses.map((address) => {
        if (address._id === addressId) {
          return { ...address, default: true };
        } else {
          return { ...address, default: false };
        }  
  })
  dispatch(setAddress(updatedAddresses));
  console.log("Updated",updatedAddresses);  
}};

  const handleSavePersonalDetails = () => {
    setEditPersonalDetails(false);
    // Logic to save personal details
  };

  const handleAddAddress = () => {
    setAddAddress(true);
  };

  return (
    <div className="main-container">
    <Container  >
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
            placeholder="FullName"
            name="name"
            value={formData?formData.fullname:""}
            onChange={handleChange}
            fullWidth
            disabled={!editPersonalDetails}
          />
          <TextField
            placeholder="Email"
            type="email"
            name="email"
            value="bookStore@gmail.com"
            onChange={handleChange}
            fullWidth
            disabled={!editPersonalDetails}
          />
          <TextField
            placeholder="Password"
            type="password"
            // name="password"
            value="***********"
            onChange={handleChange}
            fullWidth
            disabled={!editPersonalDetails}
          />
          <TextField
            // label="Mobile Number"
            placeholder="Mobile No"
            name="mobileNumber"
            value={formData?formData.mobile:""}
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
        <div className="address-div">
          <h2>Address </h2>
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              handleAddAddress();
              setAddAddress(true);
            }}
            style={{ height: "30px", marginTop: "18px" }}
          >
            Add Address
          </Button>
        </div>
        <div>
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              {...address}
              handleChange={(e) => handleChange(e, address._id)}
              defaultAddressId={defaultAddressId}
            />
          ))}
        </div>
        {addAddress && <AddressForm handleSave={() => setAddAddress(false)} />}
      </Box>
    </Container>
    </div>
  );
};

export default UserProfile;

// // UserProfile.jsx
// import React, { useEffect, useState } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import AddressCard from "./AddressCard"; // Updated import
// import AddressForm from "./CreateAddress";
// import { useDispatch, useSelector } from "react-redux";
// import { setAddress } from "../utils/store/AddressSlice";
// import { addAddress, getAddress } from "../utils/AddressApi";
// import "../css/Profile.css";

// const UserProfile = () => {
//   const [formData, setFormData] = useState({});
//   const [inputData, setInputData] = useState({});
//   const dispatch = useDispatch();
//   const addresses = useSelector((store) => store.address.addressData);

//   useEffect(() => {
//     const fetchData = async () => {
//       const addressData = await getAddress();
//       dispatch(setAddress(addressData));
//       setFormData(addressData[0]);
//     };
//     fetchData();
//   }, [dispatch]);

//   const [editPersonalDetails, setEditPersonalDetails] = useState(false);
//   const [addAddressMode, setAddAddressMode] = useState(false);
//   const [defaultAddressId, setDefaultAddressId] = useState(null);
//   const [editAddress, setEditAddress] = useState({});

//   const handleEditToggle = (addressId) => {
//     setEditAddress((prevEditAddress) => ({
//       ...prevEditAddress,
//       [addressId]: !prevEditAddress[addressId],
//     }));
//   };

//   const handleChange = (e, addressId) => {
//     if (e.target.name === "bookId") {
//       setDefaultAddressId(addressId);
//       const updatedAddresses = addresses.map((address) => {
//         if (address._id === addressId) {
//           return { ...address, default: true };
//         } else {
//           return { ...address, default: false };
//         }
//       });
//       dispatch(setAddress(updatedAddresses));
//       console.log("Updated", updatedAddresses);
//     } else {
//       const { name, value } = e.target;
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSavePersonalDetails = () => {
//     setEditPersonalDetails(false);
//     // Logic to save personal details
//   };

//   const handleAddAddress = () => {
//     setAddAddressMode(true);
//   };

//   return (
//     <div className="main-container">
//       <Container>
//         <Box sx={{ marginBottom: "40px" }}>
//           <div style={{ display: "flex", flexDirection: "row", gap: "45%" }}>
//             <h2>Personal Details </h2>
//             {!editPersonalDetails && (
//               <Button
//                 variant="text"
//                 onClick={() => setEditPersonalDetails(true)}
//                 style={{ height: "30px", marginTop: "16px" }}
//               >
//                 Edit
//               </Button>
//             )}
//           </div>
//           <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//             <TextField
//               placeholder="FullName"
//               name="name"
//               value={formData ? formData.fullname : ""}
//               onChange={(e) => handleChange(e)}
//               fullWidth
//               disabled={!editPersonalDetails}
//             />
//             {/* ... (rest of the personal details fields) */}
//             {editPersonalDetails && (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSavePersonalDetails}
//               >
//                 Save
//               </Button>
//             )}
//           </div>
//         </Box>

//         <Box>
//           <div style={{ display: "flex", flexDirection: "row", gap: "55%" }}>
//             <h2>Address </h2>
//             <Button
//               variant="text"
//               color="primary"
//               onClick={handleAddAddress}
//               style={{ height: "30px", marginTop: "18px" }}
//             >
//               Add Address
//             </Button>
//           </div>
//           <div>
//             {addresses.map((address) => (
//               <AddressCard
//                 key={address._id}
//                 {...address}
//                 handleChange={(e) => handleChange(e, address._id)}
//                 defaultAddressId={defaultAddressId}
//                 editAddress={editAddress}
//               />
//             ))}
//           </div>
//           {addAddressMode && (
//             <AddressForm handleSave={() => setAddAddressMode(false)} />
//           )}
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default UserProfile;

