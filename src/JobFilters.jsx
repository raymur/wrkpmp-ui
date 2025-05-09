import {useDeferredValue} from 'react';
import { Switch } from "radix-ui";
import "./SwitchFilter.css";





export default function JobFilters({jobQuery, onFilterChange})  {
  const companyFilter = useDeferredValue(jobQuery.company);
  const titleFilter = useDeferredValue(jobQuery.titles);
  const locationFilter = useDeferredValue(jobQuery.locations);
  const remoteFilter = useDeferredValue(jobQuery.remote);
  const usFilter = useDeferredValue(jobQuery.us);
  const groupByCompany = useDeferredValue(jobQuery.groupByCompany);
  

const SwitchFilter = ({id, label, checked}) => (
  <div className='switch-container'>


			<Switch.Root className="SwitchRoot" 
      id={id}
      checked={checked}
      onCheckedChange={(e) =>onFilterChange({ [id]: e })}
      >
				<Switch.Thumb className="SwitchThumb" />
			</Switch.Root>
      			<label
				htmlFor={id}
				style={{ paddingLeft: 15 }}
        >
				{label}
			</label>
        </div>
);

  return (<>
          <span className='filter-container'>
    <label className="filter  stretch-left">
          title filter:
          <input
            onChange={(e) => onFilterChange({ titles: e.target.value })}
            defaultValue={titleFilter}
            placeholder="software engineer | ayahuasca shaman | ..."
          ></input>
        </label>
        </span>
        <span className='filter-container'>
        
        <SwitchFilter
              id='groupByCompany'
            label='group by company'
              checked={groupByCompany}
        ></ SwitchFilter>


          <label className="filter">
            company filter:
            <input
              onChange={(e) => onFilterChange({ companies: e.target.value })}
              defaultValue={companyFilter}
              placeholder="reddit | gitlab | ..."
            ></input>
          </label>


        </span>

        <span className='filter-container'>
        <SwitchFilter
              id='remote'
            label='remote jobs only'
              checked={remoteFilter}
        ></ SwitchFilter>
        <SwitchFilter
              id='us'
            label='US jobs only'
              checked={usFilter}
        ></ SwitchFilter>
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