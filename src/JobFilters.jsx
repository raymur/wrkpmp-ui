import {useDeferredValue} from 'react';

export default function JobFilters({jobQuery, onFilterChange})  {
  const companyFilter = useDeferredValue(jobQuery.company);
  const titleFilter = useDeferredValue(jobQuery.titles);
  const locationFilter = useDeferredValue(jobQuery.locations);
  const remoteFilter = useDeferredValue(jobQuery.remote);
  const usFilter = useDeferredValue(jobQuery.us);
  
  return (<>
    <label className="filter  stretch-left">
          title filter:
          <input
            onChange={(e) => onFilterChange({ titles: e.target.value })}
            defaultValue={titleFilter}
            placeholder="software engineer | ayahuasca shaman | ..."
          ></input>
        </label>
        <label className="filter">
          company filter:
          <input
            onChange={(e) => onFilterChange({ companies: e.target.value })}
            defaultValue={companyFilter}
            placeholder="reddit | gitlab | ..."
          ></input>
        </label>
        <span>
          <label>
            <input
              type="checkbox"
              onChange={(e) => onFilterChange({ remote: e.target.checked })}
              checked={remoteFilter}
            ></input>
            remote jobs only
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              onChange={(e) => onFilterChange({ us: e.target.checked })}
              checked={usFilter}
            ></input>
            US jobs only
          </label>
          <label className="filter">
            location filter:
            <input
              onChange={(e) => onFilterChange({ locations: e.target.value })}
              defaultValue={locationFilter}
              placeholder="NYC | Palo Alto | ..."
            ></input>
          </label>
        </span>
    </>)
}