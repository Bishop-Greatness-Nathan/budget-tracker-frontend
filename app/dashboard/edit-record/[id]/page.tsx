'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import { useEditRecord, useGetRecord } from '@/query/record';
import { currencies, recordTypes } from '@/utils/defaults';
import FormRow from '@/components/FormRow';
import FormSelect from '@/components/FormSelect';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { fetchCategory } from '@/api/category';
import CategoryChoiceModal from '@/components/category/CategoryChoiceModal';
import { CategoryType } from '@/utils/types';

export default function EditRecord({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [showModal, setShowModal] = useState(false);
  const [locale, setLocale] = useState('');
  const [category, setCategory] = useState<CategoryType>({ _id: '', name: '' });

  const router = useRouter();

  const resolvedParams = React.use(params); // 👈 unwrap the promise
  const { id } = resolvedParams;

  const { data, isLoading, isPending } = useGetRecord(id);

  const { mutate, isSuccess, isError, error } = useEditRecord();

  const getCategory = async () => {
    const category = await fetchCategory(data.category);
    setCategory(category);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    mutate({ id, formData });
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
      router.push('/dashboard/records');
    }
  };

  useEffect(() => {
    responses();
  }, [isError, isSuccess]);

  useEffect(() => {
    if (data) {
      setLocale(data?.locale);
    }
  }, []);

  useEffect(() => {
    if (data) getCategory();
  }, [data]);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>There was an error...</h1>;

  return (
    <main className='py-5 flex justify-center items-center'>
      <section className='bg-white px-3 md:px-5 py-5 rounded-md shadow w-[85%] md:w-[60%]'>
        <h1 className='md:text-2xl lg:text-4xl mb-2 lg:mb-5 font-semibold text-center'>
          Edit Record
        </h1>
        <form onSubmit={handleSubmit} className='grid gap-2'>
          <div className='w-full mt-2'>
            <label className='capitalize block'>currency</label>
            <select
              name='currency'
              defaultValue={data.currency}
              onChange={(e) => {
                const currencyObj = currencies.find(
                  (value) => value.currency === e.target.value
                );
                if (!currencyObj) return null;
                setLocale(currencyObj.locale);
              }}
              required={true}
              className={`border border-[var(--primary)] w-full rounded p-[9px] mt-1 outline-0`}
            >
              {currencies.map((value) => {
                return (
                  <option key={value.currency} value={value.currency}>
                    {value.currency}
                  </option>
                );
              })}
            </select>
          </div>
          <input
            type='text'
            name='locale'
            required={true}
            defaultValue={locale}
            className={`hidden`}
          />

          <FormRow
            type='number'
            labelText='amount'
            name='amount'
            defaultValue={data.amount}
            extraStyle='border-[var(--primary)]'
            required
          />
          <FormSelect
            name='recordType'
            labelText='record type'
            list={recordTypes || []}
            defaultValue={data.recordType}
            required
          />

          <FormRow
            type='file'
            labelText='receipt(optional)'
            name='image'
            extraStyle='border-[var(--primary)]'
          />
          <input
            type='text'
            name='category'
            required={true}
            defaultValue={category._id}
            className={`hidden`}
          />
          <FormRow
            type='text'
            labelText='category'
            name=''
            defaultValue={category.name}
            extraStyle='border-[var(--primary)]'
            onClick={() => setShowModal(true)}
            readOnly
            required
          />
          <div className='mt-2 text-xs md:text-sm lg:text-base'>
            <label htmlFor='narration' className='block capitalize'>
              narration
            </label>
            <textarea
              name='narration'
              id='narration'
              cols={30}
              rows={5}
              defaultValue={data.narration}
              className='border w-full rounded p-2 mt-1 outline-0'
            ></textarea>
          </div>
          <button
            type='submit'
            disabled={isPending}
            className={`cursor-pointer bg-[var(--primary)] p-3 rounded text-white hover:bg-[var(--hoverColor)] ease-in-out duration-300 self-end ${
              isPending && 'cursor-wait'
            }`}
          >
            Submit
          </button>
        </form>
      </section>
      {showModal && (
        <CategoryChoiceModal
          setCategory={setCategory}
          setShowModal={setShowModal}
        />
      )}
    </main>
  );
}
