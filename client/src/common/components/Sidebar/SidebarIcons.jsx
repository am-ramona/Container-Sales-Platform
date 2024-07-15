import * as Icons from "../../../assets/icons";

function SidebarIcons({ icon, ...props }) {
    const Icon = Icons[icon];
    return <Icon {...props} />;
  }
  
export default SidebarIcons;