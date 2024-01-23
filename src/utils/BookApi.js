import axios from "axios";

export const GetAllBook = async()=>{
    const token = localStorage.getItem('Authorization');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    console.log(config)
    const res = await axios.get("http://localhost:3000/api/v1/books",config)
    return res.data.data;
}

export const GetBookByID = async(bookId)=>{
    const res = await axios.get(`http://localhost:3000/api/v1/books/${bookId}`);
    console.log("Api",res.data.data)
    return res.data.data;
}

