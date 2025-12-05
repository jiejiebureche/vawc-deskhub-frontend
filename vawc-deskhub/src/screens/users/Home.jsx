import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import FileCaseModal from "./FileCaseModal";

const bgUrl = new URL("/src/assets/homepage-banner.jpg", import.meta.url).href;

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    // 1. Use 'flex' on the parent to put Sidebar and Main side-by-side naturally
    <div className="montserrat-font flex h-screen bg-gray-50 overflow-hidden">
      
      {/* 2. Sidebar Wrapper: Handles width, animation, and background color */}
      {/* 'group' is placed here so hover only triggers when touching the sidebar */}
      <div className="group relative z-20 flex-shrink-0 bg-[#5b1b6f] transition-all duration-300 ease-in-out w-20 hover:w-64">
        <div className="h-full w-full overflow-hidden">
             <Sidebar />
        </div>
      </div>

      {/* 3. Main Content: 'flex-1' makes it fill remaining space. No left margins needed. */}
      <main className="flex-1 relative bg-white overflow-y-auto overflow-x-hidden">
        
        <header className="relative">
          <div className="relative min-h-[350px] md:min-h-[420px]">
            <img
              src={bgUrl}
              alt="hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 max-w-4xl px-6 py-12 md:px-12 md:py-16">
              <h1 className="libre-baskerville-regular-italic text-3xl md:text-5xl italic font-light text-white leading-tight">
                Because safety and protection is <br className="hidden md:block" />
                everyone’s right.
              </h1>
              <p className="text-white/90 mt-4 text-base md:text-lg">Together against abuse.</p>

              <div className="mt-8 w-full md:w-[520px] bg-white text-black rounded-lg shadow-lg p-5 text-sm md:text-base">
                <p className="font-semibold mb-3">
                  In case of emergency, please contact:
                </p>
                <div className="space-y-1">
                  <p>
                    <span className="font-bold">Mobile:</span> 0919 354 1383 (SMART) / 0915 802 2375 (GLOBE)
                  </p>
                  <p className="break-all">
                    <span className="font-bold">Email:</span> makabata1383@cwc.gov.ph
                  </p>
                  <p className="break-all">
                    <span className="font-bold">Facebook:</span>{" "}
                    <a
                      className="text-blue-600 underline"
                      href="https://www.facebook.com/@MakabataHelpline/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      @MakabataHelpline
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Floating Button */}
        <div className="fixed bottom-6 right-6 z-30 md:absolute md:top-6 md:right-6 md:bottom-auto">
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center gap-2 bg-[#EB5757] text-white px-5 py-3 md:px-4 md:py-2 rounded-full md:rounded-md shadow-xl hover:bg-[#d44646] transition-transform active:scale-95"
          >
            <PlusCircleIcon className="h-6 w-6" />
            <span className="font-semibold">File a Case</span>
          </button>
        </div>

        <section className="pt-8 px-6 md:px-8">
          <div className="h-[800px]"></div>
        </section>

        <FileCaseModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
        />
        
      </main>
    </div>
  );
}