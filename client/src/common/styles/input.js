import tw, { styled } from "twin.macro";

// focus:(ring-1 ring-primary-blue border-transparent outline-none shadow-md)
const InputStyled = styled.input(({ disabled }) => [
    disabled ?
    tw`
    w-337 h-40 px-2.5 border
    rounded-none 
    bg-secondary-gray
    border-primary-gray
    text-left text-14 text-primary-brown italic
    `
    :
    tw`
    w-10 h-10 p-0 border 
    rounded-none text-center
    bg-transparent
    border-casual-gray
    `
]);

const Input = (props) => <InputStyled type="text" {...props} />

export default Input;
