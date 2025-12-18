import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Plus, Camera, Wallet, Check, Trash2, Edit2 } from "lucide-react";
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

  // 圖片處理邏輯 (與 Itinerary.tsx 相同)
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

  // 全螢幕編輯表單 (與 Itinerary.tsx 邏輯完全一致)
  const renderForm = (data: Partial<ItineraryItemData>, setData: any, onSave: () => void, onCancel: () => void, title: string) => (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in slide-in-from-bottom duration-300">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
        <button onClick={onCancel} className="p-2 -ml-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} /></button>
        <h3 className="font-bold text-lg">{title}</h3>
        <button onClick={onSave} className="text-blue-600 font-bold px-2">儲存</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        <div className="relative w-full h-48 bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2">
          {data.image ? <img src={data.image} className="w-full h-full object-cover" /> : <><Camera className="text-gray-400" size={24} /><span className="text-xs text-gray-400 font-medium">上傳照片</span></>}
          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageChange(e, title.includes('新增') ? 'add' : 'edit')} />
        </div>

        <div className="space-y-4">
          <div className="space-y-1"><Label>行程標題</Label><Input value={data.title || ""} onChange={e => setData({...data, title: e.target.value})} placeholder="例如：釜山塔" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><Label>日期</Label><Input type="date" value={data.date || ""} onChange={e => setData({...data, date: e.target.value})} /></div>
            <div className="space-y-1"><Label>時間</Label><Input value={data.time || ""} onChange={e => setData({...data, time: e.target.value})} placeholder="14:00" /></div>
          </div>
          <div className="space-y-1"><Label>地點</Label><Input value={data.location || ""} onChange={e => setData({...data, location: e.target.value})} /></div>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl space-y-4 border border-gray-100">
          <h4 className="text-sm font-bold flex items-center gap-2"><Wallet size={16} /> 費用分攤</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><Label>金額</Label><Input type="number" value={data.cost || ""} onChange={e => setData({...data, cost: Number(e.target.value)})} /></div>
            <div className="space-y-1"><Label>幣別</Label><Input value={data.currency || "TWD"} onChange={e => setData({...data, currency: e.target.value})} /></div>
          </div>
          <div className="space-y-1">
            <Label>付款人</Label>
            <select className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm" value={data.payer || members[0]} onChange={e => setData({...data, payer: e.target.value})}>
              {members.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label>分攤成員</Label>
            <div className="flex flex-wrap gap-2">
              {members.map(person => {
                const isSelected = (data.splitters || members).includes(person);
                return (
                  <button key={person} onClick={() => toggleSplitter(person, title.includes('編輯'))} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${isSelected ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200'}`}>
                    {person}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-1"><Label>備註</Label><Textarea value={data.notes || ""} onChange={e => setData({...data, notes: e.target.value})} /></div>

        {title.includes('編輯') && (
          <div className="pt-6">
            <button onClick={() => { if(window.confirm("確定刪除？")) { onDelete(data.id!); setEditingItem(null); } }} className="w-full py-4 rounded-2xl bg-red-50 text-red-600 font-bold text-sm border border-red-100 flex items-center justify-center gap-2"><Trash2 size={16} /> 刪除此行程</button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 頁面標題列 */}
      <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1"><ArrowLeft size={24} /></button>
          <h2 className="text-xl font-bold">所有行程</h2>
        </div>
        <button onClick={() => setIsAdding(true)} className="bg-black text-white p-2 rounded-full active:scale-90 transition-transform"><Plus size={20} /></button>
      </div>

      {/* 行程列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-400">目前沒有任何行程</div>
        ) : (
          items.sort((a,b) => a.date.localeCompare(b.date)).map((item) => (
            <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-gray-50 border border-gray-100 relative group">
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <img src={item.image} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 pr-10">
                <div className="flex items-center gap-2 text-[10px] text-blue-600 font-bold mb-1">
                  <Clock size={10} /> {item.date} {item.time}
                </div>
                <h4 className="font-bold text-gray-900 truncate">{item.title}</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 truncate"><MapPin size={10} /> {item.location}</p>
              </div>
              {/* 編輯按鈕 */}
              <button 
                onClick={() => setEditingItem(item)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white shadow-sm border border-gray-100 rounded-full text-gray-400 hover:text-black active:scale-90 transition-all"
              >
                <Edit2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* 彈出表單 */}
      {isAdding && renderForm(newItem, setNewItem, () => {
        const item: ItineraryItemData = {
            id: Math.random().toString(36).substr(2, 9),
            image: newItem.image || "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&q=80&w=1000",
            date: newItem.date || "",
            time: newItem.time || "",
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

      {editingItem && renderForm(editingItem, setEditingItem, () => {
        onUpdate(editingItem);
        setEditingItem(null);
      }, () => setEditingItem(null), "編輯行程")}
    </div>
  );
}
