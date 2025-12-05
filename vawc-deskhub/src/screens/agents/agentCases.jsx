import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminSidebar from "../../components/AdminSidebar";
import ReportCard from "../../components/reportCard"; 
import AgentReportModal from "../../components/AgentReportModal"; 
import { ArrowPathIcon, FolderIcon } from "@heroicons/react/24/outline";

export default function AgentCases() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const agentId = user?.safeUser?.id;

  const queryClient = useQueryClient();
  const [selectedReport, setSelectedReport] = useState(null);

  // 1. Fetch Reports (with Real-time Polling & Sorting)
  const {
    data: reports,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reports", agentId],
    queryFn: async () => {
      const response = await fetch(`/reports/agent/${agentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch reports");
      return response.json();
    },
    refetchInterval: 3000, // ✅ FETCHES EVERY 3 SECONDS (Real-time effect)
    staleTime: 0, // Data is considered stale immediately so it refreshes
  });

  // Sort reports: Newest first
  const sortedReports = reports?.sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  ) || [];

  // 2. Patch Status Mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const response = await fetch(`/reports/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) throw new Error("Failed to update status");
      return response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["reports", agentId]);
      
      if (selectedReport && selectedReport._id === variables.id) {
        setSelectedReport(prev => ({ ...prev, status: variables.newStatus }));
      }
    },
    onError: (err) => {
      console.error(err);
    }
  });

  // 3. Handlers
  const handleCardClick = (report) => {
    setSelectedReport(report);
    if (report.status === "unopened") {
      statusMutation.mutate({ id: report._id, newStatus: "opened" });
    }
  };

  const handleStatusChange = (id, newStatus) => {
    if (selectedReport?.status !== newStatus) {
      statusMutation.mutate({ id, newStatus });
    }
  };

  return (
    <div className="montserrat-font flex h-screen bg-gray-50 overflow-hidden relative">
      
      <div className="hidden md:block group relative z-20 flex-shrink-0 bg-[#5b1b6f] transition-all duration-300 ease-in-out w-20 hover:w-64">
        <div className="h-full w-full overflow-hidden">
          <AdminSidebar />
        </div>
      </div>

      <div className="md:hidden">
         <AdminSidebar />
      </div>

      <main className="flex-1 relative overflow-y-auto overflow-x-hidden p-4 md:p-8">
        <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Assigned Cases</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">Manage and resolve reports assigned to you</p>
        </div>

        {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-700">
            <ArrowPathIcon className="w-8 h-8 md:w-10 md:h-10 text-[#5b1b6f] animate-spin mb-4" />
            <p className="text-base md:text-lg font-medium">Loading cases...</p>
        </div>
        )}

        {isError && (
        <div className="flex flex-col items-center justify-center py-20 text-red-600 text-center">
            <p className="text-base md:text-lg font-semibold mb-2">Error fetching reports</p>
            <p className="text-sm text-gray-500 mb-4">{error.message}</p>
            <button onClick={() => refetch()} className="bg-[#5b1b6f] text-white px-6 py-2 rounded-md hover:bg-[#4a155a] transition">
            Try Again
            </button>
        </div>
        )}

        {!isLoading && !isError && sortedReports.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-600 text-center">
            <FolderIcon className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mb-4" />
            <p className="text-base md:text-lg font-medium">No active cases assigned</p>
        </div>
        )}

        {/* Use sortedReports here */}
        {!isLoading && !isError && sortedReports.length > 0 && (
        <div className="space-y-4">
            {sortedReports.map((report) => (
            <ReportCard 
                key={report._id} 
                report={report} 
                onClick={handleCardClick} 
            />
            ))}
        </div>
        )}
      </main>

      {selectedReport && (
        <AgentReportModal 
          report={selectedReport}
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}