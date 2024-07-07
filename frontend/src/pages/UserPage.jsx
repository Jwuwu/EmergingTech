import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserGameSingleCard from '../components/UserGameSingleCard';
import axios from 'axios';
import Login from './user/Login';

const UserPage = () => {
    const [favoriteGames, setFavoriteGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const apiUrl = "/api/gamelib";


    useEffect(() => {
        auth()
        setFavoriteGames(storedFavorites);
        
    }, []);

    const storedFavorites = JSON.parse(localStorage.getItem('favoriteGames')) || [];

    const auth = () => {
        setLoading(true);
        axios.get(`${apiUrl}/fetchforauth`)
            .then(result => {
                console.log('result.data:', result.data)
                //check if the user has logged in
                //if(result.data.screen !== 'auth')
                //{

                console.log('data in if:', result.data)
                setData(result.data);

                //}
                setLoading(false);
            }).catch((error) => {
                console.log('error in fetchData:', error)
            });
    };

    const removeFromFavorites = (gameId) => {
        const updatedFavorites = favoriteGames.filter(game => game._id !== gameId);
        setFavoriteGames(updatedFavorites);
        localStorage.setItem('favoriteGames', JSON.stringify(updatedFavorites));
    };

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>User Game Library</h1>

            </div>
            {favoriteGames.length > 0 ? (
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {favoriteGames.map(game => (
                        <UserGameSingleCard key={game._id} game={game} onRemove={removeFromFavorites} />
                    ))}
                </div>
            ) : (
                <p className='text-lg'>No favorite games yet.</p>
            )}
        </div>
    );
};

export default UserPage;
