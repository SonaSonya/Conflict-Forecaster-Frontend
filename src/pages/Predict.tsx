import axios from "axios";
import { useState, useEffect } from "react";

function Predict() {
  const timespans = ["1", "2", "3", "4", "5", "6"];
  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const years = [
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ];
  const violenceTypes: { [key: string]: string } = {
    1: "State-based",
    2: "Non-state",
    3: "One-sided",
  };
  const models: { [key: string]: string } = {
    1: "arima",
    2: "lstm",
  };
  const [countries, setCountries] = useState([]);

  const [country, setCountry] = useState("");
  const [timespan, setTimespan] = useState("1");
  const [violenceType, setViolenceType] = useState("1");
  const [model, setModel] = useState("1");

  const [startYear, setStartYear] = useState("1");
  const [endYear, setEndYear] = useState("1");
  const [startMonth, setStartMonth] = useState("1");
  const [endMonth, setEndMonth] = useState("1");

  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/forecaster/data/status")
      .then((response) => {
        setCountries(response.data.countries);
        setCountry(response.data.countries[0]?.id || "");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  const url = `http://localhost:8080/forecaster/predict?country_id=${country}&violence_type=${violenceType}&timespan=${timespan}&start_year=${startYear}&start_month=${startMonth}&last_year=${endYear}&last_month=${endMonth}&model=${models[model]}`;

  const handleOkClick = () => {
    // Выполните запрос к бекенду здесь
    setLoading(true); // Установите состояние загрузки
    // Пример асинхронного запроса (используя fetch)
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setForecasts(data.forecasts);
        setLoading(false); // Завершите загрузку
      })
      .catch((error) => {
        console.error("Ошибка запроса: ", error);
        setLoading(false); // Завершите загрузку в случае ошибки
      });
  };

  return (
    <div className="m-3">
      <h2>Predict</h2>
      <div>
        <label>Select the country: </label>
        <select
          className="form-select w-25"
          aria-label="Default select example"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value=""></option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select the violence type: </label>
        <select
          className="form-select w-25"
          aria-label="Default select example"
          value={violenceType}
          onChange={(e) => setViolenceType(e.target.value)}
        >
          <option value=""></option>
          {Object.keys(violenceTypes).map((violenceTypeId) => (
            <option key={violenceTypeId} value={violenceTypeId}>
              {violenceTypes[violenceTypeId]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select the model: </label>
        <select
          className="form-select w-25"
          aria-label="Default select example"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value=""></option>
          {Object.keys(models).map((modelId) => (
            <option key={modelId} value={modelId}>
              {models[modelId]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select start year: </label>
        <select
          className="form-select w-25"
          aria-label="Default select example"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
        >
          <option value=""></option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label>Select start month: </label>
        <select
          className="form-select w-25"
          aria-label="Default select example"
          value={startMonth}
          onChange={(e) => setStartMonth(e.target.value)}
        >
          <option value=""></option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select end year: </label>
        <select
          className="form-select w-25"
          aria-label="Default select example"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
        >
          <option value=""></option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label>Select end month: </label>
        <select
          className="form-select w-25"
          aria-label="Default select example"
          value={endMonth}
          onChange={(e) => setEndMonth(e.target.value)}
        >
          <option value=""></option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select the month count for forecasting: </label>
        <select
          className="form-select w-25"
          aria-label="Default select example"
          value={timespan}
          onChange={(e) => setTimespan(e.target.value)}
        >
          <option value=""></option>
          {timespans.map((timespan) => (
            <option key={timespan} value={timespan}>
              {timespan}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-light m-3" onClick={handleOkClick}>
        OK
      </button>
      {loading && <div>Идет загрузка...</div>}
      {forecasts.length > 0 && (
        <div>
          <h3>Forecasts:</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {forecasts.map((forecast) => (
                <tr key={forecast.month}>
                  <th scope="row">{forecast.month + 1}</th>
                  <td>{forecast.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default Predict;
