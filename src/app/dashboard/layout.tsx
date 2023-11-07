import Sidebar from "../_components/sidebar";
import DashboardNav from "../_components/dashboard-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div key="1" className="flex h-screen bg-gray-200 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-grow flex-col overflow-hidden">
        <DashboardNav />
        <main className="grainy flex-grow overflow-y-auto bg-gray-50 bg-opacity-75 bg-fixed p-10 antialiased dark:bg-gray-600">
          {children}
        </main>
      </div>
    </div>
  );
}
