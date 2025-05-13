import './MovieDetails.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const deleteMovieID = (movieID) => {
  axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/movies/delete-a-movie/${movieID}`);
};

function MovieDetails() {

  const params = useParams()
  const [movieDetails, setMovieDetails] = useState([]);
  const [genreNames, setGenreNames] = useState([]);

  useEffect(() => {
    (async () => {
      const movies = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/movies/get-a-movie/${params.id}`);
      setMovieDetails(movies.data.results[0])
      console.log(movies.data.results[0])
      const genres = await axios.get(`${import.meta.env.VITE_BACKDEND_URL}/genres/get-genres/${movies.data.results[0].genre_id1}/${movies.data.results[0].genre_id2}/${movies.data.results[0].genre_id3}/${movies.data.results[0].genre_id4}`)
      setGenreNames(genres.data.results)
      console.log(genres.data.results)
    })()
  }, [])

  var date = new Date(movieDetails.release_date)
  var note = movieDetails.like / 2;

  const navigate = useNavigate()

  const confirmDelete = (movieID) => {
    if (confirm("La suppression est définitive, êtes-vous sûre de vouloir supprimer ce film ?")) {
      deleteMovieID(movieID)
      navigate('/');
    }
  }

  const addingNote = (movieID) => {
    var comment = prompt("Ajouter un commentaire ce film", "Commentaire");
    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/movies/add-a-comment`, { comment: `${comment}`, id: `${movieID}` })
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        setMovieError("Une erreur est survenue lors de l'enregistrement du commentaire.");
        console.error(error);
      })
      location.reload();
  }

  const deletingNote = (movieID) => {
    alert();
    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/movies/add-a-comment`, { comment: "", id: `${movieID}` })
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        setMovieError("Une erreur est survenue lors de l'enregistrement du commentaire.");
        console.error(error);
      });
      location.reload();
  }

  // Définition de l'affichage de la page MovieDetails
  return (
    <div className="container">
      {/* Création du visuel : affiche, titre, genre, date, résumé */}
      <div className="movie-visual-container">
        <div className="movie-detail-left">
          <img
            className="movie-poster"
            src={"https://image.tmdb.org/t/p/w300" + movieDetails.poster_path}
          />

          {note <= 1
            ? (
              <div>
                <span className='movie-details-star'>★</span>
                <span className='movie-details-no-star'>★★★★</span>
              </div>
            ) : note <= 2
              ? (
                <div>
                  <span className='movie-details-star'>★★</span>
                  <span className='movie-details-no-star'>★★★</span>
                </div>
              ) : note <= 3
                ? (
                  <div>
                    <span className='movie-details-star'>★★★</span>
                    <span className='movie-details-no-star'>★★</span>
                  </div>
                ) : note <= 4
                  ? (
                    <div>
                      <span className='movie-details-star'>★★★★</span>
                      <span className='movie-details-no-star'>★</span>
                    </div>
                  ) :
                  <div>
                    <span className='movie-details-star'>★★★★★</span>
                  </div>
          }
        </div>
        <div className="movie-lexical-container">
          <div className='movie-detail-title'>{movieDetails.title}</div>
          <div className="movies-info-line-container">
            <p className="movie-detail-date">{date.getFullYear()}</p>
            <p className="movie-detail-time">
              {Math.floor(movieDetails.runtime / 60) != "0" ?
                (Math.floor(movieDetails.runtime / 60) + "h" + movieDetails.runtime % 60 + "min") : movieDetails.runtime % 60 + "min"}
            </p>
            {genreNames
              .length != 0
              ? (
                genreNames
                  .map((genre) => {
                    return <p className="movie-detail-genre">{(genre.name)}</p>
                  })
              ) : console.log("no")
            }
            <p className="movie-detail-age"> {movieDetails.limited_age}+ </p>
          </div>
          <div className="movie-detail-overview">
            {movieDetails.overview}
          </div>
          {movieDetails
            .comment
            ? (
              <div className="movie-detail-comment-container">
                <span className='movie-detail-comment'> 
                  Note

                </span>
                <span className="movie-detail-comment">
                  {movieDetails.comment}
                </span>
        
                <input
                  className="movie-detail-delete-note-button"
                  onClick={() => deletingNote(movieDetails.id)}
                  type="button"
                  value="- Note"
                  title="Supprimer le commentaire sur le film"
                />
              </div>
            ) : <input
              className="movie-detail-add-note-button"
              onClick={() => addingNote(movieDetails.id)}
              type="button"
              value="+ Note"
              title="Ajouter un commentaire sur le film"
            />
          }
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
    </div >
  );
}

export default MovieDetails;
