import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const GameModal = ({ game, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[800px] max-w-full bg-white rounded-xl p-4 flex flex-row relative overflow-hidden'
        style={{ maxHeight: '80vh' }}
      >
        <div className='flex flex-col justify-start w-1/2 p-4'>
          <AiOutlineClose
            className='absolute right-6 top-6 text-4xl text-red-600 cursor-pointer bg-white p-2 rounded-full' onClick={onClose} />
          <div className='flex justify-between items-center my-4 w-full'>
            <h2 className='px-4 py-1 bg-red-300 rounded-lg text-white'>
              {game.releaseYear}
            </h2>            
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <PiBookOpenTextLight className='text-red-300 text-2xl' />
            <h2 className='my-1'>{game.title}</h2>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <BiUserCircle className='text-red-300 text-2xl' />
            <h2 className='my-1'>{game.developer}</h2>
          </div>
          <p className='mt-4'>{game.description}</p>
        </div>
        <div className='w-1/2 h-auto overflow-hidden'>
          <img
            src={game.imageFile}
            alt={game.title}
            className='w-full h-full object-cover object-center'
          />
        </div>
      </div>
    </div>
  );
};

export default GameModal;
