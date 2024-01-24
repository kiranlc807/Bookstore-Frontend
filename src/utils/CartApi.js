import axios from "axios";

export const GetCartItem = async()=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.get("http://localhost:3000/api/v1/cart",config)
    return res.data.data;
}

export const AddToCart = async(bookId)=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'application/json',
        },
    };
    console.log(bookId);
    const res = await axios.post(`http://localhost:3000/api/v1/cart/${bookId}`,null,config);
    console.log("Added cart data",res.data.data);
    return res.data.data;
}