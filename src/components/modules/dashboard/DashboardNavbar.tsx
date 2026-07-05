import { getUserInfo } from "@/services/auth.service";
import { NavSection } from "@/types/dashbaord.type";
import { getNavItemsByRole } from "@/lib/navItem";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import MobileSideBar from "./MobileSideBar";

const DashboardNavbar = async () => {
  const userInfo = await getUserInfo();
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  console.log("useInfo", userInfo);
  const dashboard = getDefaultDashboardRoute(userInfo.role);
  return (
    <MobileSideBar
      navItems={navItems}
      userInfo={userInfo}
      dashboardHome={dashboard}
    />
  );
};
export default DashboardNavbar;
