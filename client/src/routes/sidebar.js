/**
 * These are used just to render the Sidebar!
 */

const roles = {
  ADMIN: "ADMIN",
  AGENT: "AGENT",
};

const routes = {
  ADMIN: [
    {
      path: "/admin/dashboard",
      icon: "OptimizationIcon",
      name: "Dashboard",
    },
    {
      path: "/admin/manage-agents",
      icon: "UserIcon",
      name: "Manage Agents",
    },
  ],
  AGENT: [
    {
      path: "/agent/dashboard",
      icon: "OptimizationIcon",
      name: "Dashboard",
    },
    {
      icon: "ContainerIcon",
      name: "Containers",
      routes: [
        {
          path: "/agent/containers/awaiting-confirmation",
          name: "Awaiting Confirmation",
          icon: "DocumentCheckIcon",
        },
        {
          path: "/agent/containers/in-stock",
          name: "In stock",
          icon: "Container3DIcon",
        }
      ],
    },
    {
      path: "/agent/bookings",
      icon: "CreditCardIcon",
      name: "Bookings",
    }
  ],
};

export { routes, roles };
