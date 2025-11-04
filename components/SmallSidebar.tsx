'use client';

import { useDashboardContext } from '@/app/context/DashboardContext';
import PageLink from './PageLinks';
import { MdSettings } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { LuFileStack } from 'react-icons/lu';
import { TfiWrite } from 'react-icons/tfi';
import Logo from './Logo';
import { FaTimes } from 'react-icons/fa';

const SmallSidebar = () => {
  const { showSidebar, setShowSidebar } = useDashboardContext();

  return (
    <>
      {showSidebar && (
        <div className='absolute top-0 left-0 z-20 w-full h-full m-auto flex items-center justify-center small-sidebar lg:hidden small-sidebar'>
          <div className='w-[95%] h-[95%] bg-white rounded relative overflow-auto'>
            <button
              className='absolute top-[20px] left-[20px] text-2xl text-red-600 cursor-pointer'
              onClick={() => setShowSidebar(false)}
            >
              <FaTimes />
            </button>
            <div
              className='ml-auto mr-auto w-3/4 mt-[100px] md:w-1/2'
              onClick={() => setShowSidebar(false)}
            >
              <Logo
                container='w-[20%] m-auto mb-[30px] border-2 border-[var(--primary)] rounded-full'
                image='w-full'
              />
              <PageLink
                url='/dashboard/create-record'
                text='create record'
                icon={<TfiWrite />}
              />
              <PageLink
                url='/dashboard/records'
                text='records'
                icon={<LuFileStack />}
              />

              <PageLink
                url='/dashboard/profile'
                text='Profile'
                icon={<CgProfile />}
              />
              <PageLink
                url='/dashboard/settings'
                text='Settings'
                icon={<MdSettings />}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmallSidebar;
