import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <nav className='bg-white mb-4 sticky top-0 z-50 px-4 py-4 flex items-center justify-between'>
      {/* Logo */}
      <Link to='/' className='flex items-center gap-2'>
        <img src={assets.logo} className='w-10 h-10 rounded-full' alt='logo' />
        {/* <span className='text-xl font-bold text-[#1E293B]'>The Jersey Hub</span> */}
      </Link>

      {/* Desktop Nav */}
      <ul className='hidden sm:flex gap-8 text-sm font-semibold text-gray-800'>
        {['/', '/collection', '/about', '/contact'].map((path, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) =>
              `hover:text-[#007BFF] ${isActive ? 'text-[#007BFF]' : ''}`
            }
          >
            {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
          </NavLink>
        ))}
      </ul>

      {/* Right Side Icons */}
      <div className='flex items-center gap-5'>
        {/* Search */}
        {/* <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className='w-5 h-5 cursor-pointer'
          alt='search'
        /> */}

        {/* Profile */}
        <div className='relative group'>
          <img
            onClick={() => token ? null : navigate('/login')}
            src={assets.profile_icon}
            className='w-5 cursor-pointer'
            alt='profile'
          />
          {token && (
            <div className='absolute right-0 top-full hidden group-hover:block pt-2 z-50'>
              <div className='bg-white border rounded-md py-2 px-4 w-40 text-sm text-gray-700 shadow-lg'>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-[#007BFF]'>Orders</p>
                <p onClick={logout} className='cursor-pointer text-red-500 mt-2 hover:underline'>Logout</p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5' alt='cart' />
          <span className='absolute -right-2 bottom-2 bg-red-500 text-white rounded-full text-[10px] px-1'>
            {getCartCount()}
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-6 h-6 sm:hidden cursor-pointer'
          alt='menu'
        />
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-3/4 bg-white transition-transform duration-300 ease-in-out shadow-lg z-50 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex flex-col'>
          <div onClick={() => setVisible(false)} className='p-4 flex items-center gap-2 cursor-pointer border-b'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='back' />
            <span>Back</span>
          </div>
          {['/', '/collection', '/about', '/contact'].map((path, i) => (
            <NavLink
              key={i}
              onClick={() => setVisible(false)}
              className='py-3 pl-6 border-b text-gray-800 hover:bg-gray-100'
              to={path}
            >
              {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
