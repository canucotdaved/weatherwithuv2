import React, { useEffect, useState } from "react";
import { BsQuestionLg } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { format } from "date-fns";
import { useData } from "./Background";
import axios from "axios";

const today = [format(new Date(), "MM/dd/yyyy"), format(new Date(), "EEEE")];

const MainWeather = () => {
  const data = useData();
  const [location, setLocation] = useState("");
  const [currentweath, setCurrentWeath] = useState({
    description: "",
    icon: "",
  });
  useEffect(() => {
    if (!Object.keys(data).length) return;
    destructData();
    getLocationName();
  }, [data]);

  const destructData = () => {
    const {
      current: {
        weather: [{ description, icon }],
      },
    } = data;
    const currweath = { description, icon };
    setCurrentWeath(currweath);
  };

  const getLocationName = () => {
    //@ts-ignore
    const { lat, lon } = data;
    const LocationLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
    const getLocationName = async () => {
      await axios.get(LocationLink).then((res: any) => {
        setLocation(res.data.name);
      });
    };
    getLocationName();
  };

  return (
    <div className="flex flex-col">
      {!currentweath.icon ? (
        <BsQuestionLg className="text-9xl text-white  " />
      ) : (
        <div className="w-full">
          <img
            src={`http://openweathermap.org/img/wn/${currentweath.icon}@2x.png`}
          />
        </div>
      )}

      {!currentweath.description ? (
        <h2 className="font-pops text-3xl text-white">No Info</h2>
      ) : (
        <h2 className="font-pops text-3xl text-white">
          {currentweath.description}
        </h2>
      )}
      <div className="flex flex-row items-center py-2">
        <ImLocation className="text-white text-3xl" />
        <h4 className="font-pops text-white text-2xl font-bold pl-1">
          {!location ? "Location" : location}
        </h4>
      </div>
      <h4 className="font-pops text-white text-xl">
        {today[0]} <br /> {today[1]}
      </h4>
    </div>
  );
};

export default MainWeather;
