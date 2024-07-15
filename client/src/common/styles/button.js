import tw, { styled } from "twin.macro";
import { Button } from "reakit";

const StyledButton = styled(Button)(({ color }) => [
  tw`
    text-sm relative
    p-2 rounded-none 
    border-transparent transition 
    duration-500 ease-in-out 
    focus:outline-none 
    `,
  color === "primary-blue" &&
  tw`
    text-white
    bg-primary-blue 
    border 
    hover:( bg-secondary-blue border-secondary-blue text-white )
    focus-visible:ring-2 
    focus-visible:ring-blue-500
    `,
  color === "navy" &&
  tw`
    text-white
    rounded-5
    w-70 h-38
    bg-primary-blue 
    border 
    hover:( bg-secondary-blue border-secondary-blue text-white )
    focus-visible:ring-2 
    focus-visible:ring-blue-500
    `,
  color === "primary-red" &&
  tw`
    text-white
    bg-primary-red 
    border 
    border-transparent 
    hover:bg-transparent 
    hover:border-primary-red 
    hover:text-primary-blue
    focus-visible:ring-2 
    focus-visible:ring-blue-500
    `,
  color === "outline-blue" &&
  tw` 
    bg-white
    rounded-none
    w-70 h-38
    text-primary-blue 
    border 
    border-primary-blue 
    hover:bg-primary-blue 
    hover:text-white
    focus-visible:ring-2 
    focus-visible:ring-blue-500
    `,
  color === "outline-free" &&
  tw` 
    bg-secondary-gray
    rounded-none
    text-primary-blue 
    border 
    border-primary-blue 
    hover:bg-primary-blue 
    hover:text-white
    focus-visible:ring-2 
    focus-visible:ring-blue-500
    `,
  color === "outline-red" &&
  tw`
    bg-white
    rounded-none
    w-70 h-38
    text-primary-red 
    border 
    border-primary-red 
    hover:bg-primary-red 
    hover:text-white
    focus-visible:ring-2 
    focus-visible:ring-blue-500
    `,
  color === "disabled" &&
  tw`
    text-primary-blue 
    border 
    border-primary-gray 
    bg-secondary-blue
    focus-visible:ring-2 
    focus-visible:ring-blue-500
    `,
  color === "neutral" &&
  tw`
    bg-white 
    text-primary-blue
    border-b-2 border-casual-gray
    transition duration-150 ease-linear
     `,
  color === "neutral-blue" &&
  tw`
    bg-white 
    text-primary-blue
    border-b-2 border-primary-blue
    transition duration-150 ease-linear
    `
]);

export default StyledButton;
