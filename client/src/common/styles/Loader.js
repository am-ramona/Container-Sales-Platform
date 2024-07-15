import tw,{ styled, css } from "twin.macro";

const Loader = styled.div(({ format }) => [
  tw`
  absolute 
  inset-0
  m-auto
  z-0
  border-5 
  border-solid
  border-secondary-gray
  rounded-50
  border-t-5
  animate-spin-slow
  `,
  css`
    & {
        border-top-color: #04246A
    }`,
  format === "smaller" &&
  tw`
  w-10
  h-10
  `,
  format === "small" &&
  tw`
  w-64
  h-64
  `,
  format === "big" &&
  tw`
  w-70
  h-70
  `
]);

export default Loader;
