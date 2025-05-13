import { useState } from 'react';
import axios from 'axios';
import './UserForm.css';

const DEFAULT_FORM_SIGN_IN = {
  email: '',
  firstname: '',
  lastname: '',
  pseudo: '',
  age: '',
  passwd: '',
};

const DEFAULT_FORM_LOG_IN = {
  pseudo: '',
  passwd: '',
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
      console.error('Missing email, this field is required');

      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/users/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_SIGN_IN);
      })
      .catch((error) => {
        setUserCreationError('An error occured while creating new user.');
        console.error(error);
      });
  };

  return { saveUser, userCreationError, userCreationSuccess };
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

  const logIn = (event, formLogIn, setFormLogIn) => {
    // This avoid page reload
    event.preventDefault();

    setUserLogInError(null);
    if (formLogIn.pseudo === '') {
      console.error("Un nom d'utilisateur est requis");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/users/login`, formLogIn)
      .then(() => {
        document.cookie = `pseudo=${formLogIn.pseudo}; SameSite=None; Secure`;
        displayLogInSuccessMessage();
        setFormLogIn(DEFAULT_FORM_LOG_IN);
      })
      .catch((error) => {
        setUserLogInError(error.response.data.message);
        console.error("erreur : ", error.response.data.message);
      });
  };

  return { logIn, userLogInError, userLogInSuccess };
};

function UserForm(logSign) {
  const [formLogIn, setFormLogIn] = useState(DEFAULT_FORM_LOG_IN);
  const [formSignIn, setFormSignIn] = useState(DEFAULT_FORM_SIGN_IN);
  const { saveUser, userCreationError, userCreationSuccess } = useSaveUser();
  const [logOrSign, setLogOrSign] = useState(logSign);
  const { logIn, userLogInError, userLogInSuccess } = useLogIn();

  return (
    <div>
      {document.cookie}
      {logOrSign
        ? (
          <div className="login">
            <p> Connexion </p>
            <form
              className="user-form"
              onSubmit={(event) => logIn(event, formLogIn, setFormLogIn)}
            >
              <input
                className="user-input"
                type="Pseudo"
                placeholder="Nom d'utilisateur"
                value={formLogIn.pseudo}
                onChange={(event) =>
                  setFormLogIn({ ...formLogIn, pseudo: event.target.value })
                }
              />
              <input
                className="user-input"
                placeholder="Mot de passe"
                value={formLogIn.passwd}
                onChange={(event) =>
                  setFormLogIn({ ...formLogIn, passwd: event.target.value })
                }
              />
              <button className="user-button" type="submit">
                Connexion
              </button>
            </form>
            {
              userLogInSuccess !== null && (
                <div className="user-success">{userLogInSuccess}</div>
              )
            }
            {
              userLogInError !== null && (
                <div className="user-error">{userLogInError}</div>
              )
            }
            <span> Aucun compte ? </span>
            <input
              className="log-sign-button"
              onClick={() => setLogOrSign(!logOrSign)}
              type="button"
              value="Créer un compte"
            />
          </div>
  ) :
  <div className="sign-in">
    <p> Création d'un nouveau compte utilisateur </p>
    <form
      className="add-user-form"
      onSubmit={(event) => saveUser(event, formSignIn, setFormSignIn)}
    >
      <input
        className="add-user-input"
        type="email"
        placeholder="Email"
        value={formSignIn.email}
        onChange={(event) =>
          setFormSignIn({ ...formSignIn, email: event.target.value })
        }
      />
      <input
        className="add-user-input"
        placeholder="Nom"
        value={formSignIn.lastname}
        onChange={(event) =>
          setFormSignIn({ ...formSignIn, lastname: event.target.value })
        }
      />
      <input
        className="add-user-input"
        placeholder="Prénom"
        value={formSignIn.firstname}
        onChange={(event) =>
          setFormSignIn({ ...formSignIn, firstname: event.target.value })
        }
      />
      <input
        className="add-user-input"
        placeholder="Nom d'utilisateur"
        value={formSignIn.pseudo}
        onChange={(event) =>
          setFormSignIn({ ...formSignIn, pseudo: event.target.value })
        }
      />
      <input
        className="add-user-input"
        placeholder="Age"
        value={formSignIn.age}
        onChange={(event) =>
          setFormSignIn({ ...formSignIn, age: event.target.value })
        }
      />
      <input
        className="add-user-input"
        placeholder="Mot de passe"
        value={formSignIn.passwd}
        onChange={(event) =>
          setFormSignIn({ ...formSignIn, passwd: event.target.value })
        }
      />
      <button className="add-user-button" type="submit">
        Ajouter cet utilisateur
      </button>
    </form>
    {
      userCreationSuccess !== null && (
        <div className="user-creation-success">{userCreationSuccess}</div>
      )
    }
    {
      userCreationError !== null && (
        <div className="user-creation-error">{userCreationError}</div>
      )
    }
    <span> Déjà un compte ? </span>
    <input
      className="log-sign-button"
      onClick={() => setLogOrSign(!logOrSign)}
      type="button"
      value="Se connecter"
    />
  </div>
}

    </div >
  );
}

export default UserForm;
