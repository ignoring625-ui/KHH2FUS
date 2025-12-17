import { useState } from "react";
import { ArrowLeft, Wallet, User, ArrowRight, PieChart, Receipt, Plus, Trash2, Edit, Save, X, Calendar, CheckSquare, Square, ChevronDown } from "lucide-react";
import { ItineraryItemData } from "./Itinerary";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "./ui/utils";

interface ExpenseSplitterProps {
  items: ItineraryItemData[];
  onBack: () => void;
  members: string[];
  onUpdate?: (item: ItineraryItemData) => void;
  onAdd?: (item: ItineraryItemData) => void;
  onDelete?: (id: string) => void;
  rates?: Record<string, number>;
}

export function ExpenseSplitter({ items, onBack, members, onUpdate, onAdd, onDelete, rates = { TWD: 1 } }: ExpenseSplitterProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'settlement'>('settlement');
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<ItineraryItemData | null>(null);
  const [newItem, setNewItem] = useState<Partial<ItineraryItemData>>({});

  // Filter items that have a cost > 0
  const expenseItems = items.filter(item => (item.cost || 0) > 0);
  
  // Calculate total cost in TWD
  const totalCostTWD = expenseItems.reduce((sum, item) => {
    const cost = item.cost || 0;
    const currency = item.currency || "TWD";
    const rate = rates[currency] || 1;
    return sum + (cost * rate);
  }, 0);

  // Calculate Debts (Converted to TWD)
  const calculateSettlements = () => {
    const balances: Record<string, number> = {};
    
    // Initialize balances
    members.forEach(m => balances[m] = 0);

    expenseItems.forEach(item => {
      const originalCost = item.cost || 0;
      const currency = item.currency || "TWD";
      const rate = rates[currency] || 1;
      
      // Convert to TWD for settlement
      const cost = originalCost * rate;

      const payer = item.payer || members[0]; // Default to first member if undefined
      const splitters = item.splitters && item.splitters.length > 0 ? item.splitters : members; // Default to all if undefined

      // Payer paid the full amount (+)
      balances[payer] = (balances[payer] || 0) + cost;

      // Splitters owe their share (-)
      const share = cost / splitters.length;
      splitters.forEach(person => {
        balances[person] = (balances[person] || 0) - share;
      });
    });

    // Determine who owes whom
    const debtors: { name: string; amount: number }[] = [];
    const creditors: { name: string; amount: number }[] = [];

    Object.entries(balances).forEach(([name, amount]) => {
      if (amount < -1) debtors.push({ name, amount }); // Using -1 to avoid float rounding noise
      if (amount > 1) creditors.push({ name, amount });
    });

    debtors.sort((a, b) => a.amount - b.amount); // Ascending (most negative first)
    creditors.sort((a, b) => b.amount - a.amount); // Descending (most positive first)

    const settlements: { from: string; to: string; amount: number }[] = [];
    
    let i = 0; // debtor index
    let j = 0; // creditor index

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];

      // The amount to settle is the minimum of what debtor owes and creditor is owed
      const amount = Math.min(Math.abs(debtor.amount), creditor.amount);

      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: Math.round(amount)
      });

      // Update remaining amounts
      debtor.amount += amount;
      creditor.amount -= amount;

      // Move indices if settled
      if (Math.abs(debtor.amount) < 1) i++;
      if (creditor.amount < 1) j++;
    }

    return settlements;
  };

  const settlements = calculateSettlements();

  const handleCreate = () => {
    if (onAdd) {
      const item: ItineraryItemData = {
        id: Math.random().toString(36).substr(2, 9),
        title: newItem.title || "新支出",
        cost: Number(newItem.cost) || 0,
        currency: newItem.currency || "TWD",
        date: newItem.date || new Date().toISOString().split('T')[0],
        time: "12:00", // Default time
        payer: newItem.payer || members[0],
        splitters: newItem.splitters && newItem.splitters.length > 0 ? newItem.splitters : members,
        isCurrent: false,
      };
      onAdd(item);
      setIsAdding(false);
      setNewItem({});
    }
  };

  const handleSaveEdit = () => {
    if (editingItem && onUpdate) {
      onUpdate(editingItem);
      setEditingItem(null);
    }
  };

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
      setEditingItem(null);
    }
  };

  const toggleSplitter = (person: string, item: Partial<ItineraryItemData>, setItem: (i: any) => void) => {
    const currentSplitters = item.splitters || members;
    const isSelected = currentSplitters.includes(person);
    let newSplitters;

    if (isSelected) {
      newSplitters = currentSplitters.filter(p => p !== person);
    } else {
      newSplitters = [...currentSplitters, person];
    }
    
    setItem({ ...item, splitters: newSplitters });
  };

  const renderForm = (item: Partial<ItineraryItemData>, setItem: (i: any) => void, isNew: boolean) => {
    const currentCurrency = item.currency || "TWD";
    const currentCost = item.cost || 0;
    const rate = rates[currentCurrency] || 1;
    const estimatedTWD = Math.round(currentCost * rate);

    return (
      <div className="space-y-5 p-1">
          <div className="space-y-1">
              <Label>項目名稱</Label>
              <Input 
                placeholder="例如: 晚餐、計程車費" 
                value={item.title || ""} 
                onChange={e => setItem({...item, title: e.target.value})}
              />
          </div>

          <div className="grid grid-cols-[2fr_1fr] gap-3">
              <div className="space-y-1">
                  <Label>金額</Label>
                  <div className="relative">
                     <Input 
                       type="number"
                       placeholder="0" 
                       value={item.cost || ""} 
                       onChange={e => setItem({...item, cost: Number(e.target.value)})}
                       className="pl-8"
                     />
                     <span className="absolute left-3 top-2.5 text-gray-400 text-sm">$</span>
                  </div>
                  {currentCurrency !== "TWD" && (
                     <p className="text-xs text-gray-400 mt-1">
                        ≈ {estimatedTWD.toLocaleString()} TWD
                     </p>
                  )}
              </div>
              <div className="space-y-1">
                  <Label>幣別</Label>
                  <div className="relative">
                    <select
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                      value={currentCurrency}
                      onChange={(e) => setItem({...item, currency: e.target.value})}
                    >
                      {Object.keys(rates).map(cur => (
                        <option key={cur} value={cur}>{cur}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-3 opacity-50 pointer-events-none" />
                  </div>
              </div>
          </div>

          <div className="space-y-1">
              <Label>日期</Label>
              <div className="relative">
                <Input 
                  type="date"
                  value={item.date || ""} 
                  onChange={e => setItem({...item, date: e.target.value})}
                  className="pl-9"
                />
                <Calendar className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
          </div>

          <div className="space-y-1">
              <Label>誰先付款?</Label>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
                {members.map(member => (
                  <button
                    key={member}
                    type="button"
                    onClick={() => setItem({...item, payer: member})}
                    className={cn(
                      "flex flex-col items-center gap-1 min-w-[60px] p-2 rounded-xl border transition-all",
                      item.payer === member || (!item.payer && member === members[0])
                        ? "bg-black text-white border-black" 
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs border border-white/20">
                      {member[0]}
                    </div>
                    <span className="text-xs font-medium truncate w-full text-center">{member}</span>
                  </button>
                ))}
              </div>
          </div>

          <div className="space-y-2">
              <div className="flex justify-between items-center">
                  <Label>分攤對象</Label>
                  <button 
                    type="button"
                    onClick={() => setItem({...item, splitters: members})}
                    className="text-xs text-blue-600 font-medium"
                  >
                    全選
                  </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                  {members.map(member => {
                      const isSelected = (item.splitters || members).includes(member);
                      return (
                          <button
                            key={member}
                            type="button"
                            onClick={() => toggleSplitter(member, item, setItem)}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                                isSelected ? "bg-indigo-50 border-indigo-200" : "bg-white border-gray-100"
                            )}
                          >
                              <div className={cn(
                                  "w-5 h-5 rounded-md flex items-center justify-center border",
                                  isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-gray-300"
                              )}>
                                  {isSelected && <CheckSquare size={14} />}
                              </div>
                              <span className={cn("text-sm font-medium", isSelected ? "text-indigo-900" : "text-gray-500")}>
                                  {member}
                              </span>
                          </button>
                      );
                  })}
              </div>
          </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
            >
            <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">收支分帳</h1>
        </div>

        {activeTab === 'list' && (
             <Drawer open={isAdding} onOpenChange={setIsAdding}>
              <DrawerTrigger asChild>
                <button className="bg-black text-white p-2 rounded-full shadow-md active:scale-95 transition-transform">
                  <Plus size={20} />
                </button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[95vh]">
                <div className="mx-auto w-full max-w-md p-4 flex flex-col h-[80vh]">
                    <DrawerHeader className="px-0">
                        <DrawerTitle>新增支出</DrawerTitle>
                        <DrawerDescription>紀錄一筆新的團體開銷</DrawerDescription>
                    </DrawerHeader>
                    
                    <div className="flex-1 overflow-y-auto -mx-2 px-2">
                        {renderForm(newItem, setNewItem, true)}
                    </div>
                    
                    <DrawerFooter className="px-0 pt-4">
                        <Button onClick={handleCreate} className="w-full rounded-xl h-12">新增</Button>
                        <DrawerClose asChild>
                            <Button variant="outline" className="w-full rounded-xl">取消</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
        )}
      </div>

      {/* Summary Card */}
      <div className="p-4">
        <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl shadow-gray-200">
          <p className="text-gray-400 text-sm mb-1">總開銷</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-bold">${Math.round(totalCostTWD).toLocaleString()}</h2>
            <span className="text-gray-400">TWD</span>
          </div>
          <div className="mt-6 flex gap-2">
            <button 
              onClick={() => setActiveTab('settlement')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'settlement' ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              <PieChart size={16} className="inline mr-2" />
              結算方案
            </button>
            <button 
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'list' ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              <Receipt size={16} className="inline mr-2" />
              開銷明細
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-4">
        {activeTab === 'settlement' ? (
          <div className="space-y-4 animate-in fade-in duration-500">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Wallet size={18} className="text-indigo-600" />
              建議分帳方式 (TWD)
            </h3>
            
            {settlements.length > 0 ? (
              <div className="space-y-3">
                {settlements.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-sm">
                        {item.from[0]}
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-400 mb-1">支付給</span>
                        <ArrowRight size={16} className="text-gray-300" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-sm">
                        {item.to[0]}
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="font-bold text-lg text-gray-900">${item.amount.toLocaleString()}</p>
                       <p className="text-xs text-gray-500">{item.from} <span className="text-gray-300">→</span> {item.to}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400">目前沒有需要結算的款項 🎉</p>
              </div>
            )}

            <div className="mt-8 bg-blue-50 p-4 rounded-xl text-xs text-blue-700 leading-relaxed">
              💡 系統已將所有外幣消費自動依據匯率轉換為 TWD 計算。
            </div>
          </div>
        ) : (
          <div className="space-y-3 animate-in fade-in duration-500">
            {expenseItems.map((item) => {
              const rate = rates[item.currency || "TWD"] || 1;
              const costInTWD = Math.round((item.cost || 0) * rate);
              
              return (
                <Drawer key={item.id} onClose={() => setEditingItem(null)}>
                    <DrawerTrigger asChild>
                      <div onClick={() => setEditingItem(item)} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer active:scale-[0.99] transition-transform">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                            <div className="text-right">
                               <span className="font-mono font-bold text-gray-900 text-lg block">
                                  ${(item.cost || 0).toLocaleString()} <span className="text-xs text-gray-500">{item.currency}</span>
                               </span>
                               {item.currency !== "TWD" && (
                                 <span className="text-xs text-gray-400">
                                   ≈ ${costInTWD.toLocaleString()} TWD
                                 </span>
                               )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 text-xs mb-3">
                          <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                              📅 {item.date}
                          </span>
                          <span className="bg-indigo-50 px-2 py-1 rounded-md text-indigo-600 flex items-center gap-1">
                              <User size={10} /> 付款: {item.payer || "未指定"}
                          </span>
                          </div>

                          <div className="border-t border-gray-50 pt-2 flex items-center gap-2 overflow-x-auto">
                          <span className="text-xs text-gray-400 shrink-0">分攤成員:</span>
                          {(item.splitters || members).map((person, idx) => (
                              <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full border border-gray-100 whitespace-nowrap">
                              {person}
                              </span>
                          ))}
                          </div>
                      </div>
                    </DrawerTrigger>

                    <DrawerContent className="max-h-[95vh]">
                      <div className="mx-auto w-full max-w-md overflow-hidden flex flex-col h-[85vh]">
                          {editingItem && editingItem.id === item.id && (
                              <>
                                  <DrawerHeader className="text-left pb-0">
                                      <DrawerTitle>編輯支出</DrawerTitle>
                                      <DrawerDescription className="sr-only">修改支出詳細資訊</DrawerDescription>
                                  </DrawerHeader>
                                  <div className="p-4 overflow-y-auto flex-1">
                                      {renderForm(editingItem, setEditingItem, false)}
                                  </div>
                                  <DrawerFooter className="pt-4 space-y-2">
                                      <div className="flex gap-3">
                                          <Button onClick={handleSaveEdit} className="flex-1 rounded-xl h-12">
                                              <Save size={16} className="mr-2" /> 儲存
                                          </Button>
                                      </div>
                                      <Button variant="destructive" onClick={() => handleDelete(item.id)} className="w-full rounded-xl h-12 bg-red-50 text-red-600 hover:bg-red-100">
                                          <Trash2 size={16} className="mr-2" /> 刪除此筆支出
                                      </Button>
                                      <DrawerClose asChild>
                                          <Button variant="ghost" className="w-full rounded-xl">取消</Button>
                                      </DrawerClose>
                                  </DrawerFooter>
                              </>
                          )}
                      </div>
                    </DrawerContent>
                </Drawer>
              );
            })}
            
            {expenseItems.length === 0 && (
               <div className="text-center py-10">
                <p className="text-gray-400">目前沒有任何開銷紀錄</p>
                <p className="text-xs text-gray-300 mt-1">點擊右上角 + 新增第一筆</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
