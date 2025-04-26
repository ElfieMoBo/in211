import './MovieDetails.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchDetails = (movieid) => {
  // Fonction qui permet de récupérer les détails d'un film grâce à son id
  const [movieDetails, setDetails] = useState([])

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/' + movieid + '?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb')
      .then((reponse) => {
        setDetails(reponse.data)
        console.log(reponse.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return [movieDetails, setDetails];
}

const useFetchCast = (movieid) => {
  // Fonction qui permet de récupérer les détails d'un film grâce à son id
  const [movieCast, setCast] = useState([])

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/' + movieid + '/credits?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb')
      .then((reponse) => {
        setCast(reponse.data)
        console.log(reponse.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return [movieCast, setCast];
}

// const casting = document.getElementById("movie-detail-allcasting");
// const voirplus = document.getElementById("movie-detail-voirplus-button");

// function supportsPopover() {
//   return HTMLElement.prototype.hasOwnProperty("popover");
// }

// if (supportsPopover()) {
//   // Définit l'élément <div> comme étant un popover automatique
//   casting.popover = "auto";
//   // Définit le bouton comme étant le contrôle du popover
//   voirplus.popoverTargetElement = popover;

//   // Définit que le bouton peut afficher/masquer le popover
//   voirplus.popoverTargetAction = "toggle";
// } else {
//   casting.textContent = "L'API Popover n'est pas prise en charge.";
//   voirplus.hidden = true;
// }


function MovieDetails() {
  const params = useParams()
  const [movieDetails, setDetails] = useFetchDetails(params.id)
  const [movieCast, setCast] = useFetchCast(params.id)
  var date = new Date(movieDetails.release_date);

  // Définition de l'affichage de la page MovieDetails
  return (
    <div className="container">
      {/* Création du visuel : affiche, titre, genre, date, résumé, cast, distribution */}
      <div className="movie-visual-container">
        <img src={"https://image.tmdb.org/t/p/w300" + movieDetails.poster_path} className="movie-detail-poster" alt="logo"
        />
        <div className="movie-lexical-container">
          <div className='movie-detail-title'>{movieDetails.title}</div>
          <div className="movies-info-line-container">
            <p className="movie-detail-date">{date.getFullYear()}</p>
            <p className="movie-detail-time">
              {Math.floor(movieDetails.runtime / 60) != "0" ?
                (Math.floor(movieDetails.runtime / 60) + "h" + movieDetails.runtime % 60 + "min") : movieDetails.runtime % 60 + "min"}
            </p>
            {/* <hr></hr> */}
            {movieDetails.genres ? (
              movieDetails
                .genres
                .map((genre) => {
                  return <p className="movie-detail-genre">{genre.name}</p>
                })) : ''
            }
            {movieDetails.adult
              ? (
                <p className="movie-detail-age"> 18+ </p>
              ) : <p className="movie-detail-age"> 7+ </p>
            }
          </div>
          <div className="movie-detail-overview">
            {movieDetails.overview}
          </div>
          <div className="movie-detail-cast-distribution">
            <p className="movie-detail-acteur">
              <span className="movie-detail-visible-text">
                Avec :
              </span>
              {movieCast.cast ? (
                movieCast.cast
                  .filter((actor) => {
                    return actor.order <= 2
                  })
                  .map((acteur) => {
                    return " " + acteur.name + " (" + acteur.character + "),"
                  })) : ''
              }
              
              {/* <button id="movie-detail-voirplus-button">Voir plus</button>
              <div id="movie-detail-allcasting">
                <span className="movie-detail-visible-text">
                  Avec :
                </span>
                {movieCast.cast ? (
                  movieCast.cast
                    .map((acteur) => {
                      return " " + acteur.name + " (" + acteur.character + "),"
                    })) : ''
                }
              </div> */}

              {/* Essayer de n'afficher que trois/quatre noms puis avoir un bouton voir plus + enlever le dernier , */}
            </p>
            <p className="movie-detail-realisateur">
              <span className="movie-detail-visible-text">
                Réalisateur :
              </span>
              {movieCast.crew ? (
                movieCast
                  .crew
                  .filter((crew) => {
                    return crew.job == "Director"
                  })
                  .map((crew) => {
                    return " " + crew.name
                  })) : ''
              }
            </p>
            <p className="movie-detail-distribution">
              <span className="movie-detail-visible-text">
                Distribution :
              </span>
              {movieDetails.production_companies ? (
                movieDetails
                  .production_companies
                  .map((companie) => {
                    return " " + companie.name
                  })) : ''
              }
            </p>
          </div>
          <input
          className="sup-movie-button"
          // onClick={() => navigate("/delete")}
          type="button"
          value="Supprimer"
          title="Supprimer ce film de la base de données"
        />
        </div>
      </div>

      {/* Création d'une section commentaires */}
      <div className="movie-detail-espace-commentaire">
        <div className="movie-detail-bandeau">
          <p className="movie-detail-"> Laisser un commentaire : </p>
          {/* <p className="movie-detail-star">{movieDetails.vote_average}</p> */}
        </div>

        <div className="movie-detail-commentaire">
          <div className="movide-detail-nouveau-commentaire">
            <input
              type="text"
              className="movie-detail-user"
              placeholder="Nom d'utilisateur"
            >
            </input>
            <input
              type="text"
              className="movie-detail-comment"
              placeholder="Commentaire (à voir plus tard)"
            >
            </input>
          </div>
          <div className="movide-detail-ancien-commentaire">
            <p>Old Comment</p>
          </div>
        </div>
      </div>
    </div >
  );
}

export default MovieDetails;
