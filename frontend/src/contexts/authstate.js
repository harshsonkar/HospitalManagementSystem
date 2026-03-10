import React,{useState,useEffect} from 'react';
import AuthContext,{login,signup,resetPassword,updateUserEmail,updateUserPassword,drSignup,getUserDetails,sendOtp,matchOtp} from './authcontext';
import auth from '../config/authentication'
import {axios1} from './authcontext';
const AuthProvider=({ children })=> {
    const [currentUser, setCurrentUser] = useState(null);
    const [counter,setCounter]=useState('-1');
    const [loading, setLoading] = useState(true)
    const [userEmail,setUserEmail]=useState('')
    const [currentCounter,setCurrentCounter]=useState('');
    const logout = () => {
        setCurrentUser(null);
    }
    const value = {
        currentUser,
        userEmail,
        counter,
        setUserEmail,
        currentCounter,
        setCurrentCounter,
        setCounter,
        login,
        signup,
        logout,
        resetPassword,
        drSignup,
        sendOtp,
        matchOtp
    }
    useEffect(()=>{
        if(counter=='1'){
            axios1.get('/patient/get/'+userEmail).then(data=>{
                console.log(data);
                const x={
                    uid:"o43u429i30",
                    displayName:data.data.f_name+" "+data.data.l_name,
                    email:data.data.user_email
                }
                setCurrentUser(x);
            }).catch(data=>{
                console.log(data);
            })  
            setCounter(-1)
        }
        if(counter=='2'){
            axios1.get('/doctor/fetchDoctorByEmail/'+userEmail).then(data=>{
                console.log(data);
                const x={
                    id:data.data[0].id,
                    uid:"o43u429i30",
                    displayName:"Dr."+data.data[0].firstName+" "+data.data[0].lastName,
                    email:data.data[0].email
                }
                setCurrentUser(x);
            }).catch(data=>{
                console.log(data);
            })
            setCounter(-1)
        }
    },[counter]);

    useEffect(() => {
        const unsubscribe = getUserDetails(auth, user => {
            setCurrentUser(user)
            setLoading(false)
        })
    
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {!false && children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;