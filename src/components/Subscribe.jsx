import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const BASE_URL = import.meta.env.BASE_URL;
const BOUNCE_DELAY = 800;

const initialForm = {
	full_name: '',
	email: '',
	street1: '',
        street2: '',
	city: '',
	state: '',
	zip: '',
	country: '',
}

const fieldLabels = {
  full_name: 'Your Name',
  email: 'Email Address',
  street1: 'Street Address',
  street2: '',
  city: 'City',
  state: 'State/Province',
  zip: 'Post Code',
  country: 'Country',
}


export default function AddressForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!form.email && !form.street1) {
      setStatus('error')
      setErrorMsg('Please provide an electronic or physical mailing address.')
      return
    }

    if (form.email && !emailPattern.test(form.email)) {
      setStatus('error')
      setErrorMsg('Please ensure your email address is correct.')
      return
    }

    setStatus('loading')

    const payload = {
      ...form,
      email: form.email ? form.email : null,
    }

    const { error } = await supabase
      .from('addresses')
      .insert([payload], { onConflict: 'email' })

    if (error) {
      setStatus ('error')
      setErrorMsg(error.message)
    return
    }

    setStatus('success')
    setForm(initialForm)
  }

  const renderField = (name) => (
    <div key={name}>
      <label htmlFor={name} className="block text-sm font-medium mb-1 subscribe">
        {fieldLabels[name]}
      </label>
      <input
        id={name}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="
          cursor-pointer
          w-full
          border border-gray-300 px-3 py-2 
          focus:outline-none focus:ring-2 focus:ring-black
          bg-[#ebebeb] text-black"
      />
    </div>
  )

  if (status === 'success') {
    return (
      <div
        className = "
          min-h-screen w-screen pt-32 
          p-6 text-center 
          bg-[#010126] text-[#CCC7A2] subscribe"
        style = {{fontFamily: 'Bohemian Typewriter'}}
      >
        <h2
          className = "text-2xl font -semibold mb-2"
          style = {{ fontFamily: 'Bohemian Typewriter' }}
        >
          Thank you
        </h2>
        <p className = "text-gray-600 mt-[2dvw]">
          Your address has been saved securely.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{backgroundColor: '#ab79a0'}}
          className="
            w-fit py-2 border border-black px-3 mt-[6dvw]
            font-medium text-black
            cursor-pointer
          "
          >
            Take me home!
        </button>
      </div>
		)
  }

  return (
    <div 
      className="
        subscribe
        relative
        isolate
        min-h-screen
        w-screen
        overflow-hidden
        bg-[#010126]
        text-[#CCC7A2]
      "
      style = {{
        fontFamily: 'Bohemian Typewriter',
      }}
    >
      <img src={`${BASE_URL}moon.png`} alt="moon"
        className= "absolute w-[20dvw]"
      />

      <HomeFlag />
      <div
        className="
          subscribe
          absolute 
          top-[42dvw]
          md:top-[14dvw] 
          lg:top-[8dvw]
          xl:top-[5dvw]
          right-[-10dvw]
          w-[170dvw]
          pointer-events-none
        "
      >
        <img
          src={`${BASE_URL}mountain.svg`}
          alt="Mountain"
          className="
            absolute
            black-cursor
            w-full
            h-auto
            max-w-none
            max-h-none
            rotate-[-15deg]
            pointer-events-auto
          "
          draggable={false}
        />
        <img
        src={`${BASE_URL}footsteps.svg`}
        className="
          absolute
          top-[20dvw] left-[65dvw]
          black-curso
          rotate-[-5deg]
          w-[19dvw]
          h-auto
        "
          draggable={false}
        />
      </div>

      <div className="relative max-w-xl mx-auto mt-20 p-6 text-center">
        <h2 className = "text-4xl font-semibold mb-8">Subscribe to Hunky Dory</h2>
        <form onSubmit = {handleSubmit} className = "space-y-4">

          <div className="grid grid-cols-2 gap-4 subscribe">
            {renderField('full_name')}
            {renderField('email')}
          </div>

          <p className="text-sm pt-2">
            If you would like to receive a print copy of the next volume of Hunky Dory, please enter your mailing address below.
          </p>

          {renderField('street1')}
          {renderField('street2')}

          <div className="grid grid-cols-3 gap-4">
            {renderField('city')}
            {renderField('state')}
            {renderField('zip')}
          </div>

          <div className="max-w-xs mx-auto">
            {renderField('country')}
          </div>

          {status === 'error' && (
            <p className = "text-red-600 text-sm"> {errorMsg || 'Something went wrong. Please try again.'}</p>
          )}

          <button
            style={{ 
              backgroundColor: '#ab79a0'
            }}
            type = "submit"
            disabled = {status === 'loading'}
            className="
              w-1/2 py-2 border border-black px-3 py-2 
              font-medium text-black
              cursor-pointer
            "
          >
            {status === 'loading' ? 'Saving...' : 'Save Information'}
          </button>
        </form>
      </div>
    </div>
  )
}

function HomeFlag() {
  const navigate = useNavigate()
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => {
      navigate('/')
      setClicked(false)
    }, BOUNCE_DELAY)
  }

    return (
        <div>
            <div
              onClick={handleClick}
              className={`
                absolute
                scale-[0.35]
                top-[64dvw] md:top-[36dvw] lg:top-[32dvw] xl:top-[26dvw]
                left-[-7dvw]
                w-[26dvw]
                z-[2]
                rotate-[5deg] hover:rotate-[-2deg]
                ${clicked ? 'animate-bounce-click' : ''}
                transition-transform
                duration-300
                flex
                items-center
                justify-center
              `}
                style={{
		  '--base-rotate': '-2deg',
		  '--base-scale': '0.35' }}
            >
            <img
                src={`${BASE_URL}flag.png`}
                alt="Flag"
                className="w-full h-auto block"
                draggable="false"
                style={{ display: 'block' }}
            />
            <span
                className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    text-[2dvw] font-bold
                    top-[-8dvw]
                    left-[1dvw]
                    text-black
                    select-none
                    rotate-[-25deg]
                    cursor-pointer
                "
                style={{
                  fontFamily: 'Bohemian Typewriter',
                  letterSpacing: '0.07em',
                }}
            >
                home
            </span>
          </div>
        </div>
    );
}
