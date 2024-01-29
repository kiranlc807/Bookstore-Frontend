import axios from "axios";

export const GetAllBook = async()=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    console.log(config);
    const res = await axios.get("http://localhost:3000/api/v1/books",config)
    return res.data.data;
}

export const GetBookByID = async(bookId)=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.get(`http://localhost:3000/api/v1/books/${bookId}`,config);
    return res.data.data;
}

export const fetchBookByText = async(data)=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.post("http://localhost:3000/api/v1/books/search",data,config)
    console.log("result",res.data.data);
    return res.data.data;
}
