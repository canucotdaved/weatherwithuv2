import React, { useState, useEffect } from "react";
import { useData } from "./Background";
import { WiHumidity, WiStrongWind, WiWindDeg } from "react-icons/wi";

const data: any[] = [
  { icon: WiHumidity },
  { icon: WiStrongWind },
  { icon: WiWindDeg },
];

const Predictions = () => {
  const mainData = useData();
  const [listdata, setListData] = useState([{ label: "", value: 0 }]);

  useEffect(() => {
    if (!Object.keys(mainData).length) return;
    const {
      //@ts-ignore
      current: { humidity, wind_deg, wind_speed },
    } = mainData;
    const dataList = [
      { label: "Humidity", value: humidity },
      { label: "Wind Speed", value: wind_speed },
      { label: "Wind Degrees", value: wind_deg },
    ];
    setListData(dataList);
  }, [mainData]);

  console.log(listdata, `list`);

  return (
    <div className="flex flex-col pr-8 mt-20">
      {listdata.map((item, idx) => {
        const weathicon = data[idx];
        return (
          <div className="flex flex-row items-center my-2" key={idx}>
            <weathicon.icon className="text-5xl text-white" />
            <div className="flex flex-col">
              <p className="font-pops text-white text-xl">{item.label}</p>
              <h3 className="text-white font-pops text-2xl font-bold">
                {item.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Predictions;
