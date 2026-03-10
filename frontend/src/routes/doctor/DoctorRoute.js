import React from 'react'
import {  Navigate } from 'react-router-dom';
import {useAuth} from '../../contexts/authcontext' 
import {Outlet} from 'react-router-dom';
// function PrivateRoute({component: Component, ...rest }) {
function DoctorRoute({children}){
    const { currentUser } = useAuth()
    // return (
    //     <Route
    //         {...rest}
    //         render={props => {
    //             return currentUser 
    //             ? <Component {...props}  /> 
    //             : <Navigate to="/login" />
    //         }}
    //     >

    //     </Route>
    // )
    console.log(currentUser);
    return(
        <>        
            { currentUser?<Outlet/>:<Navigate to="/login"/>}
        </>
    )
}

export default DoctorRoute;