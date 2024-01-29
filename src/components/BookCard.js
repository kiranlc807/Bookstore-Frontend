import React from "react";
import "../css/BookCard.css"
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import "../css/Login.css"
import { useNavigate } from "react-router-dom";

const BookCard = ({bookObj}) => {
  let imageUrl = bookObj.bookImage || "https://picsum.photos/200/300";
  let author = bookObj.author;
  let rating = "4.5";
  let discountedPrice = bookObj.discountPrice;
  let price = bookObj.price;
  let title = bookObj.bookName;
  // const [,author,discountedPrice,price,imageUrl]=bookObj;
  const route = useNavigate();
  const handleNavigate=(bookId)=>{
        route(`/dashboard/aboutbook/${bookId}`);   
  }
  console.log("BookObj",bookObj);
  return (
    <div
      className="BookCard" // we need add only for css file hover property 
      onClick={() => handleNavigate(bookObj._id)}
    >
      <Card className="card">
      {bookObj.quantity <= 0 && (
      <div className="out-of-stock-message">Out of Stock</div>
    )}
        <CardMedia
          component="img"
          image={imageUrl}
          alt={title}
          sx={{ width: "100%", display: "felx",objectFit:"contain", backgroundColor:"#ECEAEA",height:"50%"}}
        />
        <CardContent sx={{height:"50px" }}>
          <Typography variant="h7" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            by {author}
          </Typography>
          <p
            style={{
              backgroundColor: "green",
              color: "white",
              maxWidth: "fit-content",
              paddingRight: "2px",
              paddingLeft: "2px",
              borderRadius: "3px",
              marginTop:"5px"
            }}
          >
            {rating}★
          </p>
        </CardContent>
          
        <CardContent>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="h6"
              color="inherit"
              sx={{ fontWeight: "bold" }}
            >
              ₹{discountedPrice}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                textDecoration: "line-through",
                color: "#888",
                margin: "5px",
              }}
            >
              ₹{price}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookCard;