import { useState } from "react";
import { Plus, User, Clock, Wallet, FileText, Calendar, Save, X, Edit } from "lucide-react";
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

export interface TicketItemData {
  id: string;
  type: "flight" | "train" | "activity" | "other";
  title: string;
  subtitle: string;
  emoji: string;
  iconBg: string;
  
  // Detail fields
  owner: string;
  time: string; // Used for generic display or start time
  endTime?: string; // Added for flight arrival time
  date: string;
  price: number;
  currency: string;
  seat?: string;
  bookingRef?: string;
  description?: string;

  // Flight specific fields
  airline?: string;
  flightNumber?: string;
  aircraft?: string;
  departureAirportCode?: string;
  arrivalAirportCode?: string;
  departureCity?: string;
  arrivalCity?: string;
  duration?: string;
  baggage?: string;
  ticketClass?: string; // e.g. 經濟艙
  isDirect?: boolean;

  // Train specific fields
  trainNumber?: string;
  carNumber?: string;
  departureStation?: string;
  arrivalStation?: string;

  // Activity/Other specific fields
  address?: string;
  website?: string;
}

interface TicketListProps {
  items?: TicketItemData[];
  onUpdate?: (item: TicketItemData) => void;
  onAdd?: (item: TicketItemData) => void;
  onViewAll?: () => void;
}

