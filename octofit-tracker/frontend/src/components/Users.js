import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/` : '/api/users/'}`;

  useEffect(() => {
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched Users:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  return (
    <div className="my-4">
      <h2 className="mb-4 text-primary fw-bold">Users</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  {users[0] && Object.keys(users[0]).map((key) => (
                    <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    <td>{idx + 1}</td>
                    {users[0] && Object.keys(users[0]).map((key) => (
                      <td key={key}>{String(user[key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && <div className="text-center text-muted">No users found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
