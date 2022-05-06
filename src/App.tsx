import React, { useState } from "react";
import {
  Background,
  WeatherBg,
  MainWeather,
  Search,
  Predictions,
  Hourly,
} from "./components";

function App() {
  const [geo, setGeo] = useState({});
  console.log(geo, "GEO");
  return (
    <div className="flex relative">
      <Background geo={geo}>
        <WeatherBg />
        <div className="flex flex-col p-16 h-[90%]">
          <div className="flex flex-row justify-between">
            <MainWeather />
            <div className="flex flex-col mr-20 mt-12">
              <Predictions />
            </div>
          </div>
          <Hourly />
        </div>
      </Background>
      <Search geodata={setGeo} />
    </div>
  );
}

export default App;
