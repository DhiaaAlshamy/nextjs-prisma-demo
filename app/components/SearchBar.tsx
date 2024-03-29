"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
function SearchBar() {
  const [location, setLocation] = useState("");
  const router = useRouter();

  const searchBtnClicked = () => {
    if (location == "") return;
    router.push(`./search?city=${location}`);
    setLocation("");
  };
  return (
    <>
      <div className="text-left text-lg py-3 m-auto flex justify-center">
        <input
          className="rounded  mr-3 p-2 w-[450px]"
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          placeholder="State, city or town"
        />
        <button
          onClick={searchBtnClicked}
          className="rounded bg-red-600 px-9 py-2 text-white"
        >
          Let's go
        </button>
      </div>
    </>
  );
}

export default SearchBar;
