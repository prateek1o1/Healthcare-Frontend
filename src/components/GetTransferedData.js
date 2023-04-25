import React, { useEffect, useState } from 'react';
import '../App.css';
import notificationHandler from '../components/Notification';
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
    <div>
      {
        pData != null &&
        //   {/* <div>{p_data}</div> */}
        // <div>
        // { !pData ? (
        //   <div>Loading...</div>
        // )
        // :(

        <table style={{ borderSpacing: '2px', border: '1px solid black' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '5px' }}>Abhaid</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Consent ID</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Symptoms</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Medicine</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Dosage</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Pattern</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Timings</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Instruction</th>
            </tr>
          </thead>
          <tbody>
            {pData.map(item => (
              <tr key={item.id}>
                <td style={{ border: '1px solid black', padding: '5px' }}>{item.abhaid}</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{item.consentid}</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{item.symptoms}</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{item.medicine}</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{item.dosage}</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{item.pattern}</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{item.timings}</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{item.instruction}</td>
              </tr>
            ))}
          </tbody>
        </table>
        //         )}
        // </div>



        //             {/* <div> <b>symptoms :</b> {JSON.parse(p_data).symptoms}</div>
        //             <div> <b>medicine:</b> {JSON.parse(p_data).medicine}</div>
        //             <div> <b>dosage: </b> {JSON.parse(p_data).dosage}</div>
        //             <div> <b>pattern: </b> {JSON.parse(p_data).pattern}</div>
        //             <div> <b>timings: </b> {JSON.parse(p_data).timings}</div>
        //             <div> <b>instruction: </b> {JSON.stringify(JSON.parse(p_data).instruction)} </div>
        //           </div> */}

        //           console.log("DATATAAA")
      }
    </div>
  );
};

export default GetTransferedData;