import { useQuery } from "@tanstack/react-query";
import Sidebar from "../../components/Sidebar";
import ReportCard from "../../components/reportCard";
import { ArrowPathIcon, FolderIcon } from "@heroicons/react/24/outline";

export default function Cases() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const reporterId = user?.safeUser?.id;

  const {
    data: reports,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reports", reporterId],
    queryFn: async () => {
      const response = await fetch(`/reports/reporterId/${reporterId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle non-critical 404 or empty responses gracefully
      if (response.status === 404) {
        return []; // No reports found
      }

      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();
      // Ensure we always return an array
      return Array.isArray(data) ? data : [];
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  return (
    <div className="montserrat-font flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="
          flex-1 relative overflow-auto p-6
          ml-20 group-hover:ml-64 transition-all duration-300 ease-in-out
        "
      >
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full py-20 text-gray-700">
            <ArrowPathIcon className="w-10 h-10 text-purple-800 animate-spin mb-4" />
            <p className="text-lg font-medium">Fetching your reports...</p>
            <p className="text-sm text-gray-500">
              Please wait a moment while we load your cases.
            </p>
          </div>
        )}

        {/* Error State (only for real errors, not 404/no data) */}
        {isError && !reports && (
          <div className="flex flex-col items-center justify-center h-full py-20 text-red-600">
            <p className="text-lg font-semibold mb-2">Failed to load reports</p>
            <p className="text-sm text-gray-500 mb-4">
              {error.message || "An unexpected error occurred."}
            </p>
            <button
              onClick={() => refetch()}
              className="bg-purple-900 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Reports */}
        {!isLoading && !isError && reports?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full py-20 text-gray-600">
            <FolderIcon className="w-14 h-14 text-gray-400 mb-4" />
            <p className="text-lg font-medium">
              You have not created any reports
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Create your first report to see it listed here.
            </p>
          </div>
        )}

        {/* Reports List */}
        {!isLoading && !isError && reports?.length > 0 && (
          <div className="space-y-4">
            {reports.map((report) => (
              <ReportCard key={report._id} report={report} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
