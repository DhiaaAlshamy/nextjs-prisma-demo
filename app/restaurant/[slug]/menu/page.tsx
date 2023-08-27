import React from "react";
import Link from "next/link";
import { RestaurantNavBar, Menu } from "@/app/components";
import { Item, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const fetchMenuItmes = async (slug: string): Promise<Item[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    include: {
      items: true,
    },
  });
  if (!restaurant) {
    throw new Error("");
  }
  return restaurant.items;
};
async function RestaurantMenuPage({ params }: { params: { slug: string } }) {
  const items = await fetchMenuItmes(params.slug);
  // console.log(params);
  return (
    <>
      {/* HEADER */} {/* DESCRIPTION PORTION */}
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug} />
        <Menu items={items} />
      </div>
    </>
  );
}

export default RestaurantMenuPage;
