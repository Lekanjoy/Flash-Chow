"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import location from "@/public/assets/location.svg";
import marker from "@/public/assets/marker.svg";
import Link from "next/link";

const ChooseLocation = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [LAT, setLAT] = useState(0);
  const [LONG, setLONG] = useState(0);
  const apiKey = process.env.NEXT_PUBLIC_RADAR_MAPS_API_KEY;
  const query = "Amule";

  // const apiUrl = `https://api.radar.io/v1/search/autocomplete?query=${encodeURIComponent(query)}&near=${latitude},${longitude}`;

  const reverseGeoCode = `https://api.radar.io/v1/geocode/reverse?coordinates=${LAT},${LONG}`;

  function useCurrentLocation() {
    getCurrentLocation();

    fetch(reverseGeoCode, {
      method: "GET",
      headers: {
        Authorization: `${apiKey}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const suggestions = data.addresses[0].formattedAddress;
        console.log(data);
        setCurrentLocation(suggestions);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

 useEffect(() => {
  getCurrentLocation(); 
 }, [LAT, LONG]);
  
  // Get user's cordinates
  function getCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLAT(latitude);
        setLONG(longitude);
        console.log(LAT, LONG);
      });

    } else {
      console.log("Geolocation is not available or not allowed by the user.");
    }
  }

  return (
    <form className="w-full p-4 bg-white text-secColor">
      <div className="w-full  mb-8">
        <h3 className="text-3xl mb-4 text-[#010F07]">
          Find restaurants near you
        </h3>
        <p className="text-sm ">
          Please enter your location or allow access to your location to find
          restaurants near you.
        </p>
      </div>
      <div
        onClick={useCurrentLocation}
        className="w-full cursor-pointer text-primColor border border-primColor flex items-center justify-center gap-x-2 rounded-md py-4 mb-5 hover:bg-primColor hover:text-white hover:border-none"
      >
        <Image src={location} alt="location icon" />
        <p>Use current location</p>
      </div>
      <div className="relative max-w-full">
        <input
          type="text"
          placeholder="Enter a new address"
          className="border w-full py-4 pl-12 rounded-md"
          value={currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
        />
        <Image
          src={marker}
          alt="location icon"
          className="absolute left-3 top-4"
        />
      </div>

      {currentLocation.length > 0 && (
        <button className="text-white text-center mt-3 bg-primColor rounded-md w-full py-4 text-sm">
          Continue
        </button>
      )}
    </form>
  );
};

export default ChooseLocation;
