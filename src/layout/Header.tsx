import React, { useState } from 'react'
import logo from "../../public/assets/img/logo.png"

export default function Header() {


    return (
        <header className="w-full flex justify-between items-center px-6 shadow-md transition-colors duration-300">
            {/* Logo hissəsi */}
            <div className="text-2xl font-bold text-[#407BFF] cursor-pointer">
                <img src={logo} width={100} height={50} style={{objectFit:"contain"}}/>
            </div>
            {/* Button (dark/light mode üçün) */}
            <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300" id="theme-toggle">
                🌙
            </button>
        </header>


    )
}
