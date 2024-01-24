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
import { useSelector } from "react-redux";

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

export default CartItem;