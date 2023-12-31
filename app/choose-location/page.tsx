"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import location from "@/public/assets/location.svg";
import marker from "@/public/assets/marker.svg";
import close from "@/public/assets/close.svg";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  clearLocation,
  updateLocation,
} from "@/features/location/locationSlice";
import { suggestionProps } from "@/utils/types";
import { toast } from "react-toastify";
import Suggestion from "@/components/location-suggestions";

const ChooseLocation = () => {
  const dispatch = useDispatch();
  const locStore = useSelector((store: any) => store.location);
  const [suggestions, setSuggestions] = useState([]);
  const [LAT, setLAT] = useState(0);
  const [LONG, setLONG] = useState(0);
  const apiKey = process.env.NEXT_PUBLIC_RADAR_MAPS_API_KEY;

  const autoCompleteUrl = `https://api.radar.io/v1/search/autocomplete?query=${encodeURIComponent(
    locStore
  )}&near=`;
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
        const locationData = data.addresses[0].formattedAddress;
        dispatch(updateLocation(locationData));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        toast.error('Error getting location')
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
      });
    } else {
      toast.warn("Please allow location to use this app ");
    }
  }

  function searchLocation(e: ChangeEvent<HTMLInputElement>) {
    dispatch(updateLocation(e.target.value));

    fetch(autoCompleteUrl, {
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
        setSuggestions(data.addresses);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        toast.error('Error getting location suggestions')

      });
  }

  return (
    <form className="w-full p-4 bg-white text-secColor">
      <div className="w-full mb-8 text-center">
        <h3 className="text-3xl mb-4 text-[#010F07]">
          Find restaurants near you
        </h3>
        <p className="text-sm ">
          Please enter your location or allow access to your location to find
          restaurants near you.
        </p>
      </div>
      {locStore.length < 1 && (
        <div
          onClick={useCurrentLocation}
          className="w-full cursor-pointer  text-primColor border border-primColor flex items-center justify-center gap-x-2 rounded-md py-4 mb-5 hover:bg-primColor hover:text-white hover:border-none"
        >
          <Image src={location} alt="location icon" />
          <p>Use current location</p>
        </div>
      )}
      <div className="relative max-w-full">
        <input
          type="text"
          placeholder="Enter a new address"
          className="border w-full py-4 pl-12 rounded-md"
          value={locStore}
          onChange={searchLocation}
        />
        <Image
          src={marker}
          alt="location icon"
          className="absolute left-3 top-4"
        />
        {locStore.length > 0 && (
          <Image
            src={close}
            alt="close icon"
            className="absolute right-4 top-6 bg-[#D8D8D8] w-4 h-4 rounded-full cursor-pointer"
            onClick={() => {
              dispatch(clearLocation());
              setSuggestions([]);
            }}
          />
        )}
        <div className="mt-4 w-full max-h-[150px] overflow-auto bg-white flex flex-col">
          {suggestions.map((suggestion: suggestionProps, index: number) => {
            return <Suggestion suggestion={suggestion} index={index} />;
          })}
        </div>
      </div>

      {locStore.length > 0 && (
        <Link href="/home">
          <button className="text-white text-center mt-3 bg-primColor rounded-md w-full py-4 text-sm">
            Continue
          </button>
        </Link>
      )}
    </form>
  );
};

export default ChooseLocation;
