import './AddMovie.css';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';

function AddMovie() {
    return (
        <div className="container-start">
            <p className="form-title"> Formulaire pour ajouter un film </p>
            <div className="form-container-box">
                <AddMovieForm />
            </div>
        </div>
    );
}

export default AddMovie;