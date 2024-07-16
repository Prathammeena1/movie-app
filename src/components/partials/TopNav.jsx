import React, { useState } from "react";
import { Link } from "react-router-dom";

const TopNav = () => {
  const [query, setquery] = useState("");
  return (
    <div className="relative p-1 mx-auto flex items-center w-1/2 ">
      <i className="ri-search-line text-xl"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        type="text"
        placeholder="Search Here..."
        className="bg-transparent outline-none ml-10 mr-4 text-xl w-[90%]"
      />
      {query.trim() !== "" && (
        <>
          <i onClick={() => setquery("")} className="ri-close-large-line"></i>{" "}
          <div className="w-full bg-zinc-200 absolute top-full flex flex-col gap-1 text-black rounded overflow-hidden">
            <Link className="py-3 px-5 flex items-center gap-4 bg-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all ease-linear duration-[.3s]">
              <img
                className="h-12 w-12 object-cover"
                src="https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg"
                alt=""
              />
              <h1 className="text-2xl capitalize">salman khan</h1>
            </Link>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default TopNav;
