'use client';

import Loading from '@/components/Loading';
import customFetch from '@/utils/customFetch';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyEmail() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const verifyToken = async () => {
    setLoading(true);
    try {
      await customFetch.post('/auth/verify-email', {
        verificationToken: searchParams.get('token'),
        email: searchParams.get('email'),
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      verifyToken();
    }
  }, []);

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
      <h2 className='font-semibold'>Account Confirmed!!!</h2>
      <div>
        You can now proceed to{' '}
        <Link
          href='/login'
          prefetch={true}
          className='text-white font-semibold'
        >
          Login
        </Link>
      </div>
    </div>
  );
}
