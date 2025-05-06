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
      <div className="middle">
        <span className="name">É</span>
        <span className="name-color">CLIP</span>
        <span className="name">SE</span>
      </div>
      <div className="right">
        <Link className="Link" to="/profil">
          <button
            className="header-profil"
            height="30px"
            width="30px"
          >
            M
          </button>
        </Link>
      </div>
    </div >
  );
};

export default Header;
