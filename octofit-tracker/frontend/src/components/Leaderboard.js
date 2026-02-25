import React, { useEffect, useState } from 'react';

const sorted = (arr) =>
  [...arr].sort((a, b) => (b.points ?? 0) - (a.points ?? 0));

function RankBadge({ rank }) {
  const cls = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';
  const icon = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank;
  return <span className={`rank-badge ${cls}`}>{icon}</span>;
}

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/'}`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => { setLeaders(sorted(data.results || data)); setLoading(false); })
      .catch(err => { console.error('Error fetching leaderboard:', err); setLoading(false); });
  }, [endpoint]);

  return (
    <div className="my-4">
      <div className="octofit-card card">
        <div className="card-header d-flex align-items-center gap-2">
          <i className="bi bi-trophy-fill fs-5"></i>
          <h2 className="mb-0">Leaderboard</h2>
          <span className="badge bg-white text-primary ms-auto">{leaders.length} teams</span>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
            </div>
          ) : leaders.length === 0 ? (
            <div className="octofit-empty"><i className="bi bi-inbox fs-2 d-block mb-2"></i>No leaderboard data found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table octofit-table table-hover mb-0">
                <thead>
                  <tr>
                    <th style={{width:'64px'}}>Rank</th>
                    <th><i className="bi bi-people-fill me-1"></i>Team</th>
                    <th><i className="bi bi-star-fill me-1"></i>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaders.map((l, idx) => (
                    <tr key={l.id || idx} className={idx === 0 ? 'table-warning' : ''}>
                      <td><RankBadge rank={idx + 1} /></td>
                      <td className="fw-semibold">{l.team?.name ?? l.team ?? '—'}</td>
                      <td>
                        <span className="stat-pill" style={{ background: '#fff8e1', color: '#e65100' }}>
                          <i className="bi bi-star-fill me-1"></i>{l.points}
                        </span>
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

export default Leaderboard;
