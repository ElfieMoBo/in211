import axios from 'axios';
import { useEffect, useState } from 'react';
import './AddMovieForm.css';


const DEFAULT_FORM_VALUES = {
    title: '',
    release_date: new Date(),
    overview: '',
    poster_path: 'path',
    limited_age: 7,
    runtime: 0,
    like: 10,
    genre_id1: 0,
    genre_id2: 0,
    genre_id3: 0,
    genre_id4: 0,
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
            setMovieError('Le titre du film est obligatoire')
            console.error('Aucun titre renseignée : le champ est obligatoire');
            return;
        }

        axios
            .post(`${import.meta.env.VITE_BACKDEND_URL}/movies/new-movie`, formValues)
            .then(() => {
                displaySuccessMessage();
                console.log(formValues);
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
            .get(`${import.meta.env.VITE_BACKDEND_URL}/genres`)
            .then((reponse) => {
                setGenreList(reponse.data.results)
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
    const randPage = Math.floor(Math.random() * 5) + 1;
    const [allGenre, setGenreList] = useFetchGenre();
    const [movieGenre, setGenre] = useState([]);
    const getGenreID = (genreName) => {
        useEffect(() => {
            axios
                .get(`${import.meta.env.VITE_BACKDEND_URL}/genres/get-genre-id/${genreName}`)
                .then((reponse) => {
                    console.log(reponse.data.results.id)
                    return reponse.data.results.id
                })
                .catch((error) => {
                    console.log(error)
                })
        }, []);
    }

    return (
        <div className="container">
            <form
                className="add-movie-form"
                onSubmit={(event) => saveMovie(event, formValues, setFormValues)}
            >
                <div className="add-movie-top">
                    <input
                        className="add-movie-title input-style"
                        type="text"
                        placeholder="Titre *"
                        value={formValues.title}
                        onChange={(event) =>
                            setFormValues({ ...formValues, title: event.target.value })
                        }
                    />
                    <textarea
                        className="add-movie-overview input-style"
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
                            className="add-movie-date input-style"
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
                            className="add-movie-runtime input-style"
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
                        {/* plutôt faire un select entre 3, 7, 12, 16, 18 */}
                        <p className="add-movie-text"> Âge limite : </p>
                        <input
                            className="add-movie-age input-style"
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
                    <span className="add-movie-text"> Genre :</span>
                    <select
                        className="add-movie-genre input-style"
                        // value={formValues.genre_id1}
                        onChange={(event) => setFormValues({ ...formValues, genre_id1: event.target.value })}
                    >
                        <option value="">Choisir un genre</option>
                        {allGenre.map(genre =>
                            <option 
                            key={genre.id} 
                            value={genre.id}
                            onClick={(event) => setFormValues({ ...formValues,genre_id1: event.target.value })}
                            >{genre.name}
                            </option>
                        )}
                    </select>
                </div>
                <div className="add-movie-bottom">
                    <span className="add-movie-text"> Note :</span>
                    <input
                        className="add-movie-stars input-style"
                        type="number"
                        min="0"
                        max="10"
                        placeholder="Like"
                        value={formValues.like}
                        onChange={(event) =>
                            setFormValues({ ...formValues, like: event.target.value })
                        }
                    />
                    <span className="add-movie-text"> Affiche : </span>
                    <input
                        className="add-movie-stars input-style"
                        type="text"
                        min="0"
                        max="10"
                        placeholder="Like"
                        value={formValues.poster_path}
                        onChange={(event) =>
                            setFormValues({ ...formValues, poster_path: event.target.value })
                        }
                    />
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
