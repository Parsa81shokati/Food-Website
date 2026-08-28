import Sidebar from "@/features/admin/components/layout/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8 ">{children}</main>
    </div>
  );
}
