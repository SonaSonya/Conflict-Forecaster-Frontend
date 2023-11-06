import { useState, useEffect } from "react";
import { dateOptions } from "../components/DateOption";

function Initialize() {
  const [startDate, setStartDate] = useState(dateOptions[0]);
  const [endDate, setEndDate] = useState(dateOptions[dateOptions.length - 1]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const url = `http://localhost:8080/forecaster/data/initialize?start_date=${startDate}&end_date=${endDate}`;

  const handleOkClick = () => {
    // Выполните запрос к бекенду здесь
    setLoading(true); // Установите состояние загрузки
    // Пример асинхронного запроса (используя fetch)
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setLoading(false); // Завершите загрузку
      })
      .catch((error) => {
        console.error("Ошибка запроса: ", error);
        setLoading(false); // Завершите загрузку в случае ошибки
      });
  };

  return (
    <div className="m-3">
      <h2>Database Initialization</h2>
      <div>
        <label>Select the start version: </label>
        <select
          className="form-select w-25"
          aria-label="Default select example"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        >
          <option value=""></option>
          {dateOptions.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select the end version: </label>
        <select
          className="form-select w-25"
          aria-label="Default select example"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        >
          <option value=""></option>
          {dateOptions.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-light m-3" onClick={handleOkClick}>
        OK
      </button>
      {loading && <div>Идет загрузка...</div>}
      {result !== null && <div>Количество записей: {result}</div>}
    </div>
  );
}
export default Initialize;
