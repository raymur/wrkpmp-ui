import { Tooltip } from "radix-ui";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";


const TooltipDemo = () => {
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<button className="IconButton">
						<QuestionMarkCircledIcon />
					</button>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="TooltipContent" sideOffset={5}>
						Add to library
						<Tooltip.Arrow className="TooltipArrow" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};



const Header = ({totalJobs}) => {
  return (<>
  {!totalJobs ?  <h1 className="flex-auto">WRKPMP</h1> :
  <h1 className="flex-auto">WRKPMP: search through {totalJobs.toLocaleString()} Greenhouse
  {/* /<TooltipDemo></TooltipDemo> */}
   job postings</h1>}
        </>)
}

export default Header;