import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ThemeSwitcher from '../ThemeSwitcher'
import { getCookie, setCookie } from 'react-use-cookie'
import { Link, useNavigate } from 'react-router-dom'
import Search from '../../components/customer/Search'
import Button from '../Button'
import { ResetCustomerOrdersSlice } from '../../slices/customer/CustomerOrdersSlice'
import { ResetItemsInCustomerSlice } from '../../slices/customer/CustomerItemsSlice'
import { ResetItemReviewsInCustomerSlice } from '../../slices/customer/CustomerItemReviewsSlice'
import { ResetProfileInCustomerSlice } from '../../slices/customer/CustomerProfileSlice'

const Navbar = ({
  customerShopiVersaNavigateUrl,
  displaySearch,
  searchRef,
  handleSearch,
  buttons = []
  // buttons = [{'text' : 'profile'}, {'text' : 'profile'}, {'text' : 'profile'}, {'text' : 'profile'}, {'text' : 'profile'}, {'text' : 'profile'}, {'text' : 'profile'}, {'text' : 'profile'}],
}) => {
  const themeMode = useSelector(state => state.themeStore.mode)
  const profilePicUrl = getCookie('profilePicUrl')
  const [profileNavigate] = useState('/customer/profile')

  const [input, setInput] = useState('')

  const dispatch = useDispatch()
  const handleLogout = () => {  
    dispatch(ResetCustomerOrdersSlice())
    dispatch(ResetItemsInCustomerSlice())
    dispatch(ResetItemReviewsInCustomerSlice())
    dispatch(ResetProfileInCustomerSlice())
    
    setCookie('_id', null)
    setCookie('profilePicUrl', null)
    setCookie('accessToken', null)

    localStorage.clear()

    navigate('/login')

  }


  // load cart information
  const totalItems = useSelector(state => state.customerCartStore.totalItems) 
  const totalAmount = useSelector(state => state.customerCartStore.totalAmount) 
  const totalUniqueItems = useSelector(state => state.customerCartStore.totalUniqueItems) 

  const navigate = useNavigate()

  return (
    <div className={`${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div
        className={`navbar w-screen shadow-sm ${
          themeMode === 'dark'
            ? 'bg-transparent border-b-2 border-b-gray-400'
            : 'bg-gray-200'
        }`}
      >
        {/* Left side on small screen: menu button */}
        <div className="lg:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${
                themeMode === 'dark' ? 'bg-base-300 text-white' : 'bg-gray-100 text-black'
              }`}
            >
              {buttons.map((btn, index) => (
                <li key={index}>
                  <Button
                    text={btn.text}
                    classes={btn.classes}
                    disabled={btn.disabled}
                    onClick={btn.onClick}
                    id={btn.id}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand */}
        <div className="flex-1">
          <Link to={customerShopiVersaNavigateUrl ? customerShopiVersaNavigateUrl : '/home'} className={`font-bold px-5 text-2xl hover:text-cyan-600 ${themeMode === 'dark' ? 'text-white' : 'text-black'}`}>
            ShopiVerse
          </Link>
        </div>

        {/* Large Screen Buttons + Search Centered */}
        <div className="hidden lg:flex flex-[15] justify-center items-center gap-4">
          <div className="flex gap-2">
            {buttons.slice(0, Math.ceil(buttons.length / 2)).map((btn, index) => (
              <Button key={index} text={btn.text} />
            ))}
          </div>

          {displaySearch && (
            <form className='z-10 backdrop-blur-3xl' onSubmit={handleSearch}>
              <Search
                value={input}
                onChange={(e) => setInput(e.target.value)}
                searchRef={searchRef}
                labelClasses={`${
                  themeMode === 'dark'
                    ? 'text-white bg-transparent input-accent'
                    : 'text-black bg-white input-accent'
                } rounded-xl`}
              />
            </form>
          )}

          <div className="flex gap-2">
            {buttons.slice(Math.ceil(buttons.length / 2)).map((btn, index) => (
              <Button key={index} text={btn.text} />
            ))}
          </div>
        </div>

        {/* Search dropdown in center on small screens */}
        <div className="flex-15 lg:hidden flex justify-center">
          <div className="dropdown dropdown-start">
            <label tabIndex={0} className="btn btn-ghost border-blue-500 btn-primary normal-case text-sm">
              Search
            </label>
            <div
              tabIndex={0}
              className={`dropdown-content z-[1] p-2 shadow rounded-box w-72 mt-3 ${
                themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-gray-100 text-black'
              }`}
            >
              {displaySearch && (
                <form onSubmit={handleSearch}>
                  <Search
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    labelClasses={`w-full ${
                      themeMode === 'dark'
                        ? 'text-white bg-transparent input-accent'
                        : 'text-black bg-white input-accent'
                    } rounded-xl`}
                  />
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Right side: Cart and Profile */}
        <div className="flex-none flex items-center gap-4">
          {/* Cart */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{totalItems}</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className={`card card-compact dropdown-content rounded-box p-2 shadow z-1 mt-3 w-52 ${
                themeMode === 'dark' ? 'bg-transparent backdrop-blur-3xl text-white' : 'bg-gray-300 text-black'
              }`}
            >
              <div className="card-body">
                <div className="text-lg">Total Items: <span className='font-bold text-green-600'>{totalItems}</span></div>
                <div className="text-lg">Total Unique Items: <span className='font-bold text-green-600'>{totalUniqueItems}</span></div>
                <div className="">Subtotal: <span className='font-bold text-yellow-600'>{totalAmount}</span></div>
                <div className="card-actions">
                  <Button onClick={() => navigate('/customer/cart')} classes={`${themeMode == "dark" ? "bg-transparent border border-blue-500" : "bg-blue-500"} rounded-md hover:bg-blue-600 hover:bg-blue-800`} text={'View Cart'} />
                </div>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tavatar-online">
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src={
                    profilePicUrl !== ''
                      ? profilePicUrl
                      : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow ${
                themeMode === 'dark' ? 'bg-transparent backdrop-blur-3xl text-white' : 'bg-gray-300 text-black'
              }`}
            >
              <li>
                <Link to={profileNavigate} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <details>
                  <summary>Theme</summary>
                  <ul className="p-2">
                    <li>
                      <ThemeSwitcher />
                    </li>
                  </ul>
                </details>
              </li>
              <li onClick={() => navigate('/customer/orders')}>
                <Link className="justify-between">Orders</Link>
              </li>
              <li onClick={handleLogout}>
                <Link className="justify-between">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
  
}

export default Navbar
