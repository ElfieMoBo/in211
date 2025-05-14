import { useNavigate } from 'react-router-dom';
import './Movie.css';

function Movie({ movie }) {
    const navigate = useNavigate()

    return (
        <div className="movie-affiche"
            onClick={() => navigate("/details/" + movie.id)}>
            {movie.poster_path ? (
                <img src={"https://image.tmdb.org/t/p/w300" + movie.poster_path} className="movie-poster" alt="logo" title={movie.overview}
                />
            ) :
                <div  className="movie-poster no-poster"> Aucune couverture </div>
            }
            <div className="movie-title" >
                {movie.title}
            </div>
        </div>
    );
}

export default Movie;