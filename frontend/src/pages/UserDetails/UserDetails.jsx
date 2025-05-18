import './UserDetails.css';
import axios from 'axios';
import Profil from '../../components/Profil/Profil';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'



const filterCookieP = (cookie) => {
    return cookie.includes("pseudo")
}
const filterIDP = (user) => {
    return !user.includes("pseudo") && user != ""
}
const getUserPseudo = () => {
    return document.cookie.split(";").filter(filterCookieP).toString().split("=").filter(filterIDP)
}

function UserDetails() {
    const params = useParams();
    const pseudo = params.pseudo;
    const [user, setUser] = useState([]);

    // Function to delete a user and deconnect
    const navigate = useNavigate();
    const deleteUserID = (userID) => {
        axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/users/delete/${userID}`);
    };
    var attributs = {
        domain: location.hostname,
        path: '/'
    }
    const cookieDel = (n, o) => {
        console.log("deleting cookies")
        document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=" + (o.path ? o.path : '/') + (o.domain ? ";domain=" + o.domain : '');
    }
    const signoff = () => {
        console.log("asking to delete cookies")
        cookieDel("user", attributs)
        cookieDel("pseudo", attributs)
    };
    const confirmDelete = (userID) => {
        if (confirm("La suppression est définitive, êtes-vous sûre de vouloir supprimer cet utilisateur ?")) {
            signoff()
            deleteUserID(userID)
            console.log("delete user")
            navigate('/profils')
        }
    };

    console.log(pseudo)
    useEffect(() => {
        (async () => {
            const user = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/users/user-by-pseudo/${pseudo}`);
            setUser(user.data.user[0]);
        })()
    }, []);

    return (
        <div className="container-start">
            <div className="container-row-start" >
                <div className="profil-container">
                    <Profil
                        key={user.id}
                        pseudo={user.pseudo}
                        age={user.age}
                        user={user}
                    />
                </div>
                <div className="information-container">
                    <span className="movie-detail-title">
                        {user.firstname} {user.lastname.toUpperCase()}
                    </span>
                    <p className="movie-detail-age"> {user.age} </p>
                </div>
            </div>
            {getUserPseudo() == user.pseudo ? (
                <div className="movie-sup-container">
                    <input
                        className="sup-movie-button"
                        onClick={() => confirmDelete(user.id)}
                        type="button"
                        value="Supprimer"
                        title="Supprimer cet utilisateur"
                    />
                </div>
            ) : <div></div>
            }
        </div>
    );
}

export default UserDetails;