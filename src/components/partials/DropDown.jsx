import React from "react";

const DropDown = ({ title, options, func }) => {
  return (
    <div>
      <select onChange={func}
        defaultValue="title"
        className="bg-zinc-600/[.3] rounded-md py-1 px-4 text-xl outline-none border-none backdrop-blur-sm capitalize font-medium tracking-normal"
      >
        <option disabled value="title">
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>{o.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