export function TicketList({ items = [], onUpdate, onAdd, onViewAll }: TicketListProps) {
  const [editingItem, setEditingItem] = useState<TicketItemData | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<TicketItemData>>({});

  const handleEdit = (item: TicketItemData) => {
    setEditingItem({ ...item });
  };

  const handleSave = () => {
    if (editingItem && onUpdate) {
      onUpdate(editingItem);
      setEditingItem(null);
    }
  };

  const handleCreate = () => {
    if (onAdd) {
      const item: TicketItemData = {
        id: Math.random().toString(36).substr(2, 9),
        type: "other",
        title: newItem.title || "新票券",
        subtitle: newItem.subtitle || "票券詳情",
        emoji: newItem.emoji || "🎟️",
        iconBg: "bg-gray-100",
        owner: newItem.owner || "未指定",
        time: newItem.time || "全日",
        date: newItem.date || "2026/03/06",
        price: Number(newItem.price) || 0,
        currency: newItem.currency || "TWD",
        seat: newItem.seat,
        bookingRef: newItem.bookingRef,
        description: newItem.description || "",
      };
      onAdd(item);
      setIsAdding(false);
      setNewItem({});
    }
  };

  return (
    <div className="px-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">票券資訊</h2>
        <Drawer open={isAdding} onOpenChange={setIsAdding}>
          <DrawerTrigger asChild>
            <button className="text-xs text-white flex items-center gap-1 font-medium bg-black px-3 py-1.5 rounded-md active:scale-95 transition-transform shadow-sm">
              <Plus size={12} /> 新增
            </button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[90vh]">
            <div className="mx-auto w-full max-w-md p-4 space-y-4 overflow-y-auto">
              <DrawerHeader className="px-0">
                <DrawerTitle>新增票券</DrawerTitle>
                <DrawerDescription>輸入新票券的詳細資訊</DrawerDescription>
              </DrawerHeader>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label>標題</Label>
                  <Input 
                    placeholder="票券名稱" 
                    value={newItem.title || ""} 
                    onChange={e => setNewItem({...newItem, title: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <Label>副標題</Label>
                  <Input 
                    placeholder="例如: 共計 1 張" 
                    value={newItem.subtitle || ""} 
                    onChange={e => setNewItem({...newItem, subtitle: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>日期</Label>
                    <Input 
                      placeholder="YYYY/MM/DD" 
                      value={newItem.date || ""} 
                      onChange={e => setNewItem({...newItem, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>時間</Label>
                    <Input 
                      placeholder="HH:MM" 
                      value={newItem.time || ""} 
                      onChange={e => setNewItem({...newItem, time: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>價格</Label>
                    <Input 
                      type="number"
                      placeholder="0" 
                      value={newItem.price || ""} 
                      onChange={e => setNewItem({...newItem, price: Number(e.target.value)})}
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
                  <Label>持有人</Label>
                  <Input 
                    placeholder="姓名" 
                    value={newItem.owner || ""} 
                    onChange={e => setNewItem({...newItem, owner: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <Label>詳細說明</Label>
                  <Textarea 
                    placeholder="票券備註..." 
                    value={newItem.description || ""} 
                    onChange={e => setNewItem({...newItem, description: e.target.value})}
                  />
                </div>
              </div>
              <DrawerFooter className="px-0 pt-4">
                <Button onClick={handleCreate} className="w-full rounded-xl">建立票券</Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full rounded-xl">取消</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
        {items.map((item) => (
          <Drawer key={item.id} onClose={() => setEditingItem(null)}>
            <DrawerTrigger asChild>
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer group active:bg-gray-100">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${item.iconBg}`}>
                 {item.emoji}
                </div>
                
                <div className="flex-1 min-w-0 text-left">
                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{item.subtitle}</p>
                </div>

                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                  <Plus size={16} />
                </div>
              </div>
            </DrawerTrigger>

            <DrawerContent className="max-h-[90vh]">
              <div className="mx-auto w-full max-w-md">
                {editingItem && editingItem.id === item.id ? (
                  // Edit Mode
                  <div className="p-4 space-y-4 overflow-y-auto">
                    <DrawerHeader className="p-0 text-left">
                       <DrawerTitle>編輯票券</DrawerTitle>
                       <DrawerDescription className="sr-only">編輯票券詳細資訊</DrawerDescription>
                    </DrawerHeader>
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label>標題</Label>
                        <Input 
                          value={editingItem.title} 
                          onChange={e => setEditingItem({...editingItem, title: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>副標題</Label>
                        <Input 
                          value={editingItem.subtitle} 
                          onChange={e => setEditingItem({...editingItem, subtitle: e.target.value})} 
                        />
                      </div>
                       <div className="space-y-1">
                        <Label>持有人</Label>
                        <Input 
                          value={editingItem.owner} 
                          onChange={e => setEditingItem({...editingItem, owner: e.target.value})} 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label>日期</Label>
                          <Input 
                            value={editingItem.date} 
                            onChange={e => setEditingItem({...editingItem, date: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>時間</Label>
                          <Input 
                            value={editingItem.time} 
                            onChange={e => setEditingItem({...editingItem, time: e.target.value})} 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                          <Label>價格</Label>
                          <Input 
                            type="number"
                            value={editingItem.price} 
                            onChange={e => setEditingItem({...editingItem, price: Number(e.target.value)})} 
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
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label>座位</Label>
                          <Input 
                            value={editingItem.seat || ""} 
                            onChange={e => setEditingItem({...editingItem, seat: e.target.value})} 
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>訂位代號</Label>
                          <Input 
                            value={editingItem.bookingRef || ""} 
                            onChange={e => setEditingItem({...editingItem, bookingRef: e.target.value})} 
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label>詳細說明</Label>
                        <Textarea 
                          value={editingItem.description} 
                          onChange={e => setEditingItem({...editingItem, description: e.target.value})} 
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
                    <DrawerHeader className="text-left pb-0">
                      <div className="flex justify-between items-start">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 ${item.iconBg}`}>
                          {item.emoji}
                        </div>
                        <Button size="sm" variant="secondary" onClick={() => handleEdit(item)} className="bg-gray-100 hover:bg-gray-200 text-black shrink-0">
                          <Edit size={14} className="mr-1" /> 編輯
                        </Button>
                      </div>
                      <DrawerTitle className="text-2xl font-bold">{item.title}</DrawerTitle>
                      <DrawerDescription className="text-base mt-1">
                        {item.subtitle}
                      </DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 space-y-6 overflow-y-auto">
                      {/* Basic Info Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-xl space-y-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <User size={12} /> 持有人
                          </span>
                          <p className="font-medium text-gray-900">{item.owner}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl space-y-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Wallet size={12} /> 價格
                          </span>
                          <p className="font-medium text-gray-900">
                            {item.price.toLocaleString()} {item.currency}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl space-y-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={12} /> 日期
                          </span>
                          <p className="font-medium text-gray-900">{item.date}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl space-y-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={12} /> 時間
                          </span>
                          <p className="font-medium text-gray-900">{item.time}</p>
                        </div>
                      </div>

                      {/* Additional Details */}
                      <div className="space-y-4">
                        {(item.seat || item.bookingRef) && (
                          <div className="border border-gray-100 rounded-xl p-4 flex justify-between items-center bg-white shadow-sm">
                             {item.seat && (
                               <div>
                                 <span className="text-xs text-gray-500 block">座位</span>
                                 <span className="font-mono font-bold text-lg">{item.seat}</span>
                               </div>
                             )}
                             {item.bookingRef && (
                               <div className="text-right">
                                 <span className="text-xs text-gray-500 block">訂位代號</span>
                                 <span className="font-mono font-bold text-lg text-indigo-600">{item.bookingRef}</span>
                               </div>
                             )}
                          </div>
                        )}

                        {item.description && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                              <FileText size={16} /> 詳細資訊
                            </h4>
                            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl">
                              {item.description}
                            </p>
                          </div>
                        )}
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

      <button 
        onClick={onViewAll}
        className="w-full bg-white border border-gray-200 text-gray-900 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        查看所有票券
      </button>
    </div>
  );
}
