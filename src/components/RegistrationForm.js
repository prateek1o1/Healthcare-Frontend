import React, { useEffect,useState } from 'react';
import Abha from '../components/Abha';
import notificationHandler from '../components/Notification';
import Otp from '../components/Otp';
import fetchService from '../services/fetchService';
import modeservice from '../services/modeService';
import otpservice from '../services/setOtpService';
import { useNavigate } from 'react-router-dom';

import { 
  Button, 
  TextField, 
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .MuiButton-root': {
      marginTop: theme.spacing(2),
      alignSelf: 'center',
    },
  },
}));

const RegistrationForm = ({ onSubmit, onCancel }) => {
  const [abhaid ,setAbha] = useState(null)
  const navigate = useNavigate();
  const [ doctor, setDoctor] = useState('');
  const [ doctorsList, setdoctorsList] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '',
    year: '',
    month:'',
    day:'',
    mobile : '',
    state: '',
    district: ''
  });
  const classes = useStyles();

  useEffect(() =>{
    const fetchData = async ()=>{
        const response = await fetch(`http://localhost:9090/getdoctors`);
        const newData = await response.json();
        setdoctorsList(newData);
        console.log("Doctor List Saved")
    };
    fetchData();
  }, []);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(event)=>{ 
    event.preventDefault();
    try {
      console.log(formData); 
      console.log(11);
      await otpservice.savePatient(formData,doctor);
      console.log("Done");
      navigate("/success");
    } catch (exception) {
      notificationHandler(`Update failed`, 'error');
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };


  const handleabhafetch = async (id) =>{
    try{
      setAbha(id);
      const fetchobject = await fetchService.fetch(id);
      await modeservice.selectmode("MOBILE_OTP")
      console.log("MOBILE_OTP")
      notificationHandler(`Organisation updated successfully response ${fetchobject}`, 'success');
    }
    catch (exception) {
      notificationHandler(`Update failed`, 'error');
    }
  };

  const handleSetDoctor = (event) => {
    setDoctor(event.target.value);
    console.log(doctor)
  
  }

  const handleotp = async (authcode) =>{
    try{
      const otpobject = await otpservice.setOtp(authcode);
      notificationHandler(`Organisation updated successfully response ${otpobject}`, 'success')
    }
    catch (exception) {
      notificationHandler(`Update failed`, 'error')
    }
  };

  const handleClick = async(event) => {
    event.preventDefault();
      const item = await otpservice.getdata();
      await item;
      console.log(item);
      const t=JSON.stringify(item);
      console.log(t);

      setFormData({
        id: JSON.parse(t).id,
        name: JSON.parse(t).name,
        gender: JSON.parse(t).gender,
        // dob: `${String(JSON.parse(t).yearOfBirth)}-${String(JSON.parse(t).monthOfBirth).padStart(2, "0")}-${String(JSON.parse(t).dayOfBirth).padStart(2, "0")}`,
        year:JSON.parse(t).yearOfBirth,
        month:JSON.parse(t).monthOfBirth,
        day:JSON.parse(t).dayOfBirth,
        mobile: JSON.parse(t).identifiers[0].value,
        state: JSON.parse(t).address.state,
        district: JSON.parse(t).address.district
      });
    
  };

  return (
    <div className="register-container-2">
    <div>
    {
         abhaid === null &&
        <Abha  fetch={handleabhafetch}/>
    }
    </div>
    <div>
    {
          abhaid !== null  &&
          <div>
            <Otp  setOtp={handleotp}/>
            <button className="styled-button" onClick={handleClick}>Refresh!</button>
          </div>
          
    }
    </div>
    
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        label="Health ID"
        name="id"
        value={formData.id}
        onChange={handleChange}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        label="Year Of Birth"
        name="year"
        value={formData.year}
        onChange={handleChange}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        label="Month Of Birth"
        name="month"
        value={formData.month}
        onChange={handleChange}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        label="Day Of Birth"
        name="day"
        value={formData.day}
        onChange={handleChange}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        label="Mobile"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        label="District"
        name="district"
        value={formData.district}
        onChange={handleChange}
        margin="normal"
        required
        fullWidth
      />

    <FormControl fullWidth margin="normal">
  <InputLabel id="doctor-label">Doctors</InputLabel>
  <Select
    labelId="doctor-label"
    id="doctor-select"
    value={doctor}
    onChange={handleSetDoctor}
  >
    <MenuItem value="">
      <em>Select doctor</em>
    </MenuItem>
    {doctorsList.map(doctor => (
      <MenuItem value={doctor.id} key={doctor.id}>
        {doctor.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
    <div className="button-container">
  <Button type="submit" variant="contained" color="primary"fullWidth>
    Appoint
  </Button>
  <Button onClick={handleCancel} variant="contained" color="secondary">
    Cancel
  </Button>
</div>
  </form>
</div>
  );
};

export default RegistrationForm;
