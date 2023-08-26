import Image from "next/image";
import Link from "next/link";
import { NavBar, RestaurantCard, Header } from "@/components/index";
import { PrismaClient } from "@prisma/client";
import { RestaurantType } from "@/types/restaurant";

const prisma = new PrismaClient();
async function fetchRestaurants() {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      main_image: true,
      cuisine: true,
      slug: true,
    },
  });
  return restaurants;
  // console.log(restaurants);
}
export default async function Home() {
  const restaurants = await fetchRestaurants();
  // console.log({ res });
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <main>
          <Header />
          <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
            {restaurants.map((restaurant) => (
              <RestaurantCard {...restaurant} />
            ))}
          </div>
        </main>
      </main>
    </main>
  );
}
