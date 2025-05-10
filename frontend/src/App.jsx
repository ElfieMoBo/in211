import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import { Root } from './components/Root/Root';
import AddMovie from './pages/AddMovie/AddMovie';
import ProfilsList from './pages/ProfilsList/ProfilsList';

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<MovieDetails />} />
        <Route path="/add-a-movie" element={<AddMovie />} />
        <Route path="/profils" element={<ProfilsList />} />
      </Routes>
    </Root>
  );
}

export default App;
