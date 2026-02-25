import React, { useEffect, useState } from 'react';

const TYPE_COLORS = {
  run:   { bg: '#e8f5e9', color: '#2e7d32', icon: 'bi-person-walking' },
  cycle: { bg: '#e3f2fd', color: '#1565c0', icon: 'bi-bicycle' },
  swim:  { bg: '#e0f7fa', color: '#00695c', icon: 'bi-water' },
  default: { bg: '#f3e5f5', color: '#6a1b9a', icon: 'bi-lightning-charge-fill' },
};

function TypeBadge({ type }) {
  const t = type ? type.toLowerCase() : '';
  const { bg, color, icon } = TYPE_COLORS[t] || TYPE_COLORS.default;
  return (
    <span className="stat-pill d-inline-flex align-items-center gap-1" style={{ background: bg, color }}>
      <i className={`bi ${icon}`}></i>
      {type}
    </span>
  );
}

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : '/api/activities/'}`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => { setActivities(data.results || data); setLoading(false); })
      .catch(err => { console.error('Error fetching activities:', err); setLoading(false); });
  }, [endpoint]);

  return (
    <div className="my-4">
      <div className="octofit-card card">
        <div className="card-header d-flex align-items-center gap-2">
          <i className="bi bi-lightning-charge-fill fs-5"></i>
          <h2 className="mb-0">Activities</h2>
          <span className="badge bg-white text-primary ms-auto">{activities.length}</span>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
            </div>
          ) : activities.length === 0 ? (
            <div className="octofit-empty"><i className="bi bi-inbox fs-2 d-block mb-2"></i>No activities found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table octofit-table table-hover mb-0">
                <thead>
                  <tr>
                    <th style={{width:'48px'}}>#</th>
                    <th><i className="bi bi-person me-1"></i>User</th>
                    <th><i className="bi bi-people-fill me-1"></i>Team</th>
                    <th><i className="bi bi-activity me-1"></i>Type</th>
                    <th><i className="bi bi-clock me-1"></i>Duration (min)</th>
                    <th><i className="bi bi-geo-alt me-1"></i>Distance (km)</th>
                    <th><i className="bi bi-calendar me-1"></i>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((a, idx) => (
                    <tr key={a.id || idx}>
                      <td className="text-muted fw-semibold">{idx + 1}</td>
                      <td className="fw-semibold">{a.user?.username ?? '—'}</td>
                      <td>
                        <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold">
                          {a.user?.team?.name ?? '—'}
                        </span>
                      </td>
                      <td><TypeBadge type={a.type} /></td>
                      <td>{a.duration}</td>
                      <td>{a.distance}</td>
                      <td className="text-muted" style={{fontSize:'0.82rem'}}>
                        {a.timestamp ? new Date(a.timestamp).toLocaleDateString() : '—'}
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

export default Activities;
