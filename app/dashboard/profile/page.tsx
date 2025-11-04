'use client';

import { ChangeEvent, useEffect } from 'react';
import FormRow from '@/components/FormRow';
import { toast } from 'react-toastify';
import { useDashboardContext } from '@/app/context/DashboardContext';

import { isAxiosError } from 'axios';
import FormSelect from '@/components/FormSelect';
import { titles } from '@/utils/defaults';
import { useUpdateUser } from '@/query/user';

const Profile = () => {
  const { currentUser } = useDashboardContext();

  const { mutate, isError, isSuccess, error } = useUpdateUser();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate({ id: currentUser?._id as string, formData });
  };

  // responses
  const responses = () => {
    if (isError) {
      if (isAxiosError(error)) {
        const message = Array.isArray(error.response?.data?.message)
          ? error.response.data.message.join(', ')
          : error.response?.data?.message || 'Something went wrong';

        toast.error(message);
      }
    }
    if (isSuccess) {
      toast.success('Update successful');
      location.reload();
    }
  };

  useEffect(() => {
    responses();
  }, [isError, isSuccess]);

  return (
    <div className='p-4'>
      <div className='bg-white p-5 py-10 md:p-10 rounded-md'>
        <h1 className='text-center text-2xl md-2xl mb-5'>Edit Profile</h1>
        <form onSubmit={handleSubmit} className='grid gap-2 items-center'>
          <FormSelect
            name='title'
            labelText='title'
            defaultValue={currentUser?.title}
            list={titles}
            extraStyle='capitalize'
            required
          />
          <FormRow
            type='text'
            name='firstName'
            labelText='first name'
            defaultValue={currentUser?.firstName}
            extraStyle='capitaliUze border-[var(--primary)]'
            required
          />
          <FormRow
            type='text'
            name='lastName'
            labelText='last name'
            defaultValue={currentUser?.lastName}
            extraStyle='capitalize border-[var(--primary)]'
            required
          />
          <FormRow
            type='file'
            name='image'
            labelText='image(optional)'
            extraStyle='capitalize border-[var(--primary)]'
          />

          <button
            type='submit'
            className={`text-white self-end bg-[var(--primary)] rounded cursor-pointer hover:bg-[var(--hoverColor)] ease-in-out duration-300 mt-7 p-[10px] `}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
