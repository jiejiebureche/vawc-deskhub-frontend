import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminSidebar from "../../components/AdminSidebar";
import { 
  ArrowPathIcon, 
  ChartBarIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  EnvelopeOpenIcon 
} from "@heroicons/react/24/outline";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend 
} from "recharts";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const agentId = user?.safeUser?.id;

  // 1. Fetch Reports
  const {
    data: reports = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reports", agentId],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/reports/agent/${agentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch reports");
      return response.json();
    },
    refetchInterval: 5000,
  });

  // 2. Data Processing (FIXED LOGIC HERE)
  const stats = useMemo(() => {
    if (!reports.length) return null;

    const total = reports.length;
    
    // --- FIX START ---
    // Count specific statuses based on exact string matches
    const resolved = reports.filter(r => r.status === "resolved").length;
    const unopened = reports.filter(r => r.status === "unopened").length;
    
    // Combine "pending" AND "opened" into "In Progress"
    // This catches reports you just clicked ("opened") and ones you explicitly marked "pending"
    const inProgress = reports.filter(r => 
        r.status === "pending" || r.status === "opened"
    ).length;
    // --- FIX END ---

    // Pie Chart Data
    const pieData = [
      { name: "Resolved", value: resolved, color: "#10B981" },
      { name: "In Progress", value: inProgress, color: "#F59E0B" }, // Now uses the corrected count
      { name: "Unopened", value: unopened, color: "#EF4444" },
    ].filter(item => item.value > 0);

    // Bar Chart Data (Last 7 Days)
    const dateMap = reports.reduce((acc, report) => {
      const date = new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const barData = Object.keys(dateMap).map(date => ({
      name: date,
      count: dateMap[date]
    })).slice(-7); 

    return { total, resolved, inProgress, unopened, pieData, barData };
  }, [reports]);

  return (
    <div className="montserrat-font flex h-screen bg-gray-50 overflow-hidden relative">
      
      {/* Sidebar Section */}
      <div className="hidden md:block group relative z-20 flex-shrink-0 bg-[#5b1b6f] transition-all duration-300 ease-in-out w-20 hover:w-64">
        <div className="h-full w-full overflow-hidden">
          <AdminSidebar />
        </div>
      </div>

      <div className="md:hidden">
         <AdminSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden p-4 md:p-8">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">Real-time analytics for {user?.safeUser?.username || "Agent"}</p>
          </div>
          <button 
            onClick={() => refetch()} 
            className="flex items-center gap-2 text-[#5b1b6f] hover:bg-purple-50 px-4 py-2 rounded-lg transition"
          >
            <ArrowPathIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">Refresh Data</span>
          </button>
        </div>

        {/* Loading/Error States */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5b1b6f]"></div>
          </div>
        )}

        {isError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            Error loading dashboard data: {error.message}
          </div>
        )}

        {/* Dashboard Content */}
        {!isLoading && !isError && stats && (
          <div className="space-y-6">
            
            {/* ROW 1: KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard 
                title="Total Cases" 
                value={stats.total} 
                icon={<ChartBarIcon className="w-6 h-6 text-white" />} 
                bg="bg-blue-500" 
              />
              <KpiCard 
                title="Resolved" 
                value={stats.resolved} 
                icon={<CheckCircleIcon className="w-6 h-6 text-white" />} 
                bg="bg-green-500" 
              />
              <KpiCard 
                title="In Progress" 
                value={stats.inProgress} 
                icon={<ClockIcon className="w-6 h-6 text-white" />} 
                bg="bg-orange-400" 
              />
              <KpiCard 
                title="Unopened" 
                value={stats.unopened} 
                icon={<EnvelopeOpenIcon className="w-6 h-6 text-white" />} 
                bg="bg-red-500" 
              />
            </div>

            {/* ROW 2: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
              
              {/* Chart 1: Status Breakdown */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-gray-700 mb-4">Case Status Breakdown</h3>
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {stats.pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Incoming Reports Trend */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-gray-700 mb-4">New Cases (Last 7 Days)</h3>
                <div className="flex-1 min-h-0">
                  {stats.barData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.barData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip cursor={{fill: '#f4f4f5'}} />
                        <Bar dataKey="count" fill="#5b1b6f" radius={[4, 4, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      Not enough data for timeline
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Sub-component
function KpiCard({ title, value, icon, bg }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between transition hover:shadow-md">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
      </div>
      <div className={`h-12 w-12 rounded-full flex items-center justify-center shadow-lg ${bg}`}>
        {icon}
      </div>
    </div>
  );
}