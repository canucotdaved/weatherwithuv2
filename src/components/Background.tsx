import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

interface PropType {
  children: React.ReactNode;
  geo: any;
}
// interface ICurrent {
//   weather?:Array<{}>

// }
// interface IDataContext extends ICurrent{
//   current: ICurrent;
// }

const DataContext = React.createContext<any>({});

export function useData() {
  return useContext(DataContext);
}

const Background: React.FC<PropType> = ({ children, geo }) => {
  const { lat, lng } = geo;
  const [weatherData, setWeatherData] = useState({});
  const weatherApiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,daily&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

  useEffect(() => {
    if (!Object.keys(geo).length) getUserLocation();
    fethWeatherData();
  }, [geo]);

  const getUserLocation = () => {
    if (!navigator.geolocation) console.log("geolocation is not availble");
    navigator.geolocation.getCurrentPosition(getLocation, showError);
  };

  const getLocation = (position: any) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const locationWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,daily&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
    const getWeatherByLocation = async () => {
      await axios.get(locationWeather).then((res: any) => {
        setWeatherData(res.data);
      });
    };
    getWeatherByLocation();
  };

  const showError = (error: any) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("Permission denied");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("POSITION UNAVAILABLE");
        break;
      case error.TIMEOUT:
        console.log("the request timed out");
        break;
      case error.UNKNOWN_ERROR:
        console.log("an unknown error occurred");
    }
  };

  const fethWeatherData = async () => {
    await axios.get(weatherApiLink).then((res: any) => {
      setWeatherData(res.data);
    });
  };

  return (
    <DataContext.Provider value={weatherData}>
      <div className="bg-main bg-no-repeat h-screen w-full max-w-[1920px] relative">
        {children}
      </div>
    </DataContext.Provider>
  );
};

export default Background;
