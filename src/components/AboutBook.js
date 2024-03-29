import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Divider,
  Box,
  Rating,
  TextField
} from "@mui/material";
import { useParams } from "react-router-dom";
import { GetBookByID } from "../utils/BookApi";
import { useEffect } from "react";
import { AddToCart } from "../utils/CartApi";
import { AddToWishlist,RemoveWishList } from "../utils/WishListApi";
import { useDispatch,useSelector } from "react-redux";
import { addItemToCart ,removeFromCart} from "../utils/store/CartSlice";
import { addItemToWishlist, } from "../utils/store/WishListSlice";
import {RemoveFromCart} from "../utils/CartApi";
import "../css/AboutBook.css"

const AboutBook = () => {
  const bookId = useParams();
  const [book,setBook] = useState({});
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const cartItems = useSelector((store)=>store.cart.cartItems);
  const cartBook = cartItems.find((books)=>books.bookName==book.bookName)
  const [quantite, setQuantity] = useState(0);
  const wishlistBooks = useSelector((store)=>store.wishlist.wishlistItems)
   
  useEffect(() => {
    if (cartBook) {
      setQuantity(cartBook.quantity);
      console.log(quantite);
    }
  }, [cartBook]);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            let notesResponse = await GetBookByID(bookId.id);
            setBook(notesResponse);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
        };
        fetchData();
    }, [bookId.id]);
  let imageUrl = book.bookImage
  let title = book.bookName
  let author = book.author
  let discountPrice = book.discountPrice;
  let originalPrice = book.price;
  let ratings = 4.5;
  let description =book.description;

    const onAddToBag = async ()=>{
      const res = await AddToCart(bookId.id);
      setQuantity((prevQuantity) => prevQuantity + 1);
      dispatch(
        addItemToCart(book)
      )
    }

    const onAddToWishlist = async ()=>{
      const books=  wishlistBooks.find((list)=>list._id===book._id)
      dispatch(addItemToWishlist(book));
      if(!books){
      const res = await AddToWishlist(bookId.id);
      }else{
        const res = await RemoveWishList(bookId.id);
      }
    }

    const handleIncreaseQuantity = () => {
      onAddToBag();
      setQuantity(cartBook[0].quantity);
    };
  
    const handleDecreaseQuantity = async() => {
      if (quantite > 0) {
        dispatch(removeFromCart(book));
        setQuantity((prevQuantity) => prevQuantity - 1);
        const res = await RemoveFromCart(bookId.id);
      }
      
    };

    const handleRatingChange = (event, value) => {
      setRating(value);
    };
  
    const handleReviewChange = (event) => {
      setReview(event.target.value);
    };

    const handleSubmitReview = () => {
      // Add logic to submit the review to your backend or store it locally
      // You can use 'rating' and 'review' state values
      console.log("Rating:", rating);
      console.log("Review:", review);
      // You can also add further actions like sending the review to the server, etc.
    };

    

  return (
    <div className="outer-div">
      <div className="innerleft-div">
        <div className="innerleft-div-image">
          <CardMedia
            component="img"
            height="400"
            image={imageUrl}
            alt={title}
            sx={{
              objectFit: "contain",
              height: "300px",
              border: "1px solid #ccc",
              borderRadius: "2px",
            }}
          />
          <div className="innerleft-button">
            {/* <Button
              variant="contained"
              color="primary"
              onClick={onAddToBag}
              style={{ marginTop: "10px", backgroundColor: "#900000" }}
            >
              Add to Bag
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={onAddToWishlist}
              style={{ marginTop: "10px", backgroundColor: "#333232" }}
            >
              Wishlist
            </Button> */}
          <div className="innerleft-button">
          {quantite > 0 ? (
            <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleDecreaseQuantity}
                style={{
                  marginTop: "10px",
                  border: "1px solid #900000",color:"#900000",
                  borderRadius:"50%"
                }}
              >
                -
              </Button>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                style={{ marginTop: "15px"}}
              >
                {quantite}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleIncreaseQuantity}
                style={{ marginTop: "10px", border: "1px solid #900000",color:"#900000",borderRadius:"50%" }}
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={onAddToBag}
              style={{ marginTop: "10px", backgroundColor: "#900000" }}
            >
              Add to Bag
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={onAddToWishlist}
            style={{ marginTop: "10px", backgroundColor: "#333232" }}
          >
            Wishlist
          </Button>
        </div>
          </div>
        </div>
        <div className="innerright-div">
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            by {author}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary">
            Rating: {rating} ★
          </Typography> */}
          <p
            style={{
              backgroundColor: "green",
              color: "white",
              maxWidth: "fit-content",
              paddingRight: "2px",
              paddingLeft: "2px",
              borderRadius: "3px",
            }}
          >
            {ratings}★
          </p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h6">RS {discountPrice}</Typography>
            <Typography
              variant="body3"
              color="textSecondary"
              sx={{
                textDecoration: "line-through",
                color: "#888",
                marginTop: "8px",
                marginLeft: "10px",
              }}
            >
              RS.{originalPrice}
            </Typography>
          </div>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1" paragraph sx={{ fontSize: "13px" }}>
            <p style={{ fontWeight: "bold" }}>about book</p> {description}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Customer Reviews
          </Typography>
          {/* Add your customer review components or logic here */}
          <Box style={{marginTop:"-10px"}}>
            <Rating
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              precision={0.5}
            />
          </Box>
          <TextField
            multiline
            rows={2}
            fullWidth
            label="Write your review"
            variant="outlined"
            value={review}
            onChange={handleReviewChange}
            style={{ marginTop: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitReview}
            style={{ marginTop: "10px" ,float:"right"}}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutBook;