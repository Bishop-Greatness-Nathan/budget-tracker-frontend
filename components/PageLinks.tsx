'use client';

import { useDashboardContext } from '@/app/context/DashboardContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PageLink = ({
  text,
  url,
  icon,
}: {
  text: string;
  url: string;
  icon: React.ReactNode;
}) => {
  const { setPageTitle } = useDashboardContext();
  const pathname = usePathname();
  const isActive = pathname === url;
  return (
    <div className='group hover:bg-[var(--primary)]'>
      <Link
        onClick={() => setPageTitle(text)}
        href={url}
        prefetch={true}
        className={`flex items-center space-x-2 p-2 mb-1 pl-10 ease-in-out duration-300 group-hover:text-white group-hover:bg-[var(--primary)] ${
          isActive
            ? 'bg-[var(--primary)] text-white'
            : 'bg-white text-slate-500'
        }`}
      >
        <span className='text-xl'>{icon}</span>
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default PageLink;
