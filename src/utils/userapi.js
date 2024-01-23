import axios from "axios";

export const LoginApi = async(data)=>{
    const res = await axios.post("http://localhost:3000/api/v1/users/login",data)
    console.log("In LogIn",res);
    localStorage.setItem("Authorization",res.data.token);
    return res;
}

export const SignupApi = async(data)=>{
    const res = await axios.post("http://localhost:3000/api/v1/users/signup",data)
    console.log(res.data)
    return res;
}