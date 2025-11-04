'use client';

import { FormEvent, useState } from 'react';
import Logo from '../../components/Logo';
import FormRow from '../../components/FormRow';
import { toast } from 'react-toastify';
import axios from 'axios';
import customFetch from '../../utils/customFetch';
import Link from 'next/link';

function ForgotPassword() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      // forgotPassword(data)
      await customFetch.post('/auth/forgot-password', data);
      toast.success('A link has been sent to your email');
      setSubmitting(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = Array.isArray(error.response?.data?.message)
          ? error.response.data.message.join(', ')
          : error.response?.data?.message || 'Something went wrong';

        toast.error(message);
        setSubmitting(false);
      }
    }
  };

  return (
    <div className='pb-[3rem] w-full h-full overflow-auto'>
      <div className='bg-[var(--bgColor)] w-[90%] m-auto mt-[100px] rounded p-5 shadow-md md:w-[50%] lg:w-[40%]'>
        <Logo container='w-[100px] m-auto mb-2 border-2 border-[var(--primary)] rounded-full' />
        <h2 className='text-center text-xl mb-10'>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <FormRow type='email' labelText='email' name='email' required />

          <button
            type='submit'
            disabled={submitting}
            className={`text-white bg-[var(--primary)] w-full p-2 rounded mt-4 cursor-pointer hover:bg-[var(--hoverColor)] ease-in-out duration-300 ${
              submitting && 'bg-[var(--hoverColor)] cursor-wait'
            }`}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
          <p className='text-center mt-3 mb-3'>
            <Link
              href='/'
              prefetch={true}
              className='text-[var(--primary)] font-semibold'
            >
              Home Page
            </Link>
          </p>
          <p className='text-center mt-3 mb-3'>
            <Link
              href='/login'
              prefetch={true}
              className='text-[var(--primary)] font-semibold'
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
