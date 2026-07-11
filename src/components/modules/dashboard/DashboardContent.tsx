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
      <div className="flex sticky top-0 h-16 items-center border-b px-6 bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60 z-30">
        <Link href={dashbaordHome} className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">PH</span>
          <span className="text-xl font-bold">HealthCare</span>
        </Link>
      </div>
      {/*navigation area*/}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navItems.map((section, sectionId) => (
            <div key={sectionId}>
              {section.title && (
                <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h4>
              )}
              <div className="space-y-0.5">
                {section.items.map((item, id) => {
                  const isActive = pathName === item.href;
                  const Icon = getIconComponent(item.icon);
                  return (
                    <Link
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                      key={id}
                      href={item.href}
                    >
                      <Icon className="size-4" />
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
      <div className="border-t p-4 bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold shadow-sm">
            {userInfo.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{userInfo.name}</p>
            <p className="truncate text-xs text-muted-foreground capitalize">
              {userInfo.role.toLocaleLowerCase().replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardSidebarContent;
