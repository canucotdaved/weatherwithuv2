import React, { useEffect, useState } from "react";
import { BsQuestionLg } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { format } from "date-fns";
import { useData } from "./Background";

const today = [format(new Date(), "MM/dd/yyyy"), format(new Date(), "EEEE")];

const MainWeather = () => {
  const data = useData();
  const [currentweath, setCurrentWeath] = useState({ main: "", icon: "" });
  useEffect(() => {
    if (!Object.keys(data).length) return;
    const {
      //@ts-ignore
      current: {
        weather: [{ main, icon }],
      },
    } = data;
    const currweath = { main, icon };
    setCurrentWeath(currweath);
  }, [data]);

  console.log(data, `asdasdsa`);

  return (
    <div className="flex flex-col">
      {!currentweath.icon ? (
        <BsQuestionLg className="text-9xl text-white  " />
      ) : (
        <img
          src={`http://openweathermap.org/img/wn/${currentweath.icon}@2x.png`}
        />
      )}

      {!currentweath.main ? (
        <h2 className="font-pops text-3xl text-white">No Info</h2>
      ) : (
        <h2 className="font-pops text-3xl text-white">{currentweath.main}</h2>
      )}
      <div className="flex flex-row items-center py-2">
        <ImLocation className="text-white text-3xl" />
        <h4 className="font-pops text-white text-2xl font-bold pl-1">
          Location
        </h4>
      </div>
      <h4 className="font-pops text-white text-xl">
        {today[0]} <br /> {today[1]}
      </h4>
    </div>
  );
};

export default MainWeather;
