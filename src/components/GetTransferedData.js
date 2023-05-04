import React, { useEffect, useState } from 'react';
import '../App.css';
import notificationHandler from '../components/Notification';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer,Paper } from '@material-ui/core';

const GetTransferedData = ({ onSubmit }) => {
  const [pData, setPdata] = useState(null)

  useEffect(() =>{
  const handleatransferedDataFetch = async () => {
    try {
      const abhaid = localStorage.getItem('consentabhaid');
      const consentid = localStorage.getItem('consentid');
      const response = await fetch(`http://localhost:9090/gettransfereddata?abhaid=${abhaid}&consentid=${consentid}`);
      const newData = await response.json();
      setPdata(newData)
      localStorage.removeItem('consentabhaid');
      localStorage.removeItem('consentid');
      notificationHandler(`Organisation updated successfully response`, 'success');
    }
    catch (exception) {
      notificationHandler(`Update failed`, 'error');
    }
  };
  handleatransferedDataFetch();
},[]);

  return (
    <div className="register-form-7">
      <div>
      {
        pData != null &&
        <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Abhaid</TableCell>
        <TableCell>Consent ID</TableCell>
        <TableCell>Symptoms</TableCell>
        <TableCell>Medicine</TableCell>
        <TableCell>Dosage</TableCell>
        <TableCell>Pattern</TableCell>
        <TableCell>Timings</TableCell>
        <TableCell>Instruction</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {pData.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.abhaid}</TableCell>
          <TableCell>{item.consentID}</TableCell>
          <TableCell>{item.symptoms}</TableCell>
          <TableCell>{item.medicine}</TableCell>
          <TableCell>{item.dosage}</TableCell>
          <TableCell>{item.pattern}</TableCell>
          <TableCell>{item.timings}</TableCell>
          <TableCell>{item.instruction}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
      }
    </div>
    </div>
  );
};

export default GetTransferedData;