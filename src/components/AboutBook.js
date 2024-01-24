import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { GetBookByID } from "../utils/BookApi";
import { useEffect } from "react";
import { AddToCart } from "../utils/CartApi";
import { AddToWishlist } from "../utils/WishListApi";
import { UseDispatch,useDispatch,useSelector } from "react-redux";
import { addItemToCart } from "../utils/store/CartSlice";

const AboutBook = () => {
  const bookId = useParams();
  const [book,setBook] = useState({})
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
  let rating = 4.5;
  let description =book.description;

    const onAddToBag = async ()=>{
      const res = await AddToCart(bookId.id);
      dispatch(
        addItemToCart(book)
      )
      console.log("AboutCart",res);
    }

    const onAddToWishlist = async ()=>{
      const res = await AddToWishlist(bookId.id);
    }

  return (
    <div style={{paddingTop:"10px",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    width:"968px",
    height:"585px"
    }}>
      <div style={{ display: "flex", justifyContent: "center",gap:"20px"}}>
        <div style={{ marginRight: "10px", width: "30%"}}>
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "30px",
              marginTop: "20px",
              objectFit:"contain"
            }}
          >
            <Button
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
            </Button>
          </div>
        </div>
        <div style={{ flex: 1 }}>
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
            {rating}★
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
          <Typography variant="body1" paragraph sx={{ fontSize: "14px" }}>
            <p style={{ fontWeight: "bold" }}>about book</p> {description}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            Customer Reviews
          </Typography>
          {/* Add your customer review components or logic here */}
        </div>
      </div>
    </div>
  );
};

export default AboutBook;