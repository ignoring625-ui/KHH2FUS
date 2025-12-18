import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Clock, MapPin, MoreVertical, X, Trash2 } from 'lucide-react';

export interface ItineraryItemData {
  id: string;
  date: string;
  time: string;
  title: string;
  location: string;
  notes?: string;
  cost?: number;
  currency?: string;
  payer?: string;
  splitters?: string[];
}

interface ItineraryProps {
  items: ItineraryItemData[];
  onUpdate: (item: ItineraryItemData) => void;
  onAdd: (item: ItineraryItemData) => void;
  onDelete?: (id: string) => void;
  onViewAll: () => void;
  members: string[];
}

export const Itinerary: React.FC<ItineraryProps> = ({ items, onUpdate, onAdd, onDelete, onViewAll, members }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ItineraryItemData | null>(null);

  const [formData, setFormData] = useState<Partial<ItineraryItemData>>({
    date: new Date().toISOString().split('T')[0],
    time: "12:00 - 13:00",
    title: "",
    location: "",
    currency: "KRW"
  });

  const handleSubmit = () => {
    if (!formData.title) return;
    if (editingItem) {
      onUpdate({ ...editingItem, ...formData } as ItineraryItemData);
    } else {
      onAdd({ ...formData, id: Math.random().toString(36).substr(2, 9) } as ItineraryItemData);
    }
    setIsAddOpen(false);
    setEditingItem(null);
  };

  return (
    <section className="px-4">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold">即將到來</h2>
          <p className="text-gray-500 text-sm">最接近當前時間的行程</p>
        </div>
        <button onClick={onViewAll} className="text-blue-600 text-sm font-medium">查看全部</button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} onClick={() => { setEditingItem(item); setFormData(item); setIsAddOpen(true); }} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 active:scale-95 transition-transform">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <Clock size={12} /> <span>{item.date} {item.time}</span>
              </div>
              <h4 className="font-bold text-gray-900">{item.title}</h4>
              <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                <MapPin size={12} /> <span>{item.location}</span>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => { setEditingItem(null); setIsAddOpen(true); }} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:bg-gray-50 transition-colors">
          <Plus size={20} /> <span className="font-medium">添加行程</span>
        </button>
      </div>

      <AnimatePresence>
        {isAddOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="relative w-full max-w-md bg-white rounded-t-[32px] p-6 max-h-[90dvh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{editingItem ? '編輯行程' : '添加行程'}</h3>
                <button onClick={() => setIsAddOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={20} /></button>
              </div>
              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">行程名稱</label>
                  <input className="w-full p-4 bg-gray-50 rounded-2xl mt-1 outline-none focus:ring-2 ring-black" placeholder="例：景福宮參觀" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">日期</label>
                    <input type="date" className="w-full p-4 bg-gray-50 rounded-2xl mt-1 outline-none" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">時間</label>
                    <input className="w-full p-4 bg-gray-50 rounded-2xl mt-1 outline-none" placeholder="12:00 - 14:00" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">地點</label>
                  <input className="w-full p-4 bg-gray-50 rounded-2xl mt-1 outline-none" placeholder="輸入詳細地址" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-3">
                {editingItem && (
                  <button onClick={() => { onDelete?.(editingItem.id); setIsAddOpen(false); }} className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2"><Trash2 size={18} /> 刪除</button>
                )}
                <button onClick={handleSubmit} className="flex-[2] py-4 bg-black text-white rounded-2xl font-bold">確認</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
