import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetTitle } from "@/components/ui/sheet";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashbaord.type";
import { UserInfo } from "@/types/user.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileSideBarProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const MobileSideBar = ({
  userInfo,
  navItems,
  dashboardHome,
}: MobileSideBarProps) => {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      <div>
        <Link href={dashboardHome}>
          <span>Ph HealthCare</span>
        </Link>
      </div>
      <SheetTitle>
        <span>Menu</span>
      </SheetTitle>
      {/*navigation area*/}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((section, sectionId) => (
            <div key={sectionId}>
              {section.title && (
                <h4 className="pb-2 px-3 text-xs font-semibold">
                  {section.title}
                </h4>
              )}
              <div>
                {section.items.map((item, itemId) => {
                  const isActive = item.href === pathname;
                  const Icon = getIconComponent(item.icon);
                  return (
                    <Link
                      key={itemId}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg py-2 text-sm",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-primary-foreground",
                      )}
                    >
                      <Icon className="size-4" />
                      <span className="flex-1">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};
export default MobileSideBar;
