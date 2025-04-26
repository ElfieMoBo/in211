import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <div className="left">
        <Link className="Link" to="/">
          {/* I put some random image from internet but I will have to change it in order to have user rights good */}
          <img
            className="header-icon"
            height="30px"
            width="30px"
            src="https://openclipart.org/image/2400px/svg_to_png/217511/142Accueil9747035.png">
          </img>
        </Link>
      </div>
      <div className="right">
        <Link className="Link" to="/connection">
          Connexion
        </Link>
        <Link className="Link" to="/profil">
          <img
            className="header-icon"
            height="30px"
            width="30px"
            src="https://getdrawings.com/vectors/vector-circle-png-30.png">
          </img>
        </Link>
      </div>
    </div >
  );
};

export default Header;
