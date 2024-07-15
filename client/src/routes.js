// import { Home, BuyerHome, ProductList, Checkout, AdminLayout, AgentLayout } from "./Components/index";
import Home from "./views/Buyer/Home";
import BuyerHome from "./views/Buyer/Home/Home";
import ProductList from "./views/Buyer/ProductList";
import Checkout from "./views/Buyer/Checkout";
import AdminLayout from "./views/Admin";
import AgentLayout from "./views/Agent";

import { SidebarProvider } from "./context/SidebarContext";
import { NavbarProvider } from "./context/NavbarContext";
import { CustomClearanceProvider } from "./context/CustomClearanceContext";

export default [
    { path: "/", name: "Home", provider: [NavbarProvider], Component: Home },
    { path: "/currentorders", name: "Current Orders", provider: [CustomClearanceProvider, NavbarProvider], Component: BuyerHome },
    {
        path: "/productList",
        name: "Products",
        provider: [NavbarProvider],
        Component: ProductList
    },
    { path: "/productList/checkout", name: "Checkout", provider: [NavbarProvider], Component: Checkout },
    { path: "/admin", name: "Admin", provider: [SidebarProvider, NavbarProvider], Component: AdminLayout },
    { path: "/agent", name: "Agent", provider: [SidebarProvider, NavbarProvider], Component: AgentLayout }
];