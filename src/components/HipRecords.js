import React,{ useState } from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {

<table>
<thead>
  <tr>
    <th>ID</th>
    <th>Visit ID</th>
    <th>Symptoms</th>
    <th>Medicine</th>
    <th>Dosage</th>
    <th>Pattern</th>
    <th>Timings</th>
    <th>Instruction</th>
    <th>Date</th>
    <th>Patient ID</th>
    <th>Doctor ID</th>
  </tr>
</thead>
<tbody>
  {visits.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.vistid}</td>
      <td>{item.symptoms}</td>
      <td>{item.medicine}</td>
      <td>{item.dosage}</td>
      <td>{item.pattern}</td>
      <td>{item.timings}</td>
      <td>{item.instruction}</td>
      <td>{item.date}</td>
      <td>{item.patient.patientid}</td>
      <td>{item.doctor.id}</td>
    </tr>
  ))}
</tbody>
</table>

      }
    </div>
  );
}

export default HipRecords;