import logo from './film.png';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Movie from '../../components/Movie/Movie';


const useFetchMovies = () => {
  // Fonction qui permet de récupérer une liste de 20 films
  const [moviesList, setList] = useState([])

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/trending/movie/week?page=1&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb')
      .then((reponse) => {
        setList(reponse.data.results)
        console.log(reponse)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return [moviesList, setList];
}

const useFetchGenre = () => {
  // Fonction qui permet de récupérer une liste des genres des films possibles
  const [moviesGenre, setGenreList] = useState([])

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb')
      .then((reponse) => {
        setGenreList(reponse.data.genres)
        console.log(reponse)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return [moviesGenre, setGenreList];
}

// Fonction principale qui affiche la page "Home" du site :
function Home() {
  // Définition des variables utiles pour la suite (char ou [])
  const [movieSearch, setSearch] = useState('')
  const [moviesList, setList] = useFetchMovies()
  const [movieGenre, setGenreList] = useFetchGenre()
  const [genreChosen, setGenre] = useState("")


  const filterTitle = (movie) => {
    return movie.title.toLowerCase().includes(movieSearch.toLowerCase())
  }

  const filterGenre = (movie) => {
    if (genreChosen != "") {
      return movie.genre_ids.map((genre) => { return genre.toString() }).includes(genreChosen.toString())
    } else {
      return true
    }
  }
  // Définition de l'affichage de la page
  return (
    <div className="container">
      <div className="search-container">
        {/* Création d'une boîte de texte avec le texte qui se rajoute en dessous */}
        <input
          type="text"
          className="text-input"
          placeholder="Rechercher un film"
          onChange={function (event) { setSearch(event.target.value) }}
        // Les scripts js sont entre {}
        >
        </input>
        {/* <div>
          Récupération du titre (ok!) : {movieSearch}
        </div> */}

        {/* Création d'un menu déroulant pour choisir le genre (il faudra en faire un output à part pour pouvoir mettre ce qu'on veut derrière) */}
        <select
          className="genre-input"
          onChange={function (event) { setGenre(event.target.value) }}
        >
          <option value="">Filtrer par genre</option>
          {movieGenre.map(genre =>
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          )}
        </select>
        {/* <div>
          Récupération du genre (ok!) : {genreChosen}
        </div> */}
      </div>

      <div className="search-results-container">
        {/* Affichage des films possibles sous forme de grille */}
          <p className="movie-annonce">
            Films et séries
          </p>
        {/* Trie des films selon plusieurs critères (titre, genre)
            .filter(fonction) -> renvoie un sous-tableau avec les éléments qui sont assigné à true par la fonction 
            .map(fonction) -> applique la fonction à chaque élément du tableau */}
        {moviesList
          .filter(filterTitle)
          .filter(filterGenre)
          .length!=0
          ? (
            <div className="movies-list">
              {moviesList
                .filter(filterTitle)
                .filter(filterGenre)
                .sort((a, b) => {
                  return a.title.localeCompare(b.title);
                })
                .map((movie) => {
                  return <Movie
                    key={movie.id}
                    title={movie.title}
                    genre={movie.genre}
                    movie={movie}
                  />
                })
              }
            </div>
          )
          : <div className="no-movie"> Aucun résultat n'a été trouvé </div>}
      </div>
    </div>
  );
}

export default Home;
