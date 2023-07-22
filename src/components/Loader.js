import React from "react";
import { Audio } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <Audio
        height="60"
        width="60"
        radius="9"
        color="blue"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
      <div className="text-white text-2xl">Loading...</div>
    </div>
  );
}

export default Loader;
