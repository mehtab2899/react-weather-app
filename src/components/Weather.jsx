import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import city from "../images/city.png";
import humi from "../images/humidity.png";
import visi from "../images/visi.png";
import winddir from "../images/winddir.png";
import windspeed from "../images/windspeed.png";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [info, setInfo] = useState("");
  const [weatherData, setWeatherData] = useState("");

  const fetchData = async () => {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=e585ce03c59245f7b3d165133211908&q=${query}&aqi=no`
    );
    setInfo(response.data.location);
    setWeatherData(response.data.current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <WeatherContainer>
      <CityData>
        <h1>
          {info.name}
          {info.name && ","} {info.country}
        </h1>
        <img src={city} alt="" />
        <h2>{weatherData.temp_c}°C</h2>
      </CityData>

      <CityInfo>
        <InfoBar>
          <h2>{info.localtime}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter City"
            />
            <button type="submit">submit</button>
          </form>
        </InfoBar>

        <InfoBox>
          <div className="boxes">
            <img src={humi} alt="" />
            <div>
              <h3>Humidity</h3>
              <h2>{weatherData.humidity}</h2>
              <h4>%</h4>
            </div>
          </div>
          <div className="boxes">
            <img src={windspeed} alt="" />
            <div>
              <h3>Wind Speed</h3>
              <h2>{weatherData.wind_kph}</h2>
              <h4>mph</h4>
            </div>
          </div>
          <div className="boxes">
            <img src={winddir} alt="" />
            <div>
              <h3>Wind Direction</h3>
              <h2>{weatherData.wind_dir}</h2>
              <h4></h4>
            </div>
          </div>
          <div className="boxes">
            <img src={visi} alt="" />
            <div>
              <h3>visibility</h3>
              <h2>{weatherData.vis_km}</h2>
              <h4>km</h4>
            </div>
          </div>
          <div className="boxes">
            <img src={weatherData.condition?.icon} alt="" />
            <div>
              <h3>Condition</h3>
              <h2>{weatherData.condition?.text}</h2>
            </div>
          </div>
          <div className="boxes">
            <img src={visi} alt="" />
            <div>
              <h3>Humidity</h3>
              <h2>79</h2>
              <h4>%</h4>
            </div>
          </div>
        </InfoBox>
      </CityInfo>
    </WeatherContainer>
  );
};

const WeatherContainer = styled.div`
  width: 70%;
  height: 60vh;
  display: flex;
  margin: 5rem auto 0;
  justify-content: center;
  border-radius: 1rem;
  box-shadow: 0 2px 10px #000;
`;

const CityData = styled.div`
  padding: 1rem;
  text-align: center;

  img {
    margin-top: 2rem;
  }

  h2 {
    padding-top: 2rem;
    font-size: 5rem;
  }
`;

const CityInfo = styled.div`
  padding: 1rem 5rem 0;
`;
const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;

  h2 {
    margin-top: 1rem;
  }

  input {
    padding: 0.8rem;
    width: 25rem;
    border-radius: 0.5rem;
    border: none;
  }

  button {
    margin-left: 1rem;
    border: none;
    font-size: 2rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;

const InfoBox = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(3, auto);

  .boxes {
    background: cyan;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    border-radius: 1rem;

    div {
      h2 {
        font-weight: 900;
        font-size: 2rem;
      }
      h2,
      h4 {
        text-align: right;
      }
    }

    img {
      width: 5rem;
    }
  }
`;

export default Weather;
