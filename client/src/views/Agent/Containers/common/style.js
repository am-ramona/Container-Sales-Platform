import tw from "twin.macro";
import { DownloadIcon } from "../../../../assets/icons/index";

const StyledDownloadIcon = tw(DownloadIcon)`
w-5 h-5 inline`;

const HeaderWrapper = tw.div`
flex justify-between`;

const HeaderTitle = tw.h1`
p-5 text-primary-blue text-2xl font-medium`;

const Line = tw.div`
  w-3 h-25 mx-2.5
  inline-block align-middle
  bg-primary-red`;

const Number = tw.span`inline-block mr-2.5`;

export {
    HeaderWrapper,
    HeaderTitle,
    Line,
    Number,
    StyledDownloadIcon,
}