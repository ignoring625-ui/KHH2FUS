import { useState, useEffect } from "react";
import { ArrowLeft, Clock, MapPin, Calendar, Plus, Save, X, Wallet, StickyNote, Navigation, Edit, Check } from "lucide-react";
import { ItineraryItemData } from "./Itinerary";
import { cn } from "./ui/utils";
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

interface AllItinerariesProps {
  items: ItineraryItemData[];
  onBack: () => void;
  onUpdate?: (item: ItineraryItemData) => void;
  onAdd?: (item: ItineraryItemData) => void;
  members?: string[];
}

export function AllItineraries({ items, onBack, onUpdate, onAdd, members = ["我", "成員A"] }: AllItinerariesProps) {
  const dates = Array.from(new Set(items.map(item => item.date))).sort();
  const [selectedDate, setSelectedDate] = useState<string>(dates[0] || new Date().toISOString().split('T')[0]);
  
  const currentItems = items
    .filter(item => item.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getActiveItemId = () => {
    const todayStr = now.toISOString().split('T')[0];
    if (selectedDate !== todayStr) return null;

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < currentItems.length; i++) {
      const item = currentItems[i];
      const nextItem = currentItems[i + 1];
      
      const startTimeParts = item.time.split(' - ')[0].split(':');
      const startMinutes = parseInt(startTimeParts[0]) * 60 + parseInt(startTimeParts[1]);

      let endMinutes = 24 * 60;
      if (nextItem) {
         const nextTimeParts = nextItem.time.split(' - ')[0].split(':');
         endMinutes = parseInt(nextTimeParts[0]) * 60 + parseInt(nextTimeParts[1]);
      } else if (item.time.includes(' - ')) {
          const endTimeParts = item.time.split(' - ')[1].split(':');
          endMinutes = parseInt(endTimeParts[0]) * 60 + parseInt(endTimeParts[1]);
      } else {
          endMinutes = startMinutes + 120; 
      }

      if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
        return item.id;
      }
    }
    return null;
  };

  const activeItemId = getActiveItemId();

  // State for Editing/Adding
  const [editingItem, setEditingItem] = useState<ItineraryItemData | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ItineraryItemData>>({});

  const handleEdit = (item: ItineraryItemData) => {
    setEditingItem({ 
      ...item,
      splitters: item.splitters || members
    });
  };

  const handleSave = () => {
    if (editingItem && onUpdate) {
      onUpdate(editingItem);
      setEditingItem(null);
    }
  };

  const handleCreate = () => {
    if (onAdd) {
      const item: ItineraryItemData = {
        id: Math.random().toString(36).substr(2, 9),
        image: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&q=80&w=1000",
        date: newItem.date || selectedDate,
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">行程總覽</h1>
        </div>
        
        <Drawer open={isAdding} onOpenChange={setIsAdding}>
          <DrawerTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black">
              <Plus size={24} />
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
                    value={newItem.date || selectedDate} 
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
      </div>

      {/* Date Selector */}
      <div className="bg-white border-b border-gray-100 sticky top-[65px] z-30">
        <div className="flex overflow-x-auto px-4 py-3 gap-3 no-scrollbar snap-x">
          {dates.map((date) => {
            const dateObj = new Date(date);
            const dayName = dateObj.toLocaleDateString('zh-TW', { weekday: 'short' });
            const dayNum = dateObj.getDate();
            const isSelected = date === selectedDate;

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[60px] h-[70px] rounded-xl transition-all snap-start border shrink-0",
                  isSelected 
                    ? "bg-black text-white border-black shadow-lg scale-105" 
                    : "bg-white text-gray-500 border-gray-100 hover:border-gray-300"
                )}
              >
                <span className="text-xs font-medium opacity-80">{dayName}</span>
                <span className={cn("text-xl font-bold", isSelected ? "text-white" : "text-gray-900")}>
                  {dayNum}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 p-4 pb-20 space-y-6">
        {currentItems.length > 0 ? (
          <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
            {currentItems.map((item) => {
              const isActive = item.id === activeItemId;
              return (
                <div key={item.id} className="relative pl-6 group">
                  {/* Timeline Dot */}
                  <div className={cn(
                    "absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-all duration-500",
                    isActive 
                      ? "bg-green-500 border-green-200 shadow-[0_0_0_4px_rgba(34,197,94,0.2)] scale-110" 
                      : "bg-gray-200 border-white group-hover:bg-gray-400"
                  )} />

                  {/* Content Card wrapped in Drawer */}
                  <Drawer onClose={() => setEditingItem(null)}>
                    <DrawerTrigger asChild>
                      <div className={cn(
                        "rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer",
                        isActive 
                          ? "bg-white border-green-200 shadow-lg ring-1 ring-green-100" 
                          : "bg-white border-gray-100 shadow-sm hover:shadow-md"
                      )}>
                        <div className="flex h-28">
                          {/* Image */}
                          <div className="w-24 shrink-0 relative">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                             {isActive && (
                                <div className="absolute inset-0 bg-green-500/10 backdrop-blur-[1px] flex items-center justify-center">
                                    <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">進行中</span>
                                </div>
                            )}
                          </div>
                          
                          {/* Details */}
                          <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                 <span className={cn(
                                   "text-xs font-bold font-mono px-1.5 py-0.5 rounded-md mb-1 inline-block",
                                   isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                 )}>
                                   {item.time}
                                 </span>
                              </div>
                              <h3 className="font-bold text-gray-900 truncate leading-tight">{item.title}</h3>
                              <p className="text-xs text-gray-500 truncate mt-1 flex items-center gap-1">
                                <MapPin size={10} /> {item.location}
                              </p>
                            </div>
                            
                            <div className="flex justify-between items-end mt-2">
                               {item.cost ? (
                                   <div className="text-xs font-medium text-gray-900 bg-gray-50 px-2 py-1 rounded-lg">
                                     {item.currency} {item.cost.toLocaleString()}
                                   </div>
                               ) : (
                                   <div className="text-xs text-gray-400 italic">免費</div>
                               )}
                            </div>
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
                               <div className="space-y-1">
                                <Label>日期</Label>
                                <Input 
                                  type="date"
                                  value={editingItem.date} 
                                  onChange={e => setEditingItem({...editingItem, date: e.target.value})} 
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <Label>時間</Label>
                                  <Input 
                                    value={editingItem.time} 
                                    onChange={e => setEditingItem({...editingItem, time: e.target.value})} 
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label>地點</Label>
                                  <Input 
                                    value={editingItem.location} 
                                    onChange={e => setEditingItem({...editingItem, location: e.target.value})} 
                                  />
                                </div>
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
                              <Button variant="outline" onClick={() => setEditingItem(null)} className="flex-1 rounded-xl">
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
                                  <Edit size={14} className="mr-1" /> 編輯
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
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 space-y-4">
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar size={32} />
             </div>
             <p>此日期無行程安排</p>
             <button 
                onClick={onBack}
                className="text-sm text-black font-medium hover:underline"
             >
                返回今日行程
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
