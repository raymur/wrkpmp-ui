import { Fragment } from "react";

export default function JobList({jobs}) {

  const getDateTag = (recent) => {
    let colorClass = "";
    if (recent == "today") {
      colorClass = "recent-today";
    } else if (recent == "this week") {
      colorClass = "recent-week";
    } else if (recent == "this month") {
      colorClass = "recent-month";
    }
    return <span className={"recent-tag " + colorClass}>{recent}</span>;
  };

  const get_greenhouse_job_url = (company, job) =>
    `https://job-boards.greenhouse.io/${company}/jobs/${job}`;
  const get_greenhouse_company_url = (company) =>
    `https://job-boards.greenhouse.io/${company}`;
  

  return (<>
          {jobs?.map((job, i) => (
          <Fragment key={job[0]}>
            <div
              key={job[3] + "_job"}
              className={"job-option stretch-left " + (i % 2 ? "odd" : "even")}
            >
              <a href={get_greenhouse_job_url(job[3], job[0])} target="_blank">
                {job[1]}
              </a>
              {getDateTag(job[9])}
            </div>
            <div
              key={job[3] + "_comp"}
              className={"job-option " + (i % 2 ? "odd" : "even")}
            >
              <a href={get_greenhouse_company_url(job[3])} target="_blank">
                {job[8] || job[3]}
              </a>
            </div>
            <span
              key={job[3] + "_loc"}
              className={"job-option stretch-right " + (i % 2 ? "odd" : "even")}
            >
              {job[2]}
            </span>
          </Fragment>
        ))}
  </>)
}
