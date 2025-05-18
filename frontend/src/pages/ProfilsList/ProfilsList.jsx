import './ProfilsList.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Profil from '../../components/Profil/Profil';


function displayProfils() {
    const [usersList, setUsersList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const users = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/users`);
            setUsersList(users.data.users);
            console.log(users.data.users);
        })()
    }, []);

    var attributs = {
        domain: location.hostname,
        path: '/'
    }
    const cookieDel = (n, o) => {
        document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=" + (o.path ? o.path : '/') + (o.domain ? ";domain=" + o.domain : '');
    }
    const signoff = () => {
        cookieDel("user", attributs)
        cookieDel("pseudo", attributs)
        location.reload();
        navigate('/');
    }

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
                        className="user-icon add-user"
                        onClick={() => navigate("/login/false/false")}
                    >                    +
                    </button>
                    <div className="user-pseudo" >
                        Ajouter un profil
                    </div>

                </div>
                <div className="container-center">
                    <input
                        className="log-sign-button input"
                        onClick={() => signoff()}
                        type="button"
                        value="Se déconnecter"
                    />
                </div>
            </div>
        </div>
    );
}

export default displayProfils;