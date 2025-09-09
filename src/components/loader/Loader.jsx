import React from "react";

function Loader() {
  return (
    // <div
    //   role="status"
    //   className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-green-200 dark:from-[#003d29] dark:to-[#048b5e]"
    // >
    //   <div className="relative flex flex-col items-center">
    //     {/* Animated Leaf Icon */}
    //     <svg
    //       className="w-16 h-16 text-green-500 animate-bounce drop-shadow-lg"
    //       fill="none"
    //       viewBox="0 0 48 48"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M44 4C44 4 36 44 8 44C8 44 4 24 44 4Z"
    //         fill="#4ade80"
    //         stroke="#22c55e"
    //         strokeWidth="2"
    //       />
    //       <path
    //         d="M20 38C20 38 24 28 36 12"
    //         stroke="#166534"
    //         strokeWidth="2"
    //         strokeLinecap="round"
    //       />
    //     </svg>
    //     {/* Subtle ring animation */}
    //     <div className="absolute -inset-2 rounded-full border-2 border-green-200 animate-ping opacity-40"></div>
    //   </div>
    //   <div className="mt-8 text-center">
    //     <p className="text-xl font-bold text-white animate-pulse">
    //       Bringing Nature to You...
    //     </p>
    //     <p className="text-sm text-white mt-2">
    //       Please wait while we prepare your organic experience!
    //     </p>
    //   </div>
    // </div>

    // <div
    //   role="status"
    //   className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#219C90] via-[#FFF455] to-[#EE4E4E] relative overflow-hidden"
    // >
    //   {/* Animated Glow Orbs */}
    //   <div className="absolute top-20 left-20 w-32 h-32 bg-[#219C90]/30 rounded-full blur-3xl animate-pulse"></div>
    //   <div className="absolute bottom-24 right-24 w-40 h-40 bg-[#EE4E4E]/30 rounded-full blur-3xl animate-ping"></div>

    //   {/* Logo Loader */}
    //   <div className="relative flex flex-col items-center">
    //     <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl relative overflow-hidden">
    //       {/* Spinning Border */}
    //       <div className="absolute inset-0 rounded-full border-[6px] border-t-[#219C90] border-r-[#FFF455] border-b-[#FFC700] border-l-[#EE4E4E] animate-spin-slow"></div>

    //       {/* Brand Initial */}
    //       <span className="text-3xl font-extrabold text-[#219C90] tracking-widest">
    //         W
    //       </span>
    //     </div>

    //     {/* Subtle pulse ring */}
    //     <div className="absolute w-28 h-28 rounded-full border-2 border-white/50 animate-ping"></div>
    //   </div>

    //   {/* Loading Text */}
    //   <div className="mt-10 text-center">
    //     <p className="text-3xl font-extrabold text-white drop-shadow-lg animate-pulse">
    //       WorkWhiz
    //     </p>
    //     <p className="text-base text-white/90 mt-2 tracking-wide">
    //       Powering up your smart experience...
    //     </p>
    //   </div>
    // </div>

    <div
      role="status"
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#219C90] via-[#FFF455] to-[#EE4E4E] relative overflow-hidden"
    >
      {/* Animated Glow Orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-[#219C90]/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-24 right-24 w-40 h-40 bg-[#EE4E4E]/30 rounded-full blur-3xl animate-ping"></div>

      {/* Logo Loader */}
      <div className="relative flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl relative overflow-hidden animate-bounce">
          {/* Spinning Border */}
          <div className="absolute inset-0 rounded-full border-[6px] border-t-[#219C90] border-r-[#FFF455] border-b-[#FFC700] border-l-[#EE4E4E] animate-spin-slow"></div>

          {/* Brand Initial */}
          <span className="text-3xl font-extrabold text-[#219C90] tracking-widest">
            W
          </span>
        </div>

        {/* Subtle pulse ring */}
        <div className="absolute w-28 h-28 rounded-full border-2 border-white/50 animate-ping"></div>
      </div>

      {/* Loading Text */}
      <div className="mt-10 text-center">
        <p className="text-3xl font-extrabold text-black drop-shadow-lg animate-pulse">
          WorkWhiz
        </p>
        <p className="text-base text-gray-800/90 mt-2 tracking-wide animate-fadeIn">
          Powering up your smart experience...
        </p>
      </div>
    </div>
  );
}

export default Loader;
