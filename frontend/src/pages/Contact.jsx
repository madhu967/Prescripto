import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='py-6 sm:py-10'>
      {/* Header */}
      <div className='text-center max-w-xl mx-auto mb-10'>
        <span className='inline-block px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0D9488] text-[10px] font-semibold tracking-wider uppercase mb-2'>
          Support & Clinic
        </span>
        <h1 className='text-2xl sm:text-3xl font-serif font-bold text-gray-900'>
          Contact Prescripto Care
        </h1>
        <p className='text-xs sm:text-sm text-gray-500 mt-1'>
          Have questions regarding an appointment or clinic onboarding? We are here to help.
        </p>
      </div>

      {/* Main Content */}
      <div className='bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-2xs mb-12'>
        <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
          {/* Image */}
          <div className='w-full lg:w-5/12'>
            <div className='rounded-xl overflow-hidden shadow-2xs border border-teal-100/60'>
              <img
                className='w-full h-64 sm:h-72 object-cover'
                src={assets.contact_image}
                alt='Prescripto Office'
              />
            </div>
          </div>

          {/* Details */}
          <div className='w-full lg:w-7/12 flex flex-col justify-center space-y-4'>
            <div>
              <h2 className='text-base sm:text-lg font-serif font-bold text-gray-900 mb-1'>
                Office Location
              </h2>
              <p className='text-xs sm:text-sm text-gray-500 leading-relaxed'>
                54709 Willms Station, Suite 350 <br />
                Washington, D.C. 20001, USA
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100'>
              <div className='p-3 rounded-xl bg-teal-50/50 border border-teal-100'>
                <p className='text-[10px] font-bold text-[#0D9488] uppercase tracking-wider'>Phone Support</p>
                <p className='text-sm font-bold text-gray-900 mt-0.5'>+1-212-456-7890</p>
                <p className='text-[11px] text-gray-400'>Patient Help Line</p>
              </div>

              <div className='p-3 rounded-xl bg-teal-50/50 border border-teal-100'>
                <p className='text-[10px] font-bold text-[#0D9488] uppercase tracking-wider'>Email Inquiries</p>
                <p className='text-sm font-bold text-gray-900 mt-0.5'>care@prescripto.com</p>
                <p className='text-[11px] text-gray-400'>Doctor & Patient Support</p>
              </div>
            </div>

            <div className='pt-4 border-t border-gray-100'>
              <h3 className='text-sm font-bold text-gray-900 mb-1'>
                Healthcare Practitioners
              </h3>
              <p className='text-xs text-gray-500 mb-3'>
                Are you a certified doctor? Access your scheduling schedule via the portal.
              </p>
              <a
                href='https://prescripto-dehwo2m7q-ijjimadhu-venkats-projects.vercel.app/'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 bg-[#0D9488] hover:bg-[#0f766e] text-white px-5 py-2 rounded-full text-xs font-semibold shadow-2xs transition-all'
              >
                <span>Doctor Portal Login</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact