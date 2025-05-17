import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center justify-between py-3 px-6  bg-white shadow-sm">
  <img className="w-10 h-10 object-contain rounded-full" src={assets.logo} alt="Logo" />
  
  <button
    onClick={() => setToken('')}
    className="bg-gray-400 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md text-sm shadow-sm transition duration-200"
  >
    Logout
  </button>
</div>
  )
}

export default Navbar
