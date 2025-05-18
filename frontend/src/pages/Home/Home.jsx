import './Home.css';
import logo from './logo.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Movie from '../../components/Movie/Movie';
import MovieDetails from '../MovieDetails/MovieDetails';

const filterCookieU = (cookie) => {
  return cookie.includes("user")
}
const filterIDU = (user) => {
  return !user.includes("user") && user != ""
}
const getUserID = () => {
  return document.cookie.split(";").filter(filterCookieU).toString().split("=").filter(filterIDU)
}

const useFetchMovies = () => {
  // Fonction qui permet de récupérer la liste des films dans la base de données
  const [moviesList, setList] = useState([])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/movies`)
      // .get('https://api.themoviedb.org/3/trending/movie/week?page=1&api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb')
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
  const sortItem = [{ id: "2", name: "Likes" }, { id: "3", name: "Date (récent)" }, { id: "4", name: "Date (ancien)" }]
  const [sortChosen, setSort] = useState("0")

  const navigate = useNavigate()

  const filterTitle = (movie) => {
    // Fonction de filtrage suivant le titre du film
    return movie.title.toLowerCase().includes(movieSearch.toLowerCase())
  }
  const filterGenre = (movie) => {
    // Fonciton de filtrage suivant le genre du film
    const genre_ids = [movie.genre_id1, movie.genre_id2, movie.genre_id3, movie.genre_id4]
    if (genreChosen != "") {
      return genre_ids.map((genre) => { return genre.toString() }).includes(genreChosen.toString())
    } else {
      return true
    }
  }
  const filterUser = (movie) => {
    if (!getUserID().toString()) {
      return movie.user == null
    }
    return movie.user == getUserID().toString() || movie.user == null
  }

  const filterPage = (page) => {
    var movieTotal = moviesList
      .filter(filterTitle)
      .filter(filterGenre)
      .filter(filterUser)
      .length;
    var pageTotal = Math.ceil(movieTotal / moviePerPage);
    if (page < pageTotal) {
      return true
    } else {
      return false
    }
  }

  const sortByItem = (item) => {
    // Fonction de trie suivant le nombre de likes, la date ou l'ordre alphabétique
    if (item == "2") {
      // Like
      return (a, b) => {
        if (parseInt(a.like) < parseInt(b.like)) {
          return 1;
        } else if (parseInt(a.like) > parseInt(b.like)) {
          return -1;
        } else {
          return 0;
        }
      }
    } else if (item == "3") {
      // Date (descendante)
      return (a, b) => {
        var adate = new Date(a.release_date);
        var bdate = new Date(b.release_date);
        if (adate < bdate) {
          return 1;
        } else if (adate > bdate) {
          return -1;
        } else {
          return 0;
        }
      }
    } else if (item == "4") {
      // Date (ascendante)
      return (b, a) => {
        var adate = new Date(a.release_date);
        var bdate = new Date(b.release_date);
        if (adate < bdate) {
          return 1;
        } else if (adate > bdate) {
          return -1;
        } else {
          return 0;
        }
      }
    } else {
      // Alphabétique
      return (a, b) => {
        return a.title.localeCompare(b.title);
      }
    }
  }

  const paginate = (pages) => {
    return <div className="pagination-container">
      {
        pages
          .filter(filterPage)
          .map((page) => {
            return <input
              className="pagination-button"
              type="button"
              value={page + 1}
              onClick={() => setStart(((page + 1) - 1) * moviePerPage)}
            />
          })
      }
    </div>
  }

  // Variable to paginate
  const moviePerPage = 10;
  var movieTotal = moviesList.length;
  var currentPage = 1;
  const [start, setStart] = useState((currentPage - 1) * moviePerPage);
  var end = start + moviePerPage;
  var pages = [...Array(Math.ceil(movieTotal / moviePerPage)).keys()];

  // Définition de l'affichage de la page
  return (
    <div className="container-center">
      <div className="home-banner">
        <img
          className="site-logo"
          src={logo}
          width="180px"
        >
        </img>
        <span className="annonce">Liste des films</span>
      </div>
      <div className="search-container">
        {/* Création d'une boîte de texte avec le texte qui se rajoute en dessous */}
        <input
          type="text"
          className="text-input"
          placeholder="Rechercher un film"
          onChange={function (event) { setSearch(event.target.value) }}
        >
        </input>
      </div>
      <div className="sort-filter-container">
        {/* Création d'un menu déroulant pour choisir le genre */}
        <select
          className="sort-input input"
          onChange={function (event) { setSort(event.target.value) }}
        >
          <option value="0">Trier suivant</option>
          {sortItem.map(item =>
            <option key={item.id} value={item.id}>{item.name}</option>
          )}
        </select>

        {/* Création d'un menu déroulant pour choisir le critère de trie */}
        <select
          className="genre-input input"
          onChange={function (event) { setGenre(event.target.value) }}
        >
          <option value="">Filtrer par genre</option>
          {movieGenre.map(genre =>
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          )}
        </select>

        {/* Création d'un boutton pour ajouter un film */}
        <input
          className="add-movie-button"
          onClick={() => navigate("/add-a-movie")}
          type="button"
          value="+"
          title="Ajouter un nouveau film"
        />
      </div>

      <div className="search-results-container">
        {/* Affichage des films possibles sous forme de grille et avec une pagination */}
        <div className="pagination-container">
          {paginate(pages)}
        </div>
        {/* Trie des films selon plusieurs critères (titre, genre)
            .filter(fonction) -> renvoie un sous-tableau avec les éléments qui sont assigné à true par la fonction 
            .map(fonction) -> applique la fonction à chaque élément du tableau */}

        {moviesList
          .filter(filterTitle)
          .filter(filterGenre)
          .filter(filterUser)
          .slice(start, start + moviePerPage)
          .length != 0
          ? (
            <div className="movies-list">
              {moviesList
                .filter(filterTitle)
                .filter(filterGenre)
                .filter(filterUser)
                .sort(sortByItem(sortChosen))
                .slice(start, start + moviePerPage)
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
          ) : moviesList
            .filter(filterTitle)
            .filter(filterGenre)
            .slice(0, 0 + moviePerPage)
            .length != 0
            ? (
              setStart(0)
            ) : <div className="no-movie"> Aucun résultat n'a été trouvé </div>}
      </div>
    </div>
  );
}

export default Home;
