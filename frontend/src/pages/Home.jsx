import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { useSnackbar } from 'notistack';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const apiUrl = "/api/gamelib";

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = () => {
    setLoading(true);
    axios.get(apiUrl)
      .then((res) => {
        setGames(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching games:', error);
        enqueueSnackbar('Failed to fetch games', { variant: 'error' });
        setLoading(false);
      });
  };

  const createGames = async () => {
    setLoading(true);
    try {
      const response = await fetch('/assets/gameData.json');
      const gameData = await response.json();

      const existingTitles = new Set(games.map(game => game.title.toLowerCase()));

      const postPromises = [];

      for (const game of gameData) {
        if (!existingTitles.has(game.title.toLowerCase())) {
          postPromises.push(axios.post(apiUrl, game));
          existingTitles.add(game.title.toLowerCase());
        } else {
          console.log(`Game with title "${game.title}" already exists.`);
        }
      }

      await Promise.all(postPromises);

      enqueueSnackbar('Games created, skipping duplicates', { variant: 'info' });
      fetchGames();
    } catch (error) {
      console.error('Error creating games:', error.response ? error.response.data : error.message);
      enqueueSnackbar('Error creating games', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const deleteAllGames = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      const gameIds = res.data.map(game => game._id);

      const deletePromises = gameIds.map(id => axios.delete(`${apiUrl}/${id}`));

      await Promise.all(deletePromises);

      setGames([]);

      enqueueSnackbar('All games deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting games:', error.response ? error.response.data : error.message);
      enqueueSnackbar('Error deleting games', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sky-300 hover px-4 py-1 rounded-lg' onClick={createGames}>
          Create Game Library
        </button>
        <button className='bg-red-300 hover px-4 py-1 rounded-lg' onClick={deleteAllGames}>
          Delete Game Library
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Game Library</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : games.length > 0 ? (
        <GameCard games={games} />
      ) : (
        <p className='text-lg'>
          Currently no games in Database, please use “Create Game Library” Button to Import Games
        </p>
      )}
    </div>
  );
};

export default Home;
