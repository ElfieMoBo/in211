import './Profil.css';
import axios from 'axios';

function Connection(user) {
    var passwd = prompt(`Authentification (${user.pseudo}) : entrez votre mot de passe`, "Mot de passe");
    axios
        .get(`${import.meta.env.VITE_BACKDEND_URL}/users/login/${user.id}/${passwd}`)
        .then(() => {
            alert("Success");
        })
        .catch((error) => {
            alert("Bad passwd")
        });
};

function Profil({ user }) {
    return (
        <div className="profil-container" >
            <button
                className="user-icon"
                onClick={() => Connection(user)}
            >
                {user.pseudo.substring(0, 1).toUpperCase()}
            </button>
            <div className="user-pseudo" >
                {user.pseudo}
            </div>

        </div>
    );
}

export default Profil;