'use client';

import FormRow from '@/components/FormRow';
import FormSelect from '@/components/FormSelect';
import { useCategoryQuery } from '@/query/category';
import { useCreateRecord } from '@/query/record';
import { currencies, recordTypes } from '@/utils/defaults';
import { isAxiosError } from 'axios';
import { FormEvent, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loading from '../loading';

export default function CreateRecord() {
  const [currency, setCurrency] = useState('NGN');
  const [locale, setLocale] = useState('en-NG');

  const { data: categories, isLoading } = useCategoryQuery();

  const { mutate, isError, error, isSuccess, isPending } = useCreateRecord();

  const getLocale = () => {
    const currencyObj = currencies.find((value) => value.currency === currency);
    if (!currencyObj) return null;
    setLocale(currencyObj.locale);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    mutate(formData);
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
      toast.success('Successful. Create another record');
      location.reload();
    }
  };

  useEffect(() => {
    responses();
  }, [isError, isSuccess]);

  useEffect(() => {
    getLocale();
  }, [currency]);

  if (isLoading) return <Loading />;

  return (
    <main className='py-5 flex justify-center items-center'>
      <section className='bg-white px-3 md:px-5 py-5 rounded-md shadow w-[85%] md:w-[60%]'>
        <h1 className='md:text-2xl lg:text-4xl mb-2 lg:mb-5 font-semibold text-center'>
          New Record
        </h1>
        <form onSubmit={handleSubmit} className='grid gap-2'>
          <div className='w-full mt-2'>
            <label className='capitalize block'>currency</label>
            <select
              name='currency'
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
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
            extraStyle='border-[var(--primary)]'
            required
          />
          <FormSelect
            name='recordType'
            labelText='record type'
            list={recordTypes || []}
            required
          />

          <FormRow type='file' labelText='receipt' name='image' />
          <div className='w-full mt-2'>
            <label className='capitalize block'>category</label>
            <select
              name='category'
              required={true}
              className={`border border-[var(--primary)] w-full rounded p-[9px] mt-1 outline-0`}
            >
              {categories?.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <FormSelect name='category' list={categories || []} required /> */}
          <div className='mt-2 text-xs md:text-sm lg:text-base'>
            <label htmlFor='narration' className='block capitalize'>
              narration
            </label>
            <textarea
              name='narration'
              id='narration'
              cols={30}
              rows={5}
              className='border border-[var(--primary)] w-full rounded p-2 mt-1 outline-0'
            ></textarea>
          </div>

          <button
            type='submit'
            disabled={isPending}
            className={`bg-[var(--primary)] p-3 rounded text-white hover:bg-[var(--hoverColor)] ease-in-out duration-300 self-end ${
              isPending && 'cursor-wait'
            }`}
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
