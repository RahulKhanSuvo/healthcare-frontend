import { NavSection } from "@/types/dashbaord.type";
import { UserInfo } from "@/types/user.types";
import Link from "next/link";

type Props = {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashbaordHome: string;
};
const DashboardSidebarContent = ({
  dashbaordHome,
  navItems,
  userInfo,
}: Props) => {
  return (
    <div>
      {/*logo*/}
      <div>
        <Link href={dashbaordHome}>
          <span>PH healthCare</span>
        </Link>
      </div>
    </div>
  );
};
export default DashboardSidebarContent;
