'use client';

import { PropsWithChildren } from 'react';
import { DashboardProvider } from '../context/DashboardContext';
import BigSidebar from '@/components/BigSidebar';
import Navbar from '@/components/Navbar';
import SmallSidebar from '@/components/SmallSidebar';

function layout({ children }: PropsWithChildren) {
  return (
    <>
      <DashboardProvider>
        <main className='h-[100dvh] overflow-hidden'>
          <Navbar />
          <SmallSidebar />
          <section className='grid lg:grid-cols-5 h-[calc(100dvh-80px)] md:h-[calc(100dvh-100px)]'>
            <BigSidebar />
            <div className='lg:col-span-4 h-full'>
              <div className='p-2 lg:p-10 relative h-[calc(100dvh-80px)] md:h-[calc(100dvh-100px)] overflow-auto'>
                {children}
              </div>
            </div>
          </section>
        </main>
      </DashboardProvider>
      {/* <DashboardProvider>
        <main className='grid lg:grid-cols-5 h-[100dvh] overflow-hidden'>
          <BigSidebar />
          <div className='lg:col-span-4 overflow-auto'>
            <Navbar />
            <div className='p-2 lg:p-10 relative'>{children}</div>
          </div>
        </main>
      </DashboardProvider> */}
    </>
  );
}

export default layout;
