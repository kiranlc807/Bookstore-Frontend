import { Message } from "@mui/icons-material";
import axios from "axios";
import { BASE_URL } from "./helper";

export const GetWishListItems = async()=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.get(`${BASE_URL}/api/v1/wishlist`,config);
    return res.data.data;
}

export const AddToWishlist = async (bookId)=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'application/json',
        },
    };
    console.log(config);
    const res = await axios.post(`${BASE_URL}/api/v1/wishlist/${bookId}`,null,config)
    console.log("Addtowishlist",res.data);
    return res.data.data;
}

export const RemoveWishList = async (bookId)=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'application/json',
        },
    };
    const res = await axios.delete(`${BASE_URL}/api/v1/wishlist/${bookId}`,config)
    console.log("Api WishList",res);
    return res.data;
}