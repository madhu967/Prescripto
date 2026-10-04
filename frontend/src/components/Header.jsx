import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Header = () => {
  const navigate = useNavigate()
  const [selectedSpeciality, setSelectedSpeciality] = useState('')

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (selectedSpeciality) {
      navigate(`/doctors/${selectedSpeciality}`)
    } else {
      navigate('/doctors')
    }
  }

  return (
    <section className='relative pt-6 pb-12 sm:pb-16 overflow-hidden'>
      {/* Ambient background tints on crisp white canvas */}
      <div className='absolute top-0 right-1/4 w-96 h-96 bg-teal-50/70 rounded-full blur-3xl pointer-events-none -z-10'></div>
      <div className='absolute bottom-10 left-0 w-80 h-80 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none -z-10'></div>

      <div className='flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14'>
        
        {/* Left Column: Heading & Search */}
        <div className='w-full lg:w-7/12 flex flex-col items-start'>
          
          {/* Status Pill */}
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#0D9488] text-xs font-semibold tracking-wide mb-4 shadow-2xs'>
            <span className='w-2 h-2 rounded-full bg-[#0D9488] animate-pulse'></span>
            <span>50+ Certified Doctors Ready for Booking</span>
          </div>

          {/* Editorial Headline */}
          <h1 className='text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-gray-900 leading-[1.2] sm:leading-[1.18] tracking-tight mb-3'>
            Exceptional Healthcare, <br />
            <span className='text-[#0D9488]'>Guided by Trusted</span> Specialists.
          </h1>

          {/* Subtitle */}
          <p className='text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl mb-6'>
            Experience modern, compassionate medical care without the waiting lines. Connect with verified physicians, schedule open slots instantly, and manage your family health seamlessly.
          </p>

          {/* Fast-Booking Search Widget */}
          <form
            onSubmit={handleSearch}
            className='w-full max-w-lg bg-white rounded-2xl border border-gray-200/80 p-2 shadow-md shadow-teal-950/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-5'
          >
            <div className='flex-1 px-3 py-1.5'>
              <label className='block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5'>
                Clinical Speciality
              </label>
              <select
                value={selectedSpeciality}
                onChange={(e) => setSelectedSpeciality(e.target.value)}
                className='w-full bg-transparent text-sm font-semibold text-gray-800 outline-none cursor-pointer'
              >
                <option value=''>All Medical Specialties</option>
                {specialities.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <button
              type='submit'
              className='bg-[#0D9488] hover:bg-[#0f766e] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95'
            >
              <span>Find Doctor</span>
              <span>→</span>
            </button>
          </form>

          {/* Popular Category Chips */}
          <div className='flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-5'>
            <span className='font-semibold text-gray-400 text-[11px] uppercase tracking-wider'>Popular:</span>
            {specialities.slice(0, 4).map((spec, i) => (
              <button
                key={i}
                type='button'
                onClick={() => navigate(`/doctors/${spec}`)}
                className='px-2.5 py-1 rounded-full bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-200 text-gray-600 hover:text-[#0D9488] text-xs transition-colors'
              >
                {spec}
              </button>
            ))}
          </div>

          {/* Trust Guarantees */}
          <div className='flex items-center gap-5 pt-4 border-t border-gray-100 text-xs text-gray-500'>
            <div className='flex items-center gap-1.5'>
              <span className='text-[#0D9488] font-bold'>✓</span>
              <span>Verified Degrees</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='text-[#0D9488] font-bold'>✓</span>
              <span>Zero Wait Time</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='text-[#0D9488] font-bold'>✓</span>
              <span>Free Online Booking</span>
            </div>
          </div>

        </div>

        {/* Right Column: Hero Visual - Natural, 100% Uncut */}
        <div className='w-full lg:w-5/12 flex justify-center lg:justify-end'>
          <div className='relative w-full max-w-md'>
            
            {/* Background Accent Card */}
            <div className='absolute inset-0 bg-gradient-to-tr from-teal-100/60 via-emerald-50/40 to-teal-50 rounded-3xl transform rotate-1 -z-10'></div>
            
            {/* Main Doctor Photograph: Fully Visible, Never Cut Top or Bottom */}
            <div className='bg-white rounded-3xl p-2.5 shadow-xl shadow-teal-950/10 border border-slate-100'>
              <img
                src='https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80'
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = assets.header_img
                }}
                alt='Certified Doctor Specialist'
                className='w-full h-auto max-h-[460px] object-cover object-top rounded-2xl'
              />

              {/* Clean Bottom Credential Badge */}
              <div className='p-3 bg-white flex items-center justify-between text-xs text-gray-600'>
                <div>
                  <p className='font-bold text-gray-900'>Dr. James Wilson, MD</p>
                  <p className='text-[11px] text-gray-400'>Senior Consultant • 50+ Doctors Online</p>
                </div>
                <div className='text-right'>
                  <span className='inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full'>
                    Available Today
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Header