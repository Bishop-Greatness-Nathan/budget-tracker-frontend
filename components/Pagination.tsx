import { FormEvent } from 'react';
function Pagination({
  page,
  data,
  setPage,
}: {
  page: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const changePage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pageValue = Number(new FormData(e.currentTarget).get('page'));
    if (pageValue <= data.numOfPages && pageValue > 0) {
      setPage(pageValue);
    }
  };

  return (
    <main>
      <div className='flex justify-between mt-2 font-semibold text-xs md:text-base text-white'>
        <button
          className={`${
            page === 1 && 'opacity-0'
          } cursor-pointer border border-white p-1 rounded-sm`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          prev
        </button>

        <span>
          page {page} of {data && data.numOfPages}
        </span>

        <button
          className={`${
            page === data.numOfPages && 'opacity-0'
          } border border-white p-1 rounded-sm`}
          onClick={() => setPage(page + 1)}
          disabled={page === data?.numOfPages}
        >
          next
        </button>
      </div>
      <div className='flex justify-center items-center'>
        <form
          className='w-[50%] md:w-[20%] mt-2 flex justify-center items-center border border-white rounded-md overflow-hidden bg-[var(--primary)] text-xs lg:text-base'
          onSubmit={changePage}
        >
          <button className='w-full bg-[var(--primary)] text-white'>
            Go to page
          </button>
          <input
            type='number'
            name='page'
            min={1}
            max={data.numOfPages}
            className='w-full border-none outline-none p-1 bg-white'
          />
        </form>
      </div>
    </main>
  );
}

export default Pagination;
