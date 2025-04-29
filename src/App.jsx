import { useEffect, useState, useRef, Fragment, useDeferredValue} from 'react'
import Axios from 'axios';
import ShowHelp from './ShowHelp';
import { Ring } from 'ldrs/react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

const get_greenhouse_job_url = (company, job) => `https://job-boards.greenhouse.io/${company}/jobs/${job}`
const get_greenhouse_company_url = (company) => `https://job-boards.greenhouse.io/${company}`

const COMPANIES = 'companies';
const TITLES = 'titles';
const LOCATIONS = 'locations';
const REMOTE = 'remote';
const US = 'us'

function App() {
  const [loadMoreState, setLoadMoreState] = useState('LOADING')
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [jobQuery, setJobQuery] = useState({
    companies: localStorage.getItem(COMPANIES) || '', 
    titles: localStorage.getItem(TITLES) || '', 
    locations:localStorage.getItem(LOCATIONS) || '', 
    remote: localStorage.getItem(REMOTE) == 'true'? true : false, 
    us: localStorage.getItem(US) == 'true' ? true : false, 
    page: 0
  });
 
  const companyFilter = useDeferredValue(jobQuery.company);
  const titleFilter = useDeferredValue(jobQuery.titles);
  const locationFilter = useDeferredValue(jobQuery.locations);
  const remoteFilter = useDeferredValue(jobQuery.remote);
  const usFilter = useDeferredValue(jobQuery.us);
 
  const page = useRef(jobQuery.page);// should this be using state instead???
  const delay = useRef(0)  
  const controller = useRef(null)

  useEffect(()=>{
    Axios.get('/api/job_count', {baseURL: BACKEND_URL}).then((resp)=> setTotalJobs(resp.data) )
  }, [])

  useEffect(()=>{
    if (controller.current){ 
      controller.current.abort() // Cancel previous pending requests
      controller.current = null
    }
    const jobFilterTimeout = setTimeout(getJobs, delay.current)
    delay.current = 500
    return () => clearTimeout(jobFilterTimeout)
  },[jobQuery])

  const getJobs = () =>{
    const requestData = jobQuery 
    const headers = {headers: {'Content-Type': 'application/json'}}
    controller.current = new AbortController()
    Axios.post('/api/get_jobs', requestData, {...headers, baseURL: BACKEND_URL, signal: controller.current.signal})
      .then((resp)=> {
        setLoadMoreState(resp.data.length < 100 ? 'DISABLED': 'NORMAL')
        if (requestData.page){
          setJobs([...jobs, ...resp.data])
        }else {
          setJobs(resp.data)
        }
      }).catch((error)=>{
        if (error.name != 'CanceledError') {
          console.error(error)
          setJobs([]) 
        }
      })
      .finally(()=>{
        controller.current = null
      })
    storePrefs() 
  }

  const storePrefs = () => {
    [TITLES, LOCATIONS, REMOTE, US].forEach(v=>
      localStorage.setItem(v, jobQuery[v])
    )
  }

  const onFilterChange = (o) => {
    if (o.remote != null || o.us !=null ){
      delay.current = 0 // 0 delay for checkbox
    }
    page.current = 0
    setJobQuery({...jobQuery, ...o, page: page.current})
  }

  const loadMoreJobs = () => {
    page.current++
    delay.current = 0
    setLoadMoreState('LOADING')
    setJobQuery({...jobQuery, page: page.current})
  }

  const getDateTag = (recent) => {
    let colorClass = '';
    if (recent == 'today'){
      colorClass = 'recent-today'
    } else if (recent == 'this week') {
      colorClass = 'recent-week'
    } else if (recent == 'this month') {
      colorClass = 'recent-month'
    }
    return <span className={'recent-tag ' + colorClass}
      >{recent}</span>
  }

  return (
    <>
      <div className='header-div'>
      <h1 className='flex-auto'>WRK PMP{!!totalJobs && `: search ${totalJobs.toLocaleString()} greenhouse jobs`}</h1>
      <ShowHelp></ShowHelp>
      </div>
        <div className='job-grid'>
            <label  className='filter stretch-left' >
              company filter: 
            <input  onChange={e => onFilterChange({companies: e.target.value})} defaultValue={companyFilter} placeholder='reddit | gitlab | ...'></input>

            </label>
            <label  className='filter'  >title filter:
            <input  onChange={e =>  onFilterChange({titles: e.target.value})} defaultValue={titleFilter} placeholder='software engineer | ayahuasca shaman | ...'></input>
              </label> 
            <span  >
              <label >
              <input 
              type='checkbox'
              onChange={e => onFilterChange({remote: e.target.checked})} 
              checked={remoteFilter}>
              </input>
              remote jobs only

              </label>
              <br />
              <label >

              <input 
              type='checkbox' 
              onChange={e => onFilterChange({us: e.target.checked})} 
              checked={usFilter}>
              </input>
              US jobs only
              </label>
            <label  className='filter'>
            location filter: 
            <input onChange={e => onFilterChange({ locations: e.target.value})} defaultValue={locationFilter} placeholder='NYC | Palo Alto | ...'></input>
            </label>
          </span>
          
          
          
          

      {
        jobs?.map((job, i)=> 
          <Fragment key={job[0]}>
            
            <div key={job[3]+'_comp'} className={ 'job-option stretch-left ' + (i%2 ? 'odd' : 'even')}>
            <a  href={get_greenhouse_company_url(job[3])} target="_blank" >
              {job[8]  || job[3]} 
            </a>
            </div>
            <div key={job[3]+'_job'} className={ 'job-option ' + (i%2 ? 'odd' : 'even')}>
            <a  href={get_greenhouse_job_url(job[3], job[0])} target="_blank" >
              {job[1]}
            </a>
            {getDateTag(job[9])}
            </div>
            <span key={job[3]+'_loc'} className={ 'job-option stretch-right ' + (i%2 ? 'odd' : 'even')}>
              {job[2]}
            </span>
            </Fragment>
        )
      }

    
        </div>
        <div className='load-more'>
        {loadMoreState == 'DISABLED' ? 
         <p>refine filters to show more jobs</p>
        :
          <div>
          <button className='load-button' onClick={loadMoreJobs} disabled={ loadMoreState == 'LOADING'} >
            load more
          </button>


          <span className='right-loading'>
            {loadMoreState == 'LOADING' && 
            
            <Ring size='30' color='white'></Ring>

            }
          </span>
          
          </div>
}
</div>

    </>
  )
}



export default App
