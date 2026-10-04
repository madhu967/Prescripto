import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-[80vh] flex items-center justify-center py-12'>
      <div className='w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 text-gray-700'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#0D9488] text-xs font-semibold tracking-wider uppercase mb-3'>
            <span>Patient Portal</span>
          </div>
          <h2 className='text-2xl sm:text-3xl font-serif font-bold text-gray-900'>
            {state === 'Sign Up' ? 'Create Patient Account' : 'Welcome Back'}
          </h2>
          <p className='text-xs sm:text-sm text-gray-500 mt-2'>
            {state === 'Sign Up'
              ? 'Register to access priority bookings and appointment tracking'
              : 'Sign in to manage your appointments and doctor consults'}
          </p>
        </div>

        {/* Tab switch */}
        <div className='flex p-1 bg-gray-100 rounded-full mb-6 text-xs font-bold'>
          <button
            type='button'
            onClick={() => setState('Sign Up')}
            className={`flex-1 py-2 rounded-full transition-all ${
              state === 'Sign Up'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
          <button
            type='button'
            onClick={() => setState('Login')}
            className={`flex-1 py-2 rounded-full transition-all ${
              state === 'Login'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
          {state === 'Sign Up' && (
            <div>
              <label className='block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5'>
                Full Name
              </label>
              <input
                className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-100 outline-none text-sm transition-all'
                type='text'
                placeholder='e.g. John Doe'
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div>
            <label className='block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5'>
              Email Address
            </label>
            <input
              className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-100 outline-none text-sm transition-all'
              type='email'
              placeholder='name@example.com'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div>
            <label className='block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5'>
              Password
            </label>
            <input
              className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-100 outline-none text-sm transition-all'
              type='password'
              placeholder='••••••••'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type='submit'
            className='bg-[#0D9488] hover:bg-[#0f766e] text-white w-full py-3.5 rounded-full font-semibold text-sm shadow-md shadow-teal-700/20 hover:shadow-lg transition-all mt-3 active:scale-95'
          >
            {state === 'Sign Up' ? 'Create Account' : 'Sign In to Account'}
          </button>

          <p className='text-center text-xs text-gray-500 mt-2'>
            {state === 'Sign Up' ? (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => setState('Login')}
                  className='text-[#0D9488] font-bold cursor-pointer hover:underline'
                >
                  Sign In
                </span>
              </>
            ) : (
              <>
                Don&apos;t have an account yet?{' '}
                <span
                  onClick={() => setState('Sign Up')}
                  className='text-[#0D9488] font-bold cursor-pointer hover:underline'
                >
                  Register now
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login