import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const GameDetails = () => {
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchGame();
  }, [id]);


  const fetchGame = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/gamelib/${id}`);
      setGame(response.data);
    } catch (error) {
      console.error('Error fetching game details:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Game Data Info</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id: </span>
            <span>{game._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title: </span>
            <span>{game.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Genre: </span>
            <span>{game.genre}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Platform: </span>
            <span>{Array.isArray(game.platform) ? game.platform.join(', ') : game.platform}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Release Year: </span>
            <span>{game.releaseYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Developer: </span>
            <span>{game.developer}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Rating: </span>
            <span>{game.rating}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Image File: </span>
            <span>{game.imageFile}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Description: </span>
            <span>{game.description}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
