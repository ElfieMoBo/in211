import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import './App.css';
import { Root } from './components/Root/Root';

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<MovieDetails />}/>
      </Routes>
    </Root>
  );
}

export default App;
