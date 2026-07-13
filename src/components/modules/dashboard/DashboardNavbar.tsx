import { NavSection } from "@/types/dashbaord.type";
import { getNavItemsByRole } from "@/lib/navItem";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import DashhboardNavbarContent from "./DashhboardNavbarContent";
import MobileSideBar from "./MobileSideBar";
import { getUserInfo } from "@/services/auth.service";

const DashboardNavbar = async () => {
  const userInfo = await getUserInfo();
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  console.log("useInfo", userInfo);
  const dashboard = getDefaultDashboardRoute(userInfo.role);
  return (
    <div>
      <nav>
        <MobileSideBar
          navItems={navItems}
          userInfo={userInfo}
          dashboardHome={dashboard}
        />
        <DashhboardNavbarContent
          navItems={navItems}
          dashboardHome={dashboard}
          userInfo={userInfo}
        />
      </nav>
    </div>
  );
};
export default DashboardNavbar;
