import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  if (relDoc.length === 0) return null;

  return (
    <section className='py-10 sm:py-12 border-t border-gray-150 mt-10'>
      {/* Section Header */}
      <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6'>
        <div>
          <span className='inline-block px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0D9488] text-[10px] font-semibold tracking-wider uppercase mb-1'>
            Recommended
          </span>
          <h2 className='text-lg sm:text-xl font-serif font-bold text-gray-900'>
            More {speciality} Doctors
          </h2>
          <p className='text-xs text-gray-500 mt-0.5'>
            Other accredited practitioners in this department.
          </p>
        </div>

        <button
          onClick={() => {
            navigate(`/doctors/${speciality}`);
            scrollTo(0, 0);
          }}
          className='text-xs font-semibold text-[#0D9488] hover:underline self-start sm:self-auto'
        >
          View all in {speciality} →
        </button>
      </div>

      {/* Doctor Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className='bg-white rounded-2xl border border-gray-150 shadow-2xs hover:shadow-md hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between'
          >
            {/* Image Box */}
            <div className='relative w-full h-48 bg-blue-50 overflow-hidden'>
              <img
                className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500'
                src={item.image}
                alt={item.name}
              />

              {/* Availability Badge */}
              <div className='absolute top-2 left-2'>
                <div
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md shadow-xs ${
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
            </div>

            {/* Doctor Info */}
            <div className='p-3 flex flex-col flex-1 justify-between'>
              <div>
                <p className='text-[10px] font-bold text-[#0D9488] uppercase tracking-wider mb-0.5'>
                  {item.speciality}
                </p>
                <h3 className='text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#0D9488] transition-colors truncate'>
                  {item.name}
                </h3>
                <p className='text-[11px] text-gray-400 mt-0.5 truncate'>
                  {item.degree || 'MBBS'} • {item.experience || '5 Yrs'}
                </p>
              </div>

              {/* Card Footer */}
              <div className='mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between'>
                <div>
                  <span className='text-[9px] text-gray-400 block'>Fee</span>
                  <span className='text-xs font-bold text-gray-900'>
                    {currencySymbol || '$'}{item.fees || 50}
                  </span>
                </div>
                <span className='text-[11px] font-semibold text-[#0D9488] group-hover:translate-x-0.5 transition-transform'>
                  Book →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedDoctors;