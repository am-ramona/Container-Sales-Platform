import { DownloadIcon, Edit, Delete } from "../../../../assets/icons/index";
import tw from "twin.macro";

const StyledDownloadIcon = tw(DownloadIcon)`
w-5 h-5 inline`;

const StyledEdit = tw(Edit)`
w-5 h-5 cursor-pointer
hover:( text-secondary-blue underline )`;

const HeaderWrapper = tw.div`
grid grid-cols-manageAgents items-center`;

const HeaderTitle = tw.h1`
p-5 text-primary-blue text-2xl font-medium`;

const Line = tw.div`
  w-3 h-25 mx-2.5
  inline-block align-middle
  bg-primary-red`;

const Number = tw.div`text-17 font-light`;

export {
  HeaderWrapper,
  HeaderTitle,
  Line,
  Number,
  Edit,
  StyledEdit,
  Delete,
  StyledDownloadIcon,
}