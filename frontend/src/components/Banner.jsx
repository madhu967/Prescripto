import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <section className='my-12 sm:my-16'>
      <div className='relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900 via-[#0D9488] to-teal-800 text-white shadow-lg p-6 sm:p-10 lg:p-12'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
          
          {/* Left Text & Actions */}
          <div className='w-full lg:w-3/5 flex flex-col items-start'>
            <span className='inline-block px-3 py-1 rounded-full bg-white/10 text-teal-100 text-[11px] font-semibold tracking-wider uppercase mb-3'>
              Patient Care Portal
            </span>

            <h2 className='text-xl sm:text-2xl lg:text-3xl font-serif font-bold leading-snug text-white mb-2'>
              Book Appointments with 50+ Trusted Doctors
            </h2>

            <p className='text-xs sm:text-sm text-teal-100/80 leading-relaxed max-w-md mb-6'>
              Create an account in seconds to schedule visits, manage appointments, and connect directly with clinical specialists.
            </p>

            <div className='flex flex-wrap items-center gap-3 w-full sm:w-auto'>
              <button
                onClick={() => {
                  navigate('/login')
                  scrollTo(0, 0)
                }}
                className='inline-flex items-center gap-2 bg-white hover:bg-teal-50 text-teal-900 font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm transition-all shadow-sm'
              >
                <span>Create Account</span>
                <span className='text-xs'>→</span>
              </button>

              <button
                onClick={() => {
                  navigate('/doctors')
                  scrollTo(0, 0)
                }}
                className='inline-flex items-center gap-2 bg-teal-800/60 hover:bg-teal-800/80 border border-white/20 text-white font-medium px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm transition-all'
              >
                <span>Browse All Doctors</span>
              </button>
            </div>
          </div>

          {/* Right Image Visual - Natural, Uncut */}
          <div className='w-full lg:w-2/5 flex justify-center lg:justify-end'>
            <div className='w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden border border-white/20 shadow-md bg-white/10'>
              <img
                src='https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80'
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = assets.appointment_img
                }}
                alt='Doctor Consultation'
                className='w-full h-auto max-h-56 sm:max-h-60 object-cover object-top'
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Banner