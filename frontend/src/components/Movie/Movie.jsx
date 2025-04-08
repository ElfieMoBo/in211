
import './Movie.css';

function Movie({ movie }) {
    return (
        <div id="col">
            <img src={"https://image.tmdb.org/t/p/w300" + movie.poster_path} className="movie-poster" alt="logo" />
            <div className="movie-title">
                {movie.title}
            </div>
            <div className="movie-date">
                {movie.release_date}
            </div>

        </div>
    );
}

export default Movie;