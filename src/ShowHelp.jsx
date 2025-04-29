import { useState } from "react";
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";



const ShowHelp = ({}) => {
  const [container, setContainer] = useState(null);
  return(
<>
<Dialog.Root>
		<Dialog.Trigger asChild>
			<button className="Button violet">Help & tips</button>
		</Dialog.Trigger>
		<Dialog.Portal container={container}>
			<Dialog.Overlay className="DialogOverlay" />
			<Dialog.Content className="DialogContent">
				<Dialog.Title className="DialogTitle">Help & tips</Dialog.Title>
				<Dialog.Description className="DialogDescription">


				I made this tool to stramline my job application process.  At any given time Greenhouse is hosting tens of thousands of job applications for a variety of small and large companies.  Greenhouse makes it very easy to apply to their positions because of their autofill features. However they don't have a central site in order to look at all of the open positions they have.  This is where WRKPMP comes in.  This site consolidates greenhouse's roles making it quick and easy to filter, find and apply to jobs.  In as few as 3 clicks your resume can be in the hands of a recruiter.

<br />

By taking advantage of greenhouse's autofill feature you'll be able to send out applications at great speeds.  Make sure to input your information on their site:
<a href='https://my.greenhouse.io/users/sign_in' target='_blank'>greenhouse sign up</a>

<br />

  {"In the filter bars, you can search for multiple phrases by seperating them by a pipe character: '|'. For excample:"} 
    <code>New York City | NYC</code>




Click on a position title link to redirect you to the application page (opens a new tab).
<br />
Click "Apply" or "Autofill with Greenhouse"
<br />
Fill in any additional fields
<br />
Lastly, click "Submit application"
<br />
Navigate back to WRKPMP and repeat this process
<br />

Thanks for using this tool. Good luck on your job search! Please let me know if you have any feedback: 
<a href='https://docs.google.com/forms/d/e/1FAIpQLSfvT9cZmmh3GBui83r0KOAFND0__tHjJu0PaLeTCF0dgdkeew/viewform'>Google forms feedback</a>



<br />
    

    Thanks for using this tool.  Good luck on your job search!


				</Dialog.Description>


				<Dialog.Close asChild>
					<button className="IconButton" aria-label="Close">
						close
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
  			<div ref={setContainer} />
        </>
)
}

export default ShowHelp;