import './MovieDetails.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const deleteMovieID = (movieID) => {
  axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/movies/delete-a-movie/${movieID}`);
};

const filterCookieU = (cookie) => {
  return cookie.includes("user")
}
const filterIDU = (user) => {
  return !user.includes("user") && user != ""
}
const filterCookieP = (cookie) => {
  return cookie.includes("pseudo")
}
const filterIDP = (user) => {
  return !user.includes("pseudo") && user != ""
}
const getUserID = () => {
  return document.cookie.split(";").filter(filterCookieU).toString().split("=").filter(filterIDU)
}
const getUserPseudo = () => {
  return document.cookie.split(";").filter(filterCookieP).toString().split("=").filter(filterIDP)[0]
}



function MovieDetails() {
  const params = useParams()
  const [movieDetails, setMovieDetails] = useState([]);
  const [genreNames, setGenreNames] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const displayMessage = () => {
    setTimeout(() => {
      setErrorMessage(null);
      setSuccessMessage(null);
    }, 3000);
  };

  useEffect(() => {
    (async () => {
      const movies = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/movies/get-a-movie/${params.id}`);
      setMovieDetails(movies.data.results[0])
      const comments = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/comments/get-comments/${params.id}`);
      setCommentsList(comments.data.results)
      const genres = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/genres/get-genres/${movies.data.results[0].genre_id1}/${movies.data.results[0].genre_id2}/${movies.data.results[0].genre_id3}/${movies.data.results[0].genre_id4}`)
      setGenreNames(genres.data.results)
    })()
  }, [])

  var date = new Date(movieDetails.release_date)
  var note = movieDetails.like / 2;

  const filterLike = (number) => {
    return note > number - 1 && note <= number
  }
  const stars = [1, 2, 3, 4, 5];
  const starslist = [["★", "★★★★"], ["★★", "★★★"], ["★★★", "★★"], ["★★★★", "★"], ["★★★★★", ""]];

  const navigate = useNavigate()

  const confirmDelete = (movieID) => {
    if (getUserID().toString()) {
      if (confirm("La suppression est définitive, êtes-vous sûre de vouloir supprimer ce film ?")) {
        deleteMovieID(movieID)
        navigate('/');
      }
    } else {
      setErrorMessage("Il faut être connecté pour supprimer ce film");
      displayMessage();
    }
  }

  const addingNote = (movieID) => {
    var user = "";
    var pseudo = "";
    var comment = "";
    if (getUserID().toString()) {
      user = getUserID();
      pseudo = getUserPseudo();
      console.log("pseudo", pseudo)
      comment = prompt("Ajouter un commentaire ce film", "Commentaire");
      if (comment) {
        axios
          .post(`${import.meta.env.VITE_BACKDEND_URL}/comments/add-comment`, { comment: `${comment}`, user: `${user}`, pseudo: `${pseudo}`, movie: `${movieID}` })
          .then(() => {
          })
          .catch((error) => {
            setMovieError("Une erreur est survenue lors de l'enregistrement du commentaire.");
            console.error(error);
          })
        navigate(`/details/${params.id}`);
      }
    } else {
      setErrorMessage("Il faut être connecté pour poster un commentaire");
      displayMessage();
    }
    // return [commentPostError]
  }

  const deletingNote = (commentID, commentUser, commentPseudo) => {
    if (getUserID() == commentUser) {
      if (confirm(`La suppression est définitive, êtes-vous sûre de vouloir supprimer ce commentaire de ${getUserPseudo()} ?`)) {
        axios
          .delete(`${import.meta.env.VITE_BACKDEND_URL}/comments/delete-a-comment/${commentID}`)
        navigate(`/details/${params.id}`);
        setSuccessMessage("Le commentaire a bien été supprimé");
        displayMessage();
      }
    } else {

      setErrorMessage(`Il faut être connecté au compte ${commentPseudo} pour supprimer ce commentaire`);
      displayMessage();
    }
    // return [commentDeleteError]
  }


  // Définition de l'affichage de la page MovieDetails
  return (
    <div className="container-start">
      {/* Création du visuel : affiche, titre, genre, date, résumé */}
      <div className="movie-visual-container">
        <div className="movie-detail-left">
          {movieDetails.poster_path ? (
            <img src={"https://image.tmdb.org/t/p/w300" + movieDetails.poster_path} className="movie-poster" alt="logo"
            />
          ) :
            <div className="movie-poster no-poster"> {movieDetails.title} </div>
          }

          {
            stars
              .filter(filterLike)
              .map((number) => {
                return <div key={number}>
                  <span className='star movie-details-star'>{starslist[number - 1][0]}</span>
                  <span className='star'>{starslist[number - 1][1]}</span>
                </div>
              })
          }
        </div>
        <div className="movie-lexical-container">
          <div className='movie-detail-title'>{movieDetails.title}</div>
          <div className="movies-info-line-container">
            <p className="movie-detail-date">{date.getFullYear().toString()}</p>
            <p className="movie-detail-time">
              {Math.floor(movieDetails.runtime / 60) != "0" ?
                (Math.floor(movieDetails.runtime / 60) + "h" + movieDetails.runtime % 60 + "min") : movieDetails.runtime % 60 + "min"}
            </p>
            {genreNames
              .length != 0
              ? (
                genreNames
                  .map((genre) => {
                    return <p key={genre.id} className="movie-detail-genre">{(genre.name)}</p>
                  })
              ) : <p></p>
            }
            <p className="movie-detail-age"> {movieDetails.limited_age}+ </p>
          </div>
          <div className="movie-detail-overview">
            {movieDetails.overview}
          </div>
          {commentsList
            .length != 0
            ? (
              commentsList
                .map((comment) => {
                  return <div key={comment.id} className="movie-detail-comment-container">
                    <span className='movie-detail-comment movie-detail-user'>
                      {comment.user_pseudo}
                    </span>
                    <span className="movie-detail-comment">
                      {comment.comment}
                    </span>
                    <input
                      className="movie-detail-note-button delete-note"
                      onClick={() => deletingNote(comment.id, comment.user_id, comment.user_pseudo)}
                      type="button"
                      value="- Note"
                      title="Supprimer ce commentaire sur le film"
                    />
                  </div>
                })
            ) : <div></div>
          }
          <input
            className="movie-detail-note-button add-note"
            onClick={() => addingNote(movieDetails.id)}
            type="button"
            value="+ Note"
            title="Ajouter un commentaire sur le film"
          />
          {errorMessage !== null && (
            <div className="error-text">{errorMessage}</div>
          )}
          {successMessage !== null && (
            <div className="success-text">{successMessage}</div>
          )}
        </div>
      </div>
      <div className="movie-sup-container">
        <input
          className="sup-movie-button"
          onClick={() => confirmDelete(movieDetails.id)}
          type="button"
          value="Supprimer"
          title="Supprimer ce film"
        />
      </div>
    </div >
  );
}

export default MovieDetails;
