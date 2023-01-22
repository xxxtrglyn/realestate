import React from "react";
import { IconChevronDown } from "@tabler/icons";

const Dropdown = () => {
  return (
    <div className="group relative cursor-pointer bg-neutral-200 rounded-md flex items-center px-3 justify-between">
      <div className="rounded-md flex items-center">
        <span>For Sale</span>
        <IconChevronDown />
      </div>
      <ul className="group-hover:block hidden absolute border border-solid top-full w-full left-0">
        <li className="px-4 cursor-pointer bg-neutral-200 z-50 text-center hover:bg-neutral-300 transition-all">
          New
        </li>
        <li className="px-4 cursor-pointer bg-neutral-200 z-50 text-center hover:bg-neutral-300 transition-all">
          New
        </li>
        <li className="px-4 cursor-pointer bg-neutral-200 z-50 text-center hover:bg-neutral-300 transition-all">
          New
        </li>
        <li className="px-4 cursor-pointer bg-neutral-200 z-50 text-center hover:bg-neutral-300 transition-all">
          New
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
