import React from "react";

interface PropType {
  Bgprop?: any;
}

const WeatherBg: React.FC<PropType> = ({ Bgprop }) => {
  return (
    <div
      className={`absolute w-full h-full ${Bgprop} bg-blend-overlay p-16 z-0`}
    ></div>
  );
};

export default WeatherBg;
