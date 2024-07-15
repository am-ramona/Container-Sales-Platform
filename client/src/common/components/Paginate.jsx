import PaginateComponent from "react-js-pagination";
import tw, { styled } from "twin.macro";

const StyledPaginate = styled.div`

& .pagination {
  ${tw`flex flex-row justify-between space-x-3 mt-2`}
}

& .pagination li {
  ${tw`
  text-lg
  text-gray-400
  font-medium
  p-1
  text-center
  transition-colors 
  cursor-pointer
  `}
}

& .pagination li.active {
  ${tw`text-primary-blue`}
}
`;


export default function Paginate(props) {
  return <StyledPaginate><PaginateComponent {...props} /></StyledPaginate>;
}
