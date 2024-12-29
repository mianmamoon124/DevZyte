"use client";

const Check = () => {
  return (
    <div className="relative bg-black text-white p-10 h-[300px] flex flex-col justify-end">
      {/* Background large number */}
      <div className="absolute top-4  text-[100px] font-bold text-gray-300 opacity-30 leading-none select-none">
        #02
      </div>

      {/* UI/UX Design Text */}
      <div className="absolute top-[65px]  text-white text-[50px] font-semibold opacity-70">
        UI / UX Design
      </div>

      {/* Main Heading */}
      <div className="relative z-10 text-[85px] font-bold">
        Concept
      </div>
    </div>
  );
};

export default Check;
