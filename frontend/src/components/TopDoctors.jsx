import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors, currencySymbol } = useContext(AppContext)

  return (
    <section className='py-10 sm:py-14'>
      {/* Section Header */}
      <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8'>
        <div>
          <span className='inline-block px-3 py-1 rounded-full bg-teal-50 text-[#0D9488] text-[11px] font-semibold tracking-wider uppercase mb-2'>
            Accredited Doctors
          </span>
          <h2 className='text-xl sm:text-2xl font-serif font-bold text-gray-900'>
            Top Doctors to Book
          </h2>
          <p className='text-xs sm:text-sm text-gray-500 mt-1'>
            Browse newly added specialists across all clinical categories.
          </p>
        </div>

        <button
          onClick={() => {
            navigate('/doctors')
            scrollTo(0, 0)
          }}
          className='self-start sm:self-auto inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0D9488] hover:text-[#0f766e]'
        >
          <span>View All ({doctors.length})</span>
          <span>→</span>
        </button>
      </div>

      {/* Doctor Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            key={index}
            className='bg-white rounded-2xl border border-gray-150 shadow-2xs hover:shadow-md hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between'
          >
            {/* Image Box */}
            <div className='relative w-full h-52 sm:h-48 md:h-52 bg-blue-50 overflow-hidden'>
              <img
                className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500'
                src={item.image}
                alt={item.name}
              />

              {/* Availability Badge */}
              <div className='absolute top-2.5 left-2.5'>
                <div
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-xs ${
                    item.available
                      ? 'bg-white/95 text-emerald-700'
                      : 'bg-white/95 text-rose-600'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.available ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  ></span>
                  <span>{item.available ? 'Available' : 'Unavailable'}</span>
                </div>
              </div>

              {/* Rating Tag */}
              <div className='absolute top-2.5 right-2.5 bg-gray-900/70 backdrop-blur-md text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-1'>
                <span className='text-amber-400'>★</span>
                <span>4.9</span>
              </div>
            </div>

            {/* Doctor Info */}
            <div className='p-3.5 sm:p-4 flex flex-col flex-1 justify-between'>
              <div>
                <p className='text-[11px] font-bold text-[#0D9488] uppercase tracking-wider mb-0.5'>
                  {item.speciality}
                </p>
                <h3 className='text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#0D9488] transition-colors truncate'>
                  {item.name}
                </h3>
                <p className='text-xs text-gray-400 mt-0.5 truncate'>
                  {item.degree || 'MBBS'} • {item.experience || '5 Yrs'}
                </p>
              </div>

              {/* Card Footer: Fee & Action */}
              <div className='mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between'>
                <div>
                  <span className='text-[10px] text-gray-400 block'>Fee</span>
                  <span className='text-xs sm:text-sm font-bold text-gray-900'>
                    {currencySymbol || '$'}{item.fees || 50}
                  </span>
                </div>
                <span className='inline-flex items-center gap-1 text-xs font-semibold text-[#0D9488] group-hover:translate-x-0.5 transition-transform'>
                  <span>Book</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <div className='mt-8 text-center'>
        <button
          onClick={() => {
            navigate('/doctors')
            scrollTo(0, 0)
          }}
          className='inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0f766e] text-white px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-xs transition-all'
        >
          <span>Explore All 50+ Doctors</span>
          <span>→</span>
        </button>
      </div>
    </section>
  )
}

export default TopDoctors