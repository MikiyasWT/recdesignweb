import React from "react";



export const CustomButton = ({ onchange, text }) => {
  return (
    <button
      onClick={(e) => onchange(e)}
      className="w-full lg:w-[433px] h-12 bg-blue-500 rounded-[10px] mt-6 border text-white border-blue-500"
    >
      {text}
    </button>
  );
};
