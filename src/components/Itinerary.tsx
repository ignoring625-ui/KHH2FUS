import { useState } from "react";
import { MapPin, RefreshCw, Clock, StickyNote, Wallet, Navigation, Plus, Save, X, Users, Check } from "lucide-react";
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
  date: string; // YYYY-MM-DD
  time: string;
  title: string;
  location: string;
  address: string;
  notes?: string;
  
  // Expense related fields
  cost?: number; // Actual cost
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

  const handleEdit = (item: ItineraryItemData) => {
    setEditingItem({ 
      ...item,
      // Ensure arrays are initialized
      splitters: item.splitters || members
    });
  };

  const handleSave = () => {
    if (editingItem && onUpdate) {
      onUpdate(editingItem);
      setEditingItem(null);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const toggleSplitter = (person: string, isEditing: boolean) => {
    if (isEditing && editingItem) {
      const current = editingItem.splitters || [];
      const updated = current.includes(person) 
        ? current.filter(p => p !== person)
        : [...current, person];
      setEditingItem({ ...editingItem, splitters: updated });
    } else if (!isEditing) {
      const current = newItem.splitters || members;
      const updated = current.includes(person)
        ? current.filter(p => p !== person)
        : [...current, person];
      setNewItem({ ...newItem, splitters: updated });
    }
  };

  const handleCreate = () => {
    if (onAdd) {
      const item: ItineraryItemData = {
        id: Math.random().toString(36).substr(2, 9),
        image: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&q=80&w=1000", // Default image
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

  return (
    <div className="space-y-4">
      <div className="px-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">最近行程</h2>
          <p className="text-xs text-gray-500 mt-1">{items[0]?.date || "2026/03/06"} (星期五) 12:30</p>
        </div>
        <div className="flex gap-2">
          <Drawer open={isAdding} onOpenChange={setIsAdding}>
            <DrawerTrigger asChild>
              <button className="text-xs text-white flex items-center gap-1 font-medium bg-black px-3 py-1.5 rounded-md active:scale-95 transition-transform shadow-sm">
                <Plus size={12} /> 新增
              </button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[90vh]">
              <div className="mx-auto w-full max-w-md p-4 space-y-4 overflow-y-auto">
                <DrawerHeader className="px-0">
                  <DrawerTitle>新增行程</DrawerTitle>
                  <DrawerDescription>輸入新行程的詳細資訊</DrawerDescription>
                </DrawerHeader>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label>標題</Label>
                    <Input 
                      placeholder="行程名稱" 
                      value={newItem.title || ""} 
                      onChange={e => setNewItem({...newItem, title: e.target.value})}
                    />
                  </div>
                   <div className="space-y-1">
                    <Label>日期</Label>
                    <Input 
                      type="date"
                      value={newItem.date || ""} 
                      onChange={e => setNewItem({...newItem, date: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label>時間</Label>
                      <Input 
                        placeholder="例如: 14:00" 
                        value={newItem.time || ""} 
                        onChange={e => setNewItem({...newItem, time: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>地點</Label>
                      <Input 
                        placeholder="地點名稱" 
                        value={newItem.location || ""} 
                        onChange={e => setNewItem({...newItem, location: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  {/* Expense Section */}
                  <div className="bg-gray-50 p-3 rounded-xl space-y-3 border border-gray-100">
                    <h4 className="text-sm font-bold flex items-center gap-2">
                       <Wallet size={14} /> 實際花費
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label>金額</Label>
                          <Input 
                            type="number"
                            placeholder="0" 
                            value={newItem.cost || ""} 
                            onChange={e => setNewItem({...newItem, cost: Number(e.target.value)})}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>幣別</Label>
                          <Input 
                            placeholder="TWD" 
                            value={newItem.currency || "TWD"} 
                            onChange={e => setNewItem({...newItem, currency: e.target.value})}
                          />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label>付款人</Label>
                        <select 
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={newItem.payer || members[0]}
                          onChange={e => setNewItem({...newItem, payer: e.target.value})}
                        >
                            {members.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>分攤成員 ({(newItem.splitters || members).length}人)</Label>
                        <div className="flex flex-wrap gap-2">
                            {members.map(person => {
                                const isSelected = (newItem.splitters || members).includes(person);
                                return (
                                    <button 
                                        key={person}
                                        onClick={() => toggleSplitter(person, false)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1 ${isSelected ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200'}`}
                                    >
                                        {person}
                                        {isSelected && <Check size={10} />}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label>備註</Label>
                    <Textarea 
                      placeholder="行程備註..." 
                      value={newItem.notes || ""} 
                      onChange={e => setNewItem({...newItem, notes: e.target.value})}
                    />
                  </div>
                </div>
                <DrawerFooter className="px-0 pt-4">
                  <Button onClick={handleCreate} className="w-full rounded-xl">建立行程</Button>
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full rounded-xl">取消</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          <button className="text-xs text-indigo-600 flex items-center gap-1 font-medium bg-indigo-50 px-2 py-1 rounded-md active:scale-95 transition-transform">
            <RefreshCw size={12} /> 刷新
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {items.map((item) => (
          <Drawer key={item.id} onClose={() => setEditingItem(null)}>
            <DrawerTrigger asChild>
              <div className="relative shrink-0 w-[200px] h-[300px] rounded-2xl overflow-hidden group snap-start cursor-pointer active:scale-95 transition-all">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                
                {item.isCurrent && (
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg">
                    <span className="text-xs font-medium text-white flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      進行中
                    </span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm font-medium opacity-90 mb-1 flex items-center gap-1">
                    <Clock size={12} /> {item.time}
                  </p>
                  <h3 className="text-lg font-bold leading-tight mb-1">{item.title}</h3>
                  <div className="flex items-center gap-1.5 opacity-80">
                    <MapPin size={14} className="text-white" />
                    <p className="text-xs">{item.location}</p>
                  </div>
                </div>
              </div>
            </DrawerTrigger>
            
            <DrawerContent className="max-h-[90vh]">
              <div className="mx-auto w-full max-w-md">
                {editingItem && editingItem.id === item.id ? (
                  // Edit Mode
                  <div className="p-4 space-y-4 overflow-y-auto">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold">編輯行程</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label>標題</Label>
                        <Input 
                          value={editingItem.title} 
                          onChange={e => setEditingItem({...editingItem, title: e.target.value})} 
                        />
                      </div>
                      
                      {/* Expense Edit Section */}
                       <div className="bg-gray-50 p-3 rounded-xl space-y-3 border border-gray-100">
                        <h4 className="text-sm font-bold flex items-center gap-2">
                           <Wallet size={14} /> 實際花費
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label>金額</Label>
                              <Input 
                                type="number"
                                value={editingItem.cost} 
                                onChange={e => setEditingItem({...editingItem, cost: Number(e.target.value)})}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>幣別</Label>
                              <Input 
                                value={editingItem.currency} 
                                onChange={e => setEditingItem({...editingItem, currency: e.target.value})}
                              />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label>付款人</Label>
                            <select 
                              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              value={editingItem.payer || members[0]}
                              onChange={e => setEditingItem({...editingItem, payer: e.target.value})}
                            >
                                {members.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>分攤成員 ({(editingItem.splitters || members).length}人)</Label>
                            <div className="flex flex-wrap gap-2">
                                {members.map(person => {
                                    const isSelected = (editingItem.splitters || members).includes(person);
                                    return (
                                        <button 
                                            key={person}
                                            onClick={() => toggleSplitter(person, true)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1 ${isSelected ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200'}`}
                                        >
                                            {person}
                                            {isSelected && <Check size={10} />}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label>備註</Label>
                        <Textarea 
                          value={editingItem.notes} 
                          onChange={e => setEditingItem({...editingItem, notes: e.target.value})} 
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleSave} className="flex-1 rounded-xl">
                        <Save size={16} className="mr-2" /> 儲存
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="flex-1 rounded-xl">
                        <X size={16} className="mr-2" /> 取消
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="relative h-48 w-full shrink-0">
                      <img src={item.image} className="w-full h-full object-cover rounded-t-[10px]" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div>
                          <DrawerTitle className="text-2xl font-bold">{item.title}</DrawerTitle>
                          <DrawerDescription className="text-muted-foreground flex items-center gap-2 mt-1">
                            <Clock size={14} /> {item.time} ({item.date})
                          </DrawerDescription>
                        </div>
                        <Button size="sm" variant="secondary" onClick={() => handleEdit(item)} className="bg-white/90 hover:bg-white text-black shrink-0">
                          編輯
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-6 overflow-y-auto">
                      {/* Location */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <MapPin size={16} /> 地點
                        </h4>
                        <div className="bg-muted/50 p-3 rounded-xl flex items-center justify-between gap-4">
                          <div className="text-sm">
                            <p className="font-medium text-foreground">{item.location}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.address}</p>
                          </div>
                          <Button size="icon" variant="outline" className="shrink-0 h-8 w-8 rounded-full" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`, '_blank')}>
                            <Navigation size={14} />
                          </Button>
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <StickyNote size={16} /> 備註
                        </h4>
                        <div className="bg-yellow-50/50 border border-yellow-100 p-4 rounded-xl text-sm text-yellow-900 leading-relaxed">
                          {item.notes || "無備註事項"}
                        </div>
                      </div>

                      {/* Cost */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <Wallet size={16} /> 實際花費
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-bold text-foreground">
                                {item.cost?.toLocaleString()} 
                              </span>
                              <span className="text-sm text-muted-foreground">{item.currency || "TWD"}</span>
                            </div>
                            
                            {(item.cost || 0) > 0 && (
                                <div className="space-y-2 pt-2 border-t border-gray-200">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">付款人</span>
                                        <span className="font-medium text-gray-900">{item.payer || members[0]}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">分攤</span>
                                        <span className="font-medium text-gray-900">{(item.splitters || members).length} 人</span>
                                    </div>
                                    <div className="flex gap-1 flex-wrap justify-end">
                                        {(item.splitters || members).map((person, i) => (
                                            <span key={i} className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded-full text-gray-500">
                                                {person}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                      </div>
                    </div>

                    <DrawerFooter className="pt-2 pb-8">
                      <DrawerClose asChild>
                        <Button variant="outline" className="w-full rounded-xl h-12">關閉</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>

      <div className="px-4">
        <button 
          onClick={onViewAll}
          className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
        >
          查看所有行程
        </button>
      </div>
    </div>
  );
}
