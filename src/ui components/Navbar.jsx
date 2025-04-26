import React, { useEffect, useState } from 'react'
import ThemeSwitcher from '../components/ThemeSwitcher'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { getCookie, setCookie } from 'react-use-cookie'
import { ResetSellerItemReviewSlice } from '../slices/seller/SellerItemReview'
import { ResetSellerItemSlice } from '../slices/seller/SellerItemsSlice'
import { ResetSellerOrderSlice } from '../slices/seller/SellerOrderSlice'
import { ResetSellerProfileSlice } from '../slices/seller/SellerProfile'
import { ResetSellerSingleItemSlice } from '../slices/seller/SellerSingleItemSlice'
import { ResetSellerDashboardSlice } from '../slices/seller/SellerDashboardSlice'
import { ChangeTheme } from '../slices/ThemeSlice'
import { UpdateAuthenticationInStore } from '../slices/AuthenticationSlice'

const Navbar = ({
    buttons,
    mode,
    totalItemsInCart,
    totalPrice,
    homeNavigateLink,
    dashboardNavigateLink,
    profileNavigateLink,
    profileUrl

}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {

  
    dispatch(ResetSellerItemReviewSlice())
    dispatch(ResetSellerItemSlice())
    dispatch(ResetSellerOrderSlice())
    dispatch(ResetSellerProfileSlice())
    dispatch(ResetSellerSingleItemSlice())
    dispatch(ResetSellerDashboardSlice())
    dispatch(UpdateAuthenticationInStore({authenticated: false}))

    setCookie('_id', null)
    setCookie('accessToken', null)
    setCookie('profilePicUrl', null)
    
    navigate('/login')
  
  }

  // theme
  const themeMode = useSelector(state => state.themeStore.mode)

  // user
  const [profilePicUrl, setProfilePicUrl] = useState('')

  // cart
  const [noOfItemsInCart, setNoOfItemsInCart] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  
  // navigate
  const [shopiVerseNavigateLink, setShopiVerseNavigateLink] = useState('')
  const [profileNavigate, setProfileNavigate] = useState('')
  
  // app mode
  const [appMode, setAppMode] = useState(mode)

  useEffect(() => {

    setAppMode(mode),
    setProfilePicUrl(profileUrl)
    setNoOfItemsInCart(totalItemsInCart)
    setTotalAmount(totalPrice)
    setShopiVerseNavigateLink(homeNavigateLink)
    setProfileNavigate(profileNavigateLink)

    console.log('BUTTON RECEIVED IN NAVBAR', buttons);
    

  }, [mode, totalItemsInCart, totalPrice, profileUrl])


  return (
    <div>
      <div className={`fixed top-0 backdrop-blur-xl z-50 navbar ${themeMode == 'light' ? 'bg-cyan-700 text-primary-content' : 'bg-transparent border-b-blue-300 border-b-2'}`}>

        {/* Start section (menu bar on small screens) */}
        <div className="flex-none md:hidden">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
              {buttons?.map((button) => (
                <li key={button.text}>
                  <Button classes={button.classes} text={button.text} onClick={button.onClick} />
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        {/* Center section (ShopiVerse) */}
        <div className="flex-1 justify-center md:justify-start">
          <Link to={mode == 'seller' ? dashboardNavigateLink : homeNavigateLink} className="btn btn-ghost text-xl">ShopiVerse</Link>
        </div>
  
        {/* Buttons (visible only on md and above) */}
        {buttons?.length > 0 &&
          <div className="hidden md:flex flex-10 navbar-center items-center justify-center space-x-5">
            {buttons.map((button) => (
              <div key={button.text}>
                <Button classes={button.classes} text={button.text} onClick={button.onClick} />
              </div>
            ))}
          </div>
        }
  
        {/* End section (Cart & Profile) */}
        <div className="flex-none">
  
          {appMode == 'customer' &&
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 
                        0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="badge badge-sm indicator-item">{noOfItemsInCart}</span>
                </div>
              </div>
              <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-10 mt-3 w-52 shadow">
                <div className="card-body">
                  <span className="text-lg font-bold">{noOfItemsInCart}</span>
                  <span className="text-info">{totalAmount}</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">View cart</button>
                  </div>
                </div>
              </div>
            </div>
          }
  
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-online">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={profilePicUrl != '' ? profilePicUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              <li>
                <Link to={profileNavigate} className="justify-between">Profile</Link>
              </li>
              <li>
                <details>
                  <summary>Theme</summary>
                  <ul className="p-2">
                    <li><ThemeSwitcher /></li>
                  </ul>
                </details>
              </li>
              <li onClick={handleLogout}>
              <Link className="justify-between">Logout</Link>
              </li>
            </ul>
          </div>
  
        </div>
      </div>
    </div>
  )
  


}

export default Navbar