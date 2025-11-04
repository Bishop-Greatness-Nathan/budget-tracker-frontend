'use client';

import { useDashboardContext } from '@/app/context/DashboardContext';
import Categories from '@/components/category/Categories';
import ChangePassword from '@/components/ChangePassword';

function Settings() {
  const { currentUser } = useDashboardContext();
  return (
    <main className='p-1 md:p-5 lg:p-10'>
      <ChangePassword />
      {currentUser?.role === 'admin' && <Categories />}
    </main>
  );
}

export default Settings;
