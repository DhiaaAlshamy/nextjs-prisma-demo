import React from "react";
import Link from "next/link";
import {
  NavBar,
  Title,
  Rating,
  Header,
  RestaurantNavBar,
  ReservationCard,
  Description,
  Images,
  Reviews,
} from "@/components/index";

function RestaurantsDetails() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <Header />
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[70%] rounded p-3 shadow">
            <RestaurantNavBar />
            <Title />
            <Rating />
            <Description />
            <Images />
            <Reviews />
          </div>
          <div className="w-[27%] relative text-reg">
            <ReservationCard />
          </div>
        </div>
      </main>
    </main>
  );
}

export default RestaurantsDetails;