import './MovieDetails.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const deleteMovieID = (movieID) => {
  axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/movies/delete-a-movie/${movieID}`);
};


const useFetchDetails = (movieID) => {
  // Fonction qui permet de récupérer les détails d'un film grâce à son id
  const [movieDetails, setDetails] = useState([])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/movies/get-a-movie/${movieID}`)
      .then((reponse) => {
        setDetails(reponse.data.results[0])
        console.log(reponse.data.results[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return [movieDetails, setDetails];
}



function MovieDetails() {
  const params = useParams()
  const [movieDetails, setDetails] = useFetchDetails(params.id)
  console.log(movieDetails);
  // const [movieCast, setCast] = useFetchCast(params.id)
  var date = new Date(movieDetails.release_date)
  const navigate = useNavigate()

  const confirmDelete = (movieID) => {
    if (confirm("La suppression est définitive, êtes-vous sûre de vouloir supprimer ce film ?")) {
      deleteMovieID(movieID)
      navigate('/');
    }
  }
  const addingNote = (movieID) => {
      <textarea
        className="movie-detail-comment"
        placeholder="Commentaire (à voir plus tard)"
      >
      </textarea>
  }

  // Définition de l'affichage de la page MovieDetails
  return (
    <div className="container">
      {/* Création du visuel : affiche, titre, genre, date, résumé */}
      <div className="movie-visual-container">
        <img
          src="/../Home/film.png"
          className="movie-detail-poster" alt="logo"
          width="300"
          height="400"
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
            {/* {movieDetails.genres ? (
              movieDetails
                .genres
                .map((genre) => {
                  return <p className="movie-detail-genre">{genre.name}</p>
                })) : ''
            } */}
            <p className="movie-detail-age"> {movieDetails.limited_age}+ </p>
          </div>
          <div className="movie-detail-overview">
            {movieDetails.overview}
          </div>
          <input
            className="add-note-movie-button"
            onClick={() => addingNote(movieDetails.id)}
            type="button"
            value="+ Note"
            title="Ajouter un commentaire sur le film"
          />
        </div>
      </div>
      <div className="movie-sup-container">
        <input
          className="sup-movie-button"
          onClick={() => confirmDelete(movieDetails.id)}
          type="button"
          value="Supprimer"
          title="Supprimer ce film de la base de données"
        />
      </div>

      {/* Création d'une section commentaires */}
      {/* <div className="movie-detail-espace-commentaire">
        <div className="movie-detail-bandeau">
          <p className="movie-detail-"> Laisser un commentaire : </p>
          <p className="movie-detail-star">{movieDetails.vote_average}</p> 
        </div>

        <div className="movie-detail-commentaire">
          <div className="movide-detail-nouveau-commentaire">
            <input
              type="text"
              className="movie-detail-user"
              placeholder="Nom d'utilisateur"
            >
            </input>
            <textarea
              className="movie-detail-comment"
              placeholder="Commentaire (à voir plus tard)"
            >
            </textarea>
          </div>
          <div className="movide-detail-ancien-commentaire">
            <p>Old Comment</p>
          </div>
        </div>
      </div> */}
    </div >
  );
}

export default MovieDetails;
