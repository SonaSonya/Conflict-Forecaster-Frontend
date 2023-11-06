import { useState, useEffect } from "react";
import axios from "axios";

function Status() {
  const [countries, setCountries] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/forecaster/data/status")
      .then((response) => {
        setCountries(response.data.countries);
        setStartDate(response.data.start_date);
        setEndDate(response.data.end_date);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  return (
    <div>
      <h3>Status of uploaded data</h3>
      <h4>Start Date: {startDate}</h4>
      <h4>End Date: {endDate}</h4>
      <h3>Countries:</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Country code</th>
            <th scope="col">Country name</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.id}>
              <th scope="row">{country.id}</th>
              <td>{country.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Status;
