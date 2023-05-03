import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';

const ConsentList = ({ onSubmit }) => {
    const [consentList, setConsentList] = useState([])

    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(`http://localhost:9090/getconsentlist`);
            const newData = await response.json();
            console.log(newData)
            setConsentList(newData)
        };
        fetchData();
    }, []);

    const handleRowSelect = (row) => {
        setSelectedRows([...selectedRows, { id: row.id, dateFrom: row.dateFrom, dateTo: row.dateTo }]);
        console.log(row.consentId)
        console.log(row.abhaid)
        localStorage.setItem('consentabhaid', row.abhaid)
        localStorage.setItem('consentid', row.consentId)
        navigate("/GetTransferedData");
    }

    return (
        <div className='register-form-4'>
    <Table className="table">
        <TableHead>
            <TableRow>
                <TableCell className="table-cell-bold">Consent ID</TableCell>
                <TableCell className="table-cell-bold">Abhaid</TableCell>
                <TableCell className="table-cell-bold">Expiry Date</TableCell>
                <TableCell className="table-cell-bold">Date From</TableCell>
                <TableCell className="table-cell-bold">Date To</TableCell>
                <TableCell className="table-cell-bold">Submit</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {consentList.map(row => (
                <TableRow key={row.id}>
                    <TableCell className="table-cell">{row.consentId}</TableCell>
                    <TableCell className="table-cell">{row.abhaid}</TableCell>
                    <TableCell className="table-cell">{row.expiryDate}</TableCell>
                    <TableCell className="table-cell">{row.dateFrom}</TableCell>
                    <TableCell className="table-cell">{row.dateTo}</TableCell>
                    <TableCell className="table-cell">
                        <Button variant="contained" color="primary" onClick={() => handleRowSelect(row)}>Submit</Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</div>
    );

}

export default ConsentList;