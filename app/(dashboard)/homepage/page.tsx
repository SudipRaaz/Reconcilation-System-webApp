import React from "react";

const homepage = () => {
  return (
    <div className="p-4 flex gap-4">
      <div className="w-[50%] bg-slate-400 p-3 flex items-center justify-center rounded-box">
        <button className="btn text-white">Upload File A</button>
      </div>
      <div className="w-[50%] bg-slate-400 p-3 flex items-center justify-center rounded-box">
        <button className="btn text-white">Upload File A</button>
      </div>
    </div>
  );
};

export default homepage;
