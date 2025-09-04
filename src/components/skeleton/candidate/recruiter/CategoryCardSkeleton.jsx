// CategoryCardSkeleton.js
import React from 'react';


const CategoryCardSkeleton = () => {
  const skeletons = new Array(5).fill(0);

  return (
    <div className="row">
      {skeletons.map((_, index) => (
        <div key={index} className="col-sm-6 col-md-6 col-lg-4 d-flex mb-4">
          <div className="w-100 d-flex align-items-center bg-light p-3 rounded-4">
            {/* Placeholder icon */}
            <div className="placeholder bg-secondary rounded-3 me-3" style={{ width: "50px", height: "50px" }}></div>

            {/* Placeholder text lines */}
            <div className="flex-grow-1">
              <div className="placeholder-glow mb-2">
                <span className="placeholder col-6 rounded"></span>
              </div>
              <div className="placeholder-glow">
                <span className="placeholder col-4 rounded"></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCardSkeleton;
