import React, { useEffect, useState } from 'react';

function AvatarIcon({ username }) {
  const initials = username ? username.slice(0, 2).toUpperCase() : '??';
  const hue = username
    ? username.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
    : 200;
  return (
    <span
      className="d-inline-flex align-items-center justify-content-center rounded-circle fw-bold text-white me-2"
      style={{ width: 32, height: 32, background: `hsl(${hue}, 60%, 50%)`, fontSize: '0.75rem', flexShrink: 0 }}
    >
      {initials}
    </span>
  );
}

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : '/api/users/'}`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => { setUsers(data.results || data); setLoading(false); })
      .catch(err => { console.error('Error fetching users:', err); setLoading(false); });
  }, [endpoint]);

  return (
    <div className="my-4">
      <div className="octofit-card card">
        <div className="card-header d-flex align-items-center gap-2">
          <i className="bi bi-person-circle fs-5"></i>
          <h2 className="mb-0">Users</h2>
          <span className="badge bg-white text-primary ms-auto">{users.length} members</span>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
            </div>
          ) : users.length === 0 ? (
            <div className="octofit-empty"><i className="bi bi-inbox fs-2 d-block mb-2"></i>No users found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table octofit-table table-hover mb-0">
                <thead>
                  <tr>
                    <th style={{width:'48px'}}>#</th>
                    <th><i className="bi bi-person me-1"></i>Username</th>
                    <th><i className="bi bi-envelope me-1"></i>Email</th>
                    <th><i className="bi bi-people-fill me-1"></i>Team</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr key={u.id || idx}>
                      <td className="text-muted fw-semibold">{idx + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <AvatarIcon username={u.username} />
                          <span className="fw-semibold">{u.username}</span>
                        </div>
                      </td>
                      <td className="text-muted">{u.email || <span className="fst-italic">—</span>}</td>
                      <td>
                        {u.team
                          ? <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold px-2 py-1">
                              <i className="bi bi-people-fill me-1"></i>{u.team?.name ?? u.team}
                            </span>
                          : <span className="text-muted fst-italic">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
