import { useState, useEffect } from "react"; // 1. Added useState/useEffect
import jsPDF from "jspdf";
import { 
  XMarkIcon, 
  MapPinIcon, 
  CalendarDaysIcon, 
  TagIcon, 
  CheckCircleIcon,
  ClockIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";

export default function AgentReportModal({ report, isOpen, onClose, onStatusChange }) {
  
  const [successMsg, setSuccessMsg] = useState(""); // 2. Local state for message

  // Clear message when modal closes or report changes
  useEffect(() => {
    if (!isOpen) setSuccessMsg("");
  }, [isOpen, report]);

  if (!isOpen) return null;

  // --- PDF Download Logic (Unchanged) ---
  const handleDownload = () => {
    const doc = new jsPDF();
    const lineHeight = 10;
    let y = 20;

    doc.setFontSize(20);
    doc.setTextColor(91, 27, 111);
    doc.text("Incident Report Details", 20, y);
    y += lineHeight * 2;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    doc.setFont("helvetica", "bold");
    doc.text(`Incident Type:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(report.incidentType, 60, y);
    y += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text(`Status:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(report.status.toUpperCase(), 60, y);
    y += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text(`Case ID:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(report._id, 60, y);
    y += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text(`Date Reported:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(new Date(report.createdAt).toLocaleString(), 60, y);
    y += lineHeight * 1.5;

    doc.setFontSize(14);
    doc.setTextColor(91, 27, 111);
    doc.text("Location Details", 20, y);
    y += lineHeight;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    doc.setFont("helvetica", "bold");
    doc.text(`Barangay:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(report.barangayIncident, 60, y);
    y += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text(`City:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(report.city, 60, y);
    y += lineHeight * 1.5;

    doc.setFontSize(14);
    doc.setTextColor(91, 27, 111);
    doc.text("Description", 20, y);
    y += lineHeight;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const splitDescription = doc.splitTextToSize(report.description, 170);
    doc.text(splitDescription, 20, y);

    doc.save(`Report_${report.incidentType}_${report._id.slice(-6)}.pdf`);
  };

  // Status Color Logic
  const getStatusStyle = (status) => {
    const s = status ? status.toLowerCase() : "";
    switch (s) {
      case "resolved":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "opened":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "unopened":
      default:
        return "bg-red-100 text-red-700 border-red-200"; 
    }
  };

  // 3. New Wrapper Function to handle the update & show message
  const handleUpdateClick = (newStatus) => {
    // Call the parent function
    onStatusChange(report._id, newStatus);
    
    // Show the success message
    setSuccessMsg(`Status successfully updated to ${newStatus.toUpperCase()}`);
    
    // Auto-hide the message after 3 seconds
    setTimeout(() => {
        setSuccessMsg("");
    }, 3000);
  };

  const formattedDate = new Date(report.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all flex flex-col max-h-[90vh] overflow-hidden montserrat-font">
        
        {/* --- 4. SUCCESS MESSAGE TOAST --- */}
        {successMsg && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce-short">
                <CheckCircleIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">{successMsg}</span>
            </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-800">
                {report.incidentType}
              </h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusStyle(report.status)}`}>
                {report.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span className="font-medium">Case ID:</span> {report._id.slice(-6).toUpperCase()}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Download Button */}
            <button 
                onClick={handleDownload}
                className="flex items-center gap-1 text-[#5b1b6f] hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors border border-purple-200"
                title="Download PDF"
            >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span className="text-sm font-semibold hidden sm:inline">Download</span>
            </button>

            {/* Close Button */}
            <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-colors"
            >
                <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Description Box */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
              <TagIcon className="w-4 h-4" /> Description
            </h3>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              {report.description}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="bg-[#f3e6f5] p-2 rounded-lg text-[#5b1b6f]">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Location</p>
                <p className="font-semibold text-gray-800 text-sm md:text-base">{report.barangayIncident}</p>
                <p className="text-xs text-gray-500">{report.city}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-start gap-3">
              <div className="bg-[#f3e6f5] p-2 rounded-lg text-[#5b1b6f]">
                <CalendarDaysIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Date Reported</p>
                <p className="font-semibold text-gray-800 text-sm md:text-base">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* Reporter Info */}
          <div className="pt-4 border-t border-gray-100 mt-2">
              <p className="text-xs text-gray-500">
                Reported by <span className="font-medium text-gray-800">{report.name}</span>
              </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row justify-end gap-3">
          
          <button
            onClick={() => handleUpdateClick("pending")} 
            className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <ClockIcon className="w-5 h-5" />
            Mark as Pending
          </button>

          <button
            onClick={() => handleUpdateClick("resolved")}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Mark as Resolved
          </button>

        </div>
      </div>
    </div>
  );
}