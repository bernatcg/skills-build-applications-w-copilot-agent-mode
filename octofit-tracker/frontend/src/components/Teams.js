import React, { useEffect, useState } from 'react';

const TEAM_COLORS = [
  { bg: '#e8f0fe', color: '#1a73e8' },
  { bg: '#fce4ec', color: '#c62828' },
  { bg: '#e6f9f0', color: '#2e7d32' },
  { bg: '#fff8e1', color: '#e65100' },
  { bg: '#f3e5f5', color: '#6a1b9a' },
];

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : '/api/teams/'}`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => { setTeams(data.results || data); setLoading(false); })
      .catch(err => { console.error('Error fetching teams:', err); setLoading(false); });
  }, [endpoint]);

  return (
    <div className="my-4">
      <div className="octofit-card card">
        <div className="card-header d-flex align-items-center gap-2">
          <i className="bi bi-people-fill fs-5"></i>
          <h2 className="mb-0">Teams</h2>
          <span className="badge bg-white text-primary ms-auto">{teams.length} teams</span>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
            </div>
          ) : teams.length === 0 ? (
            <div className="octofit-empty"><i className="bi bi-inbox fs-2 d-block mb-2"></i>No teams found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table octofit-table table-hover mb-0">
                <thead>
                  <tr>
                    <th style={{width:'48px'}}>#</th>
                    <th><i className="bi bi-shield-fill me-1"></i>Team Name</th>
                    <th><i className="bi bi-hash me-1"></i>Team ID</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, idx) => {
                    const col = TEAM_COLORS[idx % TEAM_COLORS.length];
                    return (
                      <tr key={team.id || idx}>
                        <td className="text-muted fw-semibold">{idx + 1}</td>
                        <td>
                          <span className="stat-pill d-inline-flex align-items-center gap-2"
                            style={{ background: col.bg, color: col.color }}>
                            <i className="bi bi-people-fill"></i>
                            <span className="fw-bold">{team.name}</span>
                          </span>
                        </td>
                        <td className="text-muted">{team.id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
