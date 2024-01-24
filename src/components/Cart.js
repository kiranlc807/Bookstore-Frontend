import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useState } from "react";
import { AddToCart, GetCartItem } from "../utils/CartApi";
import { GetBookByID } from "../utils/BookApi";
import { useSelector } from "react-redux";
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


const Cart = () => {
  const [bookCart,setCartList] = useState([]);
  const [bookDetails,setBookDetails] = useState([]);
  const cartItems=useSelector((store)=>store.cart.cartItems)
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

  useEffect(() => {
  const fetchData = async () => {
    try {
      let cartBooks = await GetCartItem();
      console.log("Cart",cartBooks);
      // Extract bookIds and quantities from cartItems
      const bookIdQuantityMap = cartBooks.reduce((map, cartItem) => {
        map[cartItem.bookId] = cartItem.quantity;
        return map;
      }, {});

      // Fetch details for each bookId
      const bookDetailsPromises = cartBooks.map(async (cartItem) => {
        let book = await GetBookByID(cartItem.bookId);
        // Add the quantity from the cart item to the book details
        return { ...book, quantity: bookIdQuantityMap[book._id] };
      });

      // Wait for all book details promises to resolve
      const resolvedBookDetails = await Promise.all(bookDetailsPromises);

        // Update state with the book details
        setBookDetails(resolvedBookDetails);

        // Update state with the cart items
        setCartList(cartBooks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const handlePlaceOrder = async() => {
    // Add your logic for placing an order here
    // This could include handling the input field values
    const res = await PlaceOrder(formdata);
  };

  const getTotalItems = () => {
    return bookCart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return bookCart
      .reduce((total, item) => total + item.total, 0)
      .toFixed(2);
  };
  const handleAddToCart = async (bookId) => {
    const updatedCart = bookCart.map((item) => {
      if (item.bookId === bookId) {
        item.quantity += 1;
  
        // Assuming bookDetails is an array of book objects
        const matchingBook = bookDetails.find((book) => book._id === bookId);
  
        if (matchingBook) {
          item.total = matchingBook.discountPrice * item.quantity;
          console.log(matchingBook.discountPrice);
        }
      }
      return item;
    });
  
    const updatedBookDetails = bookDetails.map((book) => {
      if (book._id === bookId) {
        book.quantity += 1;
      }
      return book;
    });
  
    // Assuming bookCart and bookDetails are state variables, update the state with the new arrays
    setCartList(updatedCart);
    setBookDetails(updatedBookDetails);
    const res = await AddToCart(bookId);
  };

  const handleRemoveFromCart = async (bookId) => {
    const updatedCart = bookCart
      .map((item) => {
        if (item.bookId === bookId) {
          if (item.quantity > 0) {
            item.quantity -= 1;
  
            // Assuming bookDetails is an array of book objects
            const matchingBook = bookDetails.find((book) => book._id === bookId);
  
            if (matchingBook) {
              item.total = matchingBook.discountPrice * item.quantity;
            }
          } else {
            // Remove the item from the cart if the quantity is 1 or less
            return null;
          }
        }
        return item;
      })
      .filter(Boolean); // Remove null entries from the array
  
      const updatedBookDetails = bookDetails.map((book) => {
        if (book._id === bookId && book.quantity > 0) {
          book.quantity -= 1;
        }
        return book;
      });
    
      // Assuming bookCart and bookDetails are state variables, update the state with the new arrays
      setCartList(updatedCart);
      setBookDetails(updatedBookDetails);
    
      // If you have an async operation like an API call to update the cart on the server, you can add it here
      const res = await RemoveFromCart(bookId);
    };

    const handleInputChange = (field, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };
  
  console.log(formdata);

  return (
    <div style={{width:"75%",}}>
      <div>
        <Typography variant="h6" gutterBottom>
          My Cart ({getTotalItems()} items)
        </Typography>
      </div>
      <div style={{border:"1px solid #E4E3E3" ,borderRadius:"5px"}}>
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "95%" }}>
        {bookDetails.map((item) => (
          <CartItem key={item._id} {...item} bookId={item._id} setCartListAdd={(bookId) => handleAddToCart(bookId)} setCartListReduce={(bookId) => handleRemoveFromCart(bookId)} />
          ))}
        </div>
      </div>
      <div style={{ marginTop: "1", textAlign: "right",marginRight:"5%" }}>
        <Typography variant="h6">Total: RS.{getTotalPrice()}</Typography>
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
       <Accordion expanded={accordionExpanded} style={{ marginTop: '10px'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => setAccordionExpanded(!accordionExpanded)}>
          <Typography variant="h6">Customer Details</Typography>
        </AccordionSummary>
        <AccordionDetails style={{marginTop:"-20px"}}>
          <form>
            <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
            <TextField label="Full Name" fullWidth margin="normal" onChange={(e) => handleInputChange('fullname', e.target.value)}/>
            <TextField label="Mobile Number" fullWidth margin="normal" onChange={(e) => handleInputChange('mobile', e.target.value)}/>
            </div>
            <TextField label="Address" fullWidth multiline rows={3} margin="normal" onChange={(e) => handleInputChange('address', e.target.value)} />
            <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
            <TextField label="City" fullWidth margin="normal" onChange={(e) => handleInputChange('city', e.target.value)}/>
            <TextField label="State" fullWidth margin="normal" onChange={(e) => handleInputChange('state', e.target.value)}/>
            </div>
            <div style={{display:"flex",flexDirection:"row",gap:"56%"}}>
            <RadioGroup>
              <div style={{display:"flex",flexDirection:"row",gap:"10px",marginLeft:"15px"}}>
              <FormControlLabel value="work" control={<Radio />} label="Work Address" onChange={(e) => handleInputChange('type', e.target.value)}/>
              <FormControlLabel value="home" control={<Radio />} label="Home Address" onChange={(e) => handleInputChange('type', e.target.value)}/>
              </div>
            </RadioGroup>
            <div style={{ textAlign: "right",marginRight:"20px",marginTop:"2%"}}>
            <Button variant="contained" color="primary" onClick={()=>setOrderDetailsExpanded(true)} style={{ marginTop: '10px' }}>
              Place Order
            </Button>
            </div>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>

        {/* Accordion for order details */}
        <Accordion expanded={orderDetailsExpanded} style={{ marginTop: '10px',marginBottom:"50px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => setOrderDetailsExpanded(!orderDetailsExpanded)}>
          <Typography variant="h6">Order Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {bookDetails.map((item) => (
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