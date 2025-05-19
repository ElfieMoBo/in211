import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserForm.css';

const filterCookieP = (cookie) => {
  return cookie.includes("pseudo")
}
const filterIDP = (user) => {
  return !user.includes("pseudo") && user != ""
}
const getUserPseudo = () => {
  return document.cookie.split(";").filter(filterCookieP).toString().split("=").filter(filterIDP)
}

const DEFAULT_FORM_SIGN_IN = {
  email: '',
  firstname: '',
  lastname: '',
  pseudo: '',
  age: '',
  passwd: '',
  passwd2: '',
};

const useSaveUser = () => {
  const [userCreationError, setUserCreationError] = useState(null);
  const [userCreationSuccess, setUserCreationSuccess] = useState(null);
  const displayCreationSuccessMessage = () => {
    setUserCreationSuccess('Nouvel utilisateur crée');
    setTimeout(() => {
      setUserCreationSuccess(null);
    }, 3000);
  };

  const saveUser = (event, formValues, setFormValues) => {
    // This avoid page reload
    event.preventDefault();

    setUserCreationError(null);
    if (formValues.email === '') {
      setUserCreationError('Un email est obligatoire pour créer un compte');
      return;
    }
    if (formValues.pseudo === '') {
      setUserCreationError("Un nom d'utilisateur est obligatoire pour créer un compte");
      return;
    }
    if (formValues.passwd != formValues.passwd2) {
      setUserCreationError("Les mots de passe ne correspondent pas");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/users/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_SIGN_IN);
      })
      .catch((error) => {
        setUserCreationError("Une erreur est survenue lors de la création du compte");
        console.error(error);
      });
  };

  return { saveUser, userCreationError, userCreationSuccess };
};

