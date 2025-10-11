import Sidebar from "../../components/Sidebar";

export default function Settings() {
  return (
    <>
      <div className="montserrat-font flex min-h-screen">
        <Sidebar />

        <main className="flex-1 relative bg-white overflow-auto">
          <div className="reports">
            this is the settings page
          </div>
        </main>
      </div>
    </>
  );
}
