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

export const addAddress = async(data)=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.post(`http://localhost:3000/api/v1/address`,data,config);
    return res.data.data;
}

export const setDefault = async(addressId)=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.put('http://localhost:3000/api/v1/address/set-default',{addressId:addressId},config);
}

export const deleteAddress = async(addressId)=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.delete(`http://localhost:3000/api/v1/address/${addressId}`,config);
}
