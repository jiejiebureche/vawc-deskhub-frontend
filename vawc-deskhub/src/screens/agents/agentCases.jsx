import { useQuery } from "@tanstack/react-query";
import AdminSidebar from "../../components/AdminSidebar";
import ReportCard from "../../components/reportCard";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AgentCases() {
  const { user } = useContext(AuthContext);
  const token = user?.token;
  const agentId = user?.safeUser?.id;

  const {
    data: reports,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reports", agentId],
    queryFn: async () => {
      const response = await fetch(`/reports/agent/${agentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // ✅ Cache valid for 5 mins
  });

  return (
    <div className="montserrat-font flex min-h-screen bg-gray-50">
      {/* Sidebar (fixed) */}
      <AdminSidebar />

      {/* Main content */}
      <main
        className="
          flex-1 relative overflow-auto p-6
          ml-20 group-hover:ml-64 transition-all duration-300 ease-in-out
        "
      >
        {isLoading && <p>Loading reports...</p>}
        {error && <p>Error fetching reports</p>}

        <div className="space-y-4">
          {reports?.map((report) => (
            <ReportCard key={report._id} report={report} />
          ))}
        </div>
      </main>
    </div>
  );
}
