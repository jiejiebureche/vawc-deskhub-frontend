import AdminSidebar from "../../components/AdminSidebar";

export default function Dashboard() {
  return (
    <div className="montserrat-font flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main
        className="
          flex-1 relative overflow-auto p-6
          ml-20 group-hover:ml-64 transition-all duration-300 ease-in-out
        "
      >
        this is the agent dashboard
      </main>
    </div>
  );
}
