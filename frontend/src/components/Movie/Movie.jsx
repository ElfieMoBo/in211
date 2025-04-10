import { useNavigate } from 'react-router-dom';
import './Movie.css';

function Movie({ movie }) {
    const navigate = useNavigate()
    return (
        <div id="movie-affiche" 
        onClick={() => navigate("/details/" + movie.id)}>
            <img src={"https://image.tmdb.org/t/p/w300" + movie.poster_path} className="movie-poster" alt="logo" title={movie.overview}
            />
            <div className="movie-title" >
                {movie.title}
            </div>
            <div className="movie-date">
                {movie.release_date}
            </div>

        </div>
    );
}

export default Movie;