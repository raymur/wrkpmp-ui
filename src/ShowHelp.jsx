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

				<p>I made this tool to help streamline </p>
        <p>{"In the filter bars, you can search for multiple phrases by seperating them by a pipe character: '|'. For excample:"} </p>
    <code>New York City | NYC</code>
    
    <p>By taking advantage of greenhouse's autofill feature you'll be able to send out applications at great speeds.  Make sure to input your information on their site:
      <a href='https://my.greenhouse.io/users/sign_in' target='_blank'>greenhouse sign up</a></p>
    <p>Thanks for using this tool.  Good luck on your job search!</p>


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