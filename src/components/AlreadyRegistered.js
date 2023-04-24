import React, { useEffect,useState } from 'react';
import Abha from '../components/Abha';
import notificationHandler from '../components/Notification';
import existingPatientService from '../services/existingPatientService';
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


const AlreadyRegistered = ({ onSubmit, onCancel }) => {
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
      await existingPatientService.updateDetails(abhaid,formData);

      const item2 = await existingPatientService.demographconfirm(abhaid);
      await item2;
      console.log(item2);

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
      notificationHandler(`Organisation updated successfully response`, 'success');
    }
    catch (exception) {
      notificationHandler(`Update failed`, 'error');
    }
  };

  const handleSetDoctor = (event) => {
    setDoctor(event.target.value);
    console.log(doctor)
  
  }

  const handleClick = async(event) => {
    event.preventDefault();
      const item = await existingPatientService.getPatientDetails(abhaid);
      await item;
      console.log(item);
      const t=JSON.stringify(item);
      console.log(t);

      setFormData({
        id: JSON.parse(t).id,
        name: JSON.parse(t).name,
        gender: JSON.parse(t).gender,
        // dob: `${String(JSON.parse(t).yearOfBirth)}-${String(JSON.parse(t).monthOfBirth).padStart(2, "0")}-${String(JSON.parse(t).dayOfBirth).padStart(2, "0")}`,
        year:JSON.parse(t).year,
        month:JSON.parse(t).month,
        day:JSON.parse(t).day,
        mobile: JSON.parse(t).mobile,
        state: JSON.parse(t).state,
        district: JSON.parse(t).district
      });
    
      const item1 = await existingPatientService.demographinit();
      await item1;
      console.log(item1);

      console.log("init done");
  };

  return (
    <div className="register-container-1">
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
            <button class="styled-button" onClick={handleClick}>Refresh!</button>
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
        {doctor.email}
      </MenuItem>
    ))}
  </Select>
</FormControl>
    <div className="button-container" >
  <Button type="submit" variant="contained" color="primary">
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

export default AlreadyRegistered;
