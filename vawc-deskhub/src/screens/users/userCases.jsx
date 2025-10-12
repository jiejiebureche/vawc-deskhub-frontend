import { useQuery } from "@tanstack/react-query";
import Sidebar from "../../components/Sidebar";
import ReportCard from "../../components/reportCard";

export default function Cases() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const reporterId = user?.safeUser?.id;

  const {
    data: reports,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reports", reporterId],
    queryFn: async () => {
      const response = await fetch(`/reports/reporterId/${reporterId}`, {
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
      <Sidebar />

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
