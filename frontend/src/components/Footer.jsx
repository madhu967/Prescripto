import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-16 pt-12 pb-10 border-t border-gray-150 text-xs text-gray-500'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-10'>
        {/* Brand Column (Span 2) */}
        <div className='lg:col-span-2 flex flex-col items-start'>
          <img className='w-40 mb-3.5' src={assets.logo} alt='Prescripto Logo' />
          <p className='text-gray-500 leading-relaxed text-xs mb-4 max-w-sm'>
            Prescripto connects patients with over 50+ board-certified medical doctors and clinical specialists. Book appointments instantly with real-time confirmation.
          </p>
          <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/50 text-[#0D9488] text-[11px] font-semibold'>
            <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
            </svg>
            <span>Verified Healthcare & Accreditation Standards</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className='text-gray-900 font-bold text-xs tracking-wider uppercase mb-3'>
            Navigation
          </h4>
          <ul className='flex flex-col gap-2 text-xs'>
            <li>
              <Link to='/' onClick={() => scrollTo(0, 0)} className='hover:text-[#0D9488] transition-colors'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/doctors' onClick={() => scrollTo(0, 0)} className='hover:text-[#0D9488] transition-colors'>
                All Doctors (50+)
              </Link>
            </li>
            <li>
              <Link to='/about' onClick={() => scrollTo(0, 0)} className='hover:text-[#0D9488] transition-colors'>
                About Us
              </Link>
            </li>
            <li>
              <Link to='/contact' onClick={() => scrollTo(0, 0)} className='hover:text-[#0D9488] transition-colors'>
                Contact & Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Clinical Specialties */}
        <div>
          <h4 className='text-gray-900 font-bold text-xs tracking-wider uppercase mb-3'>
            Specialties
          </h4>
          <ul className='flex flex-col gap-2 text-xs'>
            <li>
              <Link to='/doctors/General physician' onClick={() => scrollTo(0, 0)} className='hover:text-[#0D9488] transition-colors'>
                General Physician
              </Link>
            </li>
            <li>
              <Link to='/doctors/Gynecologist' onClick={() => scrollTo(0, 0)} className='hover:text-[#0D9488] transition-colors'>
                Gynecologist
              </Link>
            </li>
            <li>
              <Link to='/doctors/Dermatologist' onClick={() => scrollTo(0, 0)} className='hover:text-[#0D9488] transition-colors'>
                Dermatologist
              </Link>
            </li>
            <li>
              <Link to='/doctors/Pediatricians' onClick={() => scrollTo(0, 0)} className='hover:text-[#0D9488] transition-colors'>
                Pediatricians
              </Link>
            </li>
            <li>
              <Link to='/doctors/Neurologist' onClick={() => scrollTo(0, 0)} className='hover:text-[#0D9488] transition-colors'>
                Neurologist
              </Link>
            </li>
            <li>
              <Link to='/doctors/Gastroenterologist' onClick={() => scrollTo(0, 0)} className='hover:text-[#0D9488] transition-colors'>
                Gastroenterologist
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Help */}
        <div>
          <h4 className='text-gray-900 font-bold text-xs tracking-wider uppercase mb-3'>
            Get In Touch
          </h4>
          <ul className='flex flex-col gap-2.5 text-xs'>
            <div>
              <p className='font-semibold text-gray-800'>+1-212-456-7890</p>
              <p className='text-[11px] text-gray-400'>Patient Helpline</p>
            </div>
            <div>
              <p className='font-semibold text-gray-800'>care@prescripto.com</p>
              <p className='text-[11px] text-gray-400'>Online Inquiries</p>
            </div>
            <div>
              <p className='text-gray-500'>
                54709 Willms Station, Suite 350, Washington, USA
              </p>
            </div>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400'>
        <p>© 2026 Prescripto Health Technologies. All Rights Reserved.</p>
        <div className='flex items-center gap-5'>
          <span className='hover:text-gray-600 cursor-pointer'>Privacy Policy</span>
          <span className='hover:text-gray-600 cursor-pointer'>Terms of Service</span>
          <span className='hover:text-gray-600 cursor-pointer'>Accreditations</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer