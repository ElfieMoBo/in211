import './Profil.css';
import { useNavigate } from 'react-router-dom';


const filterCookieP = (cookie) => {
    return cookie.includes("pseudo")
}
const filterIDP = (user) => {
    return !user.includes("pseudo") && user != ""
}
const getUserPseudo = () => {
    return document.cookie.split(";").filter(filterCookieP).toString().split("=").filter(filterIDP)
}


function Profil({ user }) {
    const navigate = useNavigate();
    const logDelete = true;

    const userManagement = (user) => {
        !getUserPseudo().toString() ? (
            navigate(`/login/true/${user.pseudo}`)
        ) : navigate(`/profils/${user.pseudo}`)
    }

    return (
        <div className="profil-container" >
            <button
                title="se connecter"
                className="user-icon known-user"
                onClick={() => userManagement(user)}
            >
                {user.pseudo ? (
                    user.pseudo.substring(0, 1).toUpperCase()
                ) : ""}
            </button>
            <div className="user-pseudo" >
                {user.pseudo}
            </div>

        </div>
    );
}

export default Profil;