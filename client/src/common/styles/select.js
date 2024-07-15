import tw,{styled} from "twin.macro";

// focus:(ring-1 ring-primary-blue border-transparent outline-none shadow-md) 
const Select = styled.select(({disabled}) => [
    disabled ? 
    tw `
    bg-secondary-blue 
    border rounded-none 
    border-primary-gray
    opacity-40 w-28
    `
    : 
    tw`
    bg-transparent border  
    rounded-none w-28
    border-primary-gray
    `
  ]);

export default Select;
