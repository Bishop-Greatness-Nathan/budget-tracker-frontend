'use client';

import customFetch from '@/utils/customFetch';
import { UserType } from '@/utils/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { toast } from 'react-toastify';

type ValueTypes = {
  isLoading: boolean;
  currentUser: UserType | undefined;
  pageTitle: string;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
};

const DashboardContext = createContext<ValueTypes | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [pageTitle, setPageTitle] = useState('Records');
  const [isLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | undefined>(
    undefined
  );

  const router = useRouter();

  const getCurrentUser = async () => {
    try {
      const { data } = await customFetch.get('/user/current-user');
      setCurrentUser(data);
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        return router.push('/');
      }
    }
  };

  const logout = async () => {
    try {
      await customFetch.get('/auth/logout');
      toast.success('...logged out');
      return router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.msg);
        return;
      }
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const values = {
    isLoading,
    currentUser,
    pageTitle,
    setPageTitle,
    showSidebar,
    setShowSidebar,
    logout,
  };
  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error(
      'useDashboardContext must be used inside Dashboard Provider'
    );
  return context;
}
