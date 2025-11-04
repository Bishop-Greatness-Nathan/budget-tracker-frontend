import { FaTimes } from 'react-icons/fa';

export default function ImageModal({
  image,
  setShowImageModal,
}: {
  image: string;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className='blured-bg fixed top-0 left-0 w-full h-full flex justify-center items-center z-10 py-10'>
      <div className='relative h-full flex justify-center items-center bg-black'>
        <button
          className='absolute top-[-20px] right-[-20px] bg-white p-1 rounded-full'
          onClick={() => setShowImageModal(false)}
        >
          <FaTimes />
        </button>

        {image ? (
          <img src={image} alt='receipt img' className='h-full' />
        ) : (
          <p className='text-white'>No image</p>
        )}
      </div>
    </div>
  );
}
