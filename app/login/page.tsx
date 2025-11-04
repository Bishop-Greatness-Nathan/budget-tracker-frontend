'use client';

import { FormEvent, useState } from 'react';
import FormRow from '../../components/FormRow';
import Logo from '../../components/Logo';
import { toast } from 'react-toastify';
import axios from 'axios';
import PasswordInput from '../../components/PasswordInput';
import Link from 'next/link';
import { login } from '@/api/auth';
import { useRouter } from 'next/navigation';

function Login() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      await login(data);
      toast.success('Login Successful');
      router.push('/dashboard/records');
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
      <div className='bg-white w-[90%] m-auto mt-[100px] rounded-md p-5 shadow-md md:w-[50%] lg:w-[40%]'>
        <Logo container='w-[100px] m-auto mb-2 border-2 border-[var(--primary)] rounded-full' />
        <h2 className='text-center text-xl mb-10'>Login</h2>
        <form onSubmit={handleSubmit}>
          <FormRow
            type='email'
            labelText='email'
            name='email'
            extraStyle='border-[var(--primary)]'
            required
          />
          <div className='mt-2 text-xs md:text-sm lg:text-base'>
            <label htmlFor='password' className='block'>
              Password
            </label>
            <PasswordInput
              input='p-2'
              container='mt-1 rounded overflow-hidden'
              name='password'
            />
          </div>
          <button
            type='submit'
            className={`text-white bg-[var(--primary)] w-full p-2 rounded mt-4 cursor-pointer hover:bg-[var(--hoverColor)] ease-in-out duration-300 ${
              submitting && 'bg-[var(--hoverColor)] cursor-wait'
            }`}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
          <p className='text-center mt-3 mb-3'>
            Don&apos;t have an account?{' '}
            <Link
              href='/register'
              prefetch={true}
              className='text-[var(--primary)] font-semibold'
            >
              Register
            </Link>
          </p>
          <p className='text-center mt-3 mb-3'>
            Forgot password?{' '}
            <Link
              href='/forgot-password'
              prefetch={true}
              className='text-[var(--primary)] font-semibold'
            >
              Reset Password
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
