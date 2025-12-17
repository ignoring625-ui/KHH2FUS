import { TrendingUp, CheckCircle2, AlertCircle, Wallet } from "lucide-react";

interface DashboardProps {
  totalExpenses?: number;
  currency?: string;
  totalBudget?: number;
  tripDays?: number;
  currentDay?: number;
}

export function Dashboard({ 
  totalExpenses = 0, 
  currency = "TWD",
  totalBudget = 50000,
  tripDays = 5,
  currentDay = 1
}: DashboardProps) {
  
  const remainingBudget = totalBudget - totalExpenses;
  const progressPercent = Math.min(100, Math.max(0, (totalExpenses / totalBudget) * 100));

  return (
    <div className="space-y-4 px-4 pb-24">
      <h2 className="text-xl font-bold text-gray-900">儀表板</h2>
      <div className="grid grid-cols-2 gap-3">
        {/* Total Spend */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-1 relative overflow-hidden">
          <div className="absolute right-2 top-2 opacity-10">
             <Wallet size={48} />
          </div>
          <span className="text-xs text-gray-500">行程總開銷</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-900">{totalExpenses.toLocaleString()}</span>
            <span className="text-xs text-gray-400">{currency}</span>
          </div>
        </div>

        {/* Budget Status */}
        <div className={`p-4 rounded-2xl border shadow-sm flex flex-col gap-1 ${remainingBudget < 0 ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
          <span className={`text-xs ${remainingBudget < 0 ? 'text-red-500' : 'text-emerald-500'}`}>剩餘預算</span>
          <span className={`text-xl font-bold ${remainingBudget < 0 ? 'text-red-900' : 'text-emerald-900'}`}>
            {remainingBudget.toLocaleString()}
          </span>
          <div className="w-full bg-black/10 h-1 mt-2 rounded-full overflow-hidden">
             <div className={`h-full ${remainingBudget < 0 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Trip Progress */}
        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 shadow-sm flex flex-col gap-1">
          <span className="text-xs text-indigo-500">旅行進度</span>
          <span className="text-xl font-bold text-indigo-900">Day {currentDay}</span>
          <span className="text-xs text-indigo-600 flex items-center gap-1">
            共 {tripDays} 天 <span className="text-yellow-500">✈️</span>
          </span>
        </div>

        {/* Todo - Mocked for now */}
        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 shadow-sm flex flex-col gap-1">
          <span className="text-xs text-orange-500">待辦事項</span>
          <span className="text-xl font-bold text-orange-900">4</span>
          <span className="text-xs text-orange-600 flex items-center gap-1">
            <AlertCircle size={10} /> 2 項即將截止
          </span>
        </div>
      </div>
    </div>
  );
}
