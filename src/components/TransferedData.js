import React, { useEffect, useState } from 'react';
import '../App.css';
import notificationHandler from '../components/Notification';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';

const TransferedData = ({ onSubmit }) => {
  const [pData, setPdata] = useState(null)

  const handleatransferedDataFetch = async () => {
    try {
      const abhaid = localStorage.getItem('consentabhaid');
      const dateFrom = localStorage.getItem('dateFrom');
      const dateTo = localStorage.getItem('dateTo');
      const response = await fetch(`http://localhost:9090/getrecenttransfereddata?abhaid=${abhaid}&dateFrom=${dateFrom}&dateTo=${dateTo}`);
      const newData = await response.json();
      setPdata(newData)
      localStorage.removeItem('consentabhaid');
      localStorage.removeItem('dateFrom');
      localStorage.removeItem('dateTo');
      notificationHandler(`Organisation updated successfully response`, 'success');
    }
    catch (exception) {
      notificationHandler(`Update failed`, 'error');
    }
  };

  return (
    <div className="register-form-6">
  {pData === null && (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h3" style={{ color: 'orange' }}>Please click on refresh button to get records</Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleatransferedDataFetch} style={{ fontSize: '1.5rem', padding: '1rem' }}>
          Refresh!
        </Button>
      </div>
  </div>
  )}
  {pData != null && (
    <TableContainer>
      <Table style={{ borderSpacing: '2px', border: '1px solid black' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ border: '1px solid black', padding: '5px' }}>Abhaid</TableCell>
            <TableCell style={{ border: '1px solid black', padding: '5px' }}>Symptoms</TableCell>
            <TableCell style={{ border: '1px solid black', padding: '5px' }}>Medicine</TableCell>
            <TableCell style={{ border: '1px solid black', padding: '5px' }}>Dosage</TableCell>
            <TableCell style={{ border: '1px solid black', padding: '5px' }}>Pattern</TableCell>
            <TableCell style={{ border: '1px solid black', padding: '5px' }}>Timings</TableCell>
            <TableCell style={{ border: '1px solid black', padding: '5px' }}>Instruction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pData.map((item) => (
            <TableRow key={item.id}>
              <TableCell style={{ border: '1px solid black', padding: '5px' }}>{item.abhaid}</TableCell>
              <TableCell style={{ border: '1px solid black', padding: '5px' }}>{item.symptoms}</TableCell>
              <TableCell style={{ border: '1px solid black', padding: '5px' }}>{item.medicine}</TableCell>
              <TableCell style={{ border: '1px solid black', padding: '5px' }}>{item.dosage}</TableCell>
              <TableCell style={{ border: '1px solid black', padding: '5px' }}>{item.pattern}</TableCell>
              <TableCell style={{ border: '1px solid black', padding: '5px' }}>{item.timings}</TableCell>
              <TableCell style={{ border: '1px solid black', padding: '5px' }}>{item.instruction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}
</div>
  );
};

export default TransferedData;