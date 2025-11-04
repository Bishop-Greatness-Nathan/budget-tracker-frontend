import PageLink from './PageLinks';
import { MdSettings } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { LuFileStack } from 'react-icons/lu';
import { TfiWrite } from 'react-icons/tfi';

const BigSidebar = () => {
  return (
    // wrapper
    <div className='hidden lg:block lg:col-span-1 overflow-hidden bg-white'>
      {/* container */}
      <div className='h-[94vh] overflow-hidden bg-white'>
        {/* links */}
        <div className='h-[80%] overflow-auto'>
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
  );
};

export default BigSidebar;
