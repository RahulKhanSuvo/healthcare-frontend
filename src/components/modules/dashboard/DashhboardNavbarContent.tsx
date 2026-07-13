"use client";
import { useEffect, useState } from "react";
import MobileSideBar from "./MobileSideBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { UserInfo } from "@/types/user.types";
import { NavSection } from "@/types/dashbaord.type";
import { Input } from "@/components/ui/input";
import NotificationsDropdown from "./NotificationsDropdown";
import UserDropdown from "./UserDropdown";
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
  const [isMoblie, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const checkSmallScreen = () => {
      setMobile(window.innerWidth < 768);
    };
    checkSmallScreen();
    window.addEventListener("resize", checkSmallScreen);
    return () => {
      window.removeEventListener("resize", checkSmallScreen);
    };
  }, []);
  return (
    <div className="bg-gray-100 flex gap-6 items-center justify-between px-5">
      {/*moble menu toggle*/}
      <Sheet
        open={isMobileMenuOpen && isMoblie}
        onOpenChange={setIsMobileMenuOpen}
      >
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
      <div className="flex-1 flex items-center justify-end gap-1">
        <div className="relative w-full   hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5" />
          <Input type="text" placeholder="Search" className="pl-9 pr-4" />
        </div>
      </div>
      {/*right side actions*/}

      {/*notifications*/}
      <div className="flex items-center gap-2">
        {" "}
        <NotificationsDropdown />
        {/*user dropdown*/}
        <UserDropdown userInfo={userInfo} />
      </div>
    </div>
  );
};

export default DashhboardNavbarContent;
