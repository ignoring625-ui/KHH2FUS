import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Search, Filter, Plane, Train, Ticket, MoreHorizontal, QrCode, Download, Share2, Luggage, User, Clock, MapPin, Briefcase, Edit, Save, X, UserCircle, Calendar, CreditCard, Link as LinkIcon, Building } from "lucide-react";
import { TicketItemData } from "./TicketList";
import { MemberProfile } from "./ProfileSettings";
import { cn } from "./ui/utils";
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
import { Textarea } from "./ui/textarea";

interface AllTicketsProps {
  items: TicketItemData[];
  onBack: () => void;
  onUpdate?: (item: TicketItemData) => void;
  onAdd?: (item: TicketItemData) => void;
  members: MemberProfile[];
}

export function AllTickets({ items, onBack, onUpdate, onAdd, members }: AllTicketsProps) {
  const [filter, setFilter] = useState<string>("all");
  const [isAdding, setIsAdding] = useState(false);
  const [addStep, setAddStep] = useState<1 | 2>(1); // 1: Select Type, 2: Fill Details
  const [newItem, setNewItem] = useState<Partial<TicketItemData>>({});
  const [editingItem, setEditingItem] = useState<TicketItemData | null>(null);

  // Reset state when drawer closes
  useEffect(() => {
    if (!isAdding) {
      setAddStep(1);
      setNewItem({});
    }
  }, [isAdding]);

  const filteredItems = filter === "all" 
    ? items 
    : items.filter(item => item.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case "flight": return <Plane size={20} />;
      case "train": return <Train size={20} />;
      case "activity": return <Ticket size={20} />;
      default: return <Ticket size={20} />;
    }
  };

  const getTicketColor = (type: string) => {
    switch (type) {
      case "flight": return "bg-blue-50 text-blue-600 border-blue-100";
      case "train": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "activity": return "bg-purple-50 text-purple-600 border-purple-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const handleTypeSelect = (type: "flight" | "train" | "activity" | "other") => {
    let defaultData: Partial<TicketItemData> = {
      type,
      currency: "TWD",
      date: "2026/03/06",
      owner: members[0]?.name || "我",
    };

    switch (type) {
      case "flight":
        defaultData = { ...defaultData, emoji: "🛫", iconBg: "bg-blue-100", title: "機票", subtitle: "航班資訊" };
        break;
      case "train":
        defaultData = { ...defaultData, emoji: "🚅", iconBg: "bg-emerald-100", title: "火車票", subtitle: "交通資訊" };
        break;
      case "activity":
        defaultData = { ...defaultData, emoji: "🎫", iconBg: "bg-purple-100", title: "活動門票", subtitle: "入場券" };
        break;
      default:
        defaultData = { ...defaultData, emoji: "🔖", iconBg: "bg-gray-100", title: "票券", subtitle: "一般票券" };
        break;
    }

    setNewItem(defaultData);
    setAddStep(2);
  };

  const handleCreate = () => {
    if (onAdd) {
      const item: TicketItemData = {
        id: Math.random().toString(36).substr(2, 9),
        type: newItem.type || "other",
        title: newItem.title || "新票券",
        subtitle: newItem.subtitle || "",
        emoji: newItem.emoji || "🎟️",
        iconBg: newItem.iconBg || "bg-gray-100",
        owner: newItem.owner || members[0]?.name || "未指定",
        time: newItem.time || "全日",
        date: newItem.date || "2026/03/06",
        price: Number(newItem.price) || 0,
        currency: newItem.currency || "TWD",
        ...newItem
      };
      onAdd(item);
      setIsAdding(false);
    }
  };

  const handleSaveEdit = () => {
    if (editingItem && onUpdate) {
      onUpdate(editingItem);
      setEditingItem(null);
    }
  };

  const MemberSelector = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
    <div className="space-y-2">
      <Label>持有人</Label>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
        {members.map(member => (
          <button
            key={member.id}
            type="button"
            onClick={() => onChange(member.name)}
            className={cn(
              "flex flex-col items-center gap-1 min-w-[60px] p-2 rounded-xl border transition-all",
              value === member.name 
                ? "bg-black text-white border-black" 
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-white/20">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  <UserCircle size={24} />
                </div>
              )}
            </div>
            <span className="text-xs font-medium truncate w-full text-center">{member.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderEditForm = (item: TicketItemData | Partial<TicketItemData>, isNew: boolean) => {
     const setItem = isNew ? setNewItem : setEditingItem as any;
     const type = item.type || "other";
     
     return (
        <div className="space-y-5 p-1">
            {/* Common Top Fields */}
            <div className="space-y-4 border-b border-gray-100 pb-4">
                <MemberSelector 
                  value={item.owner || members[0]?.name || ""} 
                  onChange={val => setItem({...item, owner: val})} 
                />
                
                <div className="grid grid-cols-2 gap-3">
                   <div className="space-y-1">
                      <Label>標題</Label>
                      <Input 
                        placeholder="票券名稱" 
                        value={item.title || ""} 
                        onChange={e => setItem({...item, title: e.target.value})}
                      />
                   </div>
                   <div className="space-y-1">
                      <Label>副標題</Label>
                      <Input 
                        placeholder="例如: 台北 - 高雄" 
                        value={item.subtitle || ""} 
                        onChange={e => setItem({...item, subtitle: e.target.value})}
                      />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <div className="space-y-1">
                      <Label>日期</Label>
                      <div className="relative">
                        <Input 
                          placeholder="YYYY/MM/DD" 
                          value={item.date || ""} 
                          onChange={e => setItem({...item, date: e.target.value})}
                          className="pl-9"
                        />
                        <Calendar className="absolute left-3 top-2.5 text-gray-400" size={16} />
                      </div>
                   </div>
                   <div className="space-y-1">
                      <Label>時間</Label>
                      <div className="relative">
                        <Input 
                          placeholder="HH:MM" 
                          value={item.time || ""} 
                          onChange={e => setItem({...item, time: e.target.value})}
                          className="pl-9"
                        />
                        <Clock className="absolute left-3 top-2.5 text-gray-400" size={16} />
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <div className="space-y-1">
                      <Label>價格</Label>
                      <div className="relative">
                         <Input 
                           type="number"
                           placeholder="0" 
                           value={item.price || ""} 
                           onChange={e => setItem({...item, price: Number(e.target.value)})}
                           className="pl-9"
                         />
                         <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={16} />
                      </div>
                   </div>
                   <div className="space-y-1">
                      <Label>幣別</Label>
                      <Input 
                        placeholder="TWD" 
                        value={item.currency || "TWD"} 
                        onChange={e => setItem({...item, currency: e.target.value})}
                      />
                   </div>
                </div>
            </div>
            
            {/* Category Specific Fields */}
            {type === 'flight' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 p-2 rounded-lg">
                        <Plane size={16} /> 航班詳細資訊
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label>出發機場 (代碼)</Label>
                            <Input placeholder="KHH" value={item.departureAirportCode || ""} onChange={e => setItem({...item, departureAirportCode: e.target.value.toUpperCase()})} />
                        </div>
                        <div className="space-y-1">
                            <Label>抵達機場 (代碼)</Label>
                            <Input placeholder="NRT" value={item.arrivalAirportCode || ""} onChange={e => setItem({...item, arrivalAirportCode: e.target.value.toUpperCase()})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                             <Label>出發城市</Label>
                             <Input placeholder="Kaohsiung" value={item.departureCity || ""} onChange={e => setItem({...item, departureCity: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                             <Label>抵達城市</Label>
                             <Input placeholder="Tokyo" value={item.arrivalCity || ""} onChange={e => setItem({...item, arrivalCity: e.target.value})} />
                         </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label>航空公司</Label>
                            <Input placeholder="Eva Air" value={item.airline || ""} onChange={e => setItem({...item, airline: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                            <Label>航班編號</Label>
                            <Input placeholder="BR108" value={item.flightNumber || ""} onChange={e => setItem({...item, flightNumber: e.target.value})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                             <Label>座位</Label>
                             <Input placeholder="12A" value={item.seat || ""} onChange={e => setItem({...item, seat: e.target.value})} />
                         </div>
                         <div className="space-y-1">
                             <Label>抵達時間</Label>
                             <Input placeholder="14:00" value={item.endTime || ""} onChange={e => setItem({...item, endTime: e.target.value})} />
                         </div>
                    </div>
                    
                    <div className="space-y-1">
                         <Label>訂位代號</Label>
                         <Input placeholder="6-digit code" value={item.bookingRef || ""} onChange={e => setItem({...item, bookingRef: e.target.value})} />
                    </div>
                </div>
            )}

            {type === 'train' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 p-2 rounded-lg">
                        <Train size={16} /> 列車詳細資訊
                    </div>

                     <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label>出發車站</Label>
                            <Input placeholder="台北" value={item.departureStation || ""} onChange={e => setItem({...item, departureStation: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                            <Label>抵達車站</Label>
                            <Input placeholder="左營" value={item.arrivalStation || ""} onChange={e => setItem({...item, arrivalStation: e.target.value})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label>車次</Label>
                            <Input placeholder="135" value={item.trainNumber || ""} onChange={e => setItem({...item, trainNumber: e.target.value})} />
                        </div>
                         <div className="space-y-1">
                             <Label>車廂/座位</Label>
                             <Input placeholder="7車 12A" value={item.seat || ""} onChange={e => setItem({...item, seat: e.target.value})} />
                         </div>
                    </div>
                </div>
            )}

            {type === 'activity' && (
                 <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2 text-purple-600 font-bold text-sm bg-purple-50 p-2 rounded-lg">
                        <Ticket size={16} /> 活動資訊
                    </div>
                    
                    <div className="space-y-1">
                        <Label>地點/地址</Label>
                        <div className="relative">
                            <Input placeholder="活動地點" value={item.address || ""} onChange={e => setItem({...item, address: e.target.value})} className="pl-9" />
                            <MapPin className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>

                    <div className="space-y-1">
                         <Label>訂票代號</Label>
                         <Input placeholder="Booking ID" value={item.bookingRef || ""} onChange={e => setItem({...item, bookingRef: e.target.value})} />
                    </div>

                    <div className="space-y-1">
                         <Label>相關連結</Label>
                         <div className="relative">
                            <Input placeholder="https://" value={item.website || ""} onChange={e => setItem({...item, website: e.target.value})} className="pl-9" />
                            <LinkIcon className="absolute left-3 top-2.5 text-gray-400" size={16} />
                         </div>
                    </div>
                 </div>
            )}

            <div className="space-y-1 pt-2">
                <Label>備註說明</Label>
                <Textarea 
                  placeholder="其他注意事項..." 
                  value={item.description || ""} 
                  onChange={e => setItem({...item, description: e.target.value})}
                  className="min-h-[100px]"
                />
            </div>
        </div>
     );
  }

  const renderFlightCard = (item: TicketItemData) => (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-4 relative">
       {/* Top Decorative Bar */}
       <div className="h-1.5 w-full bg-gray-900" />
       
       <div className="p-5">
          {/* Header Time */}
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">
             <span>{item.date} {item.time}</span>
             <span>{item.date} {item.endTime}</span>
          </div>

          {/* Route Codes */}
          <div className="flex justify-between items-center mb-1">
             <span className="text-3xl font-black text-gray-900">{item.departureAirportCode || "DEP"}</span>
             
             <div className="flex-1 px-4 flex flex-col items-center">
                <Plane className="text-gray-300 rotate-90 mb-1" size={20} />
                <div className="w-full h-[1px] bg-gray-200 relative top-[-10px] -z-10 border-t border-dashed border-gray-300" />
             </div>

             <span className="text-3xl font-black text-gray-900">{item.arrivalAirportCode || "ARR"}</span>
          </div>

          {/* Cities */}
          <div className="flex justify-between items-center text-xs text-gray-500 mb-6 font-medium">
             <span>{item.departureCity?.split("|")[0].trim() || "Departure"}</span>
             <span>{item.arrivalCity?.split("|")[0].trim() || "Arrival"}</span>
          </div>

          {/* Duration Pill */}
          <div className="flex justify-center -mt-4 mb-6">
             <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-200 shadow-sm">
                {item.duration || "2h 30m"} <span className="text-gray-300">|</span> {item.isDirect ? "直飛" : "轉機"}
             </span>
          </div>

          {/* Flight Info Grid */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
             <div>
                <p className="text-xs text-gray-400 mb-0.5">航空公司</p>
                <p className="font-bold text-gray-900 truncate">{item.airline || "Airline"}</p>
             </div>
             <div className="text-right">
                <p className="text-xs text-gray-400 mb-0.5">航班編號</p>
                <p className="font-bold text-gray-900">{item.flightNumber || "FN123"} ({item.aircraft})</p>
             </div>
             <div>
                <p className="text-xs text-gray-400 mb-0.5">座位</p>
                <p className="font-bold text-gray-900 text-lg">{item.seat || "Any"}</p>
             </div>
             <div className="text-right">
                <p className="text-xs text-gray-400 mb-0.5">訂位代號</p>
                <p className="font-bold text-gray-900 font-mono text-lg">{item.bookingRef || "REF"}</p>
             </div>
          </div>
       </div>

       {/* Footer */}
       <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2 text-gray-600">
             <Briefcase size={14} />
             <span>{item.baggage || "15kg"}</span>
          </div>
          <span className="text-gray-400 font-medium">{item.ticketClass || "經濟艙"}</span>
       </div>
    </div>
  );

  const renderNormalCard = (item: TicketItemData) => (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer mb-4">
        {/* Ticket Header Stub */}
        <div className={cn("h-2 w-full", getTicketColor(item.type).split(" ")[0].replace("bg-", "bg-").replace("50", "500"))} />
        
        <div className="p-4 flex gap-4">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", getTicketColor(item.type))}>
            {getIcon(item.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 truncate">{item.title}</h3>
                <p className="text-sm text-gray-500 truncate">{item.subtitle}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">
                {item.date}
              </span>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                      {item.owner}
                  </span>
                </div>
                <span className="font-bold text-gray-900">
                  {item.currency} {item.price.toLocaleString()}
                </span>
            </div>
          </div>
        </div>
      </div>
  );

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
          <h1 className="text-lg font-bold text-gray-900">所有票券</h1>
        </div>
        
        <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <Search size={20} />
            </button>
            <Drawer open={isAdding} onOpenChange={setIsAdding}>
              <DrawerTrigger asChild>
                <button className="bg-black text-white p-2 rounded-full shadow-md active:scale-95 transition-transform">
                  <Plus size={20} />
                </button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[95vh]">
                <div className="mx-auto w-full max-w-md p-4 flex flex-col h-[80vh]">
                    <DrawerHeader className="px-0">
                        <DrawerTitle>{addStep === 1 ? "選擇票券類型" : "填寫詳細資訊"}</DrawerTitle>
                        <DrawerDescription>
                            {addStep === 1 ? "請選擇您要新增的票券種類" : "輸入票券的詳細內容"}
                        </DrawerDescription>
                    </DrawerHeader>
                    
                    <div className="flex-1 overflow-y-auto -mx-2 px-2">
                        {addStep === 1 ? (
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <button onClick={() => handleTypeSelect('flight')} className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-600 hover:text-blue-600">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Plane size={24} className="text-blue-600" />
                                    </div>
                                    <span className="font-bold">機票航班</span>
                                </button>
                                <button onClick={() => handleTypeSelect('train')} className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-gray-600 hover:text-emerald-600">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <Train size={24} className="text-emerald-600" />
                                    </div>
                                    <span className="font-bold">火車/高鐵</span>
                                </button>
                                <button onClick={() => handleTypeSelect('activity')} className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-gray-100 hover:border-purple-500 hover:bg-purple-50 transition-all text-gray-600 hover:text-purple-600">
                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Ticket size={24} className="text-purple-600" />
                                    </div>
                                    <span className="font-bold">景點/門票</span>
                                </button>
                                <button onClick={() => handleTypeSelect('other')} className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-500 hover:bg-gray-50 transition-all text-gray-600 hover:text-gray-800">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                        <MoreHorizontal size={24} className="text-gray-600" />
                                    </div>
                                    <span className="font-bold">其他票券</span>
                                </button>
                            </div>
                        ) : (
                            renderEditForm(newItem, true)
                        )}
                    </div>
                    
                    <DrawerFooter className="px-0 pt-4">
                        {addStep === 2 ? (
                            <div className="flex gap-3 w-full">
                                <Button variant="outline" onClick={() => setAddStep(1)} className="flex-1 rounded-xl h-12">上一步</Button>
                                <Button onClick={handleCreate} className="flex-[2] rounded-xl h-12">建立票券</Button>
                            </div>
                        ) : (
                             <DrawerClose asChild>
                                <Button variant="outline" className="w-full rounded-xl">取消</Button>
                            </DrawerClose>
                        )}
                    </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[61px] z-30 flex gap-2 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            filter === "all" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          全部
        </button>
        <button 
          onClick={() => setFilter("flight")}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1",
            filter === "flight" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          <Plane size={14} /> 機票
        </button>
        <button 
          onClick={() => setFilter("train")}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1",
            filter === "train" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          <Train size={14} /> 交通
        </button>
        <button 
          onClick={() => setFilter("activity")}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1",
            filter === "activity" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          <Ticket size={14} /> 景點
        </button>
      </div>

      {/* List */}
      <div className="p-4 pb-20">
        {filteredItems.map(item => (
          <Drawer key={item.id} onClose={() => setEditingItem(null)}>
            <DrawerTrigger asChild>
               <div className="cursor-pointer group active:scale-[0.99] transition-transform">
                   {item.type === 'flight' ? (
                       <div className="space-y-2">
                           <div className="flex items-center gap-2 px-1">
                               {(() => {
                                  const ownerProfile = members.find(m => m.name === item.owner);
                                  return (
                                    <>
                                        <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden border border-white shadow-sm flex items-center justify-center">
                                            {ownerProfile?.avatar ? (
                                                <img src={ownerProfile.avatar} alt={item.owner} className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={12} className="text-gray-500" />
                                            )}
                                        </div>
                                        <span className="text-xs font-bold text-gray-900">{item.owner}</span>
                                    </>
                                  );
                               })()}
                           </div>
                           {renderFlightCard(item)}
                       </div>
                   ) : renderNormalCard(item)}
               </div>
            </DrawerTrigger>
            
            <DrawerContent className="max-h-[95vh]">
              <div className="mx-auto w-full max-w-md overflow-hidden flex flex-col h-[85vh]">
                 {editingItem && editingItem.id === item.id ? (
                     // Edit Mode
                     <>
                        <DrawerHeader className="text-left pb-0">
                           <DrawerTitle>編輯票券</DrawerTitle>
                           <DrawerDescription className="sr-only">修改票券詳細資訊</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 overflow-y-auto flex-1">
                            {renderEditForm(editingItem, false)}
                        </div>
                        <DrawerFooter className="pt-4">
                           <Button onClick={handleSaveEdit} className="w-full rounded-xl h-12">
                             <Save size={16} className="mr-2" /> 儲存變更
                           </Button>
                           <Button variant="outline" onClick={() => setEditingItem(null)} className="w-full rounded-xl">取消</Button>
                        </DrawerFooter>
                     </>
                 ) : (
                     // View Mode
                     <>
                        <DrawerHeader className="text-left flex justify-between items-start">
                           <div>
                               <DrawerTitle className="text-xl flex items-center gap-2">
                                   {item.title}
                                   <span className={cn("text-xs px-2 py-0.5 rounded-full border", getTicketColor(item.type))}>
                                       {item.type.toUpperCase()}
                                   </span>
                               </DrawerTitle>
                               <DrawerDescription>{item.subtitle}</DrawerDescription>
                           </div>
                           <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditingItem(item)}>
                               <Edit size={16} />
                           </Button>
                        </DrawerHeader>

                        <div className="p-4 space-y-6 overflow-y-auto flex-1">
                           {/* QR Code Section */}
                           <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-4">
                               <div className="bg-gray-900 p-4 rounded-xl">
                                   <QrCode size={120} className="text-white" />
                               </div>
                               <div className="text-center">
                                   <p className="text-xs text-gray-400 mb-1">請出示此 QR Code 入場</p>
                                   <p className="font-mono font-bold text-lg tracking-wider">{item.bookingRef || "NO-REF-CODE"}</p>
                               </div>
                           </div>

                           {/* Details */}
                           <div className="space-y-4">
                               <h3 className="font-bold text-gray-900 border-b pb-2">票券詳情</h3>
                               
                               <div className="grid grid-cols-2 gap-4">
                                   <div>
                                       <p className="text-xs text-gray-500 mb-1">日期</p>
                                       <p className="font-medium">{item.date}</p>
                                   </div>
                                   <div>
                                       <p className="text-xs text-gray-500 mb-1">時間</p>
                                       <p className="font-medium">{item.time} {item.endTime ? `- ${item.endTime}` : ''}</p>
                                   </div>
                                   <div>
                                       <p className="text-xs text-gray-500 mb-1">持有人</p>
                                        <div className="flex items-center gap-2">
                                            {(() => {
                                                const owner = members.find(m => m.name === item.owner);
                                                return owner?.avatar ? (
                                                    <img src={owner.avatar} className="w-5 h-5 rounded-full object-cover" />
                                                ) : <User size={16} className="text-gray-400"/>;
                                            })()}
                                            <p className="font-medium">{item.owner}</p>
                                        </div>
                                   </div>
                                   {item.seat && (
                                       <div>
                                           <p className="text-xs text-gray-500 mb-1">座位</p>
                                           <p className="font-medium">{item.seat}</p>
                                       </div>
                                   )}
                                    {item.ticketClass && (
                                       <div>
                                           <p className="text-xs text-gray-500 mb-1">艙等</p>
                                           <p className="font-medium">{item.ticketClass}</p>
                                       </div>
                                   )}
                               </div>
                               
                               {item.type === 'flight' && (
                                   <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                                       <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                                           <Plane size={14} /> 航班資訊
                                       </h4>
                                       <div className="grid grid-cols-2 gap-2 text-sm">
                                           <div className="text-gray-500">航空公司</div>
                                           <div className="font-medium text-right">{item.airline}</div>
                                           <div className="text-gray-500">航班代號</div>
                                           <div className="font-medium text-right">{item.flightNumber}</div>
                                           <div className="text-gray-500">機型</div>
                                           <div className="font-medium text-right">{item.aircraft || "-"}</div>
                                           <div className="text-gray-500">行李</div>
                                           <div className="font-medium text-right">{item.baggage || "-"}</div>
                                       </div>
                                   </div>
                               )}

                               {item.type === 'train' && (
                                   <div className="bg-emerald-50 p-4 rounded-xl space-y-3 text-emerald-900">
                                       <h4 className="font-bold text-sm flex items-center gap-2">
                                           <Train size={14} /> 列車資訊
                                       </h4>
                                       <div className="grid grid-cols-2 gap-2 text-sm">
                                           <div className="opacity-70">車次</div>
                                           <div className="font-medium text-right">{item.trainNumber || "-"}</div>
                                           <div className="opacity-70">出發</div>
                                           <div className="font-medium text-right">{item.departureStation || "-"}</div>
                                           <div className="opacity-70">抵達</div>
                                           <div className="font-medium text-right">{item.arrivalStation || "-"}</div>
                                       </div>
                                   </div>
                               )}
                               
                               {item.description && (
                                   <div className="space-y-2">
                                       <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                                           <MoreHorizontal size={14} /> 備註
                                       </h4>
                                       <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 leading-relaxed">
                                           {item.description}
                                       </div>
                                   </div>
                               )}
                           </div>

                           {/* Actions */}
                           <div className="flex gap-3">
                               <Button className="flex-1 gap-2 rounded-xl" variant="outline">
                                   <Download size={16} /> 下載憑證
                               </Button>
                               <Button className="flex-1 gap-2 rounded-xl" variant="outline">
                                   <Share2 size={16} /> 分享給朋友
                               </Button>
                           </div>
                        </div>

                        <DrawerFooter>
                           <DrawerClose asChild>
                               <Button className="w-full rounded-xl h-12">關閉</Button>
                           </DrawerClose>
                        </DrawerFooter>
                     </>
                 )}
              </div>
            </DrawerContent>
          </Drawer>
        ))}
        
        {filteredItems.length === 0 && (
            <div className="text-center py-10 text-gray-400">
                沒有找到相關票券
            </div>
        )}
      </div>
    </div>
  );
}
