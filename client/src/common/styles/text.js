import tw,{styled} from "twin.macro";

const StyledText = styled.div(({color}) => [
    tw`
    text-sm font-normal
    rounded-md
    `,
    color === "gray" &&
    tw`
    text-primary-gray text-sm
    bg-extra-light-gray py-2
    `,
    color === "yellow" &&
    tw`
    text-primary-yellow text-sm
    bg-secondary-yellow py-2
    `,
    color === "green" &&
    tw`
    text-primary-green text-sm
    bg-secondary-green py-2
    `,
    color === "blue" && 
    tw`
    text-lighter-blue text-sm
    bg-extra-light-gray py-2
    `,
    color === "orange" &&
    tw`
    text-primary-orange text-sm
    bg-secondary-orange py-2
    `,
    color === "red" &&
    tw`
    text-secondary-red text-sm
    bg-light-red py-2
    `,
  ]);

export default StyledText;

