import React from "react";

const JobCardSkeleton = () => {
  const skeletons = Array(6).fill(null); // Show 6 placeholders

  return (
    <div className="row">
      {skeletons.map((_, index) => (
        <div key={index} className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100 p-3 position-relative shadow-sm">
            {/* Top Right Bookmark */}
            <div
              className="position-absolute top-0 end-0 m-3 placeholder bg-secondary rounded-circle"
              style={{ width: "20px", height: "20px" }}
            ></div>

            {/* Top: Image + Title + SubTitle */}
            <div className="d-flex mb-3">
              <div
                className="placeholder bg-secondary rounded me-3"
                style={{ width: "50px", height: "50px" }}
              ></div>

              <div className="flex-grow-1">
                <div className="placeholder-glow mb-2">
                  <span className="placeholder col-8 rounded"></span>
                </div>
                <div className="placeholder-glow">
                  <span className="placeholder col-5 rounded"></span>
                </div>
              </div>
            </div>

            {/* Meta info (date, salary, etc.) */}
            <div className="mb-3">
              {[...Array(2)].map((_, i) => (
                <div
                  className="d-flex justify-content-between mb-2"
                  key={i}
                >
                  <span className="placeholder col-5 rounded"></span>
                  <span className="placeholder col-5 rounded"></span>
                </div>
              ))}
            </div>

            {/* Footer row: applicants + button */}
            <div className="d-flex justify-content-between align-items-center mt-auto">
              <span className="placeholder col-4 rounded"></span>
              <span
                className="placeholder btn btn-primary disabled col-4"
                style={{ height: "38px" }}
              ></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCardSkeleton;
