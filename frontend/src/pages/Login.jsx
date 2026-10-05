import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Login')
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const demoUser = {
    email: 'demo-user@prescripto.com',
    password: 'PrescriptoDemo123',
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email: email.trim(),
          password: password.trim(),
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Registration successful')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email: email.trim(),
          password: password.trim(),
        })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Login successful')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // 1-Click instant direct login for fast website previewing
  const handleDirectDemoLogin = async () => {
    setEmail(demoUser.email)
    setPassword(demoUser.password)
    setIsLoading(true)

    try {
      const { data } = await axios.post(backendUrl + '/api/user/login', {
        email: demoUser.email,
        password: demoUser.password,
      })
      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        toast.success('Logged in as Demo Patient')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAutofill = () => {
    setState('Login')
    setEmail(demoUser.email)
    setPassword(demoUser.password)
    toast.info('Filled demo patient credentials')
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-[80vh] flex items-center justify-center py-12 px-4'>
      <div className='w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 text-gray-700'>
        {/* Header */}
        <div className='text-center mb-6'>
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

        {/* Demo Credentials Box for Fast Website Viewing */}
        <div className='bg-teal-50/70 border border-teal-200 rounded-2xl p-4 mb-6'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-xs font-bold text-[#0D9488] uppercase tracking-wide flex items-center gap-1'>
              <span>⚡</span> Demo Patient Credentials
            </span>
            <button
              type='button'
              onClick={handleAutofill}
              className='text-[11px] text-[#0D9488] hover:underline font-semibold'
            >
              Autofill
            </button>
          </div>

          <div className='space-y-1 text-xs text-gray-600 bg-white/90 p-2.5 rounded-xl border border-teal-100 font-mono'>
            <p className='flex justify-between'>
              <span className='text-gray-400 font-sans'>Email:</span>
              <span className='font-semibold text-gray-800'>{demoUser.email}</span>
            </p>
            <p className='flex justify-between'>
              <span className='text-gray-400 font-sans'>Password:</span>
              <span className='font-semibold text-gray-800'>{demoUser.password}</span>
            </p>
          </div>

          <button
            type='button'
            disabled={isLoading}
            onClick={handleDirectDemoLogin}
            className='w-full mt-3 py-2.5 bg-[#0D9488] hover:bg-[#0f766e] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70'
          >
            <span>⚡ 1-Click Demo Patient Login</span>
          </button>
        </div>

        {/* Tab switch */}
        <div className='flex p-1 bg-gray-100 rounded-full mb-6 text-xs font-bold'>
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
            disabled={isLoading}
            className='bg-[#0D9488] hover:bg-[#0f766e] text-white w-full py-3.5 rounded-full font-semibold text-sm shadow-md shadow-teal-700/20 hover:shadow-lg transition-all mt-3 active:scale-95 disabled:opacity-70'
          >
            {isLoading
              ? 'Processing...'
              : state === 'Sign Up'
              ? 'Create Account'
              : 'Sign In to Account'}
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