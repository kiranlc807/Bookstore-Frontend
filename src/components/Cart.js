import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect } from "react";
import { useState } from "react";
import { AddToCart, GetCartItem } from "../utils/CartApi";
import { GetBookByID } from "../utils/BookApi";
import { useNavigate } from "react-router-dom";

const CartItem = ({ _id, bookName, author, discountPrice, quantity, bookImage,bookId,setCartList}) => {

  const route = useNavigate();
  const handleNavigate = ()=>{
    route(`/dashboard/aboutbook/${bookId}`);
  }

  return (
    <Card
      key={_id}
      style={{ marginBottom: "16px", display: "flex", height: "180px", width:"100%" }}
    >
      <div style={{ flex: "1", marginRight: "16px" }}>
        <CardMedia
          component="img"
          alt={bookName}
          height="100%"
          image={bookImage}
          sx={{ objectFit: "contain" }}
          onClick={handleNavigate}
        />
      </div>
      <CardContent style={{ flex: "2" }}>
        <Typography variant="h6">{bookName}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {author}
        </Typography>
        <Typography variant="body1">Price: RS.{discountPrice}</Typography>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "8px" }}
        >
          <Typography variant="body1" style={{ marginRight: "8px" }}>
            Quantity:
          </Typography>
          <IconButton size="small" color="primary">
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" style={{ margin: "0 8px" }}>
            {quantity}
          </Typography>
          <IconButton size="small" color="primary" onClick={()=>setCartList(bookId)}>
            <AddIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

const Cart = () => {
  const [bookCart,setCartList] = useState([]);
  const [bookDetails,setBookDetails] = useState([]);

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


  const getTotalItems = () => {
    return bookCart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return bookCart
      .reduce((total, item) => total + item.total, 0)
      .toFixed(2);
  };

  // const handleAddToCart = async(bookId)=>{
  //   const updatedCart = bookCart.map((item) => {
  //     if (item.bookId === bookId) {
  //       item.quantity += 1;
  //       let price = bookDetails.reduce((price,book)=>{
  //         if(bookId===book._id)
  //         {
  //             price=book.discountPrice;
              
  //         }
  //         return price;
  //         }
  //         );
  //         console.log(price);
  //       item.total=price*item.quantity;
  //     }
  //     return item;
  //   });
  //   const updateBook = bookDetails.map((book)=>{
  //     console.log(book._id===bookId);
  //     if(book._id===bookId){
  //       book.quantity+=1;
  //     }
  //     return book;
  //   })
  //   setCartList(updatedCart);
  //   setBookDetails(updateBook);
  //   const res = await AddToCart(bookId);
  // }
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
  

  return (
    <div style={{width:"75%"}}>
      <div>
        <Typography variant="h6" gutterBottom>
          My Cart ({getTotalItems()} items)
        </Typography>
      </div>
      <div>
        {bookDetails.map((item) => (
          <CartItem key={item._id} {...item} bookId={item._id} setCartList={(bookId)=>handleAddToCart(bookId)}/>
        ))}
      </div>
      <div style={{ marginTop: "16px", textAlign: "right" }}>
        <Typography variant="h6">Total: RS.{getTotalPrice()}</Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Cart;