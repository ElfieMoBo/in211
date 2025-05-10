import './ProfilsList.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Profil from '../../components/Profil/Profil';


function displayProfils() {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        (async () => {
            const users = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/users`);
            setUsersList(users.data.users);
            console.log(users.data.users);
        })()
    }, []);

    return (
        <div className="user-container">
            <p className="user-text">
                Liste des utilisateurs
            </p>
            <p className="user-text-little">
                Choissisez votre profil
            </p>
            <div className="users-list">
                {usersList
                    .map((user) => {
                        return <Profil
                            key={user.id}
                            pseudo={user.pseudo}
                            age={user.age}
                            user={user}
                        />
                    })
                }
                <div className="profil-container" >
                    <button
                        className="user-icon"
                    >                    +
                    </button>
                    <div className="user-pseudo" >
                        Ajouter un profil
                    </div>

                </div>
            </div>
        </div>
    );
}

export default displayProfils;