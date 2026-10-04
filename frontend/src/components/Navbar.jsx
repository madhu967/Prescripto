import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <header className='sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all'>
      <div className='flex items-center justify-between py-3.5'>
        {/* Logo */}
        <div 
          onClick={() => navigate('/')} 
          className='flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]'
        >
          <img
            className='w-40 sm:w-44 object-contain'
            src={assets.logo}
            alt='Prescripto Logo'
          />
        </div>

        {/* Navigation Links */}
        <nav className='hidden md:flex items-center gap-7 text-[13px] font-semibold tracking-wider text-gray-700'>
          <NavLink 
            to='/' 
            className={({ isActive }) => 
              `relative py-1 transition-colors hover:text-[#0D9488] ${isActive ? 'text-[#0D9488]' : 'text-gray-600'}`
            }
          >
            {({ isActive }) => (
              <>
                <span>HOME</span>
                {isActive && (
                  <span className='absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#0D9488] rounded-full'></span>
                )}
              </>
            )}
          </NavLink>

          <NavLink 
            to='/doctors' 
            className={({ isActive }) => 
              `relative py-1 transition-colors hover:text-[#0D9488] ${isActive ? 'text-[#0D9488]' : 'text-gray-600'}`
            }
          >
            {({ isActive }) => (
              <>
                <span>ALL DOCTORS</span>
                {isActive && (
                  <span className='absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#0D9488] rounded-full'></span>
                )}
              </>
            )}
          </NavLink>

          <NavLink 
            to='/about' 
            className={({ isActive }) => 
              `relative py-1 transition-colors hover:text-[#0D9488] ${isActive ? 'text-[#0D9488]' : 'text-gray-600'}`
            }
          >
            {({ isActive }) => (
              <>
                <span>ABOUT</span>
                {isActive && (
                  <span className='absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#0D9488] rounded-full'></span>
                )}
              </>
            )}
          </NavLink>

          <NavLink 
            to='/contact' 
            className={({ isActive }) => 
              `relative py-1 transition-colors hover:text-[#0D9488] ${isActive ? 'text-[#0D9488]' : 'text-gray-600'}`
            }
          >
            {({ isActive }) => (
              <>
                <span>CONTACT</span>
                {isActive && (
                  <span className='absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#0D9488] rounded-full'></span>
                )}
              </>
            )}
          </NavLink>
        </nav>

        {/* Action Buttons */}
        <div className='flex items-center gap-3'>
          {token && userData ? (
            <div className='flex items-center gap-2 cursor-pointer group relative py-1'>
              <div className='w-9 h-9 rounded-full ring-2 ring-[#0D9488]/30 overflow-hidden bg-teal-50 flex items-center justify-center shadow-sm'>
                <img className='w-full h-full object-cover' src={userData.image || assets.profile_pic} alt='' />
              </div>
              <img className='w-2.5 opacity-60 group-hover:opacity-100 transition-opacity' src={assets.dropdown_icon} alt='' />
              
              <div className='absolute top-full right-0 pt-3 text-sm font-medium text-gray-700 z-50 hidden group-hover:block transition-all'>
                <div className='min-w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col gap-1'>
                  <div className='px-3 py-2 border-b border-gray-100 mb-1'>
                    <p className='font-semibold text-gray-900 truncate'>{userData.name}</p>
                    <p className='text-xs text-gray-400 truncate'>{userData.email}</p>
                  </div>
                  <p
                    onClick={() => navigate('/my-profile')}
                    className='px-3 py-2 rounded-xl hover:bg-teal-50 hover:text-[#0D9488] cursor-pointer transition-colors'
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate('/my-appointments')}
                    className='px-3 py-2 rounded-xl hover:bg-teal-50 hover:text-[#0D9488] cursor-pointer transition-colors'
                  >
                    My Appointments
                  </p>
                  <p 
                    onClick={logout} 
                    className='px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 cursor-pointer transition-colors mt-1 border-t border-gray-100'
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='bg-[#0D9488] hover:bg-[#0f766e] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-teal-700/20 active:scale-95 hidden md:inline-flex items-center gap-1.5'
            >
              <span>Create Account</span>
            </button>
          )}

          {/* Admin Login Button */}
          <a
            href='https://prescripto-dehwo2m7q-ijjimadhu-venkats-projects.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='border border-gray-200 hover:border-[#0D9488] text-gray-700 hover:text-[#0D9488] bg-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-2xs hover:shadow-sm hidden md:inline-flex items-center gap-1.5'
          >
            <span className='w-1.5 h-1.5 rounded-full bg-[#0D9488]'></span>
            <span>Admin Portal</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setShowMenu(true)}
            className='p-2 rounded-xl text-gray-600 hover:bg-gray-100 md:hidden'
            aria-label='Open Navigation Menu'
          >
            <img src={assets.menu_icon} className='w-6 h-6' alt='Menu' />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`${
          showMenu ? 'fixed inset-0 z-50 bg-black/40 backdrop-blur-xs opacity-100' : 'pointer-events-none opacity-0'
        } md:hidden transition-opacity duration-300`}
        onClick={() => setShowMenu(false)}
      >
        <div
          className={`${
            showMenu ? 'translate-x-0' : 'translate-x-full'
          } fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className='flex items-center justify-between pb-5 border-b border-gray-100'>
              <img className='w-36' src={assets.logo} alt='Prescripto' />
              <button
                onClick={() => setShowMenu(false)}
                className='p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors'
              >
                <img className='w-5 h-5' src={assets.cross_icon} alt='Close' />
              </button>
            </div>

            <nav className='flex flex-col gap-2 mt-6 text-base font-medium'>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/'
                className={({ isActive }) => 
                  `px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-teal-50 text-[#0D9488] font-semibold' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/doctors'
                className={({ isActive }) => 
                  `px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-teal-50 text-[#0D9488] font-semibold' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                All Doctors
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/about'
                className={({ isActive }) => 
                  `px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-teal-50 text-[#0D9488] font-semibold' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                About Us
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/contact'
                className={({ isActive }) => 
                  `px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-teal-50 text-[#0D9488] font-semibold' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                Contact
              </NavLink>
            </nav>
          </div>

          <div className='pt-6 border-t border-gray-100 flex flex-col gap-3'>
            {!token && (
              <button
                onClick={() => { setShowMenu(false); navigate('/login'); }}
                className='w-full bg-[#0D9488] text-white py-3 rounded-xl text-center font-medium shadow-sm'
              >
                Sign In / Register
              </button>
            )}
            <a
              href='https://prescripto-dehwo2m7q-ijjimadhu-venkats-projects.vercel.app/'
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setShowMenu(false)}
              className='w-full border border-gray-200 text-center py-3 rounded-xl text-sm font-semibold text-gray-700 hover:text-[#0D9488]'
            >
              Admin Portal →
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
