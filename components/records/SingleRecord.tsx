'use client';

import { RecordType } from '@/utils/types';
import Link from 'next/link';
import { FaImages } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

type MethodTypes = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type PropTypes = RecordType & MethodTypes;

export default function SingleRecord({
  _id,
  amount,
  recordType,
  narration,
  image,
  createdAt,
  currency,
  locale,
  setImage,
  setShowImageModal,
}: PropTypes) {
  return (
    <div className={`grid grid-cols-5 border border-[var(--primary)] bg-white`}>
      <p
        className={`text-[8px] md:text-xs lg:text-base p-2 text-center border-l relative border-[var(--primary)] ${
          recordType === 'income' ? 'text-blue-500' : 'text-red-500'
        }`}
      >
        <Link
          href={`/dashboard/edit-record/${_id}`}
          className='absolute left-1 top-0 cursor-pointer text-[var(--primary)]'
        >
          <MdEdit />
        </Link>
        {new Intl.DateTimeFormat('es', { dateStyle: 'medium' }).format(
          new Date(createdAt)
        )}
      </p>
      <p
        className={`col-span-3 text-[8px] md:text-xs lg:text-base p-2 text-center border-l border-[var(--primary)] ${
          recordType === 'income' ? 'text-blue-500' : 'text-red-500'
        }`}
      >
        {narration}
      </p>
      <p
        className={`relative text-[8px] md:text-xs lg:text-base p-2 text-center border-l border-[var(--primary)] ${
          recordType === 'income' ? 'text-blue-500' : 'text-red-500'
        }`}
      >
        <button
          className='absolute right-1 top-0 cursor-pointer text-[var(--primary)]'
          onClick={() => {
            setImage(image);
            setShowImageModal(true);
          }}
        >
          <FaImages />
        </button>
        {new Intl.NumberFormat(`${locale}`, {
          style: 'currency',
          currency: `${currency}`,
        }).format(amount)}
      </p>
    </div>
  );
}
