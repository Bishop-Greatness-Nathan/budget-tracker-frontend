'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import PasswordInput from './PasswordInput';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { useDashboardContext } from '@/app/context/DashboardContext';
import { useChangePassword } from '@/query/user';

function ChangePassword() {
  const { logout } = useDashboardContext();
  const [submitting, setSubmitting] = useState(false);

  const { mutate, isSuccess, isError, error } = useChangePassword();

  const submitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    mutate(data);
    // try {
    //   await customFetch.post('/user/change-password', data);
    //   toast.success('password changed successfully');
    //   logout();
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     toast.error(error?.response?.data?.message);
    //     return;
    //   }
    // }
    // setSubmitting(false);
  };

  // responses
  const responses = () => {
    if (isError) {
      if (isAxiosError(error)) {
        const message = Array.isArray(error.response?.data?.message)
          ? error.response.data.message.join(', ')
          : error.response?.data?.message || 'Something went wrong';

        toast.error(message);

        setSubmitting(false);
      }
    }
    if (isSuccess) {
      toast.success('Update successful. Login with new password');
      logout();
      setSubmitting(false);
    }
  };

  useEffect(() => {
    responses();
  }, [isError, isSuccess]);
  return (
    <main className='rounded p-2 md:p-5 bg-white'>
      <h1 className='font-semibold text-center text-base md:text-xl'>
        Change Password
      </h1>
      <form onSubmit={submitForm}>
        <div className='mt-2 text-xs md:text-sm lg:text-base'>
          <label htmlFor='password' className='block'>
            Old Password
          </label>
          <PasswordInput
            input='p-2'
            container='mt-1 rounded overflow-hidden'
            name='oldPassword'
          />
        </div>
        <div className='mt-2 text-xs md:text-sm lg:text-base'>
          <label htmlFor='password' className='block'>
            New Password
          </label>
          <PasswordInput
            input='p-2'
            container='mt-1 rounded overflow-hidden'
            name='newPassword'
          />
        </div>
        <button
          type='submit'
          className={`bg-[var(--primary)] text-white w-full p-2 rounded mt-2 capitalize hover:bg-indigo-200 ${
            submitting && 'bg-[var(--hoverColor)] cursor-wait'
          }`}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </main>
  );
}

export default ChangePassword;
