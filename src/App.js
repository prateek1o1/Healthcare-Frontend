import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import HealthDataForm from './components/HealthDataForm';
import Menu from './components/Menu';
import PatientList from './components/PatientList';
import RegistrationForm from './components/RegistrationForm';
import Success from './components/Success';
import AlreadyRegistered from './components/AlreadyRegistered';
import Consent from './components/Consent';
import TransferedData from './components/TransferedData';
import GetTransferedData from './components/GetTransferedData';
import ConsentList from './components/ConsentList';
import HipRecords from './components/HipRecords';
import Login from './components/Login';
import { Button } from 'react-bootstrap';


const menuStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#300964',
}

const App = () => {
  const currentUserType = '';
  const [ user, setUser ] = useState(null)
  const navigate = useNavigate();
  // const [ notification, setNotification ] = useState(null)
  // const [ notificationType, setNotificationType ] = useState(null)
  
  // const notificationHandler = (message, type) => {
  //   setNotification(message)
  //   setNotificationType(type)

  //   setTimeout(() => {
  //     setNotificationType(null)
  //     setNotification(null)
  //   }, 3000)
  // }



  const handleLogin = async (credentials) => {
    try {
      //const userObject = await loginService.login(credentials)
      setUser(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(credentials))
      
      //notificationHandler(`Logged in successfully as ${credentials.email}`, 'success') 
    }
    catch (exception) {
     // notificationHandler(`Log in failed, check username and password entered`, 'error')
    }
  }

  function DoctorElement(){
    if(localStorage.getItem('currentUserRole') === 'doctor'){
      return <><HealthDataForm/></>;
    }
    else{
      return <div>You do not have access to this page</div>;
    }
  }

  function consult(){
    return <HealthDataForm/>;
  }

  function DoctorElement1(){
    if(localStorage.getItem('currentUserRole') === 'doctor'){
      return <><Consent/></>;
    }
    else{
      return <div>You do not have access to this page</div>;
    }
  }
  function requestConsent(){
    return <Consent/>;
  }

  const handleLogout = async () => {
    setUser(null);
    navigate("/");
  }


  return (
    <div>
      {
          user === null && <Login startLogin={handleLogin}/>
      }
      {
        user!==null &&
        
        <div>
          <div style={menuStyle}>
            <div>
              <Link to="/" class="cool-link">Home</Link>
            </div>
            <div>
              <Link to="/RegistrationForm" class="cool-link">New Patient Registration</Link>
              <Link to="/AlreadyRegistered" class="cool-link">Already Registered</Link>
              <Link to="/HealthDataForm" class="cool-link">Doctor's Consultation</Link>
              <Link to="/Consent" class="cool-link">Request Consent</Link>
              <Link to="/ConsentList" class="cool-link">Consent List</Link>
              <Link to="/HipRecords" class="cool-link">HIP Records</Link>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Menu/>} />
            <Route path="/RegistrationForm" element={<RegistrationForm/>} />
            <Route path="/AlreadyRegistered" element={<AlreadyRegistered/>} />
            <Route path="/PatientList" element={<PatientList/>} />
            <Route path="/success" element={<Success/>} />
            <Route path="/Consent" element = {<Consent/>} />
            <Route path = '/ConsentList' element = {<ConsentList/>} />
            <Route path = '/TransferedData' element = {<TransferedData/>} />
            <Route path = '/GetTransferedData' element = {<GetTransferedData/>} />
            <Route path = '/HipRecords' element = {<HipRecords/>} />
            <Route path ='/HealthDataForm' element = {<DoctorElement> <consult /> </DoctorElement>}> </Route>
            <Route path="*" element = {<div>Page Not Found</div>}/>
          </Routes>
        </div>
     
      }
    </div>
    
  );
}

export default App;
