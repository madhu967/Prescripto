import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section className='py-10 sm:py-14 text-gray-800 scroll-mt-20' id='speciality'>
      {/* Section Header */}
      <div className='text-center max-w-xl mx-auto mb-8'>
        <span className='inline-block px-3 py-1 rounded-full bg-teal-50 text-[#0D9488] text-[11px] font-semibold tracking-wider uppercase mb-2'>
          Clinical Specialties
        </span>
        <h2 className='text-xl sm:text-2xl font-serif font-bold text-gray-900'>
          Find Care by Speciality
        </h2>
        <p className='text-xs sm:text-sm text-gray-500 mt-1.5'>
          Select a department to view accredited physicians and open slots.
        </p>
      </div>

      {/* Grid of Speciality Cards */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className='flex flex-col items-center justify-between p-4 rounded-2xl bg-white border border-gray-150 shadow-2xs hover:shadow-md hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 group text-center'
          >
            <div className='w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-teal-50/70 group-hover:bg-[#0D9488]/10 flex items-center justify-center p-3 mb-2.5 transition-all group-hover:scale-105'>
              <img
                className='w-full h-full object-contain'
                src={item.image}
                alt={item.speciality}
              />
            </div>
            
            <div>
              <p className='font-semibold text-xs sm:text-sm text-gray-800 group-hover:text-[#0D9488] transition-colors leading-tight'>
                {item.speciality}
              </p>
              <span className='inline-block text-[11px] text-gray-400 group-hover:text-[#0D9488] font-medium mt-1'>
                View Doctors →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SpecialityMenu