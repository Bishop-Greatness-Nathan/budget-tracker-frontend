'use client';
import { FormEvent, useState } from 'react';
import SingleRecord from '@/components/records/SingleRecord';
import { useRecords } from '@/query/record';
import { CategoryType, RecordType } from '@/utils/types';
import ImageModal from '@/components/records/ImageModal';
import Analysis from '@/components/Analysis';
import { currencies } from '@/utils/defaults';
import { useDashboardContext } from '@/app/context/DashboardContext';
import SearchDateForm from '@/components/SearchDateForm';
import { toast } from 'react-toastify';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import { useCategoryQuery } from '@/query/category';

export default function Records() {
  const { currentUser } = useDashboardContext();
  const [image, setImage] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [category, setCategory] = useState('all');
  const [currency, setCurrency] = useState('NGN');
  const [queryDate, setQueryDate] = useState({
    from: new Date('2025-10-01'),
    to: new Date(Date.now()),
  });
  const [page, setPage] = useState(1);

  const { data: categories } = useCategoryQuery();

  const { data, isLoading, error } = useRecords({
    id: currentUser?._id as string,
    category,
    currency,
    from: queryDate.from,
    to: queryDate.to,
    page,
    limit: 50,
  });

  const searchDate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);

    const from = new FormData(e.currentTarget).get('from');
    const to = new FormData(e.currentTarget).get('to');

    if (from === null || to === null) {
      toast.error('Date range is not specified');
      return;
    }
    const newFrom = new Date(from.toString());
    const newTo = new Date(to.toString());

    // ✅ Normalize time to cover full day
    newFrom.setHours(0, 0, 0, 0);
    newTo.setHours(23, 59, 59, 999);

    setQueryDate({
      ...queryDate,
      from: newFrom,
      to: newTo,
    });
  };

  if (error) return <h1>there was an error</h1>;

  return (
    <main>
      <div className='text-right mb-3'>
        <select
          name='category'
          id=''
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className='rounded border-1 outline-none bg-white text-[var(--primary)] text-xs md:text-sm lg:text-base'
        >
          {[{ _id: 'all', name: 'all' }, ...(categories || [])].map(
            (category: CategoryType) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              );
            }
          )}
        </select>
        <select
          name='currency'
          id=''
          onChange={(e) => {
            setCurrency(e.target.value);
            setPage(1);
          }}
          className='rounded border-1 outline-none bg-white text-[var(--primary)] text-xs md:text-sm lg:text-base'
        >
          {currencies.map((currency) => {
            return (
              <option key={currency.currency} value={currency.currency}>
                {currency.currency}
              </option>
            );
          })}
        </select>
      </div>

      <div className='flex justify-between'>
        <h1 className='text-white md:text-2xl lg:text-4xl mb-1 mt-5'>
          Records
        </h1>
        {data && <Analysis analysis={data.analysis} />}
      </div>

      <section className='pb-5'>
        <div className='bg-white p-2 rounded-md py-3 shadow'>
          <SearchDateForm searchDate={searchDate} />
        </div>
      </section>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className='mt-5 text-xs md:text-sm lg:text-base text-white font-semibold'>
            {data?.count} Result{data?.count > 1 && 's'}
          </h1>
          {/* header */}
          {}
          <div className='grid grid-cols-5 border border-[var(--primary)] font-semibold bg-white'>
            <h2 className='text-[8px] md:text-xs lg:text-base p-2 text-center border-[var(--primary)]'>
              Date
            </h2>
            <h2 className='col-span-3 text-[8px] md:text-xs lg:text-base p-2 border-l border-[var(--primary)] text-center'>
              Narration
            </h2>
            <h2 className='text-[8px] md:text-xs border-l lg:text-base p-2 text-center border-[var(--primary)]'>
              Amount
            </h2>
          </div>
          {data?.count < 1 ? (
            <h1 className='mt-2 text-center text-white font-bold'>
              No records available
            </h1>
          ) : (
            <div>
              {data?.records.map((record: RecordType) => {
                return (
                  <div key={record._id}>
                    <SingleRecord
                      {...record}
                      setImage={setImage}
                      setShowImageModal={setShowImageModal}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {showImageModal && (
        <ImageModal image={image} setShowImageModal={setShowImageModal} />
      )}

      {/* PAGINATION */}
      {data && data.numOfPages > 1 && (
        <Pagination page={page} data={data} setPage={setPage} />
      )}
    </main>
  );
}
