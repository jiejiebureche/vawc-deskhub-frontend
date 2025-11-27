import React, { useState, useContext } from "react";
import { 
  XMarkIcon, 
  PaperClipIcon, 
  ChevronDownIcon, 
  ArrowLeftIcon 
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function FileCaseModal({ isOpen, onClose }) {
  const { user } = useContext(AuthContext);
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    description: "",
    barangayComplainant: "",
    barangayIncident: "",
    reporterType: "victim",
    incidentType: "Physical Abuse",
    location: "",
  });

  const [evidenceFiles, setEvidenceFiles] = useState([]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setEvidenceFiles(files);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setError("");

    const requiredFields = [
      "name",
      "city",
      "description",
      "barangayComplainant",
      "barangayIncident",
    ];

    const emptyField = requiredFields.find((field) => !formData[field]);
    if (emptyField) {
      setError(`Please fill out the ${emptyField} field.`);
      return;
    }

    if (!user?.safeUser?.id) {
      setError("You must be logged in to file a case.");
      return;
    }

    setStep(2);
  };

  const handleConfirmSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      const evidence = evidenceFiles.map((file) => ({
        fileType: file.type.startsWith("video") ? "video" : "image",
        url: URL.createObjectURL(file), 
      }));

      const payload = {
        ...formData,
        reporterId: user.safeUser.id,
        evidence: evidence,
      };

      const response = await fetch(`${API_URL}/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to submit case");
      }

      setSuccess("Case filed successfully!");
      
      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSuccess("");
      setError("");
      setFormData({
        name: "",
        city: "",
        description: "",
        barangayComplainant: "",
        barangayIncident: "",
        reporterType: "victim",
        incidentType: "Physical Abuse",
        location: "",
      });
      setEvidenceFiles([]);
    }, 300);
  };

  const inputClass = "w-full border border-gray-400 rounded-lg p-2.5 focus:ring-2 focus:ring-[#5b1b6f] focus:border-[#5b1b6f] outline-none transition-all bg-white text-gray-900 placeholder-gray-400";
  
  const selectClass = "w-full border border-gray-400 rounded-lg p-2.5 bg-white text-gray-900 outline-none appearance-none pr-10 focus:ring-2 focus:ring-[#5b1b6f] focus:border-[#5b1b6f] cursor-pointer transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      ></div>

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn flex flex-col">
        
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {step === 1 ? "File a Case" : "Review Report"}
            </h2>
            <p className="text-sm text-gray-500">
              {step === 1 
                ? "Please provide accurate details of the incident." 
                : "Please review the details before submitting."}
            </p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-100">{error}</div>}
          {success && <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm mb-4 border border-green-100">{success}</div>}

          {step === 1 && (
            <form id="caseForm" onSubmit={handleNext} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Juan Dela Cruz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">I am a...</label>
                  <div className="relative">
                    <select
                      name="reporterType"
                      value={formData.reporterType}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option className="bg-purple-50 text-purple-900" value="victim">Victim</option>
                      <option className="bg-purple-50 text-purple-900" value="witness">Witness</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-3 h-5 w-5 text-gray-600 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Incident Type</label>
                    <div className="relative">
                      <select
                          name="incidentType"
                          value={formData.incidentType}
                          onChange={handleChange}
                          className={selectClass}
                      >
                          <option className="bg-purple-50 text-purple-900" value="Physical Abuse">Physical Abuse</option>
                          <option className="bg-purple-50 text-purple-900" value="Verbal Abuse">Verbal Abuse</option>
                          <option className="bg-purple-50 text-purple-900" value="Sexual Harassment">Sexual Harassment</option>
                          <option className="bg-purple-50 text-purple-900" value="Child Abuse">Child Abuse</option>
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-3 h-5 w-5 text-gray-600 pointer-events-none" />
                    </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Specific Location <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Near the school gate"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Brgy. (Complainant)</label>
                    <input
                        type="text"
                        name="barangayComplainant"
                        value={formData.barangayComplainant}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Brgy. (Incident)</label>
                    <input
                        type="text"
                        name="barangayIncident"
                        value={formData.barangayIncident}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description of Incident</label>
                <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Please describe what happened..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Evidence (Images/Videos)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-purple-50 hover:border-purple-300 transition-colors relative cursor-pointer group">
                    <PaperClipIcon className="h-8 w-8 mb-2 group-hover:text-[#5b1b6f] transition-colors" />
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <p className="text-sm group-hover:text-[#5b1b6f]">Click to upload files</p>
                    {evidenceFiles.length > 0 && (
                       <p className="text-xs mt-2 text-[#5b1b6f] font-bold bg-white px-2 py-1 rounded shadow-sm">{evidenceFiles.length} files selected</p>
                    )}
                </div>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gray-50 p-6 rounded-lg space-y-4 border border-gray-200">
                <h3 className="font-bold text-gray-900 border-b pb-2 text-lg">Incident Details</h3>
                
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div className="text-gray-500 font-medium">Full Name:</div>
                  <div className="font-semibold text-gray-900">{formData.name}</div>

                  <div className="text-gray-500 font-medium">Role:</div>
                  <div className="font-semibold text-gray-900 capitalize">{formData.reporterType}</div>

                  <div className="text-gray-500 font-medium">Incident:</div>
                  <div className="font-semibold text-gray-900">{formData.incidentType}</div>

                  <div className="text-gray-500 font-medium">Location:</div>
                  <div className="font-semibold text-gray-900">{formData.location || "N/A"}</div>

                  <div className="text-gray-500 font-medium">City:</div>
                  <div className="font-semibold text-gray-900">{formData.city}</div>

                  <div className="text-gray-500 font-medium">Brgy (Comp):</div>
                  <div className="font-semibold text-gray-900">{formData.barangayComplainant}</div>

                  <div className="text-gray-500 font-medium">Brgy (Inc):</div>
                  <div className="font-semibold text-gray-900">{formData.barangayIncident}</div>
                </div>

                <div className="pt-2">
                  <div className="text-gray-500 font-medium text-sm mb-1">Description:</div>
                  <div className="bg-white p-3 rounded border border-gray-200 text-sm text-gray-800 whitespace-pre-wrap">
                    {formData.description}
                  </div>
                </div>

                <div className="pt-2">
                   <div className="text-gray-500 font-medium text-sm mb-1">Evidence Files:</div>
                   {evidenceFiles.length > 0 ? (
                     <ul className="list-disc list-inside text-sm font-semibold text-[#5b1b6f]">
                       {evidenceFiles.map((f, i) => <li key={i}>{f.name}</li>)}
                     </ul>
                   ) : (
                     <span className="text-sm text-gray-400 italic">No files uploaded</span>
                   )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t mt-auto bg-gray-50 rounded-b-xl">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-lg text-gray-700 hover:bg-gray-200 font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="caseForm"
                className="px-6 py-2.5 rounded-lg bg-[#EB5757] text-white font-bold hover:bg-[#c93f3f] transition shadow-md active:scale-95 transform"
              >
                Next Step
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-2.5 rounded-lg text-gray-700 hover:bg-gray-200 font-semibold transition flex items-center gap-2"
                disabled={isLoading}
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-2" /> Back
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                disabled={isLoading}
                className="px-6 py-2.5 rounded-lg bg-[#5b1b6f] text-white font-bold hover:bg-[#4a155a] transition shadow-md active:scale-95 transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Confirm & Send"}
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}