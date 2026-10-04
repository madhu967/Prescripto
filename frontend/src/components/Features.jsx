import React from 'react'

const Features = () => {
  const stats = [
    { value: '50+', label: 'Verified Specialists', desc: 'Across 6 departments' },
    { value: '15k+', label: 'Consultations', desc: 'Successfully booked' },
    { value: '99.8%', label: 'Positive Feedback', desc: 'From real patients' },
    { value: '24/7', label: 'Instant Booking', desc: 'No queue wait time' },
  ]

  const highlights = [
    {
      icon: '🩺',
      title: 'Credentialed Specialists',
      desc: 'All 50+ practitioners hold verified medical board licenses and proven clinical experience.',
    },
    {
      icon: '⚡',
      title: 'Real-Time Availability',
      desc: 'View live appointment slots instantly and secure your spot in seconds without phone calls.',
    },
    {
      icon: '🔒',
      title: 'Confidential & Secure',
      desc: 'Your medical consultations and appointment history are protected with industry-grade privacy.',
    },
    {
      icon: '💬',
      title: 'Hassle-Free Scheduling',
      desc: 'Easily reschedule or cancel with friendly reminders sent straight to your dashboard.',
    },
  ]

  return (
    <section className='my-12 sm:my-16'>
      {/* Metrics Banner */}
      <div className='bg-gradient-to-r from-teal-900 via-[#0D9488] to-teal-800 rounded-3xl p-6 sm:p-10 shadow-xl shadow-teal-950/10 text-white mb-16'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-teal-700/50 text-center'>
          {stats.map((stat, index) => (
            <div key={index} className={`pt-4 sm:pt-0 ${index !== 0 ? 'sm:pl-6' : ''}`}>
              <p className='text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-white mb-1'>
                {stat.value}
              </p>
              <p className='text-sm sm:text-base font-semibold text-teal-100'>
                {stat.label}
              </p>
              <p className='text-xs text-teal-200/80 mt-0.5'>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Cards */}
      <div className='text-center max-w-2xl mx-auto mb-10'>
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0D9488] text-xs font-semibold tracking-wider uppercase mb-3'>
          <span>Why Prescripto</span>
        </div>
        <h2 className='text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4'>
          Healthcare Built Around Your Needs
        </h2>
        <p className='text-sm sm:text-base text-gray-600'>
          Experience modern patient-first healthcare with transparent pricing, certified practitioners, and seamless online booking.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {highlights.map((item, index) => (
          <div
            key={index}
            className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-200 hover:-translate-y-1.5 transition-all duration-300 group'
          >
            <div className='w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-[#0D9488] text-[#0D9488] group-hover:text-white flex items-center justify-center text-2xl mb-4 transition-colors duration-300 shadow-2xs'>
              {item.icon}
            </div>
            <h3 className='text-lg font-bold text-gray-900 mb-2 group-hover:text-[#0D9488] transition-colors'>
              {item.title}
            </h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
