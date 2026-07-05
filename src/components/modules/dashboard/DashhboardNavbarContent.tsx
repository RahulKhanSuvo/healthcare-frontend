import { useState } from "react";
import MobileSideBar from "./MobileSideBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { UserInfo } from "@/types/user.types";
import { NavSection } from "@/types/dashbaord.type";
interface MobileSideBarProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}
const DashhboardNavbarContent = ({
  dashboardHome,
  userInfo,
  navItems,
}: MobileSideBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  return (
    <div>
      {/*moble menu toggle*/}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant={"outline"} size={"icon"}>
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <MobileSideBar
            dashboardHome={dashboardHome}
            userInfo={userInfo}
            navItems={navItems}
          />
        </SheetContent>
      </Sheet>
      {/*search component*/}
      {/*right side actions*/}
      {/*notifications*/}
      {/*user dropdown*/}
    </div>
  );
};

export default DashhboardNavbarContent;
