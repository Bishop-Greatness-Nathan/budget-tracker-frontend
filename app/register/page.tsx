'use client';

import { FormEvent, useState } from 'react';
import Logo from '../../components/Logo';
import FormRow from '../../components/FormRow';
import PasswordInput from '../../components/PasswordInput';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import FormSelect from '@/components/FormSelect';
import { titles } from '@/utils/defaults';
import { register } from '@/api/auth';

function Register() {
  const [isSubmitting, setIsSubmitting] = useState('submit');

  // submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting('submitting');
    const formData = new FormData(e.currentTarget);

    try {
      await register(formData);
      toast.success(
        'Account created, please check your email to verify account'
      );
      setIsSubmitting('submit');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = Array.isArray(error.response?.data?.message)
          ? error.response.data.message.join(', ')
          : error.response?.data?.message || 'Something went wrong';

        toast.error(message);
        setIsSubmitting('submit');
      }
    }
  };

  return (
    <div className='pb-[3rem] w-full h-full overflow-auto'>
      <div className='bg-white w-[90%] m-auto mt-[50px] rounded-md p-5 shadow-md md:w-[50%] lg:w-[40%]'>
        <Logo container='w-[100px] m-auto mb-2 border-2 border-[var(--primary)] rounded-full' />
        <h2 className='text-center text-xl mb-10'>Register</h2>
        <form onSubmit={handleSubmit}>
          <FormSelect
            labelText='title'
            name='title'
            extraStyle='capitalize'
            list={titles}
            required
          />
          <FormRow
            type='text'
            labelText='first name'
            name='firstName'
            extraStyle='capitalize'
            required
          />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            extraStyle='capitalize'
            required
          />

          <FormRow type='email' labelText='email' name='email' required />

          <FormRow
            type='file'
            labelText='image - less than 5mb (optional)'
            name='image'
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
              isSubmitting === 'submitting' &&
              'bg-[var(--hoverColor)] cursor-wait'
            }`}
            disabled={isSubmitting === 'submitting'}
          >
            {isSubmitting}
          </button>
        </form>
        <p className='text-center mt-3 mb-3'>
          Have and account?{' '}
          <Link
            href='/login'
            prefetch={true}
            className='text-[var(--primary)] font-semibold'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
