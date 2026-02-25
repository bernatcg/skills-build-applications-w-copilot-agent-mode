import React, { useEffect, useState } from 'react';

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
];

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : '/api/workouts/'}`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => { setWorkouts(data.results || data); setLoading(false); })
      .catch(err => { console.error('Error fetching workouts:', err); setLoading(false); });
  }, [endpoint]);

  return (
    <div className="my-4">
      {/* Section header card */}
      <div className="octofit-card card mb-4">
        <div className="card-header d-flex align-items-center gap-2">
          <i className="bi bi-heart-pulse-fill fs-5"></i>
          <h2 className="mb-0">Workouts</h2>
          <span className="badge bg-white text-primary ms-auto">{workouts.length} plans</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
        </div>
      ) : workouts.length === 0 ? (
        <div className="octofit-empty octofit-card card">
          <i className="bi bi-inbox fs-2 d-block mb-2"></i>No workouts found.
        </div>
      ) : (
        <div className="row g-4">
          {workouts.map((w, idx) => (
            <div className="col-12 col-md-6 col-lg-4" key={w.id || idx}>
              <div className="card h-100 border-0 shadow-sm overflow-hidden">
                {/* Gradient header strip */}
                <div
                  className="p-4 text-white"
                  style={{ background: CARD_GRADIENTS[idx % CARD_GRADIENTS.length] }}
                >
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <i className="bi bi-heart-pulse-fill fs-4"></i>
                    <span className="badge bg-white bg-opacity-25 fw-normal">Plan #{idx + 1}</span>
                  </div>
                  <h5 className="card-title fw-bold mb-0 mt-1">{w.name}</h5>
                </div>
                {/* Body */}
                <div className="card-body">
                  <p className="card-text text-muted mb-3">
                    {w.description || <span className="fst-italic">No description provided.</span>}
                  </p>
                  <div className="d-flex gap-2 flex-wrap">
                    <span className="stat-pill" style={{ background: '#e8f0fe', color: '#1a73e8' }}>
                      <i className="bi bi-lightning-charge-fill me-1"></i>Fitness Plan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;
