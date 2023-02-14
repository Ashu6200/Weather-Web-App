import React, { useState, useEffect } from "react";
import axios from "axios";
import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl:
    "https://webstockreview.net/images/location-clipart-location-mark-14.png",
  iconSize: [40, 40],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});

const WeatherMap = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setpage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jolly-ruby-colt.cyclic.app/weather?page=${page}`
        );
        setWeatherData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 600000); //every 10 minutes

    return () => {
      clearInterval(intervalId);
    };
  }, [page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handlePageChange = (page, type) => {
    switch (type) {
      case "first":
        return setpage(page);
      case "second":
        return setpage(page);
      case "third":
        return setpage(page);
      default:
        break;
    }
  };
  const position = [22.35, 82.6833];
  return (
    <>
      <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {weatherData.map((data, index) => (
          <>
            <Marker
              position={[data.coord.lat, data.coord.lon]}
              key={index}
              icon={markerIcon}
            >
              <Popup>
                <p>City: {data.name}</p>
                <p>Temperature: {data.main.temp}&#8451;</p>
                <p>Weather: {data.weather[0].description}</p>
              </Popup>
            </Marker>
          </>
        ))}
      </MapContainer>
      <Wrapper>
        <h3>Change Pages :- {page}</h3>
        <div className="button-Contanier">
          <button onClick={() => handlePageChange(1, "first")}>1</button>
          <button onClick={() => handlePageChange(2, "second")}>2</button>
          <button onClick={() => handlePageChange(3, "third")}>3</button>
        </div>
      </Wrapper>
    </>
  );
};

export default WeatherMap;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .button-Contanier {
    padding-top: 10px;
    display: flex;
    gap: 20px;
    button {
      gap: 20px;
      width: 80px;
      height: 40px;
      border-radius: 20px;
      outline: none;
      border: none;
      color: black;
      font-size: 15px;
      font-weight: 700;
    }
  }
`;
