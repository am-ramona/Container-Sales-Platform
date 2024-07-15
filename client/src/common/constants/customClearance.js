import { useContext } from "react";
import { CustomClearanceContext } from "../../context/CustomClearanceContext";

function CustomClearanceData() {
  const { customClearanceDocument, paymentProofDocument } = useContext(CustomClearanceContext);

  const customClearance = [
    {
      "orderId": 1290,
      "bookingStatus": "not ready",
      "paymentStatus": "invoice sent",
      "documentStatus": customClearanceDocument === "Uploaded" && paymentProofDocument === "Uploaded" ? "Uploaded / Not Validated" : "Buyer / Not Uploaded",
      "pendingActions": "Upload Payment Proof",
      "bookingDate": "21/8/2020",
      "button": customClearanceDocument === "Uploaded" && paymentProofDocument === "Uploaded" ? "Manage" : "Upload"
    },
    {
      "orderId": 1190,
      "bookingStatus": "picked up",
      "paymentStatus": "paid",
      "documentStatus": "Uploaded / Validated",
      "pendingActions": "None",
      "bookingDate": "06/07/2020",
      "button": "Manage"
    },
    {
      "orderId": 1187,
      "bookingStatus": "picked up",
      "paymentStatus": "paid",
      "documentStatus": "Uploaded / Not Validated",
      "pendingActions": "None",
      "bookingDate": "06/07/2020",
      "button": "View"
    }
  ]

  return customClearance
}

const currentOrdersStatus = {
  'not ready': "gray",
  'invoice sent': "yellow",
  'picked up': 'green',
  'paid': 'green',
  'Uploaded / Validated': 'green',
  'not uploaded': 'gray'
};

const orderAddress = [
  {
    "containerID": "CMAU 784209",
    "POOL_ADDRESS_FULL": "MUELLE MSC S/N PUERTO DE VALENCIA 46024 ES"
  },
  {
    "containerID": "CMAU 347560",
    "POOL_ADDRESS_FULL": "PUERTO DE ALICANTE PROLONGACIÃ“N SUR 03008 ES"
  }
]

const viewAddress = []

export { CustomClearanceData, currentOrdersStatus, orderAddress };