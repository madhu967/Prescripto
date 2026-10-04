import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const navigate = useNavigate()
  const [docInfo, setDocInfo] = useState(null)

  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    if (!docInfo || !docInfo.slots_booked) return
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + '_' + month + '_' + year
        const slotTimeStr = formattedTime

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTimeStr)
            ? false
            : true

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login to book an appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      return toast.warn('Please select an appointment time slot')
    }

    try {
      const date = docSlots[slotIndex][0].dateTime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + '_' + month + '_' + year

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return (
    docInfo && (
      <div className='py-6 sm:py-8'>
        {/* Doctor Details Section */}
        <div className='bg-white rounded-2xl border border-gray-150 shadow-2xs p-5 sm:p-7 mb-8'>
          <div className='flex flex-col md:flex-row gap-6 lg:gap-8 items-start'>
            {/* Doctor Image */}
            <div className='w-full md:w-64 flex-shrink-0'>
              <div className='relative rounded-xl overflow-hidden bg-slate-50 border border-teal-100 shadow-2xs'>
                <img
                  className='w-full h-64 sm:h-72 object-cover object-top'
                  src={docInfo.image}
                  alt={docInfo.name}
                />
                <div className='absolute top-2.5 left-2.5'>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md shadow-xs ${docInfo.available ? 'bg-white/95 text-emerald-700' : 'bg-white/95 text-rose-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${docInfo.available ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                    <span>{docInfo.available ? 'Available' : 'Unavailable'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className='flex-1 flex flex-col justify-between h-full'>
              <div>
                <div className='flex flex-wrap items-center gap-2 mb-1.5'>
                  <span className='px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0D9488] text-[10px] font-bold uppercase tracking-wider'>
                    {docInfo.speciality}
                  </span>
                  <span className='px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-semibold'>
                    {docInfo.experience || '5 Yrs'}
                  </span>
                </div>

                <h1 className='text-2xl sm:text-3xl font-serif font-bold text-gray-900 flex items-center gap-2 mb-1'>
                  <span>{docInfo.name}</span>
                  <img className='w-5 h-5' src={assets.verified_icon} alt='Verified' />
                </h1>

                <p className='text-xs text-gray-500 mb-4'>
                  {docInfo.degree} • Board Certified Specialist
                </p>

                {/* About Box */}
                <div className='bg-slate-50/60 rounded-xl p-4 border border-slate-100 mb-4'>
                  <h3 className='text-xs font-bold text-gray-800 flex items-center gap-1.5 mb-1'>
                    <span>About Physician</span>
                    <img className='w-3 h-3 opacity-50' src={assets.info_icon} alt='' />
                  </h3>
                  <p className='text-xs text-gray-600 leading-relaxed'>
                    {docInfo.about}
                  </p>
                </div>
              </div>

              {/* Fee & Assurance Card */}
              <div className='p-3.5 rounded-xl bg-teal-50/50 border border-teal-100/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                <div>
                  <span className='text-[10px] text-gray-400 block'>Consultation Fee</span>
                  <span className='text-xl font-bold text-gray-900'>
                    {currencySymbol}{docInfo.fees}
                  </span>
                </div>
                <div className='text-[11px] text-teal-800 font-medium flex items-center gap-1.5'>
                  <span className='w-1.5 h-1.5 rounded-full bg-[#0D9488]'></span>
                  <span>Instant slot confirmation • Zero booking fee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Slots Card */}
        <div className='bg-white rounded-2xl border border-gray-150 shadow-2xs p-5 sm:p-7 mb-8'>
          <div className='mb-4'>
            <h2 className='text-lg sm:text-xl font-serif font-bold text-gray-900'>
              Select Appointment Slot
            </h2>
            <p className='text-xs text-gray-500 mt-0.5'>
              Choose a date and an available consultation window below.
            </p>
          </div>

          {/* Days Carousel */}
          <div className='flex gap-2.5 items-center w-full overflow-x-auto pb-3'>
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`flex flex-col items-center justify-center min-w-[64px] py-2.5 rounded-xl cursor-pointer transition-all ${
                    slotIndex === index
                      ? 'bg-[#0D9488] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <span className='text-[10px] font-bold uppercase'>
                    {item[0] && daysOfWeek[item[0].dateTime.getDay()]}
                  </span>
                  <span className='text-sm font-bold mt-0.5'>
                    {item[0] && item[0].dateTime.getDate()}
                  </span>
                </button>
              ))}
          </div>

          {/* Time Slots */}
          <div className='mt-4 pt-4 border-t border-gray-100'>
            <p className='text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5'>
              Available Times
            </p>
            <div className='flex flex-wrap items-center gap-2'>
              {docSlots.length > 0 && docSlots[slotIndex]?.length > 0 ? (
                docSlots[slotIndex].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      item.time === slotTime
                        ? 'bg-[#0D9488] text-white shadow-xs'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </button>
                ))
              ) : (
                <p className='text-xs text-gray-400 italic'>
                  No open slots for this day. Please pick another date.
                </p>
              )}
            </div>
          </div>

          {/* Book CTA */}
          <div className='mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
            <div>
              {slotTime && docSlots[slotIndex]?.[0] ? (
                <p className='text-xs text-gray-600'>
                  Selected:{' '}
                  <span className='font-bold text-gray-900'>
                    {daysOfWeek[docSlots[slotIndex][0].dateTime.getDay()]},{' '}
                    {docSlots[slotIndex][0].dateTime.getDate()}{' '}
                    at {slotTime}
                  </span>
                </p>
              ) : (
                <p className='text-xs text-gray-400'>Select a time slot above</p>
              )}
            </div>

            <button
              onClick={bookAppointment}
              className='bg-[#0D9488] hover:bg-[#0f766e] text-white px-7 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-xs transition-all'
            >
              Confirm Appointment
            </button>
          </div>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  )
}

export default Appointment