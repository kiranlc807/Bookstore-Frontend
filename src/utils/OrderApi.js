import axios from "axios";

export const PlaceOrder = async(data)=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.post("http://localhost:3000/api/v1/orders",data,config)
    return res.data.data;
}