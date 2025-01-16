import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "YOUR_API_KEY"; // Вставте ваш API-ключ

  const fetchWeather = async () => {
    if (!city) {
      setError("Введіть назву міста!");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=uk`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("Не вдалося знайти місто. Спробуйте ще раз.");
      setWeather(null);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", padding: "20px" }}>
      <h1>Погода в місті</h1>
      <div>
        <input
          type="text"
          placeholder="Введіть місто"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", width: "200px" }}
        />
        <button onClick={fetchWeather} style={{ marginLeft: "10px", padding: "10px 15px", fontSize: "16px" }}>
          Дізнатися погоду
        </button>
      </div>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {weather && (
        <div style={{ marginTop: "20px", textAlign: "left", display: "inline-block", border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <p><strong>Регіон:</strong> {weather.location.region}</p>
          <p><strong>Дата:</strong> {weather.location.localtime.split(" ")[0]}</p>
          <p><strong>Час:</strong> {weather.location.localtime.split(" ")[1]}</p>
          <p><strong>Хмарність:</strong> {weather.current.condition.text} <img src={weather.current.condition.icon} alt="icon" /></p>
          <p><strong>Температура:</strong> {weather.current.temp_c}°C</p>
          <p><strong>Тиск:</strong> {weather.current.pressure_mb} гПа</p>
          <p><strong>Швидкість вітру:</strong> {weather.current.wind_kph} км/год</p>
          <p><strong>Напрямок вітру:</strong> {weather.current.wind_dir}</p>
        </div>
      )}
    </div>
  );
};

export default App;
