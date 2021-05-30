import { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';

const DEFAULT_FORM_VALUES = {
  email: '',
  firstname: '',
  lastname: '',
};

const useSaveUser = () => {
  const [userCreationError, setUserCreationError] = useState(null);
  const [userCreationSuccess, setUserCreationSuccess] = useState(null);
  const displayCreationSuccessMessage = () => {
    setUserCreationSuccess('New user created successfully');
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
      .post(`${process.env.REACT_APP_BACKDEND_URL}/users/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
      })
      .catch((error) => {
        setUserCreationError('An error occured while creating new user.');
        console.error(error);
      });
  };

  return { saveUser, userCreationError, userCreationSuccess };
};

function AddUserForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const { saveUser, userCreationError, userCreationSuccess } = useSaveUser();

  return (
    <div>
      <form
        className="add-user-form"
        onSubmit={(event) => saveUser(event, formValues, setFormValues)}
      >
        <input
          className="add-user-input"
          type="email"
          placeholder="Email"
          value={formValues.email}
          onChange={(event) =>
            setFormValues({ ...formValues, email: event.target.value })
          }
        />
        <input
          className="add-user-input"
          placeholder="First name"
          value={formValues.firstname}
          onChange={(event) =>
            setFormValues({ ...formValues, firstname: event.target.value })
          }
        />
        <input
          className="add-user-input"
          placeholder="Last name"
          value={formValues.lastname}
          onChange={(event) =>
            setFormValues({ ...formValues, lastname: event.target.value })
          }
        />
        <button className="add-user-button" type="submit">
          Add user
        </button>
      </form>
      {userCreationSuccess !== null && (
        <div className="user-creation-success">{userCreationSuccess}</div>
      )}
      {userCreationError !== null && (
        <div className="user-creation-error">{userCreationError}</div>
      )}
    </div>
  );
}

export default AddUserForm;
