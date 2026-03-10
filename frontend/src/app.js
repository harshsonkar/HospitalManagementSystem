import React,{useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup,EnterOtp } from './components' ;
import {Home} from './pages';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import CssBaseline from "@mui/material/CssBaseline";
import { AdminRoute, DoctorRoute, PrivateRoute } from './routes';
import ForgotPassword from './components/forgetpassword/forgetpasword';
import ConfirmNewPassword from './components/confirmnewpassword/confirmnewpassword'
import {NotFound} from './pages';
import {Patient,PatientAppointments,PatientAppointmentHistory,PatientReview } from './pages'
import {ContactUs,Doctor,DoctorAppointments,DoctorAdmitted,DoctorReview} from './pages';
import AuthProvider from './contexts/authstate';
const App=()=>{
    const lightTheme = createTheme({
        palette: {
            primary: {
                main: "#0000cc",    
                light: '#3c44b126'
            },
            secondary: {
                main: "#000000",
                // main: "#120b0b",
                light: '#f8324526'
            },
            background: {
                default: "#f4f5fd"
            },
        },
        overrides:{
            MuiAppBar:{
                root:{
                    transform:'translateZ(0)'
                }
            }
        },
        props:{
            MuiIconButton:{
                disableRipple:true
            }
        }
    
      });
      const darkTheme= createTheme({
        palette:{
            primary:{
                main:"#7393B3",
                light: '#7393B3'
            },
            secondary:{
                main:"#A9A9A9",
                light:"#A9A9A9"
            },
            background: {
                default: "#19212e"
              },
            //   text: {
            //     primary: "#ffffff"
            //   }
        },
        overrides:{
            MuiAppBar:{
                root:{
                    transform:'translateZ(0)'
                }
            }
        },
        props:{
            MuiIconButton:{
                disableRipple:true
            }
        }
    
      });
      const [light, setLight] = useState(true);
    return (
        <ThemeProvider theme={light ? lightTheme : darkTheme}>
        <CssBaseline/>
            {/* <Home/> */}
          {/* <Button onClick={() => setLight(!light)}>Toggle Theme</Button> */}
          <div className="App">
                            <Routes>
                                <Route index element={<Home />} />
                                <Route path='login' element={<Home/>} />
                                <Route path='forgot-password' element={<ForgotPassword/>} />
                                <Route path='signup' element={<Signup/>} />
                                <Route path="enterotp" element={<EnterOtp/>}/>
                                <Route path="confirmnewpassword" element={<ConfirmNewPassword/>}/>
                                {/*<AdminRoute path='/admin' component={Admin} />
                                <DoctorRoute path='/doctor' component={Doctor}/>*/}
                                <Route path='patient' exact element={
                                                                <PrivateRoute >
                                                                </PrivateRoute>
                                                            }>
                                    <Route index element={<Patient/>} />
                                    <Route path="dashboard" element={<Patient/>} />
                                    <Route path="appointments" element={<PatientAppointments/>} />
                                    <Route path="appointment-history" element={<PatientAppointmentHistory/>} />
                                    <Route path="review" element={<PatientReview/>}/>
                                    <Route path="contact-us" element={<ContactUs/>}/>
                                </Route>
                                <Route path='doctor' exact element={<DoctorRoute></DoctorRoute>}>
                                    <Route index element={<Doctor/>}/>
                                    <Route path="dashboard" element={<Doctor/>}/>
                                    <Route path="admitted" element={<DoctorAdmitted/>}/>
                                    <Route path="appointments" element={<DoctorAppointments/>}/>
                                    <Route path="reviews" element={<DoctorReview/>}/>
                                </Route>
                                <Route path='*' exact element={<NotFound/>}>
                                </Route>
                            </Routes>
          </div>
        </ThemeProvider>
      );
}

export default App;
