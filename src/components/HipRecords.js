import React, { useState } from "react";
import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

function HipRecords() {
  const [inputValue, setInputValue] = useState("");
  const [visits, setVisits] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:9090/getRecords?abhaid=${inputValue}`);
      const data = await response.json();
      setVisits(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-form-5 ">
      <form onSubmit={handleSubmit}>
        <TextField
          label={<span style={{ fontWeight: 'bold' , color: 'cyan' }}>ABHA</span>}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          variant="outlined"
          margin="normal"
        />
        <br/>
        <Button type="submit" variant="contained" color="primary" size="medium">
          Submit
        </Button>
      </form>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Visit ID</TableCell>
            <TableCell>Symptoms</TableCell>
            <TableCell>Medicine</TableCell>
            <TableCell>Dosage</TableCell>
            <TableCell>Pattern</TableCell>
            <TableCell>Timings</TableCell>
            <TableCell>Instruction</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Doctor ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visits.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.vistid}</TableCell>
              <TableCell>{item.symptoms}</TableCell>
              <TableCell>{item.medicine}</TableCell>
              <TableCell>{item.dosage}</TableCell>
              <TableCell>{item.pattern}</TableCell>
              <TableCell>{item.timings}</TableCell>
              <TableCell>{item.instruction}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.doctor.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HipRecords;
