import React, { useEffect, useState } from "react";
import { useData } from "./Background";
import moment from "moment";

const Hourly = () => {
  const [hourlyData, setHourlyData] = useState({ hour: [], temp: [] });
  const data = useData();

  useEffect(() => {
    if (!Object.keys(data).length) return;
    destructData();
  }, [data]);

  const destructData = () => {
    //@ts-ignore
    const dts = data.hourly.map(({ dt }) => {
      return moment.unix(dt).format("LT");
    });
    //@ts-ignore
    const tempe = data.hourly.map(({ temp }) => {
      return temp;
    });
    const hour = dts.slice(0, 8);
    const temp = tempe.slice(0, 8);

    setHourlyData({ hour, temp });
  };

  return (
    <div className="flex flex-row justify-around mt-auto">
      {hourlyData.hour.map((item, idx) => (
        <div
          className="flex flex-col first:bg-[#00000070] first:rounded-md first:py-8 first:px-2"
          key={idx}
        >
          <h3 className="font-pops text-white text-2xl font-bold pb-4">
            {item}
          </h3>
          <h2 className="font-pops text-white text-5xl font-bold ">
            {Math.round(hourlyData.temp[idx])}&deg; C
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Hourly;
