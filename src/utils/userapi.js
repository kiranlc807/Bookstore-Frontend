import axios from "axios";

export const LoginApi = async(data)=>{
    const res = await axios.post("",data)
    console.log(res.data.token);
    localStorage.setItem("Authorization",res.data.token);
    return res;
}

export const SignupApi = async(data)=>{
    const res = await axios.post("",data)
    return res;
}