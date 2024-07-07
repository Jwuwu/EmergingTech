import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import GameModal from './GameModal';

const UserGameSingleCard = ({ game, onRemove }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>{game.releaseYear}</h2>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1'>{game.title}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{game.developer}</h2>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow className='text-3xl text-blue-800 hover:text-black cursor-pointer' onClick={() => setShowModal(true)} />
        <MdOutlineDelete className='text-3xl text-red-500 hover:text-red-700 cursor-pointer' onClick={() => onRemove(game._id)} />
        <Link to={`/game/${game._id}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
      </div>

      {showModal && <GameModal game={game} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default UserGameSingleCard;
