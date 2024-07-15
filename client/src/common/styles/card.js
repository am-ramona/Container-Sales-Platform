import tw,{ styled } from "twin.macro";

const Card = styled.div(({ hasHighlightedBorder, animated }) => [
    tw`
    text-primary-blue
    shadow-md 
    p-5 
    bg-white
    `,
    hasHighlightedBorder &&
    tw`
    text-primary-blue
    border 
    border-l-0 
    border-t-0 
    border-b-0
    border-r-4
    `,
    animated && 
    tw`
    text-primary-blue
    transform 
    translate-y-0
    transition duration-500 ease-in-out
    hover:(shadow-lg -translate-y-0.5)
    `
]);

export default Card;