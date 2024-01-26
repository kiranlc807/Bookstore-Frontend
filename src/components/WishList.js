import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetWishListItems,RemoveWishList } from "../utils/WishListApi";
import { GetBookByID } from "../utils/BookApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWishlistItems,addItemToWishlist } from "../utils/store/WishListSlice";

const WishlistItem = ({ bookName, author, discountPrice, bookImage, onRemove,bookId }) => {
  
  const route = useNavigate();
  const handleNavigate = ()=>{
    route(`/dashboard/aboutbook/${bookId}`);
  }

  return (
    <Card style={{ marginBottom: "16px", display: "flex" }}>
      <CardMedia
        component="img"
        alt={bookName}
        height="140"
        image={bookImage}
        style={{ flex: "1", objectFit: "contain" }}
        onClick={handleNavigate}
      />
      <CardContent style={{ flex: "2" }}>
        <Typography variant="h6">{bookName}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {author}
        </Typography>
        <Typography variant="body1">Price: Rs {discountPrice}</Typography>
      </CardContent>
      <IconButton color="secondary" onClick={()=>onRemove(bookId)} sx={{marginRight:"10px"}}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const [bookDetails,setBookDetails] = useState([])
   const wishlistBooks = useSelector((store)=>store.wishlist.wishlistItems)
  const dispach = useDispatch();

 
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const book = await GetWishListItems();
        const bookDetailsPromises = book.map(async (cartItem) => {
          let book = await GetBookByID(cartItem.bookId);
          // Add the quantity from the cart item to the book details
          return { ...book };
        });
  
        // Wait for all book details promises to resolve
        const resolvedBookDetails = await Promise.all(bookDetailsPromises);
  
          // Update state with the book details
          setBookDetails(resolvedBookDetails);
          setWishlist(book);
          dispach(setWishlistItems(resolvedBookDetails));
      }catch(error){
        console.error("Error fetching notes:", error);
      }
    }
    fetchData();
  },[])

  console.log("reduxData",wishlistBooks);
  const wishlistCount = wishlistBooks.length;

  const handleRemoveItem = async(bookId) => {
    const updatedbookDetails = wishlistBooks.find((book)=>book._id===bookId)
    dispach(addItemToWishlist(updatedbookDetails));
    const res = await RemoveWishList(bookId)
  };

  return (
    <div style={{width:"75%"}}>
      <Typography variant="h6" gutterBottom>
        Wishlist ({wishlistCount} items)
      </Typography>
      <div>
        {wishlistBooks.map((item) => (
          <WishlistItem
            key={item._id}
            bookId={item._id}
            {...item}
            onRemove={(e) => handleRemoveItem(e)}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;