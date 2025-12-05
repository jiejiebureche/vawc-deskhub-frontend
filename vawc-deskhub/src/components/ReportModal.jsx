import { useState, useEffect } from "react";
import { 
  XMarkIcon, 
  MapPinIcon, 
  CalendarDaysIcon, 
  TagIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  CheckIcon 
} from "@heroicons/react/24/outline";

export default function ReportModal({ report, isOpen, onClose, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...report });

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ ...report });
      setIsEditing(false);
    }
  }, [isOpen, report]);

  if (!isOpen) return null;

  const handleCancel = () => {
    setFormData({ ...report }); // Revert to original data
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(report._id, formData);
    setIsEditing(false); // Switch to view mode, now displaying the updated formData
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this case? This action cannot be undone.")) {
      onDelete(report._id);
      onClose();
    }
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
        
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <div className="flex items-center gap-3 mb-1">
              {/* Uses formData here to reflect edits immediately */}
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditing ? "Edit Report Details" : formData.incidentType}
              </h2>
              {!isEditing && (
                <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusStyle(formData.status)}`}>
                  {formData.status}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span className="font-medium">Case ID:</span> {report._id.slice(-6).toUpperCase()}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Form / View Toggle */}
          {isEditing ? (
            /* --- EDIT MODE --- */
            <div className="space-y-5 animate-fadeIn">
              {/* Incident Type Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Incident Type</label>
                <input
                  type="text"
                  name="incidentType"
                  value={formData.incidentType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#5b1b6f] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#5b1b6f] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              {/* Location Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Barangay</label>
                  <input
                    type="text"
                    name="barangayIncident"
                    value={formData.barangayIncident}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#5b1b6f] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#5b1b6f] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* --- VIEW MODE --- */
            <div className="space-y-6">
              
              {/* Description Box */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <TagIcon className="w-4 h-4" /> Description
                </h3>
                {/* Uses formData here */}
                <p className="text-gray-800 leading-relaxed text-sm md:text-base">
                  {formData.description}
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
                    {/* CHANGED: Text size reduced to text-sm/base */}
                    <p className="font-semibold text-gray-800 text-sm md:text-base">{formData.barangayIncident}</p>
                    <p className="text-xs text-gray-500">{formData.city}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3">
                  <div className="bg-[#f3e6f5] p-2 rounded-lg text-[#5b1b6f]">
                    <CalendarDaysIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Date Reported</p>
                    {/* CHANGED: Text size reduced to text-sm/base */}
                    <p className="font-semibold text-gray-800 text-sm md:text-base">{formattedDate}</p>
                  </div>
                </div>
              </div>

              {/* Reporter Info */}
              <div className="pt-4 border-t border-gray-100 mt-2">
                 <p className="text-xs text-gray-500">
                   Reported by <span className="font-medium text-gray-800">{formData.name}</span>
                 </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-gray-50 border-t border-gray-100 flex flex-col-reverse md:flex-row justify-end gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-200 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-lg bg-[#5b1b6f] text-white font-medium hover:bg-[#4a155a] shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <CheckIcon className="w-5 h-5" />
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-lg text-red-600 font-medium border border-red-200 hover:bg-red-50 transition-colors flex items-center justify-center gap-2 group text-sm"
              >
                <TrashIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Delete Case
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2.5 rounded-lg bg-[#5b1b6f] text-white font-medium hover:bg-[#4a155a] shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <PencilSquareIcon className="w-5 h-5" />
                Edit Details
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}