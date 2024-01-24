import axios from "axios";

export const getAddress =async ()=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.get(`http://localhost:3000/api/v1/address`,config);
    return res.data.data;
};

export const addAddress = async()=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.post(`http://localhost:3000/api/v1/address`,config);
    return res.data.data;
}
