import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const WishlistItem = ({ title, author, price, image, onRemove }) => {
  return (
    <Card style={{ marginBottom: "16px", display: "flex" }}>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={image}
        style={{ flex: "1", objectFit: "contain" }}
      />
      <CardContent style={{ flex: "2" }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {author}
        </Typography>
        <Typography variant="body1">Price: ${price}</Typography>
      </CardContent>
      <IconButton color="secondary" onClick={onRemove} sx={{marginRight:"10px"}}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    // Replace this array with your actual wishlist items
    // Each item should have properties like "title", "author", "price", and "image"
    {
      title: "Sherlock: Chronicles",
      price: 450,
      author: "Steve Tribe",
      image:
        "http://books.google.com/books/publisher/content?id=FRboAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE721e9hHHSYxAzMYdYLRJGxmJonID57PV2E7v5Mfjd_sw1T4RTm-R0VEWk4iV1Dm3zBx2FZxH9StzNqGsxcdw8Ra6QYt8x0J9lAD5wptSJABBVwjeDXWmiofYsRWgGT2Rqf-WSty&source=gbs_api",
      quantity: 2,
    },
    {
      title: "Sherlock: Chronicles",
      price: 450,
      author: "Steve Tribe",
      image:
        "http://books.google.com/books/publisher/content?id=FRboAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE721e9hHHSYxAzMYdYLRJGxmJonID57PV2E7v5Mfjd_sw1T4RTm-R0VEWk4iV1Dm3zBx2FZxH9StzNqGsxcdw8Ra6QYt8x0J9lAD5wptSJABBVwjeDXWmiofYsRWgGT2Rqf-WSty&source=gbs_api",
      quantity: 2,
    },
  ]);

  const wishlistCount = wishlistItems.length;

  const handleRemoveItem = (index) => {
    const updatedWishlist = [...wishlistItems];
    updatedWishlist.splice(index, 1);
    setWishlistItems(updatedWishlist);
  };

  return (
    <div style={{width:"75%"}}>
      <Typography variant="h6" gutterBottom>
        Wishlist ({wishlistCount} items)
      </Typography>
      <div>
        {wishlistItems.map((item, index) => (
          <WishlistItem
            key={index}
            {...item}
            onRemove={() => handleRemoveItem(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;