function UserForm() {
  const params = useParams();
  var pseudo = '';
  params.pseudo.toString() != "false" ? (
    pseudo = params.pseudo
  ) : pseudo = ''

  const DEFAULT_FORM_LOG_IN = {
    pseudo: pseudo,
    passwd: '',
  };


  const useLogIn = () => {
    const [userLogInError, setUserLogInError] = useState(null);
    const [userLogInSuccess, setUserLogInSuccess] = useState(null);
    const displayLogInSuccessMessage = () => {
      setUserLogInSuccess('Connexion réussie');
      setTimeout(() => {
        setUserLogInSuccess(null);
      }, 3000);
    };

    const navigate = useNavigate()

    const logIn = (event, formLogIn, setFormLogIn) => {
      // This avoid page reload
      event.preventDefault();

      setUserLogInError(null);
      if (formLogIn.pseudo === '') {
        setUserLogInError("Un nom d'utilisateur est requis");
        return;
      }

      if (getUserPseudo().toString()) {
        alert("Vous êtes déjà connecté en tant que " + getUserPseudo().toString() + ". \nDéconnectez vous pour vous connecter à un autre utilisateur.");
        return;
      }

      axios
        .post(`${import.meta.env.VITE_BACKDEND_URL}/users/login`, formLogIn)
        .then((response) => {
          document.cookie = `user=${response.data[0].id}; SameSite=None; Secure`;
          document.cookie = `pseudo=${response.data[0].pseudo}; SameSite=None; Secure`;
          navigate('/');
          displayLogInSuccessMessage();
          setFormLogIn(DEFAULT_FORM_LOG_IN);
        })
        .catch((error) => {
          console.log(error)
          setUserLogInError(error.response.data.message);
          console.error("erreur : ", error.response.data.message);
        });
    };

    return { logIn, userLogInError, userLogInSuccess };
  };

  const [formLogIn, setFormLogIn] = useState(DEFAULT_FORM_LOG_IN);
  const [formSignIn, setFormSignIn] = useState(DEFAULT_FORM_SIGN_IN);
  const { saveUser, userCreationError, userCreationSuccess } = useSaveUser();
  const [logOrSign, setLogOrSign] = useState(params.sigin);
  const { logIn, userLogInError, userLogInSuccess } = useLogIn();


  return (
    <div className="container-center">
      {logOrSign.toString() === "true"
        ? (
          <div className="log-sign-container">
            <p className="annonce connection-text"> Connexion </p>
            <form
              className="user-form"
              onSubmit={(event) => logIn(event, formLogIn, setFormLogIn)}
            >
              <input
                className="user-input input"
                type="Pseudo"
                placeholder="Nom d'utilisateur"
                value={formLogIn.pseudo}
                onChange={(event) =>
                  setFormLogIn({ ...formLogIn, pseudo: event.target.value })
                }
              />
              <input
                type="password"
                className="user-input input"
                placeholder="Mot de passe"
                value={formLogIn.passwd}
                onChange={(event) =>
                  setFormLogIn({ ...formLogIn, passwd: event.target.value })
                }
              />
              <button className="user-button input" type="submit">
                Connexion
              </button>
            </form>
            {
              userLogInSuccess !== null && (
                <div className="success-text">{userLogInSuccess}</div>
              )
            }
            {
              userLogInError !== null && (
                <div className="error-text">{userLogInError}</div>
              )
            }
            <div className="change-container">
              <span> Aucun compte ? </span>
              <input
                className=""
                onClick={() => setLogOrSign(!logOrSign)}
                type="button"
                value="Créer un compte"
              />
            </div>
          </div>
        ) :
        <div className="log-sign-container">
          <p className="annonce connection-text"> Création d'un nouveau compte utilisateur </p>
          <form
            className="user-form"
            onSubmit={(event) => saveUser(event, formSignIn, setFormSignIn)}
          >
            <span className="form-detail"> Adresse mail (requis) : </span>
            <input
              className="user-input input"
              type="email"
              placeholder="Email"
              value={formSignIn.email}
              onChange={(event) =>
                setFormSignIn({ ...formSignIn, email: event.target.value })
              }
            />
            <span className="form-detail"> Nom de famille : </span>
            <input
              className="user-input input"
              placeholder="Nom"
              value={formSignIn.lastname}
              onChange={(event) =>
                setFormSignIn({ ...formSignIn, lastname: event.target.value })
              }
            />
            <span className="form-detail"> Prénom : </span>
            <input
              className="user-input input"
              placeholder="Prénom"
              value={formSignIn.firstname}
              onChange={(event) =>
                setFormSignIn({ ...formSignIn, firstname: event.target.value })
              }
            />
            <span className="form-detail"> Nom d'utilisateur (requis) : </span>
            <input
              className="user-input input"
              placeholder="Nom d'utilisateur"
              value={formSignIn.pseudo}
              onChange={(event) =>
                setFormSignIn({ ...formSignIn, pseudo: event.target.value })
              }
            />
            <span className="form-detail"> Age de l'utilisateur : </span>
            <input
              type="number"
              className="user-input input"
              placeholder="Age"
              value={formSignIn.age}
              onChange={(event) =>
                setFormSignIn({ ...formSignIn, age: event.target.value })
              }
            />
            <span className="form-detail"> Mot de passe : </span>
            <input
              type="password"
              className="user-input input"
              placeholder="Mot de passe"
              value={formSignIn.passwd}
              onChange={(event) =>
                setFormSignIn({ ...formSignIn, passwd: event.target.value })
              }
            />
            <span className="form-detail"> Mot de passe (vérification) : </span>
            <input
              type="password"
              className="user-input input"
              placeholder="Mot de passe"
              value={formSignIn.passwd2}
              onChange={(event) =>
                setFormSignIn({ ...formSignIn, passwd2: event.target.value })
              }
            />
            <button className="user-button input" type="submit">
              Ajouter cet utilisateur
            </button>
          </form>
          {
            userCreationSuccess !== null && (
              <div className="success-text">{userCreationSuccess}</div>
            )
          }
          {
            userCreationError !== null && (
              <div className="error-text">{userCreationError}</div>
            )
          }
          <div className="change-container">
            <span> Déjà un compte ? </span>
            <input
              className="log-sign-button"
              onClick={() => setLogOrSign(!logOrSign)}
              type="button"
              value="Se connecter"
            />
          </div>
        </div>
      }

    </div >
  );
}

export default UserForm;
