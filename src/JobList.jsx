import { Fragment } from "react";

const IDX = {
  ID: 0,
 TITLE: 1,
 LOCATION: 2,
 COMPANY_ID: 3,
 SALARY: 4,
 COMPANY_NAME: 5,
PUBLISHED_TAG: 6,
}

export default function JobList({jobs}) {
  const getSalaryTag = (salary) => {
    if (!salary) return null;
    salary = String(salary)
    return  <span className={"recent-tag salary-tag "} title={salary}>{salary.substr(0,40)}{'...' ? salary.length > 40 : ''}</span>;
  }

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
          <Fragment key={job[IDX.ID]}>
            <div
              key={job[IDX.ID] + "_job"}
              className={"job-option stretch-left " + (i % 2 ? "odd" : "even")}
            >
              <a href={get_greenhouse_job_url(job[IDX.COMPANY_ID], job[IDX.ID])} target="_blank">
                {job[IDX.TITLE]}
              </a>
              {getDateTag(job[IDX.PUBLISHED_TAG])}
              {getSalaryTag(job[IDX.SALARY])}

            </div>
            <div
              key={job[IDX.ID] + "_comp"}
              className={"job-option " + (i % 2 ? "odd" : "even")}
            >
              <a href={get_greenhouse_company_url(job[IDX.COMPANY_ID])} target="_blank">
                {job[IDX.COMPANY_NAME] || job[IDX.COMPANY_ID]}
              </a>
            </div>
            <span
              key={job[IDX.ID] + "_loc"}
              className={"job-option stretch-right " + (i % 2 ? "odd" : "even")}
            >
              {job[IDX.LOCATION]}
            </span>
          </Fragment>
        ))}
  </>)
}
