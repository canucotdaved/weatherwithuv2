import React, { useEffect, useState, useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface ISearch {
  geodata: (data: any) => void;
}

const Search: React.FC<ISearch> = ({ geodata }) => {
  const ref = useRef<any>(null);
  const [geometry, setGeometry] = useState({});
  let autocomplete: any;

  useEffect(() => {
    initAutoComplete(setGeometry, ref);
  }, [ref]);

  const initAutoComplete = (updateCity: any, ref: any) => {
    autocomplete = new window.google.maps.places.Autocomplete(ref.current, {
      types: ["(cities)"],
    });
    autocomplete.setFields(["geometry"]);
    autocomplete.addListener("place_changed", () =>
      handlePlaceChanged(updateCity)
    );
  };

  const handlePlaceChanged = async (updateCity: any) => {
    const addressObject = autocomplete.getPlace();
    const lat = addressObject.geometry.location.lat();
    const lng = addressObject.geometry.location.lng();
    const latlng = { lat, lng };
    setGeometry(latlng);
    geodata(latlng);
  };

  // geocoder.geocode({ placeId: city }).then(({ results }) => {
  //   console.log(results[0].geometry.location, "places");
  // });
  return (
    <div className="flex flex-row ml-auto absolute top-[10%] right-[10%]">
      <BsSearch className="text-white text-xl " />
      <div className="pl-2">
        <input
          type="text"
          name="search"
          className="bg-transparent focus:outline-none border-b-2"
          ref={ref}
        />
      </div>
    </div>
  );
};

export default Search;
