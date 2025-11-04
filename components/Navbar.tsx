'use client';

import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';
import { useDashboardContext } from '@/app/context/DashboardContext';
import Logout from './logout';

const Navbar = () => {
  const { pageTitle, showSidebar, setShowSidebar } = useDashboardContext();
  return (
    <div
      className={`flex justify-between items-center p-3 px-2 lg:px-5 h-[80px] md:h-[100px] bg-[var(--bgColor)] w-full sticky top-0 z-10 border-b-2 border-b-[var(--primary)]`}
    >
      <button
        className='text-xl md:text-3xl text-[var(--primary)] hover:text-[var(--hoverColor)] ease-in-out duration-300 lg:hidden'
        onClick={() => {
          setShowSidebar(!showSidebar);
          console.log(showSidebar);
        }}
      >
        <FaAlignLeft />
      </button>
      <Logo
        container='hidden w-[60px] md:w-[80px] lg:block border-2 border-[var(--primary)] rounded-full'
        image='w-full'
      />
      <h1 className='text-base md:text-2xl lg:text-3xl capitalize'>
        {pageTitle}
      </h1>
      <Logout />
    </div>
  );
};

export default Navbar;
