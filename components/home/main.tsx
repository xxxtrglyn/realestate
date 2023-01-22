import React from "react";
import Land from "./land";
import { IconSearch } from "@tabler/icons";
import Dropdown from "../dropdown";

const Main = () => {
  return (
    <main className="h-full px-12">
      <div className="flex my-5 gap-5">
        <div className="flex-[2] bg-neutral-200 py-2 px-3 rounded-lg shadow-md flex items-center">
          <IconSearch size={20} />
          <input
            type="search"
            className="flex-1 outline-none bg-transparent ml-2"
            placeholder="Enter an address city or ZIP code"
          />
        </div>
        <Dropdown />
        <Dropdown />
        <Dropdown />
        <Dropdown />
        <Dropdown />
      </div>
      <div className="flex flex-wrap gap-5 h-4/5 justify-center"></div>
    </main>
  );
};

export default Main;
