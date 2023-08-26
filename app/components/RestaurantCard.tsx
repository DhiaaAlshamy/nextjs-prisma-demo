import Link from "next/link";
import React from "react";
import { RestaurantType } from "@/types/restaurant";

function RestaurantCard(restaurnat: Partial<RestaurantType>) {
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <img src={restaurnat.main_image} alt="" className="w-full h-36" />
      <Link href={`restaurant/${restaurnat.slug}`}>
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurnat.name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2">77 reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurnat.cuisine?.name}</p>
            <p className="mr-3">$$$$</p>
            <p>{restaurnat.location?.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
}

export default RestaurantCard;
