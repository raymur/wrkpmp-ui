export  const About = () => {
  return (<div className="ArticleColumn ">
    <h1>About</h1>
    <p>
            I initially created this tool to streamline my own job application process. At any
              given time Greenhouse is hosting tens of thousands of job
              applications for a variety of small and large companies in many different industries.
              Greenhouse makes it very easy to apply to their positions because
              of their autofill features. However they don't have a central site
              in order to look at all of the open positions they have. This is
              where WRKPMP comes in. This site consolidates greenhouse's roles
              making it quick and easy to filter, find and apply to jobs. In as
              few as 3 clicks your resume can be in the hands of a recruiter.  

              <p>Good luck on your job search!<br />-ray</p>

    </p>
  </div>)

}

export const Feedback = () => {

return (<div className="ArticleColumn "> 
<h1>Feedback</h1>
  I'd love to keep improving this tool. Your feedback is super valuable for that! Let me know if you have any suggestions, find any bugs or want to see a specific feature:{' '}<a href="https://docs.google.com/forms/d/e/1FAIpQLSfvT9cZmmh3GBui83r0KOAFND0__tHjJu0PaLeTCF0dgdkeew/viewform">
    Google forms feedback
  </a>{'.'}
  </div>)
}

export const ShowHelp = ({}) => {
  return (
    <div className="ArticleColumn">
<h1>Help & tips</h1>


        <h3>Greenhouse account creation</h3>
        <p>
              Make sure to create an account on Greenhouse's site:{' '}
              <a href="https://my.greenhouse.com/faq" target="_blank">
                greenhouse sign up
              </a>. You'll be able to autofill your resume and information on their applications, speeding up your job search process.

              <h3>Search bar tips</h3>
              </p>

              <p>
                {
                  "In the filter bars, you can search for multiple phrases by separating them by a pipe character: '|'. On many keyboards this is above the 'Enter' key. "+
                  "For example, if you wanted to search for either Data Science and Software Engineering jobs you could input:" 
                }
                </p>
              <code>data science | software engineering</code>
<p>This feature is also helpful if you wish to search for jobs in multiple locations.</p>

                <h3>Opening links</h3>
              <p>
              If you click on a position title link, you'll be externally redirected to the job application's page in a new tab.
              Similarly if you click on a company's link, it will redirect you to that company greenhouse's page, which lists all current openings.
              </p>

           
              </div>
  );
};

