import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getNavItemsByRole } from "@/lib/navItem";
import { getUserInfo } from "@/services/auth.service";
import { NavSection } from "@/types/dashbaord.type";
import DashboardSidebarContent from "./DashboardContent";

const DashboardSideBar = async () => {
  const userInfo = await getUserInfo();
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  // console.log("useInfo", userInfo);
  const dashboard = getDefaultDashboardRoute(userInfo.role);
  return (
    <div>
      <DashboardSidebarContent
        dashbaordHome={dashboard}
        userInfo={userInfo}
        navItems={navItems}
      />
    </div>
  );
};
export default DashboardSideBar;
