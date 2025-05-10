import './Profil.css';

function Profil({ user }) {
    return (
        <div className="profil-container" >
            <button
                className="user-icon"
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