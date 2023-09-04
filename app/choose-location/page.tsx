'use client'
import Image from 'next/image'
import location from '@/public/assets/location.svg'
import marker from "@/public/assets/marker.svg";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
const ChooseLocation = () => {

    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY"
  })

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
      <div className="w-full cursor-pointer text-primColor border border-primColor flex items-center justify-center gap-x-2 rounded-md py-4 mb-5 hover:bg-primColor hover:text-white hover:border-none">
        <Image src={location} alt="location icon"/>
        <p>Use current location</p>
        </div>
        <div className='relative max-w-full'>
      <input type="text" placeholder="Enter a new address" className="border w-full py-4 pl-12 rounded-md" />
        <Image src={marker} alt="location icon" className='absolute left-3 top-4'/> 
        </div>
    </form>
  );
};

export default ChooseLocation;
