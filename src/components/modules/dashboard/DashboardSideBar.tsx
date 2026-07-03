import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getNavItemsByRole } from "@/lib/navItem";
import { getUserInfo } from "@/services/auth.service";
import { NavSection } from "@/types/dashbaord.type";

const DashboardSideBar = async () => {
  const userInfo = await getUserInfo();
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  console.log("useInfo", userInfo);
  const dashboard = getDefaultDashboardRoute(userInfo.role);
  return <div></div>;
};
export default DashboardSideBar;
