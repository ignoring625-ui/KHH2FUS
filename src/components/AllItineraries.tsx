import { useState, useMemo } from "react";
import { ArrowLeft, Clock, MapPin, Plus, Camera, Wallet, Check, Trash2, Edit2, Calendar as CalendarIcon } from "lucide-react";
import { ItineraryItemData } from "./Itinerary";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface AllItinerariesProps {
  items: ItineraryItemData[];
  onBack: () => void;
  onUpdate: (item: ItineraryItemData) => void;
  onAdd: (item: ItineraryItemData) => void;
  onDelete: (id: string) => void;
  members: string[];
}

export function AllItineraries({ items, onBack, onUpdate, onAdd, onDelete, members }: AllItinerariesProps) {
  const [editingItem, setEditingItem] = useState<ItineraryItemData | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ItineraryItemData>>({});

  // 將行程按日期分組並排序
  const groupedItems = useMemo(() => {
    const groups: Record<string, ItineraryItemData[]> = {};
    
    // 先依據日期和時間排序
    const sortedItems = [...items].sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });

    sortedItems.forEach(item => {
      if (!groups[item.date]) groups[item.date] = [];
      groups[item.date].push(item);
    });
    
    return groups;
  }, [items]);

  // 圖片與分攤邏輯 (與先前一致)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, mode: 'add' | 'edit') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (mode === 'add') setNewItem({ ...newItem, image: base64String });
        else if (editingItem) setEditingItem({ ...editingItem, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSplitter = (person: string, isEditing: boolean) => {
    if (isEditing && editingItem) {
      const current = editingItem.splitters || [];
      const updated = current.includes(person) ? current.filter(p => p !== person) : [...current, person];
      setEditingItem({ ...editingItem, splitters: updated });
    } else if (!isEditing) {
      const current = newItem.splitters || members;
      const updated = current.includes(person) ? current.filter(p => p !== person) : [...current, person];
      setNewItem({ ...newItem, splitters: updated });
    }
  };

  // 全螢幕表單渲染
  const renderForm = (data: Partial<ItineraryItemData>, setData: any, onSave: () => void, onCancel: () => void, title: string) => (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in slide-in-from-bottom duration-300">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
        <button onClick={onCancel} className="p-2 -ml-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} /></button>
        <h3 className="font-bold text-lg">{title}</h3>
        <button onClick={onSave} className="text-blue-600 font-bold px-2 active:opacity-50">儲存</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {/* 封面圖 */}
        <div className="relative w-full h-48 bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2">
          {data.image ? <img src={data.image} className="w-full h-full object-cover" /> : <><Camera className="text-gray-400" size={24} /><span className="text-xs text-gray-400 font-medium">上傳封面照片</span></>}
          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageChange(e, title.includes('新增') ? 'add' : 'edit')} />
        </div>

        <div className="space-y-4">
          <div className="space-y-1"><Label className="text-gray-500 text-xs">行程標題</Label><Input className="h-12 bg-gray-50 border-none rounded-xl" value={data.title || ""} onChange={e => setData({...data, title: e.target.value})} placeholder="例如：海雲台沙灘" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><Label className="text-gray-500 text-xs">日期</Label><Input className="h-12 bg-gray-50 border-none rounded-xl" type="date" value={data.date || ""} onChange={e => setData({...data, date: e.target.value})} /></div>
            <div className="space-y-1"><Label className="text-gray-500 text-xs">時間</Label><Input className="h-12 bg-gray-50 border-none rounded-xl" value={data.time || ""} onChange={e => setData({...data, time: e.target.value})} placeholder="14:00" /></div>
          </div>
          <div className="space-y-1"><Label className="text-gray-500 text-xs">地點</Label><Input className="h-12 bg-gray-50 border-none rounded-xl" value={data.location || ""} onChange={e => setData({...data, location: e.target.value})} placeholder="輸入詳細地址" /></div>
        </div>

        {/* 費用區塊 */}
        <div className="bg-gray-50 p-4 rounded-2xl space-y-4 border border-gray-100">
          <h4 className="text-sm font-bold flex items-center gap-2"><Wallet size={16} /> 費用分攤</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><Label className="text-gray-500 text-xs">金額</Label><Input className="h-12 border-gray-200 rounded-xl" type="number" value={data.cost || ""} onChange={e => setData({...data, cost: Number(e.target.value)})} placeholder="0" /></div>
            <div className="space-y-1"><Label className="text-gray-500 text-xs">幣別</Label><Input className="h-12 border-gray-200 rounded-xl" value={data.currency || "TWD"} onChange={e => setData({...data, currency: e.target.value})} /></div>
          </div>
          <div className="space-y-1">
            <Label className="text-gray-500 text-xs">付款人</Label>
            <select className="w-full h-12 rounded-xl border border-gray-200 bg-white px-3 text-sm" value={data.payer || members[0]} onChange={e => setData({...data, payer: e.target.value})}>
              {members.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-500 text-xs">分攤成員</Label>
            <div className="flex flex-wrap gap-2">
              {members.map(person => {
                const isSelected = (data.splitters || members).includes(person);
                return (
                  <button key={person} onClick={() => toggleSplitter(person, title.includes('編輯'))} className={`px-3 py-2 rounded-full text-xs font-medium border transition-all ${isSelected ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200'}`}>
                    {person}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-1"><Label className="text-gray-500 text-xs">備註</Label><Textarea className="min-h-[100px] bg-gray-50 border-none rounded-xl" value={data.notes || ""} onChange={e => setData({...data, notes: e.target.value})} placeholder="筆記一下..." /></div>

        {title.includes('編輯') && (
          <div className="pt-6">
            <button 
              onClick={() => { if(window.confirm("確定刪除此行程？")) { onDelete(data.id!); setEditingItem(null); } }} 
              className="w-full py-4 rounded-2xl bg-red-50 text-red-600 font-bold text-sm border border-red-100 flex items-center justify-center gap-2 active:bg-red-100"
            >
              <Trash2 size={16} /> 刪除此行程
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* 頁面標題列 */}
      <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={24} /></button>
          <h2 className="text-xl font-bold tracking-tight">所有行程</h2>
        </div>
        <button onClick={() => setIsAdding(true)} className="bg-black text-white p-2.5 rounded-full active:scale-90 transition-transform shadow-lg shadow-gray-200"><Plus size={20} /></button>
      </div>

      {/* 分類清單區 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-8 pb-24 bg-gray-50/30">
        {Object.keys(groupedItems).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-2">
            <CalendarIcon size={48} strokeWidth={1} />
            <p className="text-sm font-medium">目前尚無行程安排</p>
          </div>
        ) : (
          Object.entries(groupedItems).map(([date, dayItems]) => (
            <div key={date} className="space-y-3">
              {/* 日期標籤 */}
              <div className="flex items-center gap-2 px-1">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <h3 className="text-sm font-black text-gray-900 tracking-wider uppercase">{date}</h3>
                <div className="h-[1px] flex-1 bg-gray-100 ml-2" />
              </div>

              {/* 該日期的行程卡片 */}
              <div className="space-y-3">
                {dayItems.map((item) => (
                  <div key={item.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex gap-4 relative active:bg-gray-50 transition-colors">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-50">
                      <img src={item.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 pr-10 flex flex-col justify-center">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 mb-1">
                        <Clock size={12} /> {item.time}
                      </div>
                      <h4 className="font-bold text-gray-900 truncate text-sm">{item.title}</h4>
                      <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin size={10} /> {item.location}
                      </p>
                    </div>
                    
                    {/* 編輯按鈕 */}
                    <button 
                      onClick={() => setEditingItem(item)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 彈出表單：新增模式 */}
      {isAdding && renderForm(newItem, setNewItem, () => {
        const item: ItineraryItemData = {
            id: Math.random().toString(36).substr(2, 9),
            image: newItem.image || "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&q=80&w=1000",
            date: newItem.date || new Date().toISOString().split('T')[0],
            time: newItem.time || "00:00",
            title: newItem.title || "新行程",
            location: newItem.location || "",
            address: "",
            cost: newItem.cost || 0,
            currency: newItem.currency || "TWD",
            payer: newItem.payer || members[0],
            splitters: newItem.splitters || members,
        };
        onAdd(item);
        setIsAdding(false);
        setNewItem({});
      }, () => setIsAdding(false), "新增行程")}

      {/* 彈出表單：編輯模式 */}
      {editingItem && renderForm(editingItem, setEditingItem, () => {
        onUpdate(editingItem);
        setEditingItem(null);
      }, () => setEditingItem(null), "編輯行程")}
    </div>
  );
}
