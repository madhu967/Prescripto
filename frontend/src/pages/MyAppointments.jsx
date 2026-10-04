import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const navigate = useNavigate()

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/list-appointment', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Prescripto Appointment Payment',
      description: 'Consultation Fee Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-razorpay', response, {
            headers: { token },
          })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className='py-6 sm:py-10'>
      <div className='mb-6 pb-3 border-b border-gray-150 flex items-center justify-between'>
        <div>
          <h1 className='text-xl sm:text-2xl font-serif font-bold text-gray-900'>
            My Scheduled Appointments
          </h1>
          <p className='text-xs text-gray-500 mt-0.5'>
            Manage your consultations, slot times, and payments.
          </p>
        </div>
        <span className='px-2.5 py-1 rounded-full bg-teal-50 text-[#0D9488] font-bold text-xs'>
          {appointments.length} Total
        </span>
      </div>

      {appointments.length === 0 ? (
        <div className='bg-white rounded-2xl border border-gray-150 p-10 text-center max-w-sm mx-auto shadow-2xs'>
          <h3 className='text-base font-bold text-gray-900 mb-1'>No appointments yet</h3>
          <p className='text-xs text-gray-500 mb-4'>
            You haven&apos;t booked any doctor visits yet. Discover 50+ specialists available today.
          </p>
          <button
            onClick={() => navigate('/doctors')}
            className='bg-[#0D9488] hover:bg-[#0f766e] text-white px-6 py-2.5 rounded-full text-xs font-semibold transition-all shadow-xs'
          >
            Find a Doctor Now
          </button>
        </div>
      ) : (
        <div className='space-y-3.5'>
          {appointments.map((item, index) => (
            <div
              key={index}
              className='bg-white rounded-2xl border border-gray-150 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5'
            >
              {/* Doctor Details */}
              <div className='flex items-start sm:items-center gap-4'>
                <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-50 border border-teal-100 flex-shrink-0'>
                  <img
                    className='w-full h-full object-cover object-top'
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                </div>

                <div>
                  <span className='px-2 py-0.5 rounded-full bg-teal-50 text-[#0D9488] text-[10px] font-bold uppercase tracking-wider'>
                    {item.docData.speciality}
                  </span>
                  <h3 className='text-base font-bold text-gray-900 mt-0.5'>
                    {item.docData.name}
                  </h3>
                  <p className='text-[11px] text-gray-400'>
                    Clinic: {item.docData.address.line1}, {item.docData.address.line2}
                  </p>

                  <div className='mt-1.5 inline-flex items-center gap-2 px-2.5 py-0.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-gray-700'>
                    <span>Date: {slotDateFormat(item.slotDate)}</span>
                    <span>•</span>
                    <span>Time: {item.slotTime}</span>
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className='flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-2.5 w-full md:w-auto'>
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <span className='px-4 py-2 rounded-xl text-center text-xs font-bold bg-teal-50 text-[#0D9488] border border-teal-200'>
                    ✓ Payment Completed
                  </span>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className='px-6 py-2.5 rounded-full text-xs font-bold bg-[#0D9488] hover:bg-[#0f766e] text-white shadow-sm transition-all'
                  >
                    Pay Online Now
                  </button>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='px-6 py-2.5 rounded-full text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all'
                  >
                    Cancel Appointment
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <span className='px-4 py-2 rounded-xl text-center text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200'>
                    Cancelled
                  </span>
                )}

                {item.isCompleted && (
                  <span className='px-4 py-2 rounded-xl text-center text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200'>
                    ✓ Consultation Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments