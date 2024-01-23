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
import { GetCartItem } from "../utils/CartApi";
import { GetBookByID } from "../utils/BookApi";

const CartItem = ({ _id, bookName, author, discountPrice, quantity, bookImage }) => {

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
          <IconButton size="small" color="primary">
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //       try {
  //           let cartBooks = await GetCartItem();
  //           bookId =  await cartBooks.map((cartItem)=>cartItem.bookId);
  //            bookId.map(async(id)=>{
  //               let book = await GetBookByID(id);
  //               console.log("Inside",book);
  //               setBookDetails({book});
  //            })
  //           setCartList(cartBooks);
  //       } catch (error) {
  //           console.error("Error fetching notes:", error);
  //       }
  //       };
  //       fetchData();
  //   }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             let cartBooks = await GetCartItem();

//             // Extract bookIds from cartItems
//             const bookIds = cartBooks.map(cartItem => cartItem.bookId);

//             // Fetch details for each bookId
//             const bookDetailsPromises = bookIds.map(async id => {
//                 let book = await GetBookByID(id);
//                 return { id, book }; // Assuming GetBookByID returns the book details
//             });

//             // Wait for all book details promises to resolve
//             const resolvedBookDetails = await Promise.all(bookDetailsPromises);

//             // Update state with the book details
//             setBookDetails(resolvedBookDetails);

//             // Update state with the cart items
//             setCartList(cartBooks);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     fetchData();
// }, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      let cartBooks = await GetCartItem();

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

  console.log("Book",bookDetails);

  const getTotalItems = () => {
    return bookCart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return bookCart
      .reduce((total, item) => total + item.total, 0)
      .toFixed(2);
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
          <CartItem key={item._id} {...item} />
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