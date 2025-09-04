// SuggestedCandidatesSkeleton.js
import React from 'react';

const SuggestedCandidatesSkeleton = () => {
  const skeletons = new Array(6).fill(0); // Simulating 6 candidate cards

  return (
    <div className="container my-4">
      {/* Section title */}
      {/* <div className="mb-3">
        <span className="placeholder col-3 rounded" style={{ height: '20px', display: 'inline-block' }}></span>
      </div> */}

      <div className="row">
        {skeletons.map((_, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="d-flex p-3 bg-light rounded-3 shadow-sm align-items-start gap-3">
              {/* Avatar placeholder */}
              <div
                className="placeholder bg-secondary rounded"
                style={{ width: '70px', height: '70px' }}
              ></div>

              {/* Text content */}
              <div className="flex-grow-1">
                {/* Name and Role */}
                <div className="placeholder-glow mb-2">
                  <span className="placeholder col-6 rounded" style={{ height: '16px', display: 'block' }}></span>
                  <span className="placeholder col-4 rounded mt-1" style={{ height: '14px', display: 'block' }}></span>
                </div>

                {/* Experience + Location */}
                <div className="placeholder-glow mb-2 d-flex gap-3">
                  <span className="placeholder col-3 rounded" style={{ height: '14px' }}></span>
                  <span className="placeholder col-3 rounded" style={{ height: '14px' }}></span>
                </div>

                {/* Rating */}
                <div className="placeholder-glow mb-2">
                  <span className="placeholder col-4 rounded" style={{ height: '14px' }}></span>
                </div>
              </div>

              {/* Price */}
              <div className="text-end ms-auto">
                <div className="placeholder-glow mb-2">
                  <span className="placeholder col-6 rounded" style={{ height: '14px', display: 'block' }}></span>
                </div>
                <div className="placeholder-glow">
                  <span className="placeholder col-6 rounded" style={{ height: '12px', display: 'block' }}></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedCandidatesSkeleton;
