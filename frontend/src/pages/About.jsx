import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='py-6 sm:py-10'>
      {/* Page Header */}
      <div className='text-center max-w-xl mx-auto mb-10'>
        <span className='inline-block px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0D9488] text-[10px] font-semibold tracking-wider uppercase mb-2'>
          About Prescripto
        </span>
        <h1 className='text-2xl sm:text-3xl font-serif font-bold text-gray-900'>
          Modern Healthcare, Made Accessible
        </h1>
        <p className='text-xs sm:text-sm text-gray-500 mt-1'>
          Connecting patients with verified medical specialists through intuitive scheduling.
        </p>
      </div>

      {/* Main Story Section */}
      <div className='bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-2xs mb-12'>
        <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-10'>
          <div className='w-full lg:w-5/12'>
            <div className='rounded-xl overflow-hidden shadow-2xs border border-teal-100/60'>
              <img
                className='w-full h-64 sm:h-72 object-cover'
                src={assets.about_image}
                alt='Prescripto Healthcare Team'
              />
            </div>
          </div>

          <div className='w-full lg:w-7/12 flex flex-col justify-center text-xs sm:text-sm text-gray-600 space-y-3.5 leading-relaxed'>
            <p>
              Welcome to <span className='font-semibold text-gray-900'>Prescripto</span>, your dedicated platform for discovering and booking trusted medical specialists without long clinic hold times or uncertain waiting lines.
            </p>
            <p>
              By bringing together accredited doctors across 6 key medical categories, we provide transparent appointment booking with live slot updates.
            </p>
            <div className='p-3.5 bg-teal-50/60 border-l-2 border-[#0D9488] rounded-r-xl text-gray-800 my-1'>
              <h3 className='font-bold text-xs text-gray-900 font-serif mb-0.5'>Our Medical Standard</h3>
              <p className='text-xs text-gray-600'>
                Every listed doctor is verified with credential licensing and background review.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Advantages */}
      <div className='text-center max-w-md mx-auto mb-6'>
        <h2 className='text-lg sm:text-xl font-serif font-bold text-gray-900'>
          Why Patients Choose Prescripto
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-12'>
        <div className='bg-white rounded-xl p-5 border border-gray-150 shadow-2xs'>
          <h3 className='text-sm font-bold text-gray-900 mb-1'>Real-Time Slots</h3>
          <p className='text-xs text-gray-500 leading-relaxed'>
            View open consultation windows and reserve your preferred time in seconds.
          </p>
        </div>

        <div className='bg-white rounded-xl p-5 border border-gray-150 shadow-2xs'>
          <h3 className='text-sm font-bold text-gray-900 mb-1'>Verified Credentials</h3>
          <p className='text-xs text-gray-500 leading-relaxed'>
            All practitioners hold verified medical registrations and proven clinical experience.
          </p>
        </div>

        <div className='bg-white rounded-xl p-5 border border-gray-150 shadow-2xs'>
          <h3 className='text-sm font-bold text-gray-900 mb-1'>Zero Booking Fees</h3>
          <p className='text-xs text-gray-500 leading-relaxed'>
            Schedule appointments for free with flexible rescheduling directly from your dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About