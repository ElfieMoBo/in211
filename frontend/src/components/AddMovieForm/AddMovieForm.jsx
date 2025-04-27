import axios from 'axios';
import { useEffect, useState } from 'react';
import './AddMovieForm.css';


const DEFAULT_FORM_VALUES = {
    title: '',
    release_date: new Date(),
    overview: '',
    // poster_path: '',
    // genre_ids: [],
    limited_age: 7,
    runtime: 0,
    // casting: [],
};

const registerMovie = () => {
    const [movieError, setMovieError] = useState(null);
    const [movieSuccess, setMovieSuccess] = useState(null);
    const displaySuccessMessage = () => {
        setMovieSuccess('Nouveau film ajouté');
        setTimeout(() => {
            setMovieSuccess(null);
        }, 3000);
    };

    const saveMovie = (event, formValues, setFormValues) => {
        // This avoid page reload
        event.preventDefault();

        setMovieError(null);
        if (formValues.title === '') {
            console.error('Aucun titre renseignée : le champ est obligatoire');
            return;
        }

        axios
            .post(`${import.meta.env.VITE_BACKDEND_URL}/movies/new-movie`, formValues)
            .then(() => {
                displaySuccessMessage();
                setFormValues(DEFAULT_FORM_VALUES);
            })
            .catch((error) => {
                setMovieError("Une erreur est survenue lors de l'enregistrement du film.");
                console.error(error);
            });
    };

    return { saveMovie, movieError, movieSuccess };
};

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

function AddMovieForm() {
    const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
    const { saveMovie, movieError, movieSuccess } = registerMovie();
    // const [allGenre, setGenreList] = useFetchGenre();
    // For now, it's just setGenre but I want to addGenre [] -> ['id1'] -> ['id1', 'id2']
    const [genre, setGenre] = useState([]);

    return (
        <div className="container">
            <form
                className="add-movie-form"
                onSubmit={(event) => saveMovie(event, formValues, setFormValues)}
            >
                <div className="add-movie-top">
                    <input
                        className="add-movie-title"
                        type="text"
                        placeholder="Titre"
                        value={formValues.title}
                        onChange={(event) =>
                            setFormValues({ ...formValues, title: event.target.value })
                        }
                    />
                    <textarea
                        className="add-movie-overview"
                        placeholder="Synopsis"
                        value={formValues.overview}
                        onChange={(event) =>
                            setFormValues({ ...formValues, overview: event.target.value })
                        }
                    />
                </div>
                <div className="add-movie-middle">
                    <div className="add-movie-container" >
                        <p className="add-movie-text"> Date de sortie : </p>
                        <input
                            className="add-movie-date"
                            type="date"
                            placeholder="Release date"
                            value={formValues.release_date}
                            onChange={(event) =>
                                setFormValues({ ...formValues, release_date: event.target.value })
                            }
                        />
                    </div>

                    <div className="add-movie-container" >
                        <p className="add-movie-text"> Durée : </p>
                        <input
                            className="add-movie-runtime"
                            type="number"
                            min="0"
                            max="240"
                            placeholder="Durée (min)"
                            value={formValues.runtime}
                            onChange={(event) =>
                                setFormValues({ ...formValues, runtime: event.target.value })
                            }
                        />
                    </div>

                    <div className="add-movie-container" >
                        <p className="add-movie-text"> Âge limite : </p>
                        <input
                            className="add-movie-age"
                            type="number"
                            min="7"
                            max="18"
                            value={formValues.limited_age}
                            onChange={(event) =>
                                setFormValues({ ...formValues, limited_age: event.target.value })
                            }
                        />
                    </div>
                </div>
                <div className="add-movie-bottom">
                    <span className="add-movie-text"> Genres :</span>
                    {/* <select
                        className="add-movie-genre"
                        onChange={function (event) { setGenre(event.target.value) }}
                    >
                        <option value="">Filtrer par genre</option>
                        {allGenre.map(genre =>
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        )}
                    </select> */}
                </div>
                <div className="add-movie-bottom">
                    <span className="add-movie-text"> Note :</span>
                    {/* <input
                            className="add-movie-stars"
                            type="number"
                            min="0"
                            max="10"
                            placeholder=""
                            value={formValues.like}
                            onChange={(event) =>
                                setFormValues({ ...formValues, runtime: event.target.value })
                            }
                        /> */}
                </div>
                <div className="button-container">
                <button className="add-a-movie-button" type="submit">
                        Ajouter un film
                </button>
                </div>
            </form>
            {movieSuccess !== null && (
                <div className="movie-creation-success">{movieSuccess}</div>
            )}
            {movieError !== null && (
                <div className="movie-creation-error">{movieError}</div>
            )}
        </div>
    );
}

export default AddMovieForm;
