import DashboardNavbar from "@/components/modules/dashboard/DashboardNavbar";
import DashboardSideBar from "@/components/modules/dashboard/DashboardSideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/*dashboard sidebar*/}
      <DashboardSideBar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/*dashbaord navbar*/}
        <DashboardNavbar />
        {/*dashboard content*/}
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
