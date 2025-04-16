import { useState } from 'react';
import axios from 'axios';
import './AddMovieForm.css';


const DEFAULT_FORM_VALUES = {
    title: '',
    date: '',
    overview: '',
    // poster_path: '',
    // genre_ids: [],
    // limited_age: '',
    // runtime: '',
    // casting: [],
};

const registerMovie = () => {
    const [movieError, setMovieError] = useState(null);
    const [movieSuccess, setMovieSuccess] = useState(null);
    const displaySuccessMessage = () => {
        setMovieSuccess('New movie created successfully');
        setTimeout(() => {
            setMovieSuccess(null);
        }, 3000);
    };

    const saveMovie = (event, formValues, setFormValues) => {
        // This avoid page reload
        event.preventDefault();

        setMovieError(null);
        if (formValues.title === '') {
            console.error('Missing title, this field is required');
            return;
        }

        axios
            .post(`${import.meta.env.VITE_BACKDEND_URL}/movies/new`, formValues)
            .then(() => {
                displaySuccessMessage();
                setFormValues(DEFAULT_FORM_VALUES);
            })
            .catch((error) => {
                setMovieError('An error occured while registering a new movie.');
                console.error(error);
            });
    };

    return { saveMovie, movieError, movieSuccess };
};

function AddMovieForm() {
    const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
    const { saveMovie, movieError, movieSuccess } = registerMovie();

    return (
        <div>
            <form
                className="add-movie-form"
                onSubmit={(event) => saveMovie(event, formValues, setFormValues)}
            >
                <input
                    className="add-movie-input"
                    type="title"
                    placeholder="Title"
                    value={formValues.title}
                    onChange={(event) =>
                        setFormValues({ ...formValues, title: event.target.value })
                    }
                />
                <input
                    className="add-movie-input"
                    placeholder="Release date"
                    value={formValues.date}
                    onChange={(event) =>
                        // console.log(event.target.value)
                        setFormValues({ ...formValues, date: event.target.value })
                    }
                />
                <input
                    className="add-movie-input"
                    placeholder="Overview"
                    value={formValues.overview}
                    onChange={(event) =>
                        setFormValues({ ...formValues, overview: event.target.value })
                    }
                />
                <button className="add-movie-button" type="submit">
                    Add a movie
                </button>
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
