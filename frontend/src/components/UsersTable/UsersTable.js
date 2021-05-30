import { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersTable.css';

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [usersLoadingError, setUsersLoadingError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKDEND_URL}/users`)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        setUsersLoadingError('An error occured while fetching users.');
        console.error(error);
      });
  }, []);

  return { users, usersLoadingError };
};

function UsersTable() {
  const { users, usersLoadingError } = useFetchUsers();

  const deleteUser = (userId) => {
    axios.delete(`${process.env.REACT_APP_BACKDEND_URL}/users/${userId}`);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {usersLoadingError !== null && (
        <div className="users-loading-error">{usersLoadingError}</div>
      )}
    </div>
  );
}

export default UsersTable;
