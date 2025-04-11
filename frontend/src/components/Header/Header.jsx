import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Accueil
      </Link>
    </div>
  );
};

export default Header;
