
import { Ring } from "ldrs/react";

export default function LoadMoreButton ({loadMoreState, onLoadMoreJobs}) {
  return (<div className="load-more">
    {loadMoreState == "DISABLED" ? (
      <p>refine filters to show more jobs</p>
    ) : (
      <div>
        <button
          className="load-button"
          onClick={onLoadMoreJobs}
          disabled={loadMoreState == "LOADING"}
        >
          load more
        </button>

        <span className="right-loading">
          {loadMoreState == "LOADING" && (
            <Ring size="30" color="white"></Ring>
          )}
        </span>
      </div>
    )}
  </div>)
}

