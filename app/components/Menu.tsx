import React from "react";
import { MenuCard } from ".";
import { Item } from "@prisma/client";

function Menu({ items }: { items: Item[] }) {
  return (
    <>
      {/* MENU */}
      <main className="bg-white mt-5">
        <div>
          <div className="mt-4 pb-1 mb-1">
            <h1 className="font-bold text-4xl">Menu</h1>
          </div>
          <div className="flex flex-wrap justify-between">
            {items.map((item) => (
              <MenuCard item={item} />
            ))}
          </div>
        </div>
      </main>
      {/* MENU */}
    </>
  );
}

export default Menu;
