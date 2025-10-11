export default function ReportCard({ report }) {
  const statusColors = {
    unopened: "text-red-600 bg-red-100 border-red-500",
    opened: "text-yellow-600 bg-yellow-100 border-yellow-500",
    pending: "text-blue-600 bg-blue-100 border-blue-500",
    resolved: "text-green-600 bg-green-100 border-green-500",
  };

  // Format date for readability
  const formattedDate = new Date(report.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="montserrat-font border border-gray-200 rounded-lg p-5 m-4 bg-white shadow-sm flex justify-between items-start hover:shadow-md transition-shadow duration-200">
      {/* Left Section */}
      <div className="flex-1">
        {/* Incident Type (Title) */}
        <h4 className="text-lg font-semibold text-[#260026] mb-2">
          {report.incidentType}
        </h4>

        {/* Reporter Info Line */}
        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 mb-3">
          <p><span className="font-medium">Reporter:</span> {report.name}</p>
          <p><span className="font-medium">Barangay:</span> {report.barangayIncident}</p>
          <p><span className="font-medium">City:</span> {report.city}</p>
          <p><span className="font-medium">Date:</span> {formattedDate}</p>
        </div>

        {/* Description Preview */}
        <p className="text-gray-700 text-sm line-clamp-2">
          {report.description}
        </p>
      </div>

      {/* Right Section: Status */}
      <div
        className={`text-sm font-semibold px-3 py-1 rounded-md border ${statusColors[report.status.toLowerCase()] || "text-gray-600 bg-gray-100 border-gray-400"}`}
      >
        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
      </div>
    </div>
  );
}
