import { Link } from 'react-router-dom';
import './Header.css';
import home from './home.png'
import logo from './logo.png'

const filterCookieP = (cookie) => {
  return cookie.includes("pseudo")
}
const filterIDP = (user) => {
  return !user.includes("pseudo") && user != ""
}
const getUserPseudo = () => {
  return document.cookie.split(";").filter(filterCookieP).toString().split("=").filter(filterIDP)
}

const Header = () => {
  return (
    <div className="Header-container">
      <div className="left">
        <Link className="Link" to="/">
          <img
            className="header-icon"
            height="40px"
            src={home}>
          </img>
        </Link>
      </div>
      <div className="middle">
        <img
          className="logo-icon"
          height="50px"
          src={logo}>
        </img>
        <span className="name">É</span>
        <span className="name name-color">CLIP</span>
        <span className="name">SE</span>
      </div>
      <div className="right">
        <Link className="Link" to="/profils">
          <button
            title={getUserPseudo()}
            className="header-profil"
          >
            {getUserPseudo() ? (getUserPseudo().toString().substring(0, 1).toUpperCase()) : " "}
          </button>
        </Link>
      </div>
    </div >
  );
};

export default Header;
