'use client';

import { useCategoryQuery } from '@/query/category';
import { CategoryType } from '@/utils/types';
import { FaTimes } from 'react-icons/fa';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
};

export default function CategoryChoiceModal({
  setShowModal,
  setCategory,
}: Props) {
  const { data: categories, isLoading } = useCategoryQuery();

  function selectCategory(name: string) {
    if (name) {
      const category = categories?.find(
        (category: CategoryType) => category.name === name
      );

      if (category) setCategory(category);
      setShowModal(false);
    }
  }

  return (
    <main className='blured-bg fixed top-0 left-0 flex justify-center items-center w-full h-full z-20'>
      <div className='w-[80%] md:w-[60%] h-[80%] bg-white rounded-md p-5 relative'>
        {isLoading ? (
          <h1 className='text-center font-semibold'>Loading...</h1>
        ) : (
          <div className='h-[90%] overflow-auto'>
            {categories?.map((category: CategoryType) => {
              return (
                <p
                  key={category._id}
                  className='hover:bg-blue-50 mb-1 leader p-1 cursor-pointer uppercase text-xs md:text-base'
                  onClick={() => selectCategory(category.name)}
                >
                  {category.name}
                </p>
              );
            })}
          </div>
        )}

        <button
          className='cursor-pointer absolute top-[-20px] right-[-20px] p-1 bg-white rounded-full'
          onClick={() => setShowModal(false)}
        >
          <FaTimes />
        </button>
      </div>
    </main>
  );
}
