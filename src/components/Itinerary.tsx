import { useState } from "react";
import { MapPin, RefreshCw, Clock, StickyNote, Wallet, Navigation, Plus, Save, X, Users, Check, Camera, ArrowLeft, Trash2 } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export interface ItineraryItemData {
  id: string;
  image: string;
  date: string;
  time: string;
  title: string;
  location: string;
  address: string;
  notes?: string;
  cost?: number;
  currency?: string;
  payer?: string;
  splitters?: string[];
  isCurrent?: boolean;
}

interface ItineraryProps {
  items: ItineraryItemData[];
  onUpdate?: (item: ItineraryItemData) => void;
  onAdd?: (item: ItineraryItemData) => void;
  onDelete?: (id: string) => void;
  onViewAll?: () => void;
  members?: string[];
}

export function Itinerary({ items, onUpdate, onAdd, onDelete, onViewAll, members = ["我", "成員A"] }: ItineraryProps) {
  const [editingItem, setEditingItem] = useState<ItineraryItemData | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ItineraryItemData>>({});

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

  const handleCreate = () => {
    if (onAdd) {
      const item: ItineraryItemData = {
        id: Math.random().toString(36).substr(2, 9),
        image: newItem.image || "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&q=80&w=1000",
        date: newItem.date || new Date().toISOString().split('T')[0],
        time: newItem.time || "00:00",
        title: newItem.title || "新行程",
        location: newItem.location || "未指定地點",
        address: newItem.address || "",
        notes: newItem.notes || "",
        cost: Number(newItem.cost) || 0,
        currency: newItem.currency || "TWD",
        payer: newItem.payer || members[0],
        splitters: newItem.splitters || members,
        isCurrent: false,
      };
      onAdd(item);
      setIsAdding(false);
      setNewItem({});
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

  const renderForm = (data: Partial<ItineraryItemData>, setData: any, onSave: () => void, onCancel: () => void, title: string) => (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in slide-in-from-bottom duration-300 overflow-hidden">
      {/* 頂部固定導覽 */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
        <button onClick={onCancel} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h3 className="font-bold text-lg">{title}</h3>
        <button onClick={onSave} className="text-blue-600 font-bold px-2 active:opacity-50">儲存</button>
      </div>

      {/* 滾動表單內容 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {/* 封面照片 */}
        <div className="relative w-full h-48 bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2">
          {data.image ? (
            <img src={data.image} className="w-full h-full object-cover" />
          ) : (
            <>
              <Camera className="text-gray-400" size={24} />
              <span className="text-xs text-gray-400 font-medium">點擊上傳封面照片</span>
            </>
          )}
          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageChange(e, title.includes('新增') ? 'add' : 'edit')} />
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-gray-500 text-xs">行程標題</Label>
            <Input className="h-12 rounded-xl bg-gray-50 border-none" value={data.title || ""} onChange={e => setData({...data, title: e.target.value})} placeholder="例如：釜山大橋夜景" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-gray-500 text-xs">日期</Label>
              <Input className="h-12 rounded-xl bg-gray-50 border-none" type="date" value={data.date || ""} onChange={e => setData({...data, date: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-500 text-xs">時間</Label>
              <Input className="h-12 rounded-xl bg-gray-50 border-none" placeholder="14:00" value={data.time || ""} onChange={e => setData({...data, time: e.target.value})} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-500 text-xs">地點</Label>
            <Input className="h-12 rounded-xl bg-gray-50 border-none" placeholder="搜尋或輸入地點" value={data.location || ""} onChange={e => setData({...data, location: e.target.value})} />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl space-y-4 border border-gray-100">
          <h4 className="text-sm font-bold flex items-center gap-2"><Wallet size={16} /> 費用分攤</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-gray-500 text-xs">金額</Label>
              <Input className="h-12 rounded-xl border-gray-200" type="number" value={data.cost || ""} onChange={e => setData({...data, cost: Number(e.target.value)})} placeholder="0" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-500 text-xs">幣別</Label>
              <Input className="h-12 rounded-xl border-gray-200" value={data.currency || "TWD"} onChange={e => setData({...data, currency: e.target.value})} />
            </div>
          </div>
          <div className="space-y-1.5">
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
                  <button key={person} onClick={() => toggleSplitter(person, title.includes('編輯'))} className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${isSelected ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200'}`}>
                    {person} {isSelected && <Check size={12} className="inline ml-1" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-gray-500 text-xs">備註</Label>
          <Textarea className="min-h-[120px] rounded-2xl bg-gray-50 border-none" placeholder="輸入行程備註..." value={data.notes || ""} onChange={e => setData({...data, notes: e.target.value})} />
        </div>

        {/* 刪除按鈕 - 只在編輯模式出現 */}
        {title.includes('編輯') && (
          <div className="pt-6">
            <button 
              onClick={() => {
                if (window.confirm("確定要刪除此行程嗎？")) {
                  onDelete?.(data.id!);
                  setEditingItem(null);
                }
              }}
              className="w-full py-4 rounded-2xl bg-red-50 text-red-600 font-bold text-sm border border-red-100 active:bg-red-100 flex items-center justify-center gap-2"
            >
              <Trash2 size={16} /> 刪除此行程
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="px-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">最近行程</h2>
          <p className="text-xs text-gray-500 mt-1">{items[0]?.date || "尚未建立行程"}</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="text-xs text-white flex items-center gap-1 font-medium bg-black px-3 py-1.5 rounded-md active:scale-95 transition-transform shadow-sm">
          <Plus size={12} /> 新增
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory hide-scrollbar">
        {items.map((item) => (
          <Drawer key={item.id}>
            <DrawerTrigger asChild>
              <div className="relative shrink-0 w-[200px] h-[300px] rounded-2xl overflow-hidden snap-start cursor-pointer active:scale-95 transition-all shadow-md">
                <img src={item.image} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <p className="text-[10px] opacity-80 flex items-center gap-1 font-medium uppercase tracking-wider"><Clock size={10} /> {item.time}</p>
                  <h3 className="text-base font-bold leading-tight mt-1">{item.title}</h3>
                </div>
              </div>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
                <div className="mx-auto w-full max-w-md p-4 space-y-6 pb-12 overflow-y-auto">
                    <div className="flex justify-between items-start">
                        <div>
                          <DrawerTitle className="text-2xl font-bold">{item.title}</DrawerTitle>
                          <DrawerDescription className="text-gray-500 mt-1">{item.date} {item.time}</DrawerDescription>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-full px-4" onClick={() => setEditingItem(item)}>編輯</Button>
                    </div>
                    <div className="space-y-5">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><MapPin size={18} /></div>
                            <div>
                                <p className="text-sm font-bold">{item.location}</p>
                                <p className="text-xs text-gray-400">{item.address || "無詳細地址"}</p>
                            </div>
                        </div>
                        <div className="p-4 bg-yellow-50/50 rounded-2xl border border-yellow-100">
                            <div className="flex items-center gap-2 text-yellow-700 font-bold text-xs mb-2">
                                <StickyNote size={14} /> 備註事項
                            </div>
                            <p className="text-sm text-yellow-900 leading-relaxed">{item.notes || "目前沒有備註"}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">實際花費</span>
                                <span className="text-2xl font-black">{item.cost?.toLocaleString()} <span className="text-sm">{item.currency}</span></span>
                            </div>
                            <div className="pt-3 border-t border-gray-200 mt-3 flex justify-between items-center text-xs">
                                <span className="text-gray-400">付款人：<span className="text-gray-900 font-bold">{item.payer}</span></span>
                                <span className="text-gray-400">分攤：<span className="text-gray-900 font-bold">{item.splitters?.length} 人</span></span>
                            </div>
                        </div>
                    </div>
                    <DrawerClose asChild><Button className="w-full h-12 rounded-xl text-gray-500" variant="ghost">關閉視窗</Button></DrawerClose>
                </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>

      <div className="px-4">
        <button onClick={onViewAll} className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-black transition-colors shadow-xl shadow-gray-200">查看所有行程</button>
      </div>

      {isAdding && renderForm(newItem, setNewItem, handleCreate, () => setIsAdding(false), "新增行程")}
      {editingItem && renderForm(editingItem, setEditingItem, () => { onUpdate?.(editingItem); setEditingItem(null); }, () => setEditingItem(null), "編輯行程")}
    </div>
  );
}
