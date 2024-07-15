import styled from 'styled-components';
import { Edit } from "../../../assets/icons/index";
import tw from "twin.macro";

export const StyledEdit = tw(Edit)`
w-5 h-5 cursor-pointer
hover:( text-secondary-blue underline )`;

// table
export const TableStyled = styled.div`
  width: 100%;
  //display: inline-block;
`;

// tbody
export const TableBody = styled.div`
  /*  
  > div {
    overflow-y: scroll !important;
  }
*/
`;

// tr
export const TableRow = styled.div`
  display: flex;
  align-items: center;
  height: 58px;
  font-size: 15px;
  border: solid;
  box-sizing: border-box;
  border-width: 2px 0;
  border-color: #212637;
  background-color: #242f43;
  background-color: ${(props) => (props.rowError ? '#5f2638' : '#242f43')};
  :hover {
    background-color: rgb(35 55 85 / 75%);
    background-color: ${(props) => (props.rowError ? '#5f2638' : '')};
    cursor: pointer;
  }
  :first-child {
    border-width: 0 0 2px 0;
  }
`;

// td
export const TableCell = styled.div`
  // display:  ${(props) =>
    props.id === 'expander' ? 'inline-block' : 'inline-flex !important'};
  display: inline-grid !important;
  align-items: center;
  justify-items: ${(props) => (props.align ? `${props.align}` : 'left')};
  text-align: ${(props) => (props.align ? `${props.align}` : 'left')};
  min-width: ${(props) => (props.width ? `${props.width}px` : '50px')};
  min-height: 25px;
  // line-height: 25px;
  flex: ${(props) => (props.full ? 1 : 'unset')};
  padding: 0 5px;
  font-size: 12px;
  color: #8798ad;
  //color: ${(props) => (props.error ? '#FFFFFF' : '#8798ad')};
  border-bottom-style: ${(props) => (props.error ? 'solid' : 'none')};
  border-bottom-width: 1px;
  border-bottom-color: red;
  //background-color: #F44336;
  color: #8798ad;
  font-size: 13px;
  // background-color: #F44336;

  & [role='cell'] {
    display: grid;
    grid-template-columns: auto auto;
    grid-row: 15px;
  }
`;

// th
export const TableRowHead = styled(TableRow)`
  text-align: left;
  color: #fff;
  border: unset;
  background-color: #212737;

  :hover {
    background-color: #212737;
  }
  // header title table
  :first-child {
    box-sizing: border-box;
    border-width: 0;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-color: #1a202a;
    padding-left: 24px;
    padding-right: 12px;
    > div {
      color: white;
      font-size: 16px;
      :hover {
        background-color: #212737;
      }
      // background-color: #F44336;
      //display: flex;
      //flex-direction: column;
      //justify-items: left;
    }
  }
  :nth-child(2) {
    height: 40px !important;
  }
`;

// thead tr
export const TableRowGroup = styled.div`
  > div {
    //width: calc(100% - 6px) !important;
  }
  background-color: #212737;
`;

// th
export const TableHeader = styled.div`
  flex: ${(props) => (props.full ? 1 : 'unset')};
  min-width: ${(props) => (props.width ? `${props.width}px` : '30px')};
  //text-align: ${(props) => (props.align ? `${props.align}` : 'left')};
  padding: 1px 5px 1px 5px;
  //padding-left: ${(props) => (props.align === 'center' ? '0px' : '5px')};
  line-height: 26px;
  font-size: 12px;
  color: #2d8efe;
  background-color: ${(props) =>
    props.highlight ? 'rgba(45, 142, 254, 0.15)' : 'unset'};
  :hover {
    background-color: rgb(35 55 85 / 75%);
  }
  // border: solid 1px green;
  // background-color: #8798ad;

  .resizer {
    display: inline-block;
    //background: blue;
    width: 10px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 1;
    ${'' /* prevents from scrolling while dragging on touch devices */}
    touch-action: none;

    &.isResizing {
      //background: red;
    }
  }
`;

export const TableHeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1;
`;

export const TableHeaderToolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  // DEBUG PROPS
  // background-color: #4CAF50;
  // border: #61dafb 1px solid;
`;
export const MenuToolbar = styled.div`
  display: flex;
  font-size: 12px;
  color: #2d8efe;
  justify-items: right;
  align-items: normal;
  padding: 0;
  padding-right: 5px;
  :hover {
    // background-color: rgb(35 55 85 / 75%);
  }
  > img {
    color: #f44336;
    margin-left: 5px;
  }
`;

export const SpanArrow = styled.span`
  display: flex;
  height: 14px;
  margin-left: 5px;
`;

export const Pagination = styled.div`
  font-size: 14px;
  color: #8798ad;
  text-align: right;
  margin-bottom: 10px;
`;

export const RowsPerPage = styled.span`
  // font-size: 14px;
  color: #2d8efe;
`;

export const PaginateWithNumbers = styled.span`
  // font-size: 14px;
  // color: #2D8EFE;
  margin-left: 65px;
  margin-right: 35px;
`;

export const PageNumber = styled.span`
  &:not(:last-child) {
    margin-right: 10px;
  }

  //  &:last-child {
  //   margin-right: 35px;
  //  }
`;

export const PaginationSelect = styled.select`
background: transparent;
color: #8798AD;
border: 0 
`;

export const PaginationButton = styled.button`
background: transparent;
border: 0;
font-size: 14
`;

export const ToolbarStyled = styled.div`
  // flex: ${(props) => (props.full ? 1 : 'unset')};
  display: grid;
  grid-template-columns: ${(props) =>
    props.actions === '2' ? 'auto auto' : 'auto auto auto'};
  justify-content: center;
  align-content: center;
  grid-gap: 25px;
  // height: 20px;
  // padding-bottom: 5px;
`;

export const ToolbarButtonStyled = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  grid-gap: 5px;
  width: max-content;
  // height: 20px;
  // padding: 0;
  // padding-right: 5px;
  font-size: 12px;
  font-family: 'Roboto';
  color: ${(props) => (props.disabled ? '#666C80' : '#2d8efe')};
  // background-color: rgb(35 55 85 / 75%);
  // border: #61dafb 1px solid;
  :hover {
    cursor: pointer;
    //background-color: rgb(35 55 85 / 75%);
  }
  > img {
    vertical-align: middle;
    margin-left: 5px;
    color: ${(props) => (props.disabled ? '#666C80' : '#2d8efe')};
  }
`;

export const AddSign = styled.span`
display: grid;
width:25px;
height: 25px;
border: 1px solid #04246A;
border-radius: 50%;
align-content: center;
cursor: pointer;

:hover {
  color: #3E64B8;
  border-color: #3E64B8;
}
`;

export const AddWrapper = styled.span`
display: grid;
grid-template-rows: auto;
grid-template-columns: auto auto;
justify-content: center;
align-items: center;
column-gap: 5px;
`;
