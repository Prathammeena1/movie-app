import React, { useState } from "react";

const TopNav = () => {
  const [query, setquery] = useState('')
  return (
    <div className="p-1 mx-auto flex items-center w-1/2 ">
      <i className="ri-search-line text-xl"></i>
      <input
      onChange={(e)=> setquery(e.target.value)}
      value={query}
        type="text"
        placeholder="Search Here..."
        className="bg-transparent outline-none ml-10 mr-4 text-xl w-[60%]"
      />
      {query.trim() !== '' && <i onClick={()=> setquery('')} className="ri-close-large-line"></i>}
    </div>
  );
};

export default TopNav;
