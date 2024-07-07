import React from 'react';
import GameSingleCard from './GameSingleCard';

const GameCard = ({ games }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {games.map((item) => (
        <GameSingleCard key={item._id} game={item} />
      ))}
    </div>
  );
};

export default GameCard;
