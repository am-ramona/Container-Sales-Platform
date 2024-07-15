import React from "react";
import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
} from "reakit";
import "twin.macro";

export default function Tooltip({ children, title, ...props }) {
  const tooltip = useTooltipState({ placement: "bottom-end" });
  
  return (
    <>
      <TooltipReference {...tooltip} ref={children.ref} {...children.props}>
        {(referenceProps) => React.cloneElement(children, referenceProps)}
      </TooltipReference>
      <ReakitTooltip tw="bg-extra-light-gray rounded text-primary-blue p-2 border border-solid border-primary-blue focus:outline-none" {...tooltip} {...props}>
        {children}
      </ReakitTooltip>
    </>
  );
}
