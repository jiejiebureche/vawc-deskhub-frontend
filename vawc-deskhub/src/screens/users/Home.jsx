import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import FileCaseModal from "./FileCaseModal";

// Vite-safe way to reference an asset path
const bgUrl = new URL("/src/assets/banner-bg.jpg", import.meta.url).href;

export default function Home() {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // note: parent has `group` so both sidebar and main respond to the same hover
    <div className="montserrat-font flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* main shifts right when the sidebar expands */}
      <main className="flex-1 relative bg-white overflow-auto ml-20 group-hover:ml-64 transition-all duration-300 ease-in-out">
        {/* top hero section */}
        <header className="relative">
          {/* image + overlay */}
          <div className="relative min-h-[280px] md:min-h-[420px]">
            <img
              src={bgUrl}
              alt="hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* slightly darker overlay so white text reads well */}
            <div className="absolute inset-0 bg-black/35"></div>

            {/* content inside the hero — NOT absolutely centered to avoid clipping */}
            <div className="relative z-10 max-w-4xl px-6 md:px-12 py-10 md:py-16">
              <h1 className="libre-baskerville-regular-italic text-4xl md:text-5xl italic font-light text-white leading-tight">
                Because safety and protection is <br />
                everyone’s right.
              </h1>
              <p className="text-white/90 mt-3 md:mt-4">Together against abuse.</p>

              {/* emergency info box */}
              <div className="mt-6 w-full md:w-[520px] bg-white text-black rounded-lg shadow p-4 text-sm">
                <p className="font-semibold mb-2">
                  In case of emergency, please contact any of the following:
                </p>
                <p>
                  <span className="font-bold">Cellphone:</span> 0919 354 1383 (SMART)
                  / 0915 802 2375 (GLOBE)
                </p>
                <p>
                  <span className="font-bold">Email:</span> makabata1383@cwc.gov.ph
                </p>
                <p>
                  <span className="font-bold">Facebook:</span>{" "}
                  <a
                    className="text-blue-600 underline"
                    href="https://www.facebook.com/@MakabataHelpline/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://www.facebook.com/@MakabataHelpline/
                  </a>
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* File a Case button (triggers modal) */}
        <div className="absolute top-6 right-6 z-20">
          <button 
            onClick={() => setIsModalOpen(true)} // Open the modal
            className="flex items-center gap-2 bg-[#EB5757] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#d44646] transition-colors"
          >
            <PlusCircleIcon className="h-6 w-6" />
            <span>File a Case</span>
          </button>
        </div>

        {/* rest of page content */}
        <section className="pt-6 px-8">
          {/* placeholder for page content */}
          <div className="h-[800px]"></div>
        </section>

        {/* Render the Modal */}
        <FileCaseModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
        />
        
      </main>
    </div>
  );
}