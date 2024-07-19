import React from "react";

const HorizontalCards = () => {
  return (
    <div className="w-full h-[50vh] p-5 overflow-y-hidden flex flex-col justify-between gap-4">
      <h1 className="text-2xl text-zinc-200 mb-2">Trending</h1>
      <div className="w-full h-full overflow-x-auto flex gap-2">
        <div className="w-[20%] h-full bg-zinc-700 flex-shrink-0 rounded">

        </div>
      </div>
    </div>
  );
};

export default HorizontalCards;
