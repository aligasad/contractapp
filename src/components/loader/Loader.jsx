import React from "react";
import logo from '../../assets/logo.png'

function Loader() {
  return (
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
          <span className="tracking-widest">
            <img src={logo} alt="lolo" className="h-14" />
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
