import React, { useContext, useEffect } from 'react'
import auth from '../config/authentication';
import setCounter from './authstate';
import axios from 'axios';
const axiosConfig={
    baseURL:"http://localhost:8080/api",
}
const axios1=axios.create(axiosConfig)
const AuthContext = React.createContext()
const useAuth=()=> {
    return useContext(AuthContext);
}
// firstName: '',
// lastName: '',
// email: '',
// password: '',
// dob:varCurrentTime, 
// confirmPassword: '',
// phone:'',
// city:'',
// state:'',
// country:'',
// pin:'',
// showPassword: false,
const signup = async(values) => {
    console.log(values);
    const dateStr = values.dob.toJSON().slice(0,10).replace(/-/g,'-');
    console.log(values.dob.getDate());
    console.log(dateStr);
    const response=await axios1.post('/register',{
        user_email:values.email,
        f_name:values.firstName,
        l_name:values.lastName,
        sex:values.sex,
        pincode:values.pin,
        house_number:values.house_number,
        city:values.city,
        state:values.state,
        country:values.country,
        dob:dateStr,
        password:values.password,
        phone_no:values.phone

    })
    return response;
    // return createUserWithEmailAndPassword(auth, email, password)
    // .then((res) => {
    //     return updateProfile(res.user, {
    //         displayName: `${firstName} ${lastName}`,
    //     })
    // })
    
}

const drSignup = async(email, password, drName ) => {
    // return createUserWithEmailAndPassword(auth, email, password)
    // .then((res) => {
    //     return updateProfile(res.user, {
    //         displayName: `${drName}`,
    //     })
    // })
    
}


const login =async (email, password) => {
    const response=await axios1.post('/login',{
        email:email,
        password:password
    });
    // setCounter(response);
    return response.data;

}

const resetPassword = async (email,password) => {
    console.log(email,password)
    const response=await axios1.post('/user/updatepass',{
        email:email,
        password:password
    })
}


const getUserDetails=(email)=>{
    // get_user_detail_api
}

const sendOtp=async(userEmail)=>{

}

const matchOtp=(userEmail,enter_otp)=>{
    return true;
}
export default AuthContext;
export {useAuth,signup,drSignup,login,resetPassword,getUserDetails,sendOtp,matchOtp,axios1};