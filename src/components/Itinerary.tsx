import { useState } from "react";
import { MapPin, RefreshCw, Clock, StickyNote, Wallet, Navigation, Plus, Save, X, Users, Check, Camera, ArrowLeft } from "lucide-react";
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
  onViewAll?: () => void;
  members?: string[];
}

export function Itinerary({ items, onUpdate, onAdd, onViewAll, members = ["我", "成員A"] }: ItineraryProps) {
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

  // 渲染編輯/新增的表單內容
  const renderForm = (data: Partial<ItineraryItemData>, setData: any, onSave: () => void, onCancel: () => void, title: string) => (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in slide-in-from-bottom duration-300">
      {/* 頂部導覽列 */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <button onClick={onCancel} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h3 className="font-bold text-lg">{title}</h3>
        <button onClick={onSave} className="text-blue-600 font-bold px-2">儲存</button>
      </div>

      {/* 滾動內容區 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-10">
        {/* 圖片上傳 */}
        <div className="relative w-full h-48 bg-gray-50 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2">
          {data.image ? (
            <img src={data.image} className="w-full h-full object-cover" />
          ) : (
            <>
              <Camera className="text-gray-400" size={24} />
              <span className="text-xs text-gray-400 font-medium">上傳封面照片</span>
            </>
          )}
          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageChange(e, title.includes('新增') ? 'add' : 'edit')} />
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <Label>行程標題</Label>
            <Input value={data.title || ""} onChange={e => setData({...data, title: e.target.value})} placeholder="例如：釜山塔看夕陽" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>日期</Label>
              <Input type="date" value={data.date || ""} onChange={e => setData({...data, date: e.target.value})} />
            </div>
            <div className="space-y-1">
              <Label>時間</Label>
              <Input placeholder="14:00" value={data.time || ""} onChange={e => setData({...data, time: e.target.value})} />
            </div>
          </div>
          <div className="space-y-1">
            <Label>地點</Label>
            <Input placeholder="搜尋地點" value={data.location || ""} onChange={e => setData({...data, location: e.target.value})} />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl space-y-4 border border-gray-100">
          <h4 className="text-sm font-bold flex items-center gap-2"><Wallet size={16} /> 費用分攤</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>金額</Label>
              <Input type="number" value={data.cost || ""} onChange={e => setData({...data, cost: Number(e.target.value)})} placeholder="0" />
            </div>
            <div className="space-y-1">
              <Label>幣別</Label>
              <Input value={data.currency || "TWD"} onChange={e => setData({...data, currency: e.target.value})} />
            </div>
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

        <div className="space-y-1">
          <Label>備註</Label>
          <Textarea className="min-h-[100px]" placeholder="紀錄重要資訊..." value={data.notes || ""} onChange={e => setData({...data, notes: e.target.value})} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="px-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">最近行程</h2>
          <p className="text-xs text-gray-500 mt-1">{items[0]?.date || "尚未有行程"}</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="text-xs text-white flex items-center gap-1 font-medium bg-black px-3 py-1.5 rounded-md shadow-sm">
          <Plus size={12} /> 新增
        </button>
      </div>

      {/* 列表區 */}
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory hide-scrollbar">
        {items.map((item) => (
          <Drawer key={item.id}>
            <DrawerTrigger asChild>
              <div className="relative shrink-0 w-[200px] h-[300px] rounded-2xl overflow-hidden snap-start cursor-pointer active:scale-95 transition-all shadow-md">
                <img src={item.image} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <p className="text-xs opacity-90 flex items-center gap-1"><Clock size={10} /> {item.time}</p>
                  <h3 className="text-base font-bold leading-tight mt-1">{item.title}</h3>
                </div>
              </div>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
                {/* 詳情模式：保持 Drawer 用於「查看」，因為內容較少 */}
                <div className="mx-auto w-full max-w-md p-4 space-y-6 pb-12 overflow-y-auto">
                    <div className="flex justify-between items-start">
                        <DrawerTitle className="text-2xl font-bold">{item.title}</DrawerTitle>
                        <Button size="sm" variant="outline" onClick={() => setEditingItem(item)}>編輯</Button>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Clock size={16} /> {item.date} {item.time}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <MapPin size={16} /> {item.location}
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-xl text-sm border border-yellow-100">
                            {item.notes || "無備註事項"}
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl flex justify-between items-center">
                            <span className="font-bold">{item.cost?.toLocaleString()} {item.currency}</span>
                            <span className="text-xs text-gray-500">由 {item.payer} 付款</span>
                        </div>
                    </div>
                    <DrawerClose asChild><Button className="w-full">關閉</Button></DrawerClose>
                </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>

      <div className="px-4">
        <button onClick={onViewAll} className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-medium">查看所有行程</button>
      </div>

      {/* 全螢幕新增頁面 */}
      {isAdding && renderForm(newItem, setNewItem, handleCreate, () => setIsAdding(false), "新增行程")}

      {/* 全螢幕編輯頁面 */}
      {editingItem && renderForm(editingItem, setEditingItem, () => { onUpdate?.(editingItem); setEditingItem(null); }, () => setEditingItem(null), "編輯行程")}
    </div>
  );
}
