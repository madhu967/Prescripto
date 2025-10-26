import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium mb-4'>All Doctors</h1>

  
      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
        {doctors.map((item, index) => (
          <div
            key={index}
            className='border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group transition-all hover:shadow-md'
          >
            <img
              className='bg-indigo-50 group-hover:bg-[#5f6FFF] transition-all duration-500 w-full h-40 object-cover'
              src={item.image}
              alt={item.name}
            />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-2 text-sm'>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} readOnly />
                <span>{item.available ? "Available" : "Unavailable"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
