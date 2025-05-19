import './ProfilsList.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Profil from '../../components/Profil/Profil';

const filterCookieP = (cookie) => {
    return cookie.includes("pseudo")
}
const filterIDP = (user) => {
    return !user.includes("pseudo") && user != ""
}
const getUserPseudo = () => {
    return document.cookie.split(";").filter(filterCookieP).toString().split("=").filter(filterIDP)
}

function displayProfils() {
    const [usersList, setUsersList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const users = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/users`);
            setUsersList(users.data.users);
        })()
    }, []);

    const cookieDel = (n, o) => {
        document.cookie = n + "=;max-age=0";
    }
    const signoff = () => {
        cookieDel("user")
        cookieDel("pseudo")
        navigate('/')
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
                    >+
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