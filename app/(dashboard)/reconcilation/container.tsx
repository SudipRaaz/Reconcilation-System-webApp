import React from "react";

type Param = {
  title: String;
  value: String;
};

const CardContainer = ({ title , value}: Param) => {
  return (
    <div className="bg-slate-500 rounded-lg items-center justify-center flex-1 min-w-[300px] w-full">
      <p className="flex justify-center m-2 text-white">{title} : {value}</p>
      <div className="text-white-400"> </div>
    </div>
  );
};

export default CardContainer;
