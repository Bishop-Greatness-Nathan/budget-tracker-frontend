'use client';

import { FormEvent } from 'react';
import FormRow from './FormRow';

export default function SearchDateForm({
  searchDate,
}: {
  searchDate: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div>
      <form
        onSubmit={searchDate}
        className='grid grid-cols-2 md:grid-cols-3 gap-4 text-[8px] md:text-base'
      >
        <FormRow
          type='date'
          name='from'
          labelText='from'
          required
          extraStyle='text-[8px] md:text-sm lg:text-base p-1 border-[var(--primary)]'
        />
        <FormRow
          type='date'
          name='to'
          labelText='to'
          required
          extraStyle='text-[8px] md:text-sm lg:text-base p-1 border-[var(--primary)]'
        />
        <button
          className={`col-span-2 md:col-span-1 bg-[var(--primary)] self-end p-[10px] rounded text-white hover:bg-[var(--hoverColor)]  ease-in-out duration-300 `}
        >
          Search Record
        </button>
      </form>
    </div>
  );
}
