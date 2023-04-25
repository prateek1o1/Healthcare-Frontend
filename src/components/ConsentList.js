import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <table style={{ borderSpacing: '0', borderCollapse: 'collapse', border: '1px solid black' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '5px' }}>Consent ID</th>
                        <th style={{ border: '1px solid black', padding: '5px' }}>Abhaid</th>
                        <th style={{ border: '1px solid black', padding: '5px' }}>Expiry Date</th>
                        <th style={{ border: '1px solid black', padding: '5px' }}>Date From</th>
                        <th style={{ border: '1px solid black', padding: '5px' }}>Date To</th>
                        <th style={{ border: '1px solid black', padding: '5px' }}>Submit</th>
                    </tr>
                </thead>
                <tbody>
                    {consentList.map(row => (
                        <tr key={row.id}>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{row.consentId}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{row.abhaid}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{row.expiryDate}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{row.dateFrom}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>{row.dateTo}</td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                                <button onClick={() => handleRowSelect(row)}>Submit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default ConsentList;