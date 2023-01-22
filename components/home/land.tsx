import React from "react";
import { IconRuler2, IconHeart, IconBed, IconBath } from "@tabler/icons";
import { House } from "@prisma/client";

const Land: React.FC<{ onSeeDetail?: () => void; value: House }> = ({
  onSeeDetail,
  value,
}) => {
  return (
    <div
      className="flex flex-col rounded-lg overflow-hidden bg-white h-72 w-64 shadow-md cursor-pointer motion-safe:hover:scale-105 transition-all"
      onClick={onSeeDetail ? onSeeDetail : void 0}
    >
      <div
        className={"flex-1 p-4 relative bg-cover"}
        style={{ backgroundImage: `url("${value.image}")` }}
      >
        <div className="flex">
          <span className="text-white px-2 py-1 border-solid rounded-lg bg-green-600 font-medium mx-2">
            New
          </span>
          <span className="text-white px-2 py-1 border-solid rounded-lg bg-blue-600 font-medium">
            For Sale
          </span>
          <div className="ml-auto border-solid bg-white rounded-md flex justify-center items-center p-[3px]">
            <IconHeart className="inline" fill="pink" color="pink" />
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <div className="font-medium">$ {value.price}</div>
        <div className="text-slate-400 leading-tight">
          {value.location || "Unknown"}
        </div>
        <div className="flex gap-2 justify-between mt-auto">
          <div className="flex flex-row items-center gap-2 bg-zinc-100 rounded-md p-2 mt-2">
            <IconBed color="orange" className="inline" />
            <span className="text-sm font-medium">{value.bedroom}</span>
          </div>
          <div className="flex flex-row items-center gap-2 bg-zinc-100 rounded-md p-2 mt-2">
            <IconBath color="blue" className="inline" />
            <span className="text-sm font-medium">{value.bathroom}</span>
          </div>
          <div className="flex flex-row items-center gap-2 bg-zinc-100 rounded-md p-2 mt-2">
            <IconRuler2 color="green" className="inline" />
            <span className="text-sm font-medium">
              {value.square}m<sup style={{ fontSize: 8 }}>2</sup>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Land;
