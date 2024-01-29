import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useState } from "react";
import { AddToCart, GetCartItem } from "../utils/CartApi";
import { GetBookByID } from "../utils/BookApi";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartCard";
import { RemoveFromCart } from "../utils/CartApi";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PlaceOrder } from "../utils/OrderApi";
import { useNavigate } from "react-router-dom";
import { setCartItems,addItemToCart,removeFromCart } from "../utils/store/CartSlice";
import { getAddress } from "../utils/AddressApi";
import { setAddress, addNewAddress } from "../utils/store/AddressSlice"
import "../css/Cart.css"


const Cart = () => {
  const cartItems = useSelector((store)=>store.cart.cartItems);
  const address = useSelector((store)=>store.address.addressData)
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const [orderDetailsExpanded, setOrderDetailsExpanded] = useState(false);
  const [formdata,setFormData]=useState({
    fullname:'',
    mobile:'',
    address:'',
    city:'',
    state:'',
    type:'',
  })
  const dispach = useDispatch();

    const route = useNavigate();
  const handlePlaceOrder = async() => {
    const res = await PlaceOrder(formdata);
    if(res.code===201)
    route('/dashboard/orderplacedsuccessfully')
    
  };


  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.discountPrice*item.quantity, 0)
      .toFixed(1);
  };

  const handleAddToCart = async (bookId) => {
    const bookObj = cartItems.find((ele)=>ele._id==bookId);
    console.log("Selector",bookObj);
    dispach(addItemToCart(bookObj)); // Assuming you have a correct action creator
  
    const res = await AddToCart(bookId);
  };
  

  const handleRemoveFromCart = async (bookId) => {

      const bookObj = cartItems.find((ele)=>ele._id==bookId);
      console.log("Selector remove",bookObj);
      dispach(removeFromCart(bookObj));
      // If you have an async operation like an API call to update the cart on the server, you can add it here
      const res = await RemoveFromCart(bookId);
      
    };

    const handleInputChange = (field, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };

    useEffect(()=>{
      const fetchData = async ()=>{
        const addressData = await getAddress();
        console.log("Adress",addressData);
        dispach(setAddress(addressData))
        // setFormData(addressData);
      };
      fetchData();
    },[])
    
    console.log("useSelector redux",address);
  return (
    <div className="main-div">
      <div>
        <Typography variant="h6" gutterBottom>
          My Cart ({cartItems.length} items)
        </Typography>
      </div>
      <div className="cart-container">
      <div className="cart-container-innerBox" >
      <div className="cart-container-cartCard">
        {cartItems.map((item) => (
          <CartItem key={item._id} {...item} bookId={item._id} setCartListAdd={(bookId) => handleAddToCart(bookId)} setCartListReduce={(bookId) => handleRemoveFromCart(bookId)} />
          ))}
        </div>
      </div>
      <div className="cart-container-button">
        {/* <Typography variant="h6">Total: RS.{getTotalPrice()}</Typography> */}
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" ,marginBottom:"10px"}}
          onClick={() => setAccordionExpanded(true)}
        >
          Proceed
        </Button>
      </div>
      </div>

       {/* Accordion for placing order */}
       <div style={{objectFit:"contain",}}>
       <Accordion expanded={accordionExpanded} style={{ marginTop: '10px'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => setAccordionExpanded(!accordionExpanded)}>
          <Typography variant="h6">Customer Details</Typography>
        </AccordionSummary>
        <AccordionDetails style={{marginTop:"-20px"}}>
          <form>
            <div className="form-div-fullname-mobile">
            <TextField label="Full Name"  fullWidth margin="normal" onChange={(e) => handleInputChange('fullname', e.target.value)}/>
            <TextField label="Mobile Number"  fullWidth margin="normal" onChange={(e) => handleInputChange('mobile', e.target.value)}/>
            </div>
            <TextField label="Address"  fullWidth multiline rows={3} margin="normal" onChange={(e) => handleInputChange('address', e.target.value)} />
            <div className="form-div-city-state">
            <TextField label="City"  fullWidth margin="normal" onChange={(e) => handleInputChange('city', e.target.value)}/>
            <TextField label="State"  fullWidth margin="normal" onChange={(e) => handleInputChange('state', e.target.value)}/>
            </div>
            <div className="customerdetail-button">
            <RadioGroup>
              <div style={{display:"flex",flexDirection:"row",gap:"10px",marginLeft:"15px"}}>
              <FormControlLabel value="work"  control={<Radio />} label="Work Address" onChange={(e) => handleInputChange('type', e.target.value)}/>
              <FormControlLabel value="home" control={<Radio />} label="Home Address" onChange={(e) => handleInputChange('type', e.target.value)}/>
              </div>
            </RadioGroup>
            <div style={{ textAlign: "right",marginTop:"2%"}}>
            <Button variant="contained" color="primary" onClick={()=>setOrderDetailsExpanded(true)} style={{ marginTop: '10px' }}>
              Place Order
            </Button>
            </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      </div>

        {/* Accordion for order details */}
        <Accordion expanded={orderDetailsExpanded} style={{ marginTop: '10px',marginBottom:"50px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => setOrderDetailsExpanded(!orderDetailsExpanded)}>
          <Typography variant="h6">Order Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="orderdetails-div">
            {cartItems.map((item) => (
               <Card key={item._id} style={{ marginBottom: '10px', display: 'flex' }}>
               {/* Book Image */}
               <img src={item.bookImage} alt={item.title} style={{ width: '100px', height: '150px', objectFit: 'contain', marginRight: '10px',marginLeft:"10px" }} />
           
               {/* Book Details */}
               <CardContent>
                 {/* Book Title */}
                 <Typography variant="h6">{item.bookName}</Typography>
                 
                 {/* Book Author */}
                 <Typography variant="subtitle2"> {item.author}</Typography>
                 
                 {/* Book Price */}
                 <Typography variant="h6" style={{marginTop:"5px",fontWeight:"bold"}}>RS.{item.discountPrice}</Typography>
               </CardContent>
             </Card>
            ))}
          </div>
          <div style={{ textAlign: "right",marginRight:"20px",marginTop:"2%"}}>
          <Typography variant="h6">Total: RS.{getTotalPrice()}</Typography>
            <Button variant="contained" color="primary" onClick={handlePlaceOrder} style={{ marginTop: '10px' }}>
              Check Out
            </Button>
            </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Cart;