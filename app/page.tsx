'use client';
import Logo from '@/components/Logo';

import Link from 'next/link';

export default function Home() {
  return (
    <div className='grid lg:grid-cols-2 h-[100dvh]'>
      {/* left part */}
      <div className='bg-white p-5'>
        <div className='mb-3'>
          <Logo container='w-[100px] rounded-full border-2 border-[var(--primary)] overflow-hidden' />
        </div>

        <div className='grid gap-3'>
          <h1 className='text-3xl md:text-4xl text-[var(--primary)] font-bold'>
            Simple Budget Tracker
          </h1>

          <div className='rounded-md w-full md:w-[60%] border-3 border-[var(--primary)] overflow-hidden bg-[var(--primary)]'>
            <img src='/budget_img2.jpg' alt='' />
          </div>
          <p className='text-[var(--primary)] font-semibold'>
            {'"'}When there is no budget, every money you receive is surplus
            {'"'} - RPN
          </p>
          <p className='text-sm md:text-base'>
            Luke 14:28-30 KJV For which of you, intending to build a tower,
            sitteth not down first, and counteth the cost, whether he have
            sufficient to finish it? Lest haply, after he hath laid the
            foundation, and is not able to finish it, all that behold it begin
            to mock him, saying, This man began to build, and was not able to
            finish.
          </p>
        </div>
        <div>
          <div className='mt-10'>
            <Link
              href='/register'
              className='bg-[var(--primary)] py-2 px-4 rounded text-white text-lg mr-4 hover:bg-[var(--hoverColor)] ease-in-out duration-300'
            >
              Register
            </Link>
            <Link
              href='/login'
              className='bg-[var(--primary)] py-2 px-4 rounded text-white text-lg hover:bg-[var(--hoverColor)] ease-in-out duration-300'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      {/* right part */}
      <div className='hidden lg:flex justify-center items-center'>
        <div className='w-[50%] rounded-lg overflow-hidden shadow-xl'>
          <img src='/landing_img.jpg' alt='' />
        </div>
      </div>
    </div>
  );
}
