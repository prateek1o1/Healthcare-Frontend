import React, { useEffect, useState } from 'react';
import '../App.css';
import notificationHandler from '../components/Notification';
import consentrequest from "../services/consentService";
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  TextField, 
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(2),
  },
}));


const HealthDataForm = ({ onSubmit }) => {
  const [patient, setPatient] = useState(null);
  const [curUser, setcurUser] = useState(null);
  const navigate = useNavigate();
  const [patientList, setpatientList] = useState([]);
  const [formData, setFormData] = useState({
    abhaid: '',
    dateFrom: '',
    dateTo: '',
    expiryDate: '',
    purpose: '',
    healthInfoTypes:''
  });
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "dateFrom" || name === "dateTo" || name === "expiryDate") {
      const date = new Date(value);
      const isoDate = date.toISOString();
      const formattedDate = isoDate.slice(0, -1) + "Z";
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      console.log(11);
      await consentrequest.requestConsent(formData);
      console.log("Done");
      navigate("/success");
    } catch (exception) {
      notificationHandler(`Update failed`, 'error');
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Patient ID"
          name="abhaid"
          value={formData.abhaid}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
            style: { position: "absolute", top: "-18px", left: "10px", color: "blue" }
          }}
          InputProps={{
            style: { marginTop: "25px" }
          }}
        />
        <TextField
          label="Date From"
          name="dateFrom"
          type="datetime-local"
          value={formData.dateFrom.slice(0, -1)}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
            style: { position: "absolute", top: "-18px", left: "10px", color: "blue" }
          }}
          InputProps={{
            style: { marginTop: "25px" }
          }}
        />
        <TextField
          label="Date To"
          name="dateTo"
          type="datetime-local"
          value={formData.dateTo.slice(0, -1)}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
            style: { position: "absolute", top: "-18px", left: "10px", color: "blue" }
          }}
          InputProps={{
            style: { marginTop: "25px" }
          }}
        />
        <TextField
          label="Expiry Date"
          name="expiryDate"
          type="datetime-local"
          value={formData.expiryDate.slice(0, -1)}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
            style: { position: "absolute", top: "-18px", left: "10px", color: "blue" }
          }}
          InputProps={{
            style: { marginTop: "25px" }
          }}
        />
        <TextField
          label="Purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
            style: { position: "absolute", top: "-18px", left: "10px", color: "blue" }
          }}
          InputProps={{
            style: { marginTop: "25px" }
          }}
        />
         <FormControl component="fieldset">
          <FormLabel component="legend">Health Information Types</FormLabel>
          <RadioGroup
            aria-label="healthInfoTypes"
            name="healthInfoTypes"
            value={formData.healthInfoTypes}
            onChange={handleChange}
          >
            <FormControlLabel value="op consultation" control={<Radio />} label="OP Consultation"/>
            <FormControlLabel value="prescription" control={<Radio />} label="Prescription" />
            <FormControlLabel value="other" control={<Radio />} label="Other"/>
          </RadioGroup>
        </FormControl>
      </div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default HealthDataForm;