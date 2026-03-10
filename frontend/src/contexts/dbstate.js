import {useEffect,useState,useContext} from 'react';
import Dbcontext from './dbcontext';
import {useAuth} from './authcontext';
import {axios1} from './authcontext';
import contactUs from '../assets/contactus.jpg';
const useDB=()=>{
    return useContext(Dbcontext);
}
const changeString=(str)=>{
    let x='';
    for(let i=0;i<str.length;i++){
        if(str[i]!=='-'){
            x+=str[i];
        }
        else{
            break;
        }
    }
    return x; 
}
const DBprovider =({children})=>{

    const [allUsers, setAllUsers] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [currentDate,setCurrentDate]=useState(null);
    const { currentUser } = useAuth();
    const [userAppointments, setUserAppointments] = useState([]);
    const [userPrescriptions, setUserPrescriptions] = useState([]);
    const [doctorAppointments, setDoctorAppointments] = useState([]);
    const [doctorPrescriptions, setDoctorPrescriptions] = useState([]);
    const [allAppointments, setAllAppointments] = useState([]);
    const [allPrescriptions, setAllPrescriptions] = useState([]);
    const [userReviews,setUserReviews]=useState([]);
    const [allReviews,setAllReviews]=useState([]);
    const [doctorReviews,setDoctorReviews]=useState([]);
    const [filterDoctor,setFilterDoctor]=useState([]);
    const [doctorDetails,setDoctorDetails]=useState(null);
    const [availableSlot,setAvailableSlot]=useState((['1','2','3','4']));
    const [currentDoctor,setCurrentDoctor]=useState('');
    const [supportDetail,setSupportDetail]=useState([]);
    const [patientAdmitted,setPatientAdmitted]=useState([]);
    const [averageReview,setAverageReview]=useState('3');
    const fetchAverageReview=async(doctor_email)=>{
        // setAvergaReview(number);
    }
    const fetchAllUser=async()=>{

    }

    const fetchAllDoctors=async()=>{
        const response=await axios1.get('/doctor/fetchDoctor')
        // console.log(response);
        const x=response.data.map(data=>{
            return{
                name:"Dr. "+data.firstName+" "+data.lastName,
                email:data.email,
                phone_no:data.phoneNo,
                specialization:data.specialization,
                room:'2',
                description:"have MD and DM in "+data.specialization
            }
        })
        console.log(x);
        setAllDoctors(x);       
    }

    const fetchDoctorDetails=async(uid)=>{

    }
    const fetchUserDetails=async(uid)=>{

    }

    const fetchAllAppointments=async()=>{

    }

    const fetchAllPrescriptions=async()=>{

    }
    
    const createUser=(name,user_name,uid,phone_number,email)=>{

    }

    const createNewDoctor=(name,email,phone_number)=>{

    }

    const createNewAppointment=(doctor_email,user_email,Date,slot)=>{ /// yyyy/mm/dd
        const dateStr = Date.toJSON().slice(0,10).replace(/-/g,'-');
        axios1.post('/appointment/addAppointment',{
            date:dateStr,
            doctor_email:doctor_email,
            pat_email:user_email,
            time_slot:slot

        })
        console.log(user_email,doctor_email,dateStr,slot)
    } 
    const cancelAppointment=async(doctor_email,user_email,date,time_slot)=>{
        console.log(doctor_email,user_email,date,time_slot)
        const response=await axios1.delete('/appointment/deleteAppointment/'+doctor_email+'/'+user_email+'/'+date+'/'+time_slot);
        // setUserAppointments([{
        //     name:'utkarsh rai',
        //     appointmentDate:'03/11/2022',
        //     appointmentTime:'12:00',
        //     slotNumber:'24',
        //     status:'inactive'
            
        // }])
    }

    const deleteDoctor=(doctor_email)=>{

    }
    const fetchUserAppointment=async(user_email)=>{
        const response=await axios1.get('/appointment/getApptByUserEmail/'+user_email);
        console.log(response);
        const t=await axios1.get('/doctor/getemail/'+response.data[0].doctor_id);
        console.log(t.data)
        const realAppointments=[];
        for(let x=0;x<response.data.length;x++){
            console.log('asdad');
            const y=await axios1.get('/doctor/getname/'+response.data[x].doctor_id);
            const yy=await axios1.get('/doctor/getemail/'+response.data[x].doctor_id);
            realAppointments.push({
                name:y.data,
                email:yy.data,
                appointmentDate:response.data[x].date,
                appointmentTime:changeString(response.data[0].time_slot),
                slotNumber:response.data[0].time_slot,
                prescription:response.data[0].prescription,
                status:'active'
            })
            console.log(realAppointments)
        }
        setUserAppointments(realAppointments)

    }

    const getPatientById=async(user_id)=>{

    }

    const fetchDoctorAppointment=async(doctor_email)=>{
        const response=await axios1.get('/appointment/getApptByDoctorEmail/'+doctor_email)
        console.log('doctor')
        console.log(response)
        const realAppointment=[];
        for(let x=0;x<response.data.length;x++){
            console.log('asdad');
            // const y=await axios1.get('/patient/getname/'+response.data[x].doctor_id);
            const yy=await axios1.get('/patient/getemail/'+response.data[x].pat_id);
            console.log(yy)
            realAppointment.push({
                patientName:yy.data,
                appointmentDate:response.data[x].date,
                appointmentTime:changeString(response.data[x].time_slot),
                time_slot:response.data[x].time_slot,
                status:'active'
            })
        }
        console.log(realAppointment);
        setDoctorAppointments(realAppointment)
    }

    const deleteAppointment=(user_email,doctor_email,slot)=>{

    }
    const fetchUserReviews=async (user_email)=>{
        const response=await axios1.get('/review/getPatientReviews/'+user_email);
        console.log(response)
        const realReviews=[];
        for(let x=0;x<response.data.length;x++){
            console.log('asdad');
            const y=await axios1.get('/doctor/getname/'+response.data[x].doctor_id);
            const yy=await axios1.get('/doctor/getemail/'+response.data[x].doctor_id);
            console.log(y,yy)
            realReviews.push({
                name:y.data,
                email:yy.data,
                review:response.data[x].review
            })
        }
        setUserReviews(realReviews)
    }
    const getAverageReview=async(doctor_email)=>{
        console.log(doctor_email);
        console.log('average review');
        const response=await axios1.get('review/getDoctorAvgReview/'+doctor_email);
        console.log(response.data);
        const x=parseInt(response.data, 10)
        console.log(x);
        setAverageReview(x);

    }
    const fetchDoctorReviews=async(doctor_email)=>{
        const response=await axios1.get('review/getDoctorReviews/'+doctor_email);
        console.log('sdsdsder');
        console.log(response);
        const realReviews=[];
        for(let x=0;x<response.data.length;x++){
            console.log('asdad');
            const y=await axios1.get('/patient/getname/'+response.data[x].pat_id);
            const yy=await axios1.get('/patient/getemail/'+response.data[x].pat_id);
            console.log(y,yy)
            realReviews.push({
                patientName:y.data,
                email:yy.data,
                review_number:response.data[x].review
            })
        }
        setDoctorReviews(realReviews)
    }
    const fetchDoctorAdmitted=async(id)=>{
        const response=await axios1.get('/admit/get_adm_by_doctor/'+id);
        console.log('werwer')
        console.log(response)
        const realAdmitted=[];
        for(let x=0;x<response.data.length;x++){
            console.log('asdad');
            realAdmitted.push({
                patientName:response.data[x].admitName,
                email:response.data[x].user_email,
                addmitDate:response.data[x].admitDate,
                dischargeDate:'',
                roomID:'2',
                status:response.data[x].status
            })
        }
        setPatientAdmitted(realAdmitted);
    }
    const fetchReviews=()=>{

    }

    const addReviews=async(user_email,doctor_email,review)=>{
        console.log(user_email,doctor_email,review);
        const response=await axios1.post('/review',{
            doctor_email:doctor_email,
            pat_email:user_email,
            review:review
        })
    }
    const fetchAvailableSlot=async(email,date)=>{
        console.log(email,date)
        const dateStr = date.toJSON().slice(0,10).replace(/-/g,'-');
        const response=await axios1.get('/appointment/getAvailableSlots/'+email+'/'+dateStr)
        console.log(response)
        setAvailableSlot(response.data);
    }

    const removeReviews=(user_email,doctor_email)=>{

    }
    const dischargePatient=async(email)=>{
        console.log(email);
        const response=await axios1.delete('/admit/del/'+email);
    }
    const createNewPrescription=async(patient_email,date,time_slot,doctor_email,disease,medication)=>{
        console.log(patient_email,date,doctor_email,disease,medication,time_slot);
        const response=await axios1.post('/appointment/addPrescription/',{
            date:date,
            doctor_email:doctor_email,
            pat_email:patient_email,
            time_slot:time_slot,
            prescription:"disease: "+disease+"-"+"medication: "+medication,
        })
    }
    const fetchSupportDetail=async()=>{
        console.log()
        setSupportDetail([
            {
                photoURL:contactUs,
                name:'Utkarsh Rai',
                email_adddress:'utkarshrai5678@gmail.com',
                phone_no:'7007347226',
                role:'tech support'
            },
            {
                photoURL:contactUs,
                name:'Aditya kumar singh',
                email_adddress:'adityakumarsingh@gmail.com',
                phone_no:'7007347226',
                role:'patient support'
            },
            {
                photoURL:contactUs,
                name:'Akshat Bhatnagar',
                email_adddress:'adityakumarsingh@gmail.com',
                phone_no:'7007347226',
                role:'tech support'
            },
        ])
    }

    const value = {
        allUsers,
        allDoctors,
        userAppointments,
        userPrescriptions,
        doctorAppointments,
        doctorPrescriptions,
        allAppointments,
        allPrescriptions,
        userReviews,
        allReviews,
        doctorReviews,
        filterDoctor,
        doctorDetails,
        availableSlot,
        currentDoctor,
        patientAdmitted,
        currentDate,
        setCurrentDate,
        setCurrentDoctor,
        cancelAppointment,
        fetchAllAppointments,
        fetchAllDoctors,
        fetchAllUser,
        fetchUserDetails,
        fetchAvailableSlot,
        fetchDoctorDetails,
        createUser,
        createNewDoctor,
        deleteDoctor,
        createNewAppointment,
        deleteAppointment,
        fetchUserReviews,
        fetchDoctorReviews,
        fetchReviews,
        removeReviews,
        addReviews,
        supportDetail,
        averageReview,
        currentDate,
        currentDoctor,
        createNewPrescription,
        dischargePatient
    }

    useEffect(() => {
        fetchAllUser();
        fetchAllDoctors();
        fetchAllAppointments();
        fetchAllPrescriptions();
        fetchSupportDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // use effect for when use changes
    useEffect(() => {
        if(currentUser!==null) fetchUserAppointment(currentUser.email);
        if(currentUser!==null) fetchUserReviews(currentUser.email);
        if(currentUser!==null) fetchDoctorAppointment(currentUser.email);
        if(currentUser!==null) fetchDoctorAdmitted(currentUser.id);
        if(currentUser!==null) fetchDoctorReviews(currentUser.email);
        if(currentUser!==null) getAverageReview(currentUser.email);
        fetchDoctorAppointment();
        fetchReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);
    useEffect(()=>{
        // console.log('sfsf');
        if(currentDoctor!==''&&currentDate!==undefined&&currentDate!==null){
            fetchAvailableSlot(currentDoctor,currentDate);
        }
    },[currentDoctor,currentDate])
    return (
        <Dbcontext.Provider value={value}>
            {children}
        </Dbcontext.Provider>
    )
}
export default DBprovider;
export {useDB};

