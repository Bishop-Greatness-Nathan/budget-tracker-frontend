'use client';

import Loading from '@/components/Loading';
import customFetch from '@/utils/customFetch';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function VerifyEmail() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const [token] = useState(searchParams.get('token'));
  const [email] = useState(searchParams.get('email'));

  console.log(email, token);
  const verifyToken = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    setLoading(true);
    try {
      await customFetch.post('/auth/verify-email', data);
      toast.success('congratulations');
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className='mt-20 text-center'>
        <h4>There was an error, please double check your verification link</h4>
      </div>
    );
  }

  return (
    <div className='mt-20 text-center'>
      <form onSubmit={verifyToken}>
        <input
          type='text'
          name='token'
          defaultValue={token as string}
          className='hidden'
        />
        <input
          type='email'
          name='email'
          defaultValue={email as string}
          className='hidden'
        />
        <button>verify my account</button>
      </form>
      {/* <h2 className='font-semibold'>Account Confirmed!!!</h2>
      <div>
        You can now proceed to{' '}
        <Link href='/login' className='text-white font-semibold'>
          Login
        </Link>
      </div> */}
    </div>
  );
}
