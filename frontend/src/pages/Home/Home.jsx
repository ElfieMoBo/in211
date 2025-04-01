import logo from './logo.svg';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [movieSearch, setSearch] = useState('coucou')
  const [moviesList, setlist] = useState([])
  useEffect( () => {
    axios
      .get('https://api.themoviedb.org/3/trending/movie/week?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb')
      .then((reponse) => {
        setlist(reponse.data.results)
        console.log(reponse)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])
  return (
    <div className="App">
      <h1>Hello !</h1>
        <header className="App-header">
          <input
            type="text"
            id="film_name"
            name="filmname"  
            placeholder="Rechercher un film"
            onChange={function(event){setSearch(event.target.value)}}
            // Entre {} -> js
          >
          </input>
          <p>
            {movieSearch}
          </p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/Home/Home.jsx</code> and save to reload.
          </p>
          <p>
            Liste des films : 
            {moviesList.map(title => <li>{moviesList[6].original_title}</li>)}
          </p>
        </header>
    </div>
  );
}

export default Home;
