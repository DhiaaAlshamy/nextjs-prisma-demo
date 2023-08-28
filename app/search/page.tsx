import React from "react";
import Link from "next/link";
import { Header, SearchBar, RestaurantCard, NavBar } from "@/components/index";

import { PrismaClient } from "@prisma/client";
import { RestaurantType } from "../types/restaurant";
interface SearchParams {
  city?: string;
  cuisine?: string;
}
const prisma = new PrismaClient();

const fetchRestataurnatsByCity = async (searchParams: SearchParams) => {
  let restaurants: RestaurantType[] = [];
  if (searchParams.city)
    restaurants = await prisma.restaurant.findMany({
      where: {
        location: {
          name: { equals: searchParams.city },
        },
      },
      include: {
        location: true,
        cuisine: true,
      },
    });
  else if (searchParams.cuisine)
    restaurants = await prisma.restaurant.findMany({
      where: {
        cuisine: {
          name: { equals: searchParams.cuisine },
        },
      },
      include: {
        location: true,
        cuisine: true,
      },
    });

  return restaurants;
};
const fetchCuisins = async () => {
  const cuisines = await prisma.cuisine.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return cuisines;
};
const fetchLocations = async () => {
  const locations = await prisma.location.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return locations;
};

async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const city = searchParams;
  const restaurants = await fetchRestataurnatsByCity(searchParams);
  const cuisines = await fetchCuisins();
  const locations = await fetchLocations();
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <Header />
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          {/* SEARCH SIDE BAR */}
          <div className="w-1/5">
            <div className="border-b pb-4 flex flex-col">
              <h1 className="mb-2">Region</h1>
              {locations.map((location) => (
                <Link
                  className="font-light text-reg"
                  key={location.id}
                  href={{
                    pathname: "/search",
                    query: { city: location.name },
                  }}
                >
                  {location.name}
                </Link>
              ))}
            </div>
            <div className="border-b pb-4 mt-3 flex flex-col">
              <h1 className="mb-2">Cuisine</h1>
              {cuisines.map((cuisine) => (
                <Link
                  className="font-light text-reg"
                  key={cuisine.id}
                  href={{
                    pathname: "/search",
                    query: { cuisine: cuisine.name },
                  }}
                >
                  {cuisine.name}
                </Link>
              ))}
            </div>
            <div className="mt-3 pb-4">
              <h1 className="mb-2">Price</h1>
              <div className="flex">
                <button className="border w-full text-reg font-light rounded-l p-2">
                  $
                </button>
                <button className="border-r border-t border-b w-full text-reg font-light p-2">
                  $$
                </button>
                <button className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r">
                  $$$
                </button>
              </div>
            </div>
          </div>
          {/* SEARCH SIDE BAR */}
          <div className="w-5/6 flex flex-wrap">
            {restaurants.map((restaurant) => (
              <RestaurantCard {...restaurant} />
            ))}
          </div>
        </div>
      </main>
    </main>
  );
}

export default SearchPage;
