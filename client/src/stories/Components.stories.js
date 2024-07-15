import React from "react";
import tw, {css} from "twin.macro";
import Breadcrumb from "../common/components/Breadcrumb";
import { Card } from "../common/styles";
import { InfoCard, ContainerCard } from "../common/components/Card";
import CollapseComponent from "../common/components/Collapse";
import DropdownComponent from "../common/components/Dropdown";
import { InfoIcon } from "../assets/icons";
import { Button } from "../common/styles";
import Counter from "../common/components/Counter";
import Modal from "../common/components/Modal/Modal";
import UploadDocuments from "../common/components/UploadDocuments";
// import DragAndDropWrapper from "../common/components/DragAndDrop/index.jsx";
// import ShoppingCart from "../common/components/Topbar/ShoppingCart";


export default {
  title: "Example/Components",
};

export const BreadCrumb = () => (
  <Breadcrumb items={[{ title: "Home", link: "/" }]} />
);

export const BreadCrumbMultiple = () => (
  <Breadcrumb
    items={[
      { title: "Home", link: "/" },
      { title: "Product", link: "/product-list" },
      { title: "Containers", link: "/" },
      { title: "Reefer", link: "/product-list" },
    ]}
  />
);

export const ExampleCard = () => <Card> Sample Card </Card>;

export const HighlightedCard = () => (
  <Card hasHighlightedBorder css={css`${tw`border-primary-blue`}`}>
    Sample Highlighted Card
  </Card>
);

export const ContainerCardComponent = () => (
  <ContainerCard
    productType="reefer"
    productCity="Beirut"
    productCountry="Lebanon"
    productSize="20"
    productCondition="Recycle only with reuse"
    minPrice="1000"
  />
);

export const InfoCardComponent = () => (
  <InfoCard
    borderColor="red"
    data={200}
    icon={<InfoIcon tw="w-12 h-12" />}
    title="Card Sample test toest fiffiniddddddddddddd ffffdfsfgff fvfveveddddvdvfdvdf"
    link="view card"
  />
);

export const Collapse = () => (
  <CollapseComponent open={true} trigger={"icon"}>
    Sample Collapse{" "}
  </CollapseComponent>
);

export const Dropdown = () => (
  <DropdownComponent
    aria-label="Menu"
    disclosure={
      <Button tw="outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        Open Dropdown
      </Button>
    }
    items={[
      <button>Custom item 1</button>,
      <button>Custom item 2</button>,
      <button>Custom item 3</button>,
    ]}
  ></DropdownComponent>
);

export const CounterAction = () => (
  <Counter />
)

// export const ShoppingCartPopup = () => {
//   <ShoppingCart username="me"></ShoppingCart>
// }

export const Dropdownn = () => (
  <DropdownComponent
    aria-label="Menu"
    width="255px"
    disclosure={
      <Button tw="outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
        Open Dropdown
      </Button>
    }
    items={[
      <div tw="flex flex-wrap p-0">
        <div tw="p-2.5 overflow-x-auto">
          <table>
            <thead>
              <tr tw="border-b">
                <th tw="text-primary-blue pb-1">Shopping Cart</th>
                <th></th>
                <th tw="grid justify-end"><button class="circle cross" >x</button></th>
              </tr>
            </thead>
            <tbody>
              <tr style={{height: 57}} tw="py-10 border-b border-solid border-gray-500">
                <td>
                  2x Dry, 20' ST, Reuse
                </td>
                <td></td>
                <td>$1,800</td>
              </tr>
              <tr style={{height: 57}} tw="py-10 border-b border-solid border-gray-500">
                <td>1x Reefer, 40' HC, Rec...</td>
                <td></td>
                <td>$1,100</td>
              </tr>
            </tbody>
            <tfoot>
            <tr>
                <td></td>
                <td>SubTotal</td>
                <td>$2,900</td>
              </tr>
              <tr>
                <td></td>
                <td>Total</td>
                <td>$3,190</td>
              </tr>
            </tfoot>
          </table>
          <button tw="border-0 py-2 px-8 text-lg mt-4 bg-primary-blue text-white mt-10 p-2 w-full hover:( bg-secondary-blue border-secondary-blue text-white )">Go To Checkout</button>
        </div>
      </div>
    ]}
  ></DropdownComponent>
);

export const PopUp = () => (
  <Modal width="508px" 
                                              
                                              titleFontSize="24px"
                                              component={ 
                                                         <Button color="primary-blue" tw='w-128'>
                                                          click me
                                                         </Button>} 
                                              title= "Upload Documents" 
                                              children={ <UploadDocuments /> }
                                            />
);

function DragAndDropWrapper() {
  return ( "blalalala" )
}

// export const DragAnDrop = () => {
//   return DragAndDropWrapper
// }

