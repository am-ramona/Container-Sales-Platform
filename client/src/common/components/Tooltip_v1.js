import tw from "twin.macro";

const TooltipWrapper = tw.div `
relative inline-block
truncate w-full`;

const Tooltiptext = tw.div `
invisible w-28 bg-black 
text-white text-center
rounded-md py-1 px-0 
absolute z-1 bottom-full
left-2/4 -m-14 opacity-0
transition-opacity duration-1000
group-hover:(visible opacity-100)`;

export default function Tooltip({
  children,
  title,
  ...props
}) {
  return (
    <TooltipWrapper className="group">{children}
        <Tooltiptext>{children}</Tooltiptext>
    </TooltipWrapper>
  );
}

