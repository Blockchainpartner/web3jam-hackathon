import React from "react";

const Tech = () => {
  return (
    <div className="flex flex-col items-start justify-center flex-grow mt-12 xl:mt-0">
      <p>{"Built around"}</p>
      <div className="flex items-center justify-start gap-10">
        <img src="/tech/logo1.png" alt="Built around" />
        <img src="/tech/logo2.png" alt="Built around" />
        <img src="/tech/logo3.png" alt="Built around" />
        <img src="/tech/logo4.png" alt="Built around" />
      </div>
    </div>
  );
};

export default Tech;
