import { ArrowLeft, Wallet, PieChart, Users, ArrowRightLeft } from "lucide-react";
import { ItineraryItemData } from "./Itinerary";

interface ExpenseViewProps {
  items: ItineraryItemData[];
  members: string[];
  onBack: () => void;
  currency?: string;
}

export function ExpenseView({ items, members, onBack, currency = "TWD" }: ExpenseViewProps) {
  // Filter items that have a cost
  const expenseItems = items.filter(item => (item.cost || 0) > 0);
  const totalExpense = expenseItems.reduce((sum, item) => sum + (item.cost || 0), 0);

  // Calculate Balances
  const balances: Record<string, number> = {};
  const paidTotals: Record<string, number> = {};
  const shareTotals: Record<string, number> = {};

  // Initialize
  members.forEach(m => {
    balances[m] = 0;
    paidTotals[m] = 0;
    shareTotals[m] = 0;
  });

  expenseItems.forEach(item => {
    const amount = item.cost || 0;
    const payer = item.payer || members[0]; // Default to first member if undefined
    const splitters = item.splitBy && item.splitBy.length > 0 ? item.splitBy : members; // Default to all if undefined

    // Credit the payer
    if (paidTotals[payer] !== undefined) {
        paidTotals[payer] += amount;
        balances[payer] += amount;
    }

    // Debit the splitters
    const amountPerPerson = amount / splitters.length;
    splitters.forEach(person => {
        if (shareTotals[person] !== undefined) {
            shareTotals[person] += amountPerPerson;
            balances[person] -= amountPerPerson;
        }
    });
  });

  // Calculate Settlements
  // Positive balance = To be received
  // Negative balance = To pay
  const settlements: { from: string; to: string; amount: number }[] = [];
  
  // Simple algorithm to settle debts
  let debtors = members.filter(m => balances[m] < -1).map(m => ({ name: m, amount: balances[m] })); // < -1 to ignore floating point dust
  let creditors = members.filter(m => balances[m] > 1).map(m => ({ name: m, amount: balances[m] }));

  debtors.sort((a, b) => a.amount - b.amount); // Ascending (most negative first)
  creditors.sort((a, b) => b.amount - a.amount); // Descending (most positive first)

  let i = 0; // debtor index
  let j = 0; // creditor index

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    
    const amountToSettle = Math.min(Math.abs(debtor.amount), creditor.amount);
    
    settlements.push({
      from: debtor.name,
      to: creditor.name,
      amount: amountToSettle
    });

    debtor.amount += amountToSettle;
    creditor.amount -= amountToSettle;

    if (Math.abs(debtor.amount) < 1) i++;
    if (creditor.amount < 1) j++;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-4 py-3 flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">開銷與分帳</h1>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Total Summary */}
        <div className="bg-black text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <PieChart size={120} />
          </div>
          <p className="text-gray-400 text-sm mb-1">總開銷金額</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{totalExpense.toLocaleString()}</span>
            <span className="text-lg opacity-60">{currency}</span>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {members.map(m => (
                <div key={m} className="bg-white/10 px-3 py-1.5 rounded-lg shrink-0 backdrop-blur-sm">
                    <p className="text-xs text-gray-400 mb-0.5">{m} 已付</p>
                    <p className="font-bold">{paidTotals[m].toLocaleString()}</p>
                </div>
            ))}
          </div>
        </div>

        {/* Expense List */}
        <div className="space-y-3">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Wallet size={18} /> 詳細支出紀錄
            </h3>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                {expenseItems.map((item) => (
                    <div key={item.id} className="p-4 flex justify-between items-center">
                        <div className="min-w-0 flex-1 mr-4">
                            <h4 className="font-bold text-sm text-gray-900 truncate">{item.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                                <span className="font-medium text-gray-700">{item.payer || "未知"}</span> 先付
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                                分攤: {item.splitBy && item.splitBy.length > 0 ? item.splitBy.join(", ") : "全員"}
                            </p>
                        </div>
                        <div className="text-right">
                             <span className="block font-bold text-gray-900">
                                {item.cost?.toLocaleString()}
                             </span>
                             <span className="text-xs text-gray-400">{item.currency || currency}</span>
                        </div>
                    </div>
                ))}
                {expenseItems.length === 0 && (
                    <div className="p-8 text-center text-gray-400 text-sm">
                        尚未有支出紀錄
                    </div>
                )}
            </div>
        </div>

        {/* Settlement Plan */}
        <div className="space-y-3">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <ArrowRightLeft size={18} /> 建議分帳方案
            </h3>
            {settlements.length > 0 ? (
                <div className="space-y-2">
                    {settlements.map((s, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-600">
                                    {s.from[0]}
                                </div>
                                <div className="text-xs text-gray-400">
                                    <ArrowRightLeft size={14} />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-600">
                                    {s.to[0]}
                                </div>
                            </div>
                            <div className="flex-1 px-3">
                                <span className="font-bold text-gray-900">{s.from}</span>
                                <span className="text-gray-500 text-sm mx-1">支付給</span>
                                <span className="font-bold text-gray-900">{s.to}</span>
                            </div>
                            <div className="font-bold text-indigo-600">
                                {Math.round(s.amount).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-emerald-800 text-sm text-center">
                    目前帳務已平衡，無需分帳！
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
