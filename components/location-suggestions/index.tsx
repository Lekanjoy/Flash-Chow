import { updateLocation } from "@/features/location/locationSlice";
import locationGray from "@/public/assets/location-gray.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { suggestionProps } from "@/utils/types";

type suggestionProp = {
  suggestion: suggestionProps;
  index: number;
};

const Suggestion = ({ suggestion, index }: suggestionProp) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(updateLocation(suggestion.formattedAddress))}
      key={index}
      className="flex w-full h-full items-center gap-x-3"
    >
      <Image src={locationGray} alt="location icon" className="" />
      <div className="w-full flex flex-col pb-[10px] border-b">
        <p className="text-[#010F07]">{suggestion.formattedAddress}</p>
        <p className="text-secColor text-sm">
          {suggestion.county}, {suggestion.country}
        </p>
      </div>
    </div>
  );
};

export default Suggestion;
