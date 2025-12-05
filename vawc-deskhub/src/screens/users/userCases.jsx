import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Sidebar from "../../components/Sidebar";
import ReportCard from "../../components/reportCard";
import ReportModal from "../../components/ReportModal"; 
import { ArrowPathIcon, FolderIcon } from "@heroicons/react/24/outline";

export default function Cases() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const reporterId = user?.safeUser?.id;

  const queryClient = useQueryClient();
  const [selectedReport, setSelectedReport] = useState(null); 

  // 1. Fetch Reports
  const {
    data: reports,
    isLoading,
    isError,
    // error, // unused
    refetch,
  } = useQuery({
    queryKey: ["reports", reporterId],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/reports/reporterId/${reporterId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 404) return [];
      
      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();

      // SORTING LOGIC: Sort by createdAt (Newest first)
      if (Array.isArray(data)) {
        return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      return [];
    },
    // REAL-TIME LOGIC:
    refetchInterval: 3000, // Automatically refetch every 3 seconds
    refetchIntervalInBackground: true, // Keep updating even if tab is not focused
    staleTime: 0, // Data is considered stale immediately so it always accepts new updates
  });

  // 2. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`/reports/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete report");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reports", reporterId]);
      setSelectedReport(null); 
      alert("Report deleted successfully");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  // 3. Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await fetch(`/reports/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error("Failed to update report");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reports", reporterId]);
      alert("Report updated successfully");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  // Handlers
  const handleCardClick = (report) => {
    setSelectedReport(report);
  };

  const handleUpdate = (id, updatedData) => {
    updateMutation.mutate({ id, updatedData });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="montserrat-font flex h-screen bg-gray-50 overflow-hidden relative">
      
      <div className="hidden md:block group relative z-20 flex-shrink-0 bg-[#5b1b6f] transition-all duration-300 ease-in-out w-20 hover:w-64">
        <div className="h-full w-full overflow-hidden">
          <Sidebar />
        </div>
      </div>

      <div className="md:hidden">
         <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden p-4 md:p-8">
        
        <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Reports</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">Track the status of your filed cases</p>
        </div>

        {/* Loading State */}
        {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-700">
            <ArrowPathIcon className="w-8 h-8 md:w-10 md:h-10 text-[#5b1b6f] animate-spin mb-4" />
            <p className="text-base md:text-lg font-medium">Fetching your reports...</p>
        </div>
        )}

        {/* Error State */}
        {isError && !reports && (
        <div className="flex flex-col items-center justify-center py-20 text-red-600 text-center">
            <p className="text-base md:text-lg font-semibold mb-2">Failed to load reports</p>
            <button onClick={() => refetch()} className="bg-[#5b1b6f] text-white px-6 py-2 rounded-md hover:bg-[#4a155a] transition">
            Try Again
            </button>
        </div>
        )}

        {/* No Reports */}
        {!isLoading && !isError && reports?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-600 text-center">
            <FolderIcon className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mb-4" />
            <p className="text-base md:text-lg font-medium">You have not created any reports</p>
        </div>
        )}

        {/* Reports List */}
        {!isLoading && !isError && reports?.length > 0 && (
        <div className="space-y-4">
            {reports.map((report) => (
            <ReportCard 
                key={report._id} 
                report={report} 
                onClick={handleCardClick} 
            />
            ))}
        </div>
        )}
      </main>

      {/* Modal Component */}
      {selectedReport && (
        <ReportModal 
          report={selectedReport}
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}