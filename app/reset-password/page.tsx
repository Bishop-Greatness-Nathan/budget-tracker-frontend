'use client';

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import customFetch from '../../utils/customFetch';
import Logo from '../../components/Logo';
import PasswordInput from '../../components/PasswordInput';
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';

function ResetPassword() {
  const [submitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (password !== confirmPassword) {
      setSubmitting(false);
      return toast.error('passwords do not match');
    }

    if (!token || !email) {
      setSubmitting(false);
      toast.error('Invalid or expirted password reset link');
    }

    try {
      await customFetch.post('/auth/reset-password', {
        token,
        email,
        password,
      });
      toast.success('Password changed successfully');
      router.push('/login');
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
      <div className='bg-[var(--bgColor)] w-[90%] m-auto mt-[100px] rounded-md border-t-4 border-[var(--primary)] p-5 md:w-[50%] lg:w-[40%]'>
        <Logo container='w-[100px] m-auto mb-2 border-2 border-[var(--primary)] rounded-full' />
        <h2 className='text-center text-xl mb-10'>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className='mt-2 text-xs md:text-sm lg:text-base'>
            <label htmlFor='password' className='block'>
              New Password
            </label>
            <PasswordInput
              input='p-2'
              container='mt-1 rounded overflow-hidden'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mt-2 text-xs md:text-sm lg:text-base'>
            <label htmlFor='password' className='block'>
              Confirm Password
            </label>
            <PasswordInput
              input='p-2'
              container='mt-1 rounded overflow-hidden'
              name='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

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
            <Link href='/' className='text-[var(--primary)] font-semibold'>
              Home Page
            </Link>
          </p>
          <p className='text-center mt-3 mb-3'>
            <Link href='/login' className='text-[var(--primary)] font-semibold'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
