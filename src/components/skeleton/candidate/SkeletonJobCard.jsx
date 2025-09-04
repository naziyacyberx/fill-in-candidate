export const SkeletonJobCard = () => {
  return (
    <div className="col-md-12 col-lg-6 mb-3">
      <div className="border rounded shadow-sm p-3 h-100 placeholder-glow">

        {/* Top Row: Avatar + Title */}
        <div className="d-flex align-items-center mb-3">
          <div className="rounded-circle bg-secondary placeholder" style={{ width: "60px", height: "60px" }}></div>
          <div className="ms-3 w-100">
            <span className="placeholder col-7 mb-2 d-block" style={{ height: "14px" }}></span>
            <span className="placeholder col-4 d-block" style={{ height: "12px" }}></span>
          </div>
        </div>

        {/* Meta Info Row */}
        <div className="d-flex flex-wrap  gap-2 mt-3 text-muted small ">
          <span className="placeholder col-5" style={{ height: "12px" }}></span>
          <span className="placeholder col-4" style={{ height: "12px" }}></span>
          <span className="placeholder col-3" style={{ height: "12px" }}></span>
        </div>

        <div className="mt-2">
          <span className="placeholder col-4" style={{ height: "12px" }}></span>
        </div>

      </div>
    </div>
  );
};
