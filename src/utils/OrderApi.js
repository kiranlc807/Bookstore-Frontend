import axios from "axios";
import { BASE_URL } from "./helper";

export const PlaceOrder = async(data)=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.post(`${BASE_URL}/api/v1/orders`,data,config)
    return res.data;
}

export const GetMyOrders = async()=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.get(`${BASE_URL}/api/v1/orders`,config);
    return res.data.data;
}