import Sidebar from "../_components/sidebar";
import { Button } from "../_components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div key="1" className="flex h-screen bg-gray-200 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-grow flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b bg-white bg-opacity-50 px-10 py-4 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Home
          </h2>
          <div className="flex items-center space-x-2">
            <Button>Logout</Button>
          </div>
        </header>
        <main className="grainy flex-grow overflow-y-auto bg-gray-50 bg-opacity-75 bg-fixed p-10 antialiased dark:bg-gray-600">
          {children}
        </main>
      </div>
    </div>
  );
}
