"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashbaord.type";
import { UserInfo } from "@/types/user.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathName = usePathname();
  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-card overflow-y-auto">
      {/*logo*/}
      <div className="flex h-16 items-center border-b px-6">
        <Link href={dashbaordHome}>
          <span className="text-xl font-bold text-primary">PH healthCare</span>
        </Link>
      </div>
      {/*navigarion area*/}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navItems.map((section, sectionId) => (
            <div key={sectionId}>
              {section.title && <h4>{section.title}</h4>}
              <div className="space-y-1">
                {section.items.map((item, id) => {
                  const isActive = pathName === item.href;
                  const Icon = getIconComponent(item.icon);
                  return (
                    <Link
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                        isActive
                          ? "bg-primary text-white"
                          : "text-muted-foreground",
                      )}
                      key={id}
                      href={item.href}
                    >
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
      {/*user info*/}
      <div className="border-t px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full size-8 bg-primary-foreground flex items-center justify-center">
            <span>{userInfo.name.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <p>{userInfo.name}</p>
            <p>{userInfo.role.toLocaleLowerCase().replace("_", " ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardSidebarContent;
