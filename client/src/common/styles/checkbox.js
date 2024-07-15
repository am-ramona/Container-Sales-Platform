import tw,{ styled } from "twin.macro";

const CheckboxStyled = styled.input(({disabled, ...props}) => [
    disabled ? 
    tw`
    w-5 h-5 bg-secondary-blue 
    rounded-none text-primary-blue 
    border-secondary-blue
    `
    : 
     tw`  
    w-5 h-5 bg-transparent 
    text-primary-blue rounded-none 
    border-secondary-blue focus:ring-0 
    focus:outline-none focus-visible:ring-2 
    focus-visible:ring-blue-500
    cursor-pointer
    `,
    // focus:ring-0 
    // focus:outline-none focus-visible:ring-2 
    // focus-visible:ring-green-500
    props.color === 'green' ?
    tw`
    w-25 h-25 text-primary-green
    bg-primary-blue rounded-xl
    border-secondary-green 
    focus:(ring-0 outline-none)
    cursor-pointer
    ` :
    tw`  
    w-5 h-5 bg-transparent 
    text-primary-blue rounded-none 
    border-secondary-blue focus:ring-0 
    focus:outline-none focus-visible:ring-2 
    focus-visible:ring-blue-500
    cursor-pointer
    `
  ]);
  
const Checkbox = (props) => <CheckboxStyled type="checkbox" {...props} />

export default Checkbox;

