import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import {ShowHelp, About, Feedback} from "./Content";
import LoadMoreButton from "./LoadMoreButton";
import JobFilters from "./JobFilters";
import JobList from "./JobList";
import { Tabs  } from "radix-ui";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

const COMPANIES = "companies";
const TITLES = "titles";
const LOCATIONS = "locations";
const REMOTE = "remote";
const US = "us";

function App() {
  const [loadMoreState, setLoadMoreState] = useState("LOADING");
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [jobQuery, setJobQuery] = useState({
    companies: localStorage.getItem(COMPANIES) || "",
    titles: localStorage.getItem(TITLES) || "",
    locations: localStorage.getItem(LOCATIONS) || "",
    remote: localStorage.getItem(REMOTE) == "true" ? true : false,
    us: localStorage.getItem(US) == "true" ? true : false,
    page: 0,
  });
  const page = useRef(jobQuery.page); // should this be using state instead???
  const delay = useRef(0);
  const controller = useRef(null);

  useEffect(() => {
    Axios.get("/api/job_count", { baseURL: BACKEND_URL }).then((resp) =>
      setTotalJobs(resp.data),
    );
  }, []);

  useEffect(() => {
    if (controller.current) {
      controller.current.abort(); // Cancel previous pending requests
      controller.current = null;
    }
    const jobFilterTimeout = setTimeout(getJobs, delay.current);
    delay.current = 500;
    return () => clearTimeout(jobFilterTimeout);
  }, [jobQuery]);

  const getJobs = () => {
    const requestData = jobQuery;
    const headers = { headers: { "Content-Type": "application/json" } };
    controller.current = new AbortController();
    Axios.post("/api/get_jobs", requestData, {
      ...headers,
      baseURL: BACKEND_URL,
      signal: controller.current.signal,
    })
      .then((resp) => {
        setLoadMoreState(resp.data.length < 100 ? "DISABLED" : "NORMAL");
        if (requestData.page) {
          setJobs([...jobs, ...resp.data]);
        } else {
          setJobs(resp.data);
        }
      })
      .catch((error) => {
        if (error.name != "CanceledError") {
          console.error(error);
          setJobs([]);
        }
      })
      .finally(() => {
        controller.current = null;
      });
    storePrefs();
  };

  const storePrefs = () => {
    [TITLES, LOCATIONS, REMOTE, US].forEach((v) =>
      localStorage.setItem(v, jobQuery[v]),
    );
  };

  const onFilterChange = (o) => {
    if (o.remote != null || o.us != null) {
      delay.current = 0; // 0 delay for checkbox
    }
    page.current = 0;
    setJobQuery({ ...jobQuery, ...o, page: page.current });
  };

  const loadMoreJobs = () => {
    page.current++;
    delay.current = 0;
    setLoadMoreState("LOADING");
    setJobQuery({ ...jobQuery, page: page.current });
  };

  return (
    <>
      <div className="header-div">
        <h1 className="flex-auto">
          WRKPMP
          {!!totalJobs &&
            `: search ${totalJobs.toLocaleString()} greenhouse jobs`}
        </h1>
      </div>
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
		<Tabs.List className="TabsList" aria-label="Manage your account">
			<Tabs.Trigger className="TabsTrigger" value="tab1">
				search
			</Tabs.Trigger>
      <Tabs.Trigger className="TabsTrigger" value="tab2">
				help & tips
			</Tabs.Trigger>
			<Tabs.Trigger className="TabsTrigger" value="tab3">
				about
			</Tabs.Trigger>
      <Tabs.Trigger className="TabsTrigger" value="tab4">
				feedback
			</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content className="TabsContent" value="tab1">

      <div className="job-grid">
          <JobFilters jobQuery={jobQuery} onFilterChange={onFilterChange}></JobFilters>
          <JobList jobs={jobs}></JobList>
        </div>
      <LoadMoreButton loadMoreState={loadMoreState} onLoadMoreJobs={loadMoreJobs}></LoadMoreButton>
		</Tabs.Content>
    <Tabs.Content className="TabsContent InfoContent" value="tab2"><ShowHelp></ShowHelp></Tabs.Content>
		<Tabs.Content className="TabsContent InfoContent" value="tab3">
          <About></About>
		</Tabs.Content>
    <Tabs.Content className="TabsContent InfoContent" value="tab4">
      <Feedback></Feedback>
		</Tabs.Content>
	</Tabs.Root>


    </>
  );
}


export default App;
