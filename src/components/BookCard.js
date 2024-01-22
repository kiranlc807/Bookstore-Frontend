import React from "react";
import "./BookCard.css"
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const BookCard = ({bookObj}) => {
  let imageUrl = bookObj.bookImage;
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

  return (
    <div
      className="BookCard" // we need add only for css file hover property 
      onClick={() => handleNavigate(bookObj._id)}
    >
      <Card sx={{height:"100%",width:"180px",height:"250px",objectFit:"contain"}}>
        <CardMedia
          component="img"
          height="100"
          image={imageUrl}
          alt={title}
          sx={{ width: "60%", display: "felx", marginLeft: "18%",objectFit:"contain", backgroundColor:"#ECEAEA"}}
        />
        <CardContent sx={{height:"60px" }}>
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
              marginTop:"10px"
